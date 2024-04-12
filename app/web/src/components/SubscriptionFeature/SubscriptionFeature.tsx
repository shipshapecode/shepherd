import { ArrowLongRightIcon } from '@heroicons/react/20/solid';

import { Link } from '@redwoodjs/router';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from 'src/components/Card/Card';
import { cn } from 'src/lib/utils';

import { SubscriptionPlan } from '../../../types';

type SubscriptionFeatureProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  plans?: SubscriptionPlan[];
  button?: { label: string; href: string };
  requireAdminSubscription?: boolean;
};

function SubscriptionFeature({
  title,
  description,
  plans = [],
  button,
  requireAdminSubscription = false,
}: SubscriptionFeatureProps) {
  const isAdmin = false;
  const isActive =
    plans.includes(SubscriptionPlan.ENTERPRISE) &&
    (requireAdminSubscription ? isAdmin : true);
  const isTeamSubscribed = true;

  return (
    <Card
      className={cn(
        'order-2 flex flex-col border-2 border-black pt-2 shadow-default',
        { 'bg-gray-200': !isActive, 'order-1': isActive }
      )}
    >
      <CardHeader className={cn({ 'cursor-not-allowed': !isActive })}>
        <CardTitle className={cn({ 'text-gray-500': !isActive })}>
          {title}
        </CardTitle>
        {description && (
          <CardDescription
            className={cn('text-md pt-2', { 'text-gray-500': !isActive })}
          >
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardFooter className={cn('mt-auto bg-white')}>
        {isActive ? (
          <>
            {button && (
              <Link to={button.href} className="text-md br font-bold">
                {button.label}
                <ArrowLongRightIcon className="ml-2 inline-block h-4 w-4" />
              </Link>
            )}
          </>
        ) : isTeamSubscribed ? (
          <div className="text-muted-foreground text-sm">
            Please contact us for additional options.
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center space-x-1.5">
              <div className="text-muted-foreground text-sm">
                Available on the <span className="font-bold">{plans[0]}</span>{' '}
                plan.
              </div>
            </div>
            {isAdmin ? (
              <div className="ml-auto">
                <button className="text-react text-sm font-bold">
                  Upgrade
                </button>
              </div>
            ) : (
              <div className="ml-auto">
                <button className="text-react text-sm font-bold">
                  <Link to="/subscribe">Subscribe</Link>
                </button>
              </div>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export default SubscriptionFeature;
