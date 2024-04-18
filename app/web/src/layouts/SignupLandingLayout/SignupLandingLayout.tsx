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
      <div className="shepherd-nav bg-lila-500 sticky top-0 z-10 mx-auto w-full justify-center border-b border-black bg-white px-4">
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
      <main className="relative min-h-[calc(100vh-200px)] flex-grow overflow-hidden p-4">
        <div className="-z-1 pointer-events-none absolute left-1/2 top-1/3 h-[70vw] w-[100vw] -translate-x-1/2 -translate-y-3/4 bg-gradient-secondary opacity-10" />

        {children}
      </main>
      <DemoDialog />
      <Footer />
    </>
  );
};

export default SignupLandingLayout;
