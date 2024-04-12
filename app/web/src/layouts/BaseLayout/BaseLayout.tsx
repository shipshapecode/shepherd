import Navigation from 'src/components/Navigation';

type BaseLayoutProps = {
  children?: React.ReactNode;
};

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <Navigation />
      <div className="relative min-h-[calc(100vh-200px)] overflow-hidden p-4">
        <div className="-m-4 h-full overflow-hidden">
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[70vw] w-[100vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-secondary opacity-10" />
          <div className="mx-auto mb-20 max-w-6xl pt-10">{children}</div>
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
