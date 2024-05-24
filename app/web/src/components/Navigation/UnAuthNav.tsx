import { routes, Link } from '@redwoodjs/router';

import { LogoLabel } from 'src/components/Logo/Logo';

export default function UnAuthNav() {
  return (
    <div className="shepherd-nav bg-lila-500 sticky top-0 z-10 mx-auto w-full justify-center border-b border-black bg-white px-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-3">
        <LogoLabel
          label={
            <span className="text-primary bg-pink-100 p-2 text-xs text-pink-400">
              Pro
            </span>
          }
        />

        <label className="relative z-40 cursor-pointer px-3 py-6 md:hidden">
          <input className="peer hidden" type="checkbox" id="mobile-menu" />
          <div className="relative z-50 block h-[1px] w-7 bg-black bg-transparent content-[''] before:absolute before:top-[-0.35rem] before:z-50 before:block before:h-full before:w-full before:bg-black before:transition-all before:duration-200 before:ease-out before:content-[''] after:absolute after:bottom-[-0.35rem] after:right-0 after:block after:h-full after:w-full after:bg-black after:transition-all after:duration-200 after:ease-out after:content-[''] peer-checked:bg-transparent before:peer-checked:top-0 before:peer-checked:w-full before:peer-checked:rotate-45 before:peer-checked:transform after:peer-checked:bottom-0 after:peer-checked:w-full after:peer-checked:-rotate-45 after:peer-checked:transform"></div>
          <div className="fixed inset-0 z-40 hidden h-full w-full bg-black/50 backdrop-blur-sm peer-checked:block">
            &nbsp;
          </div>
          <div className="fixed right-0 top-0 z-40 h-full w-full translate-x-full overflow-y-auto overscroll-y-none transition duration-500 peer-checked:translate-x-0">
            <div className="float-right min-h-full w-[85%] bg-white px-6 pt-12 shadow-2xl">
              <menu>
                <li className="my-6">
                  <Link
                    to={routes.pricing()}
                    className="button w-full whitespace-nowrap border-2 border-navy bg-violet-300 p-4 text-navy"
                  >
                    Sign Up
                  </Link>
                </li>
                <li className="mb-6">
                  <Link
                    to={routes.signin()}
                    className="button w-full whitespace-nowrap border-2 border-navy bg-red-300 p-4 text-navy"
                  >
                    Sign In
                  </Link>
                </li>
                <li className="mb-6">
                  <Link
                    to={routes.pricing()}
                    className="button w-full whitespace-nowrap border-2 border-navy bg-white p-4 text-navy"
                  >
                    Pricing
                  </Link>
                </li>

                <li className="mb-6">
                  <button
                    className="button w-full whitespace-nowrap border-2 border-navy bg-white p-4 text-left text-navy"
                    onClick={() => {
                      const dialog = document.querySelector('dialog');
                      dialog?.showModal();
                    }}
                  >
                    Book a Demo
                  </button>
                </li>
                <li>
                  <a
                    className="button star w-full whitespace-nowrap border-2 border-navy bg-white p-4 text-navy"
                    href="https://github.com/shepherd-pro/shepherd"
                  >
                    ★ on Github
                  </a>
                </li>
                <li>
                  <a
                    className="button w-full whitespace-nowrap border-2 border-navy bg-white p-4 text-navy"
                    href="https://blog.shepherdpro.com"
                  >
                    Blog
                  </a>
                </li>
              </menu>
            </div>
          </div>
        </label>

        <div className="mt-1 hidden font-heading md:block">
          <div className="mb-4 inline-block bg-navy lg:mr-4">
            <a
              className="star w-full whitespace-nowrap border-none bg-white p-4"
              href="https://github.com/shepherd-pro/shepherd"
            >
              ★ on Github
            </a>
          </div>

          <div className="mb-4 inline-block bg-navy lg:mr-4">
            <a
              className="star w-full whitespace-nowrap border-none bg-white p-4"
              href="https://blog.shepherdpro.com"
            >
              Blog
            </a>
          </div>

          <div className="mb-4 inline-block bg-navy lg:mr-4">
            <button
              className="w-full whitespace-nowrap border-none bg-white p-4"
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
              to={routes.pricing()}
              className="w-full whitespace-nowrap border-none bg-white p-4"
            >
              Pricing
            </Link>
          </div>
          <div className="mb-4 inline-block bg-navy lg:mr-4">
            <Link
              to={routes.pricing()}
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
  );
}
