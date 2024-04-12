import { Metadata } from '@redwoodjs/web';

import { ChangeEmailCard } from './AccountCards/ChangeEmailCard';
import { ChangePasswordCard } from './AccountCards/ChangePasswordCard';
import { DeleteAccountCard } from './AccountCards/DeleteAccountCard';

const AccountPage = () => {
  return (
    <>
      <Metadata title="Account Settings" description="Account settings page" />

      <div className="mt-8 flex-1 space-y-7">
        <p className="font-body text-lg">
          This page lets you manage your account. You can change your email,
          password, and delete your account.
        </p>
        <ChangeEmailCard />
        <ChangePasswordCard />
        <DeleteAccountCard />
      </div>
    </>
  );
};

export default AccountPage;
