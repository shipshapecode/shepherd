import React from 'react';

import { DataInteractive as HeadlessDataInteractive } from '@headlessui/react';

import { Link as RedwoodLink, NavLink } from '@redwoodjs/router';

import { cn } from 'src/lib/utils';

export const Link = React.forwardRef(function Link(
  props: {
    to: string;
    className?: string;
    isNavLink?: boolean;
  } & React.ComponentPropsWithoutRef<'a'>,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  const { isNavLink, className } = props;
  const Component = isNavLink ? NavLink : RedwoodLink;
  return (
    <HeadlessDataInteractive>
      <Component
        {...props}
        ref={ref}
        className={cn(className, 'text-primary text-pink-600')}
      />
    </HeadlessDataInteractive>
  );
});
