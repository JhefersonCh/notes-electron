import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const RootLayout = ({ className, children, ...props }: ComponentProps<'div'>) => {
  return (
    <main className={twMerge('flex flex-row h-screen', className)} {...props}>
      {children}
    </main>
  )
}

export const SideBar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside className={twMerge('w-[250px] h-[100vh + 10px] overflow-auto', className)} {...props}>
      {children}
    </aside>
  )
}

// export const Content = ({ className, children, ...props }: ComponentProps<'main'>) => {
//   return (
//     <main className={twMerge('flex-1 overflow-auto', className)} {...props}>
//       {children}
//     </main>
//   )
// }

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, children, ...props }, ref) => (
    <main ref={ref} className={twMerge('flex-1 overflow-auto', className)} {...props}>
      {children}
    </main>
  )
)

Content.displayName = 'Content'
