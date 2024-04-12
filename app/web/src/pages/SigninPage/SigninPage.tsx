import { useEffect, useRef } from 'react';

import { ArrowLongRightIcon } from '@heroicons/react/24/outline';

import {
  FieldError,
  Form,
  PasswordField,
  TextField,
  Submit,
} from '@redwoodjs/forms';
import { Link, navigate, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';
import { toast, Toaster } from '@redwoodjs/web/toast';

import { useAuth } from 'src/auth';
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from 'src/components/Card/Card';

interface FormValues {
  email: string;
  password: string;
}

const WELCOME_MESSAGE = 'Welcome!';

const SigninPage = () => {
  const { isAuthenticated, loading, logIn } = useAuth();
  // should redirect right after login or wait to show the webAuthn prompts?
  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home());
    }
  }, [isAuthenticated]);

  // focus on the email field as soon as the page loads
  const emailRef = useRef<HTMLInputElement>();
  useEffect(() => {
    emailRef.current && emailRef.current.focus();
  }, []);

  const onSubmit = async (data: FormValues) => {
    const response = await logIn({
      username: data.email,
      password: data.password,
    });

    if (response.message) {
      // auth details good, but user not logged in
      toast(response.message);
    } else if (response.error) {
      // error while authenticating
      toast.error(response.error);
    } else {
      toast.success(WELCOME_MESSAGE);
    }
  };

  const PasswordForm = () => (
    <Form onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
      <div className="flex flex-col">
        <div className="mb-2">
          <label
            className="mb-1 block text-sm font-bold text-gray-800"
            htmlFor="email"
          >
            Email
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
        <div className="mb-4">
          <label
            className="mb-1 block text-sm font-bold text-gray-800"
            htmlFor="password"
          >
            Password
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
          <div className="text-light mt-2 text-sm">
            Having trouble signing in?{' '}
            <Link
              to={routes.forgotPassword()}
              className="text-primary hover:underline"
            >
              Reset your password
            </Link>
            .
            {/* or{' '}
                        <Link
                          to="/signin/magic-link"
                          className="text-primary hover:underline"
                        >
                          get a magic link
                        </Link>
                        . */}
          </div>
        </div>
        <Submit className="bg-primary text-primary-foreground hover:bg-primary/80 mt-2 flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-black bg-[#bc95d4] px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
          Sign in
        </Submit>
      </div>
    </Form>
  );

  const formToRender = () => {
    return <PasswordForm />;
  };

  const linkToRender = () => {
    return (
      <div className="text-muted-foreground flex cursor-pointer items-center space-x-1 text-sm font-bold hover:text-slate-800">
        <span>Don&apos;t have an account?</span>{' '}
        <ArrowLongRightIcon className="h-4 w-4" />
        <Link to={routes.signup()} className="text-primary">
          Sign up!
        </Link>
      </div>
    );
  };

  if (loading) {
    return null;
  }

  return (
    <>
      <Metadata title="Signin" description="Signin page" />
      <Toaster
        toastOptions={{
          className: 'rounded-none shadow-default border-2 border-black',
          duration: 6000,
        }}
      />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-heading">{'Sign In'}</CardTitle>
        </CardHeader>
        <CardContent>{formToRender()}</CardContent>
      </Card>
      <div className="mt-5 flex flex-col space-y-2">{linkToRender()}</div>
    </>
  );
};

export default SigninPage;
