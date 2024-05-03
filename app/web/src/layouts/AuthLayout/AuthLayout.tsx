import DemoDialog from 'src/components/DemoDialog';
import Footer from 'src/components/Footer';
import UnAuthNav from 'src/components/Navigation/UnAuthNav';

type BaseLayoutProps = {
  children?: React.ReactNode;
};

const AuthLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <UnAuthNav />
      <div className="relative min-h-[calc(100vh-200px)] overflow-hidden p-4">
        <div className="-m-4 h-full overflow-hidden">
          <div className="z-8 pointer-events-none absolute left-1/2 top-1/2 h-[70vw] w-[100vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-secondary opacity-10" />
          <div className="mx-auto mb-20 max-w-6xl pt-10">
            <div className="mx-auto mb-20 max-w-6xl pt-10">
              <div className="mt-10 flex">
                <div className="relative mt-6 hidden max-w-xl flex-1 p-4 md:block">
                  <h1 className="mb-4 font-heading text-5xl font-black leading-tight tracking-[-0.02rem] lg:text-6xl">
                    Build Better User Journeys with{' '}
                    <span className="text-pink-400">Shepherd Pro</span>
                  </h1>
                  <p className="text-lg leading-tight">
                    By subscribing to Shepherd Pro you are learning more about
                    how to provide a better experience for your users&apos;
                    interactions.
                  </p>
                </div>
                <div className="z-9 flex flex-1 flex-col items-center">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DemoDialog />
      <Footer />
    </>
  );
};

export default AuthLayout;
