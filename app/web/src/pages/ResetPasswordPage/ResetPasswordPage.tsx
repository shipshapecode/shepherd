import { useEffect, useRef, useState } from 'react';

import { Form, PasswordField, Submit, FieldError } from '@redwoodjs/forms';
import { navigate, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';
import { toast, Toaster } from '@redwoodjs/web/toast';

import { useAuth } from 'src/auth';
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from 'src/components/Card/Card';

const ResetPasswordPage = ({ resetToken }: { resetToken: string }) => {
  const { isAuthenticated, reauthenticate, validateResetToken, resetPassword } =
    useAuth();
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home());
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const validateToken = async () => {
      const response = await validateResetToken(resetToken);
      if (response.error) {
        setEnabled(false);
        toast.error(response.error);
      } else {
        setEnabled(true);
      }
    };
    validateToken();
  }, [resetToken, validateResetToken]);

  const passwordRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    passwordRef.current?.focus();
  }, []);

  const onSubmit = async (data: Record<string, string>) => {
    const response = await resetPassword({
      resetToken,
      password: data.password,
    });

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success('Password changed!');
      await reauthenticate();
      navigate(routes.login());
    }
  };

  return (
    <>
      <Metadata title="Reset Password" />

      <Toaster
        toastOptions={{
          className: 'rounded-none shadow-default border-2 border-black',
          duration: 6000,
        }}
      />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-heading">{'Reset Password'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
            <div className="flex flex-col">
              <div className="mb-4">
                <label
                  className="mb-1 block text-sm font-bold text-gray-800"
                  htmlFor="password"
                >
                  New Password
                </label>
                <PasswordField
                  className="w-full rounded-lg border border-solid border-gray-300 p-[10px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
                  name="password"
                  errorClassName="w-full rounded-lg border border-solid border-red-500 p-[10px] font-bold outline-none"
                  validation={{ required: true }}
                  autoComplete="new-password"
                  disabled={!enabled}
                  ref={passwordRef}
                />
                <FieldError
                  className="pl-2 text-xs italic text-red-500"
                  name="password"
                />
              </div>
              <Submit className="bg-primary text-primary-foreground hover:bg-primary/80 mt-2 flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-black bg-[#bc95d4] px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                Submit
              </Submit>
            </div>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default ResetPasswordPage;
