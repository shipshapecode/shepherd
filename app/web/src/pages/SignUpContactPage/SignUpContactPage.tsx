import { useEffect, useRef } from 'react';

import { Metadata } from '@redwoodjs/web';
import { Toaster } from '@redwoodjs/web/toast';

import { cn } from 'src/lib/utils';

const Benefits = ({
  description,
  imageClass,
  imageSrc,
  title,
  reverse = false,
}: {
  description: string;
  imageClass?: string;
  imageSrc: string;
  title: string;
  reverse?: boolean;
}) => {
  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-2">
      <div
        className={cn(
          'w-full',
          reverse && 'col-start-2',
          !reverse && 'flex items-baseline justify-center'
        )}
      >
        <img className={imageClass} src={imageSrc} alt="" role="presentation" />
      </div>
      <div
        className={cn('h-72 bg-white p-6 text-left', reverse && 'row-start-1')}
      >
        <h3 className="w-full p-2 font-heading text-2xl uppercase">{title}</h3>

        <p className="p-2 font-body text-xl">{description}</p>
      </div>
    </div>
  );
};

const SignupPageContact = () => {
  // focus on email box on page load
  const emailRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <>
      <Metadata title="Signup for future launch" />

      <Toaster
        toastOptions={{
          className: 'rounded-none shadow-default border-2 border-black',
          duration: 2000,
          style: {
            borderRadius: '0px',
          },
        }}
      />

      <section className="relative my-8 flex w-full items-center">
        <div className="mx-auto 2xl:max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-full items-center gap-12 p-8 lg:inline-flex lg:px-20">
              <div className="mx-auto max-w-xl text-center lg:text-left">
                <h1 className="mb-4 font-heading text-5xl font-black leading-tight tracking-[-0.02rem] lg:text-6xl">
                  Build Better User Journeys with{' '}
                  <span className="text-pink-400">Shepherd Pro</span>
                </h1>
                <div className="mt-4 max-w-md">
                  <p className="tracking-wide text-black xl:text-xl">
                    Based on the popular open source library, Pro allows you to
                    make your experiences data driven and ensures you guide your
                    users to that moment of a-ha! in your application.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-full w-full items-center gap-12 p-8 lg:mt-0">
              <img
                className="border-2 border-navy shadow-default"
                src="img/screen-journeys.png"
                alt="#"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mb-20 flex w-full justify-center">
        <div className="w-full text-center">
          <div className="mb-12 mt-12">
            <section className="mt-4">
              <h3 className="font-heading text-3xl uppercase">
                Brands that use Shepherd
              </h3>
              <div className="mx-auto overflow-hidden border-b-2 border-navy bg-white p-6 px-8 lg:px-20 2xl:px-0">
                <div className="flex items-center justify-center gap-4 whitespace-nowrap py-12">
                  <img className="mr-8 w-16" src="users/ally.svg" alt="logo" />
                  <img
                    className="mr-8 w-32"
                    src="users/bonsai.png"
                    alt="logo"
                  />
                  <img
                    className="mr-8 w-40"
                    src="users/browserless.svg"
                    alt="logo"
                  />
                  <img
                    className="mr-8 w-36"
                    src="users/codepen.svg"
                    alt="logo"
                  />
                  <img className="w-24" src="users/google.svg" alt="logo" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="mt-8 flex w-full justify-center">
        <div className="flex w-full max-w-6xl flex-wrap p-4">
          <Benefits
            description="Shepherd has full keyboard navigation support, focus trapping, and a11y compliance via aria attributes."
            imageSrc="img/accessibility.svg"
            title="Analytics"
          />
          <Benefits
            description="Shepherd's styles are kept minimal, allowing you to
                        easily customize the look and feel, but still give you
                        enough to drop in and be ready to go quickly."
            imageSrc="img/customizable.svg"
            title="Highly Customizable"
            reverse={true}
          />
          <Benefits
            description="Shepherd is ready to drop into your application using React, Ember, Angular, Vue.js, ES Modules, or plain
                        Javascript!"
            imageSrc="img/framework.svg"
            title="Framework Ready"
          />
        </div>
      </div>
    </>
  );
};

export default SignupPageContact;
