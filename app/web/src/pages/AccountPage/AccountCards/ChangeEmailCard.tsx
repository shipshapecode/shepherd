import { Form, FieldError, TextField, Submit, useForm } from '@redwoodjs/forms';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { useAuth } from 'src/auth';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from 'src/components/Card/Card';

const UPDATE_EMAIL_MUTATION = gql`
  mutation UpdateUserEmailMutation($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      email
    }
  }
`;

export const ChangeEmailCard = () => {
  const { currentUser } = useAuth();
  const formMethods = useForm();
  const [updateUserEmail, { loading }] = useMutation(UPDATE_EMAIL_MUTATION, {
    onCompleted: () => {
      formMethods.reset();
      toast.success('Email updated');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onUpdate = (data) => {
    const { id } = currentUser;
    const input = { email: data.email };

    updateUserEmail({ variables: { id, input } });
  };

  return (
    <Card className="w-1/3">
      <CardHeader>
        <CardTitle className="font-heading">{'Change Email'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          onSubmit={onUpdate}
          config={{ mode: 'onBlur' }}
          formMethods={formMethods}
        >
          <div className="flex flex-col">
            <div className="mb-2">
              <label
                className="mb-1 block text-sm font-bold text-gray-800"
                htmlFor="email"
              >
                New Email
              </label>
              <TextField
                className="w-full rounded-lg border border-solid border-gray-300 p-[10px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
                name="email"
                errorClassName="w-full rounded-lg border border-solid border-red-500 p-[10px] font-bold outline-none"
                validation={{ required: true }}
              />
              <FieldError
                className="pl-2 text-xs italic text-red-500"
                name="email"
              />
            </div>

            <Submit
              disabled={loading}
              className="bg-primary text-primary-foreground hover:bg-primary/80 mt-2 flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-black bg-[#bc95d4] px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
            >
              Update Email
            </Submit>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};
