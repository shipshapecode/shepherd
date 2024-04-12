import { useRef } from 'react';
import { useEffect } from 'react';

import {
  Form,
  TextField,
  PasswordField,
  FieldError,
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

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home());
    }
  }, [isAuthenticated]);

  // focus on email box on page load
  const emailRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const onSubmit = async (data: Record<string, string>) => {
    const response = await signUp({
      username: data.email,
      password: data.password,
    });

    if (response.message) {
      toast(response.message);
    } else if (response.error) {
      toast.error(response.error);
    } else {
      // user is signed in automatically
      toast.success('Welcome!');
    }
  };

  return (
    <>
      <Metadata title="Signup" />

      <Toaster
        toastOptions={{
          className: 'rounded-none shadow-default border-2 border-black',
          duration: 6000,
        }}
      />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-heading">{'Sign Up'}</CardTitle>
        </CardHeader>
        <CardContent>
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
              </div>
              <Submit className="bg-primary text-primary-foreground hover:bg-primary/80 mt-2 flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-black bg-[#bc95d4] px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                Sign Up
              </Submit>
            </div>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground mt-8 space-x-1 text-sm font-bold hover:text-slate-800">
        <span>Already have an account?</span>{' '}
        <Link to={routes.signin()} className="text-primary">
          Log in!
        </Link>
      </div>
    </>
  );
};

export default SignupPage;
