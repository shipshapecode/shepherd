import Footer from 'src/components/Footer';
import { LogoLabel } from 'src/components/Logo/Logo';

type BaseLayoutProps = {
  children?: React.ReactNode;
};

const AuthLayout = ({ children }: BaseLayoutProps) => {
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
        </div>
      </div>
      <div className="relative min-h-[calc(100vh-200px)] overflow-hidden p-4">
        <div className="-m-4 h-full overflow-hidden">
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[70vw] w-[100vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-secondary opacity-10" />
          <div className="mx-auto mb-20 max-w-6xl pt-10">
            <div className="mx-auto mb-20 max-w-6xl pt-10">
              <div className="mt-10 flex">
                <div className="relative mt-6 hidden max-w-xl flex-1 p-4 md:block">
                  <h1 className="leading mb-4 font-heading text-5xl font-black tracking-[-0.02rem] lg:text-6xl">
                    Build Better User Journeys with{' '}
                    <span className="text-react">Shepherd Pro</span>
                  </h1>
                  <p className="text-lg leading-tight">
                    By subscribing to Shepherd Pro you are learning more about
                    how to provide a better experience for your users&apos;
                    interactions.
                  </p>
                </div>
                <div className="z-20 flex flex-1 flex-col items-center">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthLayout;
