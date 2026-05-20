import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '#/shared/utils/cn'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages: (number | 'dots')[] = []
  const delta = 1

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= page - delta && i <= page + delta)
    ) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== 'dots') {
      pages.push('dots')
    }
  }

  return (
    <nav className="flex items-center justify-center gap-1 mt-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={cn(
          'p-2 rounded-md transition-colors',
          page === 1
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-600 hover:bg-gray-100',
        )}
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {pages.map((p, i) =>
        p === 'dots' ? (
          <span key={`dots-${i}`} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(
              'min-w-[2.25rem] h-9 rounded-md text-sm font-medium transition-colors',
              p === page
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100',
            )}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={cn(
          'p-2 rounded-md transition-colors',
          page === totalPages
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-600 hover:bg-gray-100',
        )}
        aria-label="Página siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  )
}
