import { cn } from '#/shared/utils/cn'

interface AlertProps {
  type: 'success' | 'error' | 'info'
  message: string
  className?: string
}

export function Alert({ type, message, className }: AlertProps) {
  const variants = {
    success: 'bg-green-50 border-green-500 text-green-800',
    error: 'bg-red-50 border-red-500 text-red-800',
    info: 'bg-blue-50 border-blue-500 text-blue-800',
  }

  return (
    <div
      className={cn('border-l-4 p-4 rounded-r-lg', variants[type], className)}
    >
      {message}
    </div>
  )
}
