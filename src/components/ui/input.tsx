import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputRootProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  prefix?: string
  children: React.ReactNode
}

const InputRoot = React.forwardRef<HTMLElement, InputRootProps>(
  ({ className, as: Comp = 'div', prefix, children, ...props }, ref) => {
    return (
      <Comp
        className={cn(
          'flex rounded-md border-2 border-sky-800 bg-gray-800 p-2 duration-150 focus-within:border-sky-400',
          className,
        )}
        {...props}
        ref={ref}
      >
        {prefix && <span className="text-gray-400">{prefix}</span>}
        {children}
      </Comp>
    )
  },
)

InputRoot.displayName = 'InputRoot'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Control = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn('bg-transparent outline-none', className)}
        ref={ref}
        {...props}
      />
    )
  },
)

Control.displayName = 'Control'

export { Control, InputRoot }
