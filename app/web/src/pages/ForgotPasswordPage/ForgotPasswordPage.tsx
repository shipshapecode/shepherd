import { useEffect, useRef } from 'react';

import { Form, TextField, Submit, FieldError } from '@redwoodjs/forms';
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

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home());
    }
  }, [isAuthenticated]);

  const emailRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  const onSubmit = async (data: { email: string }) => {
    const response = await forgotPassword(data.email);

    if (response.error) {
      toast.error(response.error);
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        `A link to reset your password was sent to ${response.email}`
      );
      navigate(routes.signin());
    }
  };

  return (
    <>
      <Metadata title="Forgot Password" />

      <Toaster
        toastOptions={{
          className: 'rounded-none shadow-default border-2 border-black',
          duration: 6000,
        }}
      />
      <Card className="h-auto w-full max-w-sm lg:mt-14">
        <CardHeader>
          <CardTitle className="font-heading">{'Reset Password'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
            <div className="flex flex-col">
              <div className="mb-4">
                <label
                  className="mb-1 block text-sm font-bold text-gray-800"
                  htmlFor="email"
                >
                  Email
                </label>

                <TextField
                  name="email"
                  className="w-full rounded-lg border border-solid border-gray-300 p-[10px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
                  errorClassName="w-full rounded-lg border border-solid border-red-500 p-[10px] font-bold outline-none"
                  ref={emailRef}
                  validation={{
                    required: {
                      value: true,
                      message: 'Email is required',
                    },
                  }}
                />
                <FieldError
                  name="email"
                  className="pl-2 text-xs italic text-red-500"
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

export default ForgotPasswordPage;
