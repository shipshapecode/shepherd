import Footer from 'src/components/Footer';
import Navigation from 'src/components/Navigation';
import Sidebar from 'src/components/Sidebar';

type DashboardLayoutProps = {
  children?: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <Navigation />
      <div className="relative min-h-[calc(100vh-400px)] overflow-hidden p-4">
        <div className="relative mx-auto flex w-full max-w-7xl flex-col lg:flex-row">
          <Sidebar />
          <div className="min-h-[75vh] min-w-0 flex-1 pb-20 pt-4 lg:border-l lg:pl-6 lg:pt-0">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardLayout;
