import DemoDialog from 'src/components/DemoDialog';
import Footer from 'src/components/Footer';
import UnAuthNav from 'src/components/Navigation/UnAuthNav';

type BaseLayoutProps = {
  children?: React.ReactNode;
};

const SignupLandingLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <UnAuthNav />
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
