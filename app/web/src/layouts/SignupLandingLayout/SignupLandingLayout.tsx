import { Link, routes } from '@redwoodjs/router';

import DemoDialog from 'src/components/DemoDialog';
import Footer from 'src/components/Footer';
import { LogoLabel } from 'src/components/Logo/Logo';

type BaseLayoutProps = {
  children?: React.ReactNode;
};

const SignupLandingLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <div className="shepherd-nav relative top-0 border-b border-navy bg-white px-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between py-3">
          <LogoLabel
            label={
              <span className="text-primary bg-pink-100 p-2 text-xs text-pink-400">
                Pro
              </span>
            }
          />
          <div className="mt-1 font-heading">
            <div className="mb-4 inline-block bg-navy lg:mr-4">
              <a
                className="button star w-full whitespace-nowrap border-2 border-navy bg-white p-4 text-navy"
                href="https://github.com/shepherd-pro/shepherd"
              >
                ★ on Github
              </a>
            </div>

            <div className="mb-4 inline-block bg-navy lg:mr-4">
              <button
                className="button w-full whitespace-nowrap border-2 border-navy bg-white p-4 text-navy"
                onClick={() => {
                  const dialog = document.querySelector('dialog');
                  dialog?.showModal();
                }}
              >
                Book a Demo
              </button>
            </div>
            <div className="mb-4 inline-block bg-navy lg:mr-4">
              <Link
                to={routes.signup()}
                className="button w-full whitespace-nowrap border-2 border-navy bg-violet-300 p-4 text-navy"
              >
                Sign Up
              </Link>
            </div>
            <div className="mb-4 inline-block bg-navy">
              <Link
                to={routes.signin()}
                className="button w-full whitespace-nowrap border-2 border-navy bg-red-300 p-4 text-navy"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
      <main className="relative min-h-[calc(100vh-200px)] overflow-hidden p-4">
        <div className="pointer-events-none absolute left-1/2 top-1/3 z-10 h-[70vw] w-[100vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-secondary opacity-10" />

        <div className="bg-grey-light flex w-full flex-col items-center justify-center font-heading">
          {children}
        </div>

        <div className="mb-20 flex w-full justify-center">
          <div className="w-full max-w-3xl text-center">
            <div className="mb-12 mt-8">
              <h3 className="font-heading text-3xl uppercase">
                Brands that use Shepherd
              </h3>

              <div className="flex w-full flex-wrap justify-center">
                <div className="relative m-4 flex h-32 w-32 items-center justify-center md:h-48 md:w-48 lg:h-56 lg:w-56">
                  <div className="z-10 flex h-full w-full items-center justify-center border-2 border-navy bg-white p-6 shadow-default md:p-12">
                    <img
                      className="h-auto w-full"
                      src="users/ally.svg"
                      alt=""
                      role="presentation"
                    />
                  </div>
                </div>

                <div className="relative m-4 flex h-32 w-32 items-center justify-center md:h-48 md:w-48 lg:h-56 lg:w-56">
                  <div className="z-10 flex h-full w-full items-center justify-center border-2 border-navy bg-white p-4 shadow-default md:p-8">
                    <img
                      className="h-auto w-full"
                      src="users/google.svg"
                      alt=""
                      role="presentation"
                    />
                  </div>
                </div>

                <div className="relative m-4 flex h-32 w-32 items-center justify-center md:h-48 md:w-48 lg:h-56 lg:w-56">
                  <div className="z-10 flex h-full w-full items-center justify-center border-2 border-navy bg-white p-4 shadow-default md:p-8">
                    <img
                      className="h-auto w-full"
                      src="users/bonsai.png"
                      alt=""
                      role="presentation"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <DemoDialog />
      <Footer />
    </>
  );
};

export default SignupLandingLayout;
