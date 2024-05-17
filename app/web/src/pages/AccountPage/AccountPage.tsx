import { Metadata, useQuery } from '@redwoodjs/web';

import { ChangeEmailCard } from './AccountCards/ChangeEmailCard';
import { ChangePasswordCard } from './AccountCards/ChangePasswordCard';
import { DeleteAccountCard } from './AccountCards/DeleteAccountCard';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from 'src/components/Card/Card';

export const ACCOUNT_MANAGEMENT_QUERY = gql`
  query GetPortalUrl {
    getSubscriptionPortalSesion {
      id
      access_url
    }
  }
`;

const AccountPage = () => {
  const { loading, error, data } = useQuery(ACCOUNT_MANAGEMENT_QUERY);

  const onClickPortalButton = async () => {
    const url = data.getSubscriptionPortalSesion.access_url;

    window.open(url, '_blank');
  };

  return (
    <>
      <Metadata title="Account Settings" description="Account settings page" />

      <div className="mt-8 flex-1 space-y-7">
        <p className="font-body text-lg">
          This page lets you manage your account. You can change your email,
          password, and delete your account.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:gap-6 xl:grid-cols-3">
          <ChangeEmailCard />
          <ChangePasswordCard />
          <DeleteAccountCard />
        </div>
        <Card className="w-full border-2 border-black pt-2 shadow-default">
          <CardHeader>
            <CardTitle className="mb-6 font-heading">
              {'Billing & Subscription'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Open the Chargebee customer portal to download your invoices,
              change your billing details and change or cancel your subscription
              plan.
            </p>
            {!error && (
              <button
                onClick={onClickPortalButton}
                className="bg-primary text-primary-foreground hover:bg-primary/80 mt-2 flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-black bg-[#bc95d4] px-10 py-3 font-bold shadow-default transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
              >
                {loading ? 'Loading...' : 'Open Chargebee Portal'}
              </button>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AccountPage;
