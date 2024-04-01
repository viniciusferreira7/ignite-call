import { cn } from '@/lib/utils'

interface MultiStepProps {
  size: number
  current: number
}

export function MultiStep({ size, current }: MultiStepProps) {
  return (
    <div>
      <p className="text--gray-300 mb-2 text-xs">
        Passo {current} de {size}
      </p>
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'h-1 w-full rounded bg-gray-600',
              current >= index + 1 && 'bg-white',
            )}
          />
        ))}
      </div>
    </div>
  )
}
