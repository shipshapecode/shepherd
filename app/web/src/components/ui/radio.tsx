import {
  Field as HeadlessField,
  Radio as HeadlessRadio,
  RadioGroup as HeadlessRadioGroup,
  type FieldProps as HeadlessFieldProps,
  type RadioGroupProps as HeadlessRadioGroupProps,
  type RadioProps as HeadlessRadioProps,
} from '@headlessui/react'
import { clsx } from 'clsx'

export function RadioGroup({ className, ...props }: HeadlessRadioGroupProps) {
  return (
    <HeadlessRadioGroup
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

export function RadioField({ className, ...props }: HeadlessFieldProps) {
  return (
    <HeadlessField
      data-slot="field"
      {...props}
      className={clsx(
        className,

        // Base layout
        'grid grid-cols-[1.125rem_1fr] items-center gap-x-4 gap-y-1 sm:grid-cols-[1rem_1fr]',

        // Control layout
        '[&>[data-slot=control]]:col-start-1 [&>[data-slot=control]]:row-start-1 [&>[data-slot=control]]:justify-self-center',

        // Label layout
        '[&>[data-slot=label]]:col-start-2 [&>[data-slot=label]]:row-start-1 [&>[data-slot=label]]:justify-self-start',

        // Description layout
        '[&>[data-slot=description]]:col-start-2 [&>[data-slot=description]]:row-start-2',

        // With description
        '[&_[data-slot=label]]:has-[[data-slot=description]]:font-medium'
      )}
    />
  )
}

let base = [
  // Basic layout
  'relative isolate flex size-[1.1875rem] shrink-0 rounded-full sm:size-[1.0625rem]',

  // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
  'before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-white before:shadow',

  // Background color when checked
  'before:group-data-[checked]:bg-[--radio-checked-bg]',

  // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
  'dark:before:hidden',

  // Background color applied to control in dark mode
  'dark:bg-white/5 dark:group-data-[checked]:bg-[--radio-checked-bg]',

  // Border
  'border border-zinc-950/15 group-data-[checked]:border-transparent group-data-[checked]:group-data-[hover]:border-transparent group-data-[hover]:border-zinc-950/30 group-data-[checked]:bg-[--radio-checked-border]',
  'dark:border-white/15 dark:group-data-[checked]:border-white/5 dark:group-data-[checked]:group-data-[hover]:border-white/5 dark:group-data-[hover]:border-white/30',

  // Inner highlight shadow
  'after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_1px_theme(colors.white/15%)]',
  'dark:after:-inset-px dark:after:hidden dark:after:rounded-full dark:group-data-[checked]:after:block',

  // Indicator color (light mode)
  '[--radio-indicator:transparent] group-data-[checked]:[--radio-indicator:var(--radio-checked-indicator)] group-data-[checked]:group-data-[hover]:[--radio-indicator:var(--radio-checked-indicator)] group-data-[hover]:[--radio-indicator:theme(colors.zinc.900/10%)]',

  // Indicator color (dark mode)
  'dark:group-data-[checked]:group-data-[hover]:[--radio-indicator:var(--radio-checked-indicator)] dark:group-data-[hover]:[--radio-indicator:theme(colors.zinc.700)]',

  // Focus ring
  'group-data-[focus]:outline group-data-[focus]:outline-2 group-data-[focus]:outline-offset-2 group-data-[focus]:outline-blue-500',

  // Disabled state
  'group-data-[disabled]:opacity-50',
  'group-data-[disabled]:border-zinc-950/25 group-data-[disabled]:bg-zinc-950/5 group-data-[disabled]:[--radio-checked-indicator:theme(colors.zinc.950/50%)] group-data-[disabled]:before:bg-transparent',
  'dark:group-data-[disabled]:border-white/20 dark:group-data-[disabled]:bg-white/[2.5%] dark:group-data-[disabled]:[--radio-checked-indicator:theme(colors.white/50%)] dark:group-data-[disabled]:group-data-[checked]:after:hidden',
]

let colors = {
  'dark/zinc': [
    '[--radio-checked-bg:theme(colors.zinc.900)] [--radio-checked-border:theme(colors.zinc.950/90%)] [--radio-checked-indicator:theme(colors.white)]',
    'dark:[--radio-checked-bg:theme(colors.zinc.600)]',
  ],
  'dark/white': [
    '[--radio-checked-bg:theme(colors.zinc.900)] [--radio-checked-border:theme(colors.zinc.950/90%)] [--radio-checked-indicator:theme(colors.white)]',
    'dark:[--radio-checked-bg:theme(colors.white)] dark:[--radio-checked-border:theme(colors.zinc.950/15%)] dark:[--radio-checked-indicator:theme(colors.zinc.900)]',
  ],
  white:
    '[--radio-checked-bg:theme(colors.white)] [--radio-checked-border:theme(colors.zinc.950/15%)] [--radio-checked-indicator:theme(colors.zinc.900)]',
  dark: '[--radio-checked-bg:theme(colors.zinc.900)] [--radio-checked-border:theme(colors.zinc.950/90%)] [--radio-checked-indicator:theme(colors.white)]',
  zinc: '[--radio-checked-indicator:theme(colors.white)] [--radio-checked-bg:theme(colors.zinc.600)] [--radio-checked-border:theme(colors.zinc.700/90%)]',
  red: '[--radio-checked-indicator:theme(colors.white)] [--radio-checked-bg:theme(colors.red.600)] [--radio-checked-border:theme(colors.red.700/90%)]',
  orange:
    '[--radio-checked-indicator:theme(colors.white)] [--radio-checked-bg:theme(colors.orange.500)] [--radio-checked-border:theme(colors.orange.600/90%)]',
  amber:
    '[--radio-checked-bg:theme(colors.amber.400)] [--radio-checked-border:theme(colors.amber.500/80%)] [--radio-checked-indicator:theme(colors.amber.950)]',
  yellow:
    '[--radio-checked-bg:theme(colors.yellow.300)] [--radio-checked-border:theme(colors.yellow.400/80%)] [--radio-checked-indicator:theme(colors.yellow.950)]',
  lime: '[--radio-checked-bg:theme(colors.lime.300)] [--radio-checked-border:theme(colors.lime.400/80%)] [--radio-checked-indicator:theme(colors.lime.950)]',
  green:
    '[--radio-checked-indicator:theme(colors.white)] [--radio-checked-bg:theme(colors.green.600)] [--radio-checked-border:theme(colors.green.700/90%)]',
  emerald:
    '[--radio-checked-indicator:theme(colors.white)] [--radio-checked-bg:theme(colors.emerald.600)] [--radio-checked-border:theme(colors.emerald.700/90%)]',
  teal: '[--radio-checked-indicator:theme(colors.white)] [--radio-checked-bg:theme(colors.teal.600)] [--radio-checked-border:theme(colors.teal.700/90%)]',
  cyan: '[--radio-checked-bg:theme(colors.cyan.300)] [--radio-checked-border:theme(colors.cyan.400/80%)] [--radio-checked-indicator:theme(colors.cyan.950)]',
  sky: '[--radio-checked-indicator:theme(colors.white)] [--radio-checked-bg:theme(colors.sky.500)] [--radio-checked-border:theme(colors.sky.600/80%)]',
  blue: '[--radio-checked-indicator:theme(colors.white)] [--radio-checked-bg:theme(colors.blue.600)] [--radio-checked-border:theme(colors.blue.700/90%)]',
  indigo:
    '[--radio-checked-indicator:theme(colors.white)] [--radio-checked-bg:theme(colors.indigo.500)] [--radio-checked-border:theme(colors.indigo.600/90%)]',
  violet:
    '[--radio-checked-indicator:theme(colors.white)] [--radio-checked-bg:theme(colors.violet.500)] [--radio-checked-border:theme(colors.violet.600/90%)]',
  purple:
    '[--radio-checked-indicator:theme(colors.white)] [--radio-checked-bg:theme(colors.purple.500)] [--radio-checked-border:theme(colors.purple.600/90%)]',
  fuchsia:
    '[--radio-checked-indicator:theme(colors.white)] [--radio-checked-bg:theme(colors.fuchsia.500)] [--radio-checked-border:theme(colors.fuchsia.600/90%)]',
  pink: '[--radio-checked-indicator:theme(colors.white)] [--radio-checked-bg:theme(colors.pink.500)] [--radio-checked-border:theme(colors.pink.600/90%)]',
  rose: '[--radio-checked-indicator:theme(colors.white)] [--radio-checked-bg:theme(colors.rose.500)] [--radio-checked-border:theme(colors.rose.600/90%)]',
}

type Color = keyof typeof colors

export function Radio({
  color = 'dark/zinc',
  className,
  ...props
}: { color?: Color; className?: string } & HeadlessRadioProps) {
  return (
    <HeadlessRadio data-slot="control" {...props} className={clsx(className, 'group inline-flex focus:outline-none')}>
      <span className={clsx([base, colors[color]])}>
        <span
          className={clsx(
            'size-full rounded-full border-[4.5px] border-transparent bg-[--radio-indicator] bg-clip-padding',

            // Forced colors mode
            'forced-colors:border-[Canvas] forced-colors:group-data-[checked]:border-[Highlight]'
          )}
        />
      </span>
    </HeadlessRadio>
  )
}
