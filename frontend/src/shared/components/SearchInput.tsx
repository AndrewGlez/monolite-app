import { useState, useCallback } from 'react'
import type { ChangeEvent } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '#/shared/utils/cn'
import { useDebouncedCallback } from '#/shared/hooks/useDebounce'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Buscar...',
  className,
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value)

  const debouncedOnChange = useDebouncedCallback(
    useCallback(
      (term: string) => onChange(term),
      [onChange],
    ),
    300,
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value)
    debouncedOnChange(e.target.value)
  }

  const handleClear = () => {
    setLocalValue('')
    onChange('')
  }

  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-9 pr-9 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Limpiar búsqueda"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
