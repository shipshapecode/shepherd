import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';
import type {
  DeleteIntegrationMutationVariables,
  FindIntegrationById,
  IntegrationCohort,
} from 'types/graphql';

import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from 'src/components/Card/Card';
import { QUERY as DETAIL_QUERY } from 'src/components/Integration/IntegrationCell';
import { Switch } from 'src/components/ui/switch';
import { formatEnum, timeTag, truncate } from 'src/lib/formatters';

const DELETE_INTEGRATION_MUTATION = gql`
  mutation DeleteIntegrationMutation($id: String!) {
    deleteIntegration(id: $id) {
      id
    }
  }
`;
const UPDATE_INTEGRATION_COHORTS_MUTATION = gql`
  mutation UpdateIntegrationCohortsMutation(
    $id: String!
    $input: UpdateIntegrationInput!
  ) {
    updateIntegration(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      name
      option
      settings
      cohorts
      syncedAt
    }
  }
`;

const SYNC_INTEGRATION_COHORTS_MUTATION = gql`
  mutation SyncIntegrationCohortsMutation($id: String!) {
    syncIntegrationCohorts(id: $id) {
      cohorts
      syncedAt
    }
  }
`;

interface Props {
  integration: NonNullable<FindIntegrationById['integration']>;
}

const obscrureKey = (key: string) => {
  if (!key) return '';

  return `************${key.slice(10)}`;
};

