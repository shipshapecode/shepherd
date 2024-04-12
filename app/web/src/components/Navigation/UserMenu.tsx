import { DocumentDuplicateIcon, PowerIcon, CogIcon, UserIcon } from '@heroicons/react/24/solid';

import { NavLink, routes } from '@redwoodjs/router';

import { useAuth } from 'src/auth';

export default function UserMenu() {
  const { currentUser, logOut } = useAuth();

  return (
    <ul className="space-y-1">
      <li>
        <a
          href='https://shepherdjs.dev/docs'
          target='_blank'
          className="group flex w-full gap-x-3 rounded-md p-2 px-6 text-sm font-semibold leading-6 hover:bg-violet-50 hover:text-violet-600"
        >
          <DocumentDuplicateIcon className="h-6 w-6 group-hover:text-violet-600" />{' '}
          <span className="pt-1">Documentation</span>
        </a>
      </li>
      <li>
        <NavLink
          activeClassName="bg-violet-50 text-violet-700"
          to={routes.account()}
          className="group flex w-full gap-x-3 rounded-md p-2 px-6 text-sm font-semibold leading-6 hover:bg-violet-50 hover:text-violet-600"
        >
          <CogIcon className="h-6 w-6 group-hover:text-violet-600" />{' '}
          <span className="pt-1">Settings</span>
        </NavLink>
      </li>
      <li>
        <button
          onClick={logOut}
          className="group flex w-full gap-x-3 rounded-md p-2 px-6 text-sm font-semibold leading-6 hover:bg-violet-50 hover:text-violet-600"
        >
          <PowerIcon
            className="h-6 w-6 shrink-0 group-hover:text-violet-600"
            aria-hidden="true"
          />
          <span className="pt-1">Logout</span>
        </button>
      </li>
      <li>
        <div className="group flex w-full gap-x-3 rounded-md p-2 px-6 text-sm font-semibold leading-6">
          <UserIcon className="h-6 w-6" />{' '}
          <span className="pt-1">{currentUser?.email}</span>
        </div>
      </li>
    </ul>
  );
}
