import {
  // Squares2X2Icon,
  HomeModernIcon,
  // RocketLaunchIcon,
  // UsersIcon,
  // Cog8ToothIcon,
  // CreditCardIcon,
  // SparklesIcon,
} from '@heroicons/react/24/outline';

import { routes } from '@redwoodjs/router';

// import { cn } from 'src/lib/utils';

import SidebarItem from './SidebarItem';

const Sidebar = () => {
  return (
    // <div className="lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    //   <div className="overflow-y-aut bg-whitepx-6 flex grow flex-col gap-y-5">
    //     <nav className="flex flex-1 flex-col">
    //       <ul className="flex flex-1 flex-col gap-y-7">
    //         <li>
    //           <ul className="-mx-2 space-y-1">
    //             <li className="flex flex-wrap gap-2 lg:sticky lg:top-4 lg:flex-col lg:pr-4">
    //               <SidebarItem
    //                 icon={<HomeModernIcon />}
    //                 href={routes.home()}
    //                 label="Dashboard"
    //               />
    //             </li>
    //             <li className="flex flex-wrap gap-2 lg:sticky lg:top-4 lg:flex-col lg:pr-4">
    //               <SidebarItem
    //                 icon={<RocketLaunchIcon />}
    //                 href={routes.journeys()}
    //                 label="Journeys"
    //               />
    //             </li>
    //             {/* <li>
    //               <a
    //                 href="#"
    //                 className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
    //               >
    //                 <svg
    //                   className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   strokeWidth="1.5"
    //                   stroke="currentColor"
    //                   aria-hidden="true"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
    //                   />
    //                 </svg>
    //                 Projects
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="#"
    //                 className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
    //               >
    //                 <svg
    //                   className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   strokeWidth="1.5"
    //                   stroke="currentColor"
    //                   aria-hidden="true"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
    //                   />
    //                 </svg>
    //                 Calendar
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="#"
    //                 className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
    //               >
    //                 <svg
    //                   className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   strokeWidth="1.5"
    //                   stroke="currentColor"
    //                   aria-hidden="true"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
    //                   />
    //                 </svg>
    //                 Documents
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="#"
    //                 className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
    //               >
    //                 <svg
    //                   className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   strokeWidth="1.5"
    //                   stroke="currentColor"
    //                   aria-hidden="true"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
    //                   />
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
    //                   />
    //                 </svg>
    //                 Reports
    //               </a>
    //             </li> */}
    //           </ul>
    //         </li>
    //         {/* <li>
    //           <div className="text-xs font-semibold leading-6 text-indigo-200">
    //             Your teams
    //           </div>
    //           <ul role="list" className="-mx-2 mt-2 space-y-1">
    //             <li>
    //               <a
    //                 href="#"
    //                 className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
    //               >
    //                 <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
    //                   H
    //                 </span>
    //                 <span className="truncate">Heroicons</span>
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="#"
    //                 className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
    //               >
    //                 <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
    //                   T
    //                 </span>
    //                 <span className="truncate">Tailwind Labs</span>
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="#"
    //                 className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
    //               >
    //                 <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
    //                   W
    //                 </span>
    //                 <span className="truncate">Workcation</span>
    //               </a>
    //             </li>
    //           </ul>
    //         </li> */}
    //       </ul>
    //     </nav>
    //   </div>
    // </div>
    // <div className="relative shrink-0">
    //   <div className="flex flex-wrap gap-2 lg:sticky lg:top-4 lg:flex-col lg:pr-4">
    //     <SidebarItem
    //       icon={<HomeModernIcon />}
    //       href={routes.home()}
    //       label="Dashboard"
    //     />
    //     {/* <SidebarItem
    //       icon={<RocketLaunchIcon />}
    //       href={routes.journeys()}
    //       label="Journeys"
    //     /> */}
    //     {/* <SidebarItem icon={<Cog8ToothIcon />} href="/account" label="Account" /> */}
    //   </div>
    // </div>
    <section className="">
      <ul className="flex flex-col">
        <li className="flex flex-wrap gap-2 lg:sticky lg:top-4 lg:flex-col lg:pr-4">
          <SidebarItem
            icon={<HomeModernIcon />}
            href={routes.home()}
            label="Dashboard"
          />
        </li>
        {/* <li className="flex flex-wrap gap-2 lg:sticky lg:top-4 lg:flex-col lg:pr-4">
          <SidebarItem
            icon={<RocketLaunchIcon />}
            href={routes.journeys()}
            label="Journeys"
          />
        </li> */}
      </ul>
    </section>
  );
};

export default Sidebar;
