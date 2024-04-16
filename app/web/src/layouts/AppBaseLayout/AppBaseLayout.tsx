import { Fragment, useEffect, useState } from 'react';
import { useShepherd } from 'react-shepherd';
import { offset } from '@floating-ui/dom';

import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import { useLocation } from '@redwoodjs/router';
import { Toaster } from '@redwoodjs/web/toast';

import { LogoLabel } from 'src/components/Logo/Logo';
import NavMenu from 'src/components/Navigation/NavMenu';

type AppBaseLayoutProps = {
  children?: React.ReactNode;
  title: string;
};

function waitForTargetElement(elementSelector, timeout = 200) {
  return new Promise((res) => {
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver((mut, self) => {
      const targetEl = document.querySelector(elementSelector);

      if (targetEl) {
        // give the nav a moment to open
        setTimeout(() => {
          // stop observing
          self.disconnect();

          return res(targetEl);
        }, timeout);
      }
    });

    // Start observing the target node for configured mutations
    /* eslint-disable-next-line ember/no-observers */
    observer.observe(document, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  });
}

const AppBaseLayout = ({ children, title }: AppBaseLayoutProps) => {
  const Shepherd = useShepherd();
  const { pathname, search, hash } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const hasCompletedIntroJourney = localStorage.getItem(
    'shepherdTour:introViewed'
  );

  useEffect(() => {
    if (hasCompletedIntroJourney) return;
    const tour = new Shepherd.Tour({
      id: 'hqmsgybtv4puot1hrvx3geo4',
      defaultStepOptions: {
        classes: 'border-2 border-navy',
      },
      useModalOverlay: true,
    });

    tour.addSteps([
      {
        text: 'Welcome to Shepherd Pro! Here you can get started with setting up your first tour.',
        buttons: [
          {
            action() {
              return this.cancel();
            },
            secondary: true,
            text: 'Exit',
          },
          {
            action() {
              return this.next();
            },
            text: 'Next',
          },
        ],
      },
      {
        text: `First you need to initialize Shepherd Pro with your API Key. <br>Click the pink icon to copy it.`,
        attachTo: {
          element: '.journey-intro-1',
          on: 'right',
        },
        floatingUIOptions: {
          middleware: [offset(24)],
        },
        advanceOn: {
          selector: '.copy-code-to-clipboard:first-of-type',
          event: 'click',
        },
      },
      {
        text: `Great! Now you need to use that in your application to initialize Shepherd with this key. If you have the library already installed, just add this bit with your key before creating a new tour instance.`,
        attachTo: {
          element: '.journey-intro-2',
          on: 'bottom',
        },
        buttons: [
          {
            action() {
              return this.next();
            },
            text: 'Next',
          },
        ],
      },
      {
        text: `You're going to need to give your tour instance an ID. If you've got an existing journey in your app, you just need to get an ID and apply it to the settings like shown here.`,
        attachTo: {
          element: '.journey-intro-3',
          on: 'bottom',
        },
        buttons: [
          {
            action() {
              return this.next();
            },
            text: 'Next',
          },
        ],
      },
      {
        text: `Let's go add a journey instance to our admin and take that to the next level with Shepherd Pro. Click the link to get started.`,
        attachTo: {
          element: 'a[href*="journeys"]',
          on: 'right',
        },
        advanceOn: {
          selector: 'a[href*="journeys"]',
          event: 'click',
        },
      },
      {
        text: `We just need to create the journey instance and then we can use that ID for our tour. Click the link to create a new journey.`,
        attachTo: {
          element: 'a[href*="journeys/new"]',
          on: 'bottom',
        },
        advanceOn: {
          selector: 'a[href*="journeys/new"]',
          event: 'click',
        },
        beforeShowPromise() {
          return waitForTargetElement('a[href*="journeys/new"]');
        },
        floatingUIOptions: {
          middleware: [offset(24)],
        },
      },
      {
        text: `Add a name and you can edit the ID, if you like. It just has to be unique to your account. Make sure you copy it, then click save to create the journey.`,
        attachTo: {
          element: '.journey-intro-new-id',
          on: 'bottom',
        },
        advanceOn: {
          selector: 'button[type="submit"]',
          event: 'click',
        },
        beforeShowPromise() {
          return waitForTargetElement('.journey-intro-new-id');
        },
      },
      {
        text: `Now you have what is needed to create a tour or connect an existing one to Shepherd Pro.`,
        buttons: [
          {
            action() {
              localStorage.setItem('shepherdTour:introViewed', 'true');
              return this.complete();
            },
            text: 'Finish',
          },
        ],
      },
    ]);

    if (!Shepherd.activeTour && pathname.includes('dashboard')) tour.start();
  });

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                    <div className="shepherd-nav flex h-16 shrink-0 items-center px-6">
                      <LogoLabel
                        label={
                          <span className="text-primary bg-pink-100 p-2 text-xs text-pink-400">
                            Pro
                          </span>
                        }
                      />
                    </div>
                    <NavMenu />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-black bg-white">
            <div className="shepherd-nav flex h-16 shrink-0 items-center px-6">
              <LogoLabel
                label={
                  <span className="text-primary bg-pink-100 p-2 text-xs text-pink-400">
                    Pro
                  </span>
                }
              />
            </div>
            <NavMenu />
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="text-md flex-1 pt-2 font-semibold leading-6 text-gray-900">
            {title}
          </div>
        </div>
        <Toaster
          toastOptions={{
            className: 'rounded-none shadow-default border-2 border-black',
            duration: 2000,
            style: {
              borderRadius: '0px',
            },
          }}
        />
        <main className="max-w-8xl py-10 selection:bg-cyan-50 lg:pl-72">
          <div className="mb-6 px-4 sm:px-6 lg:px-8">
            <div className="my-6">
              <h1 className="mb-2 hidden items-center gap-2 text-3xl font-black lg:flex">
                {title}
              </h1>
            </div>
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default AppBaseLayout;
