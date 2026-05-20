import { cn } from '#/shared/utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('bg-white rounded-xl shadow-md p-6', className)}>
      {children}
    </div>
  )
}
