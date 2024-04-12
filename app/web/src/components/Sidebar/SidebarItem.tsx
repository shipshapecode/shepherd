import { Link, useLocation } from '@redwoodjs/router';

import { cn } from 'src/lib/utils';

const SidebarItem = ({
  href,
  label,
  matchSubPaths = false,
  icon = null,
  className,
}: // btnVariant = 'ghost',
{
  href: string;
  label: string;
  matchSubPaths?: boolean;
  icon?: React.ReactNode;
  className?: string;
  // btnVariant?: ButtonProps['variant'];
}) => {
  const { pathname } = useLocation();

  const isActive = matchSubPaths
    ? pathname.startsWith(href)
    : pathname === href;

  const btnClassName = cn(
    'flex items-center justify-between rounded-md border-2 border-navy bg-[#bc95d4] px-4 pt-1 pb-2 shadow-default transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none',

    {
      // '!bg-red-500 !text-white': isActive,
      'pl-4': !!icon,
      'hover:!bg-gray-100': !isActive,
    },
    className
  );

  return (
    <Link className={btnClassName} to={href}>
      {icon} <span className="pt-1">{label}</span>
    </Link>
  );
};

export default SidebarItem;
