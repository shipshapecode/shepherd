import {
  Field as HeadlessField,
  Switch as HeadlessSwitch,
  type FieldProps as HeadlessFieldProps,
  type SwitchProps as HeadlessSwitchProps,
} from '@headlessui/react'
import { clsx } from 'clsx'
import type React from 'react'

export function SwitchGroup({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      data-slot="control"
      {...props}
      className={clsx(
        className,

        // Basic groups
        'space-y-3 [&_[data-slot=label]]:font-normal',

        // With descriptions
        'has-[[data-slot=description]]:space-y-6 [&_[data-slot=label]]:has-[[data-slot=description]]:font-medium'
      )}
    />
  )
}

export function SwitchField({ className, ...props }: HeadlessFieldProps) {
  return (
    <HeadlessField
      data-slot="field"
      {...props}
      className={clsx(
        className,

        // Base layout
        'grid grid-cols-[1fr_auto] items-center gap-x-8 gap-y-1 sm:grid-cols-[1fr_auto]',

        // Control layout
        '[&>[data-slot=control]]:col-start-2 [&>[data-slot=control]]:self-center',

        // Label layout
        '[&>[data-slot=label]]:col-start-1 [&>[data-slot=label]]:row-start-1 [&>[data-slot=label]]:justify-self-start',

        // Description layout
        '[&>[data-slot=description]]:col-start-1 [&>[data-slot=description]]:row-start-2',

        // With description
        '[&_[data-slot=label]]:has-[[data-slot=description]]:font-medium'
      )}
    />
  )
}

let colors = {
  'dark/zinc': [
    '[--switch-bg-ring:theme(colors.zinc.950/90%)] [--switch-bg:theme(colors.zinc.900)] dark:[--switch-bg-ring:theme(colors.zinc.700/90%)] dark:[--switch-bg-ring:transparent] dark:[--switch-bg:theme(colors.white/25%)]',
    '[--switch-ring:theme(colors.zinc.950/90%)] [--switch-shadow:theme(colors.black/10%)] [--switch:white] dark:[--switch-ring:theme(colors.zinc.700/90%)]',
  ],
  'dark/white': [
    '[--switch-bg-ring:theme(colors.zinc.950/90%)] [--switch-bg:theme(colors.zinc.900)] dark:[--switch-bg-ring:transparent] dark:[--switch-bg:theme(colors.white)]',
    '[--switch-ring:theme(colors.zinc.950/90%)] [--switch-shadow:theme(colors.black/10%)] [--switch:white] dark:[--switch-ring:transparent] dark:[--switch:theme(colors.zinc.900)]',
  ],
  dark: [
    '[--switch-bg-ring:theme(colors.zinc.950/90%)] [--switch-bg:theme(colors.zinc.900)] dark:[--switch-bg-ring:theme(colors.white/15%)]',
    '[--switch-ring:theme(colors.zinc.950/90%)] [--switch-shadow:theme(colors.black/10%)] [--switch:white]',
  ],
  zinc: [
    '[--switch-bg-ring:theme(colors.zinc.700/90%)] [--switch-bg:theme(colors.zinc.600)] dark:[--switch-bg-ring:transparent]',
    '[--switch-shadow:theme(colors.black/10%)] [--switch:white] [--switch-ring:theme(colors.zinc.700/90%)]',
  ],
  white: [
    '[--switch-bg-ring:theme(colors.black/15%)] [--switch-bg:white] dark:[--switch-bg-ring:transparent]',
    '[--switch-shadow:theme(colors.black/10%)] [--switch-ring:transparent] [--switch:theme(colors.zinc.950)]',
  ],
  red: [
    '[--switch-bg-ring:theme(colors.red.700/90%)] [--switch-bg:theme(colors.red.600)] dark:[--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.red.700/90%)] [--switch-shadow:theme(colors.red.900/20%)]',
  ],
  orange: [
    '[--switch-bg-ring:theme(colors.orange.600/90%)] [--switch-bg:theme(colors.orange.500)] dark:[--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.orange.600/90%)] [--switch-shadow:theme(colors.orange.900/20%)]',
  ],
  amber: [
    '[--switch-bg-ring:theme(colors.amber.500/80%)] [--switch-bg:theme(colors.amber.400)] dark:[--switch-bg-ring:transparent]',
    '[--switch-ring:transparent] [--switch-shadow:transparent] [--switch:theme(colors.amber.950)]',
  ],
  yellow: [
    '[--switch-bg-ring:theme(colors.yellow.400/80%)] [--switch-bg:theme(colors.yellow.300)] dark:[--switch-bg-ring:transparent]',
    '[--switch-ring:transparent] [--switch-shadow:transparent] [--switch:theme(colors.yellow.950)]',
  ],
  lime: [
    '[--switch-bg-ring:theme(colors.lime.400/80%)] [--switch-bg:theme(colors.lime.300)] dark:[--switch-bg-ring:transparent]',
    '[--switch-ring:transparent] [--switch-shadow:transparent] [--switch:theme(colors.lime.950)]',
  ],
  green: [
    '[--switch-bg-ring:theme(colors.green.700/90%)] [--switch-bg:theme(colors.green.600)] dark:[--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.green.700/90%)] [--switch-shadow:theme(colors.green.900/20%)]',
  ],
  emerald: [
    '[--switch-bg-ring:theme(colors.emerald.600/90%)] [--switch-bg:theme(colors.emerald.500)] dark:[--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.emerald.600/90%)] [--switch-shadow:theme(colors.emerald.900/20%)]',
  ],
  teal: [
    '[--switch-bg-ring:theme(colors.teal.700/90%)] [--switch-bg:theme(colors.teal.600)] dark:[--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.teal.700/90%)] [--switch-shadow:theme(colors.teal.900/20%)]',
  ],
  cyan: [
    '[--switch-bg-ring:theme(colors.cyan.400/80%)] [--switch-bg:theme(colors.cyan.300)] dark:[--switch-bg-ring:transparent]',
    '[--switch-ring:transparent] [--switch-shadow:transparent] [--switch:theme(colors.cyan.950)]',
  ],
  sky: [
    '[--switch-bg-ring:theme(colors.sky.600/80%)] [--switch-bg:theme(colors.sky.500)] dark:[--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.sky.600/80%)] [--switch-shadow:theme(colors.sky.900/20%)]',
  ],
  blue: [
    '[--switch-bg-ring:theme(colors.blue.700/90%)] [--switch-bg:theme(colors.blue.600)] dark:[--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.blue.700/90%)] [--switch-shadow:theme(colors.blue.900/20%)]',
  ],
  indigo: [
    '[--switch-bg-ring:theme(colors.indigo.600/90%)] [--switch-bg:theme(colors.indigo.500)] dark:[--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.indigo.600/90%)] [--switch-shadow:theme(colors.indigo.900/20%)]',
  ],
  violet: [
    '[--switch-bg-ring:theme(colors.violet.600/90%)] [--switch-bg:theme(colors.violet.500)] dark:[--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.violet.600/90%)] [--switch-shadow:theme(colors.violet.900/20%)]',
  ],
  purple: [
    '[--switch-bg-ring:theme(colors.purple.600/90%)] [--switch-bg:theme(colors.purple.500)] dark:[--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.purple.600/90%)] [--switch-shadow:theme(colors.purple.900/20%)]',
  ],
  fuchsia: [
    '[--switch-bg-ring:theme(colors.fuchsia.600/90%)] [--switch-bg:theme(colors.fuchsia.500)] dark:[--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.fuchsia.600/90%)] [--switch-shadow:theme(colors.fuchsia.900/20%)]',
  ],
  pink: [
    '[--switch-bg-ring:theme(colors.pink.600/90%)] [--switch-bg:theme(colors.pink.500)] dark:[--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.pink.600/90%)] [--switch-shadow:theme(colors.pink.900/20%)]',
  ],
  rose: [
    '[--switch-bg-ring:theme(colors.rose.600/90%)] [--switch-bg:theme(colors.rose.500)] dark:[--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:theme(colors.rose.600/90%)] [--switch-shadow:theme(colors.rose.900/20%)]',
  ],
}

