import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { useAuth } from 'src/auth';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from 'src/components/Card/Card';

const DELETE_USERACCOUNT_MUTATION = gql`
  mutation DeleteUserAccountMutation($id: String!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const DeleteAccountCard = () => {
  const { currentUser, logOut } = useAuth();
  const [deleteUserAccount] = useMutation(DELETE_USERACCOUNT_MUTATION, {
    onCompleted: () => {
      toast.success('Account deleted');
      logOut();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const onDeleteClick = () => {
    if (confirm(`Are you sure you want to delete your account?`)) {
      const { id } = currentUser;
      deleteUserAccount({ variables: { id } });
    }
  };

  return (
    <Card className="w-1/3 border-red-500 shadow-none">
      <CardHeader>
        <CardTitle className="mb-6 font-heading">{'Delete Account'}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="mb-2">
            Use this button to delete your account and all your data. This
            action is irreversible.
          </div>

          <button
            onClick={onDeleteClick}
            className="hover:bg-primary/80 mt-2 flex w-full cursor-pointer items-center justify-center border-2 border-red-500 bg-red-500 px-10 py-3 font-bold text-white shadow-default transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
          >
            Delete Account
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
