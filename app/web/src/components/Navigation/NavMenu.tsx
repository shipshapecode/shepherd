import {
  HomeIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

import { routes, NavLink } from '@redwoodjs/router';

import { cn } from 'src/lib/utils';

import UserMenu from './UserMenu';

export default function NavMenu() {
  return (
    <nav className="flex flex-1 flex-col">
      <ul className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul className="-mx-2 space-y-1">
            <li>
              <NavLink
                to={routes.home()}
                activeClassName="bg-violet-50 text-violet-700"
                className={cn(
                  ' hover:bg-violet-50 hover:text-violet-600',
                  'group flex gap-x-3 rounded-md p-2 px-6 text-sm font-semibold leading-6'
                )}
                matchSubPaths
              >
                <HomeIcon
                  className={cn(
                    ' group-hover:text-violet-600',
                    'h-6 w-6 shrink-0'
                  )}
                  aria-hidden="true"
                />
                <span className="pt-1">{'Getting Started'}</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={routes.actors()}
                activeClassName="bg-violet-50 text-violet-600"
                className={cn(
                  ' hover:bg-violet-50 hover:text-violet-600',
                  'group flex gap-x-3 rounded-md p-2 px-6 text-sm font-semibold leading-6'
                )}
                matchSubPaths
              >
                <UserIcon
                  className={cn(
                    ' group-hover:text-violet-600',
                    'h-6 w-6 shrink-0'
                  )}
                  aria-hidden="true"
                />
                <span className="pt-1">{'Users'}</span>
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to={routes.groups()}
                activeClassName="bg-violet-50 text-violet-700"
                className={cn(
                  ' hover:bg-violet-50 hover:text-violet-600',
                  'group flex gap-x-3 rounded-md p-2 px-6 text-sm font-semibold leading-6'
                )}
                matchSubPaths
              >
                <UserGroupIcon
                  className={cn(
                    'group-hover:text-violet-600',
                    'h-6 w-6 shrink-0'
                  )}
                  aria-hidden="true"
                />
                <span className="pt-1">{'Groups'}</span>
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to={routes.journeys()}
                activeClassName="bg-violet-50 text-violet-700"
                className={cn(
                  ' hover:bg-violet-50 hover:text-violet-600',
                  'group flex gap-x-3 rounded-md p-2 px-6 text-sm font-semibold leading-6'
                )}
                matchSubPaths
              >
                <RocketLaunchIcon
                  className={cn(
                    'group-hover:text-violet-600',
                    'h-6 w-6 shrink-0'
                  )}
                  aria-hidden="true"
                />
                <span className="pt-1">{'Journeys'}</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={routes.integrations()}
                activeClassName="bg-violet-50 text-violet-700"
                className={cn(
                  ' hover:bg-violet-50 hover:text-violet-600',
                  'group flex gap-x-3 rounded-md p-2 px-6 text-sm font-semibold leading-6'
                )}
                matchSubPaths
              >
                <PuzzlePieceIcon
                  className={cn(
                    'group-hover:text-violet-600',
                    'h-6 w-6 shrink-0'
                  )}
                  aria-hidden="true"
                />
                <span className="pt-1">{'Integrations'}</span>
              </NavLink>
            </li>
          </ul>
        </li>
        {/* <li>
          <div className="text-xs font-semibold leading-6 text-gray-400">
            Your teams
          </div>
          <ul className="-mx-2 mt-2 space-y-1">
            {teams.map((team) => (
              <li key={team.name}>
                <a
                  href={team.href}
                  className={cn(
                    team.current
                      ? 'bg-gray-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                  )}
                >
                  <span
                    className={cn(
                      team.current
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium'
                    )}
                  >
                    {team.initial}
                  </span>
                  <span className="truncate">{team.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </li> */}
        <li className="mb-2 mt-auto">
          <UserMenu />
        </li>
      </ul>
    </nav>
  );
}
