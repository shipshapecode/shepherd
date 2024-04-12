import { init, track } from '@amplitude/analytics-node';
import { PostHog } from 'posthog-node';
import type {
  QueryResolvers,
  MutationResolvers,
  IntegrationRelationResolvers,
  JourneyState,
} from 'types/graphql';

import { ShepherdEvent } from 'src/functions/actor/actor';
import { db } from 'src/lib/db';
import { logger } from 'src/lib/logger';

interface IntegrationSettings {
  projectId?: string;
  secretKey?: string;
  writeKey?: string;
}

export const integrations: QueryResolvers['integrations'] = () => {
  return db.integration.findMany({
    where: { accountId: context.currentUser.accountId },
  });
};

export const integration: QueryResolvers['integration'] = ({ id }) => {
  return db.integration.findUnique({
    where: { id },
  });
};

export const createIntegration: MutationResolvers['createIntegration'] = ({
  input,
}) => {
  return db.integration.create({
    data: input,
  });
};

export const updateIntegration: MutationResolvers['updateIntegration'] = ({
  id,
  input,
}) => {
  return db.integration.update({
    data: input,
    where: { id },
  });
};

export const deleteIntegration: MutationResolvers['deleteIntegration'] = ({
  id,
}) => {
  return db.integration.delete({
    where: { id },
  });
};

export const syncIntegrationCohorts: MutationResolvers['syncIntegrationCohorts'] =
  async ({ id }) => {
    try {
      const currentIntegration = await db.integration.findUnique({
        where: { id },
      });
      const { option, settings } = currentIntegration;

      if (
        settings &&
        typeof settings === 'object' &&
        !Array.isArray(settings)
      ) {
        const { writeKey, secretKey, projectId }: IntegrationSettings =
          settings;

        if (!writeKey) {
          throw new Error('Missing writeKey for integration');
        }

        const SYNC_COHORTS_URL =
          option === 'AMPLITUDE'
            ? 'https://amplitude.com/api/3/cohorts'
            : `https://app.posthog.com/api/projects/${projectId}/cohorts`;
        let authCredentials;

        if (option === 'AMPLITUDE') {
          if (!secretKey) {
            throw new Error('Missing secretKey for Amplitude integration');
          }

          authCredentials = `Basic ${btoa(`${writeKey}:${secretKey}`)}`;
        }
        if (option === 'POSTHOG') {
          if (!projectId) {
            throw new Error('Missing projectId for PostHog integration');
          }

          authCredentials = `Bearer ${writeKey}`;
        }

        const response = await fetch(SYNC_COHORTS_URL, {
          method: 'GET',
          headers: {
            Authorization: authCredentials,
          },
        });

        const data = await response.json();
        let cohorts;

        logger.debug(`Shepherd ${data} ${response.status} setup`);

        if (option === 'AMPLITUDE') {
          ({ cohorts } = data);
          cohorts.count = data.size;
        }
        if (option === 'POSTHOG') {
          cohorts = data.results;
        }

        if (cohorts) {
          cohorts.forEach((cohort: Record<string, unknown>) => {
            cohort.isActive = true;
            cohort.syncedAt = new Date();
          });
        }

        return db.integration.update({
          data: { cohorts },
          where: { id },
        });
      }
    } catch (error) {
      throw new Error(`Couldn't sync cohorts: ${error.message}`);
    }
  };

export const Integration: IntegrationRelationResolvers = {
  Account: (_obj, { root }) => {
    return db.integration.findUnique({ where: { id: root?.id } }).Account();
  },
};

// non graphql functions
export const captureIntegrationEvent = async ({
  accountId,
  eventData,
  journeyState,
  userId,
}: {
  accountId: string;
  eventData: ShepherdEvent;
  journeyState: JourneyState;
  userId: number;
}) => {
  try {
    const integrations = await db.integration.findMany({
      where: { accountId },
    });

    if (integrations.length <= 0) {
      return null;
    }

    const distinctId =
      eventData.properties?.id ?? `shepherd-integration-${userId}`;

    const amplitudeSettings = integrations.find((i) => i.option === 'AMPLITUDE')
      ?.settings as IntegrationSettings;
    const posthogSettings = integrations.find((i) => i.option === 'POSTHOG')
      ?.settings as IntegrationSettings;

    if (amplitudeSettings) {
      init(amplitudeSettings.writeKey, {
        instanceName: 'shepherd pro',
      });

      logger.debug(
        `Shepherd Amplitude ${amplitudeSettings.writeKey} integration started.`
      );

      track(
        `Shepherd Journey Integration ${journeyState}`,
        {
          ...eventData,
        },
        {
          user_id: distinctId,
        }
      );

      logger.debug(
        `Shepherd Amplitude ${posthogSettings.writeKey} integration completed.`
      );
    }
    if (posthogSettings) {
      const posthogClient = new PostHog(posthogSettings.writeKey, {
        host: 'https://app.posthog.com',
      });

      logger.debug(
        `Shepherd PostHog ${posthogSettings.writeKey} integration started.`
      );

      posthogClient.capture({
        distinctId,
        event: `Shepherd Journey Integration ${journeyState}`,
        properties: {
          ...eventData,
          $current_url: eventData.currentUrl,
          $set: {
            journeyId: eventData.journeyData?.id,
            currentStep: eventData.journeyData?.currentStep,
            numberOfSteps: eventData.journeyData?.numberOfSteps,
          },
        },
      });

      logger.debug(
        `Shepherd PostHog ${posthogSettings.writeKey} integration completed.`
      );
    }
  } catch (error) {
    logger.error(
      `Shepherd failed to capture integration event: ${error.message}`
    );
  }
};
