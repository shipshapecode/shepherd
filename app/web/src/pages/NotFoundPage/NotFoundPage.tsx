import { Link, routes } from '@redwoodjs/router';

export default () => (
  <section>
    <div className="mx-auto grid w-full items-center border-black bg-pink-500 p-8 lg:p-20 2xl:max-w-7xl 2xl:border-x-2">
      <div className="mx-auto max-w-3xl text-center lg:py-32">
        <p className="mx-auto max-w-4xl font-heading text-3xl text-black lg:text-5xl">
          404 - Page Not Found
        </p>
        <p className="mt-4 max-w-lg tracking-wide text-black xl:text-xl">
          Oops! The page you are looking for cannot be found. It may have been
          moved, deleted, or never existed. Please check the URL or navigate
          back to our homepage. If you continue to encounter this issue, feel
          free to contact our support team for assistance.
        </p>
        <div className="mt-8">
          <Link
            to={routes.home()}
            className="bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer border-2 border-navy bg-violet-300 p-4 font-bold shadow-default transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  </section>
);
