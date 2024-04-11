'use client'

import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface MultiStepProps {
  size: number
  current: number
}

export function MultiStep({ size, current }: MultiStepProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <p className="text--gray-300 mb-2 text-xs">
        Passo {current} de {size}
      </p>
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, index) => {
          if (current === index + 1) {
            return (
              <Progress
                key={index}
                className={cn('h-1 w-full rounded bg-gray-600')}
                value={progress}
              />
            )
          }
          return (
            <div
              key={index}
              className={cn(
                'h-1 w-full rounded bg-gray-600',
                current >= index + 1 && 'bg-white',
              )}
            />
          )
        })}
      </div>
    </div>
  )
}
