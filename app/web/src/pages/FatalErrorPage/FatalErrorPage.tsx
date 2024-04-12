import { Link, routes } from '@redwoodjs/router';
import { DevFatalErrorPage } from '@redwoodjs/web/dist/components/DevFatalErrorPage';

export default DevFatalErrorPage ||
  (() => (
    <div className="min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-pink-600 sm:text-5xl">
            🤦‍♂️ Oops.
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-black sm:pl-6">
              <h1 className="font-heading text-4xl tracking-tight text-gray-900 sm:text-5xl">
                Something went wrong
              </h1>
              <p className="mt-1 text-base text-gray-500">
                Sorry about that. Please contact support for help.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link
                to={routes.home()}
                className="bg-primary text-primary-foreground hover:bg-primary/80 inline-flex h-12 cursor-pointer items-center rounded-md border-2 border-navy bg-violet-300 px-8 py-2 font-bold shadow-default transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
              >
                Home
              </Link>
              <a
                href="mailto:hello@shepherdpro.com"
                className="bg-primary text-primary-foreground hover:bg-primary/80 inline-flex h-12 cursor-pointer items-center rounded-md border-2 border-navy bg-pink-300 px-8 py-2 font-bold shadow-default transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
              >
                Contact Support
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  ));