const Cohorts = ({
  integration,
  updatedAt,
}: {
  integration: FindIntegrationById['integration'];
  updatedAt: string;
}) => {
  let cohorts: IntegrationCohort[] = [];
  if (
    integration.cohorts &&
    typeof integration.cohorts === 'object' &&
    Array.isArray(integration.cohorts)
  ) {
    cohorts = integration.cohorts as IntegrationCohort[];
  }
  const { id } = integration;
  const [updateIntegration] = useMutation(UPDATE_INTEGRATION_COHORTS_MUTATION, {
    onCompleted: () => {
      toast.success('Cohorts updated');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onUpdateActive = (cohortId: IntegrationCohort['id']) => {
    const input = {
      cohorts: cohorts.map((c) => {
        if (c.id === cohortId) {
          return { ...c, isActive: !c.isActive };
        } else {
          return c;
        }
      }),
    };
    updateIntegration({ variables: { id, input } });
  };
  const onRemove = (cohortId: IntegrationCohort['id']) => {
    const input = {
      cohorts: cohorts.filter((c) => c.id !== cohortId),
    };
    updateIntegration({ variables: { id, input } });
  };

  if (!cohorts.length)
    return (
      <div className="rw-text-center bg-slate-100 p-6">
        <h4 className="font-heading text-xl">No cohorts added</h4>
        <span className="text-md">
          Ensure you have available cohorts to sync
        </span>
      </div>
    );

  return (
    <Table className="mt-6">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Cohort Name</TableHeaderCell>
          <TableHeaderCell>Computed Last</TableHeaderCell>
          <TableHeaderCell>Count</TableHeaderCell>
          <TableHeaderCell>Active</TableHeaderCell>
          <TableHeaderCell className="pr-6 text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Actions
          </TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {cohorts.map((cohort) => (
          <TableRow key={cohort.id}>
            <TableCell className="border-b-2 border-navy">
              {truncate(cohort.name)}
            </TableCell>
            <TableCell className="border-b-2 border-navy">
              {timeTag(updatedAt, true)}
            </TableCell>
            <TableCell className="border-b-2 border-navy">
              {cohort.view_count}
            </TableCell>
            <TableCell className="border-b-2 border-navy">
              <Switch
                name="isActive"
                checked={cohort.isActive}
                onChange={() => onUpdateActive(cohort.id)}
              />
            </TableCell>
            <TableCell className="border-b-2 border-navy">
              <nav className="rw-table-actions">
                {/* <button
                  type="button"
                  title={'Sync Now'}
                  className="rw-button rw-button-small"
                  onClick={() => console.log(cohort.id)}
                >
                  Sync Now
                </button> */}
                <button
                  type="button"
                  title={`Delete cohort ${cohort.id}`}
                  className="rw-button rw-button-small rw-button-red"
                  onClick={() => onRemove(cohort.id)}
                >
                  Delete
                </button>
              </nav>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const Integration = ({ integration }: Props) => {
  const [syncCohorts] = useMutation(SYNC_INTEGRATION_COHORTS_MUTATION, {
    refetchQueries: [DETAIL_QUERY, 'FindIntegrationById'],
    onCompleted: () => {
      toast.success('Cohorts synced');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const [deleteIntegration] = useMutation(DELETE_INTEGRATION_MUTATION, {
    onCompleted: () => {
      toast.success('Integration deleted');
      navigate(routes.integrations());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const isAmplitude = integration.option === 'AMPLITUDE';

  const onDeleteClick = (
    id: DeleteIntegrationMutationVariables['id'],
    option: string
  ) => {
    if (
      confirm(`Are you sure you want to delete the integration for ${option}?`)
    ) {
      deleteIntegration({ variables: { id } });
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="mb-6 font-heading">
            {`Integration for ${formatEnum(integration.option)}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <button
            type="button"
            className="bg-primary text-primary-foreground hover:bg-primary/80 mt-2 flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-black bg-red-200 px-10 py-3 font-bold shadow-default transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
            onClick={() => onDeleteClick(integration.id, integration.option)}
          >
            Delete
          </button>
        </CardContent>
      </Card>
      <Card className="mt-8 w-full">
        <CardHeader>
          <CardTitle className="mb-6 font-heading">
            {`${formatEnum(integration.option)} Settings`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <label htmlFor="writeKey" className="block text-left font-body">
            API key
          </label>

          <input
            name="writeKey"
            value={obscrureKey(
              (integration?.settings as { writeKey?: string })?.writeKey
            )}
            className="w-full cursor-not-allowed rounded-lg border border-solid border-gray-300 p-[10px] font-bold shadow-default outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
            disabled
          />

          {isAmplitude && (
            <>
              <label
                htmlFor="secretKey"
                className="mt-6 block text-left font-body"
              >
                Secret key
              </label>

              <input
                name="secretKey"
                value={obscrureKey(
                  (integration?.settings as { secretKey?: string })?.secretKey
                )}
                className="w-full cursor-not-allowed rounded-lg border border-solid border-gray-300 p-[10px] font-bold shadow-default outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
                disabled
              />
            </>
          )}
          {!isAmplitude && (
            <>
              <label
                htmlFor="projectId"
                className="mt-6 block text-left font-body"
              >
                Project ID
              </label>

              <input
                name="projectId"
                value={
                  (integration?.settings as { projectId?: string })?.projectId
                }
                className="w-full cursor-not-allowed rounded-lg border border-solid border-gray-300 p-[10px] font-bold shadow-default outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
                disabled
              />
            </>
          )}
          <Link
            to={routes.editIntegration({ id: integration.id })}
            className="bg-primary text-primary-foreground hover:bg-primary/80 mt-8 flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-black bg-violet-200 px-10 py-3 font-bold shadow-default transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
          >
            Edit
          </Link>
        </CardContent>
      </Card>
      {/* TODO: fix up syncing cohorts and adding to groups tab */}
      {/* <Card className="mt-8 w-full">
        <CardHeader>
          <CardTitle className="mb-6 font-heading">
            {`Sync Cohorts for ${formatEnum(integration.option)}`}
          </CardTitle>
          <button
            className="bg-primary text-primary-foreground hover:bg-primary/80 mt-2 flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-black bg-lime-200 px-10 py-3 font-body text-[16px] font-bold shadow-default transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
            onClick={() => syncCohorts({ variables: { id: integration.id } })}
          >
            Sync
          </button>
        </CardHeader>
        <CardContent>
          <Cohorts
            integration={integration}
            updatedAt={integration.updatedAt}
          />
        </CardContent>
      </Card> */}
    </>
  );
};

export default Integration;
