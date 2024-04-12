import { duotoneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Metadata } from '@redwoodjs/web';

import { useAuth } from 'src/auth';
import CodeBlock from 'src/components/CodeBlock';
import SubscriptionFeature from 'src/components/SubscriptionFeature';

import { SubscriptionPlan } from '../../../types/index';

const HomePage = () => {
  const { currentUser } = useAuth();

  const initCode = `
    import Shepherd from 'shepherd.js';

    Shepherd.init(shp_${currentUser?.Account.apiKey});
  `;
  const setupTourCode = `
    const journey = new Shepherd.Tour({
      id: 'custom-123',
      defaultStepOptions: {
        cancelIcon: {
          enabled: true,
        },
        classes: 'my-custom-class',
      },
      useModalOverlay: true,
    });
  `;
  const addStepsAndStartCode = `
    journey.addStep({
      text: 'Welcome to your new dashboard! Here you can see all the key sales and revenue data at a glance.',
      buttons: [
        {
          action() {
            return this.cancel();
          },
          secondary: true,
          text: 'Exit',
        },
        {
          action() {
            return this.next();
          },
          text: 'Complete',
        },
      ],
    });
    journey.start();
  `;

  return (
    <>
      <Metadata title="Home" description="Getting Started with Shepherd Pro" />

      <div className="mt-8 flex-1 space-y-7">
        <div className="mt-6">
          <p className="font-body text-lg">
            {`Shepherd Pro builds on the open source tour library to help you
            create user journeys that are built upon best practices and user
            feedback. It is designed to help you get the most out of Shepherd.
            Be sure to take note of your API Key to unlock the real potentional
            of Shepherd Pro`}
          </p>
          {currentUser?.Account && (
            <CodeBlock
              language="bash"
              style={duotoneDark}
              code={`shp_${currentUser.Account.apiKey}`}
            />
          )}

          <div className="mt-4">
            <p className="font-body text-lg">
              {`Of course, if you don't have an existing tour that you're looking
              to enhance, you can always start from scratch with the following
              import statement and setup code:`}
            </p>
            <CodeBlock
              language="javascript"
              style={duotoneDark}
              code={initCode}
            />
          </div>
          <div className="mt-4">
            <p className="font-body text-lg">
              {`Which will initialize Shepherd Pro with the API Key that you have
              and not you're setup to start creating tours with Shepherd Pro.
              A simple example of this would be:`}
            </p>
            <CodeBlock
              language="javascript"
              style={duotoneDark}
              code={setupTourCode}
            />
          </div>
          <div className="mt-4">
            <p className="font-body text-lg">
              {`Then you just need to add steps to the tour instance and trigger
              the start method to begin the tour. Shepherd Pro will take care of
              the rest. Here's an example of how you can add a step to the tour instance:`}
            </p>
            <CodeBlock
              language="javascript"
              style={duotoneDark}
              code={addStepsAndStartCode}
            />
          </div>
        </div>
        <div className="my-6">
          <div className="mb-2 flex items-center gap-2 text-3xl font-black">
            Benefits of Shepherd Pro vs Open Source
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:gap-6 xl:grid-cols-3">
          <SubscriptionFeature
            title="Prioritized Github Issues"
            description="Your Github issues will be looked at first by our team. Drop us a message at github@shepherdpro.com with a link to your issue after creating it."
            plans={[
              SubscriptionPlan.STARTER,
              SubscriptionPlan.PRO,
              SubscriptionPlan.ENTERPRISE,
            ]}
            button={{
              label: 'Open Issue',
              href: 'https://github.com/shepherd-pro/shepherd/issues/new/choose',
            }}
          />
          {/* <SubscriptionFeature
            title="Invite Your Team"
            description="Invite your team members to grant them access to the Pro examples."
            plans={[SubscriptionPlan.STARTER, SubscriptionPlan.PRO, SubscriptionPlan.ENTERPRISE]}
            button={{ label: 'Invite Team', href: '/team' }}
            requireAdminSubscription
          /> */}
          <SubscriptionFeature
            title="Onboarding Call"
            description="Schedule a call with us to share what you're building with Shepherd Pro and how we can make the library even better."
            plans={[
              SubscriptionPlan.STARTER,
              SubscriptionPlan.PRO,
              SubscriptionPlan.ENTERPRISE,
            ]}
            button={{
              label: 'Schedule Call',
              href: 'https://cal.com/team/shepherd-pro',
            }}
          />
          {/* <SubscriptionFeature
            title="Email Support"
            description="Your direct wire to the Shepherd Pro team. We will point you in the right direction if you encounter problems using Shepherd Pro."
            plans={[SubscriptionPlan.PRO, SubscriptionPlan.ENTERPRISE]}
            button={{ label: 'Contact Support', href: 'mailto:support@shepherdpro.com' }}
          /> */}
          <SubscriptionFeature
            title="Video Support"
            description="Your direct wire to the Shepherd Pro team. We will point you in the right direction if you encounter problems using Shepherd Pro."
            plans={[SubscriptionPlan.STARTER]}
            button={{
              label: 'Schedule Support Call',
              href: 'https://cal.com/team/shepherd-pro',
            }}
            requireAdminSubscription
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