type Color = keyof typeof colors

export function Switch({
  color = 'dark/zinc',
  className,
  children,
  ...props
}: {
  color?: Color
  className?: string
  children?: React.ReactNode
} & Omit<HeadlessSwitchProps, 'children'>) {
  return (
    <HeadlessSwitch
      data-slot="control"
      className={clsx(
        className,

        // Base styles
        'group relative isolate inline-flex h-6 w-10 cursor-default rounded-full p-[3px] sm:h-5 sm:w-8',

        // Transitions
        'transition duration-0 ease-in-out data-[changing]:duration-200',

        // Outline and background color in forced-colors mode so switch is still visible
        'forced-colors:outline forced-colors:[--switch-bg:Highlight] dark:forced-colors:[--switch-bg:Highlight]',

        // Unchecked
        'bg-zinc-200 ring-1 ring-inset ring-black/5 dark:bg-white/5 dark:ring-white/15',

        // Checked
        'data-[checked]:bg-[--switch-bg] data-[checked]:ring-[--switch-bg-ring] dark:data-[checked]:bg-[--switch-bg] dark:data-[checked]:ring-[--switch-bg-ring]',

        // Focus
        'focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500',

        // Hover
        'data-[hover]:data-[checked]:ring-[--switch-bg-ring] data-[hover]:ring-black/15',
        'dark:data-[hover]:data-[checked]:ring-[--switch-bg-ring] dark:data-[hover]:ring-white/25',

        // Disabled
        'data-[disabled]:bg-zinc-200 data-[disabled]:data-[checked]:bg-zinc-200 data-[disabled]:opacity-50 data-[disabled]:data-[checked]:ring-black/5',
        'dark:data-[disabled]:bg-white/15 dark:data-[disabled]:data-[checked]:bg-white/15 dark:data-[disabled]:data-[checked]:ring-white/15',

        // Color specific styles
        colors[color]
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={clsx(
          // Basic layout
          'pointer-events-none relative inline-block size-[1.125rem] rounded-full sm:size-3.5',

          // Transition
          'translate-x-0 transition duration-200 ease-in-out',

          // Invisible border so the switch is still visible in forced-colors mode
          'border border-transparent',

          // Unchecked
          'bg-white shadow ring-1 ring-black/5',

          // Checked
          'group-data-[checked]:bg-[--switch] group-data-[checked]:shadow-[--switch-shadow] group-data-[checked]:ring-[--switch-ring]',
          'group-data-[checked]:translate-x-4 sm:group-data-[checked]:translate-x-3',

          // Disabled
          'group-data-[disabled]:group-data-[checked]:bg-white group-data-[disabled]:group-data-[checked]:shadow group-data-[disabled]:group-data-[checked]:ring-black/5'
        )}
      />
    </HeadlessSwitch>
  )
}
