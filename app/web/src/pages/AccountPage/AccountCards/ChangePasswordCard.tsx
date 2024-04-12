import {
  Form,
  FieldError,
  PasswordField,
  Submit,
  useForm,
} from '@redwoodjs/forms';
import { toast } from '@redwoodjs/web/toast';

import { useAuth } from 'src/auth';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from 'src/components/Card/Card';

export const ChangePasswordCard = () => {
  const formMethods = useForm();
  const { forgotPassword, resetPassword, currentUser } = useAuth();
  const onSubmitChangePassword = async (data: Record<string, string>) => {
    const resetToken = await forgotPassword(currentUser.email);
    if (resetToken.error) {
      toast.error(resetToken.error);
      return;
    }

    const response = await resetPassword({
      resetToken,
      password: data.password,
    });

    if (response.error) {
      toast.error(response.error);
    } else {
      formMethods.reset();
      toast.success('Password changed!');
    }
  };

  return (
    <Card className="w-1/3">
      <CardHeader>
        <CardTitle className="mb-6 font-heading">{'Change Password'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          onSubmit={onSubmitChangePassword}
          config={{ mode: 'onBlur' }}
          formMethods={formMethods}
        >
          <div className="flex flex-col">
            <div className="mb-2">
              <label
                className="mb-1 block text-sm font-bold text-gray-800"
                htmlFor="password"
              >
                New Password
              </label>
              <PasswordField
                className="w-full rounded-lg border border-solid border-gray-300 p-[10px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
                name="password"
                autoComplete="current-password"
                errorClassName="w-full rounded-lg border border-solid border-red-500 p-[10px] font-bold outline-none"
                validation={{ required: true }}
              />
              <FieldError
                className="pl-2 text-xs italic text-red-500"
                name="password"
              />
            </div>

            <Submit className="bg-primary text-primary-foreground hover:bg-primary/80 mt-2 flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-black bg-[#bc95d4] px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
              Update Password
            </Submit>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};
