'use client'

import { Calendar } from '@/components/calendar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import dayjs from 'dayjs'
import { useState } from 'react'

export function CalendarStep() {
  const [animationParent] = useAutoAnimate()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const dayWithMonth = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  return (
    <div
      ref={animationParent}
      className={cn(
        'relative mx-auto mt-6 grid w-[540px] max-w-full grid-cols-1 rounded-md bg-gray-800',
        isDateSelected && 'w-full grid-cols-1 lg:grid-cols-[1fr_300px]',
      )}
    >
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
      {isDateSelected && (
        <div className="bottom-0 right-0 top-0 w-[300px] overflow-y-scroll border-l border-gray-600 px-6 pt-6 scrollbar scrollbar-track-gray-800 scrollbar-thumb-gray-700 lg:absolute">
          <h1 className="mt-2 text-lg font-medium">
            {weekDay} <span className="text-gray-400">{dayWithMonth}</span>
          </h1>
          <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-1">
            <Button
              disabled
              variant="outline"
              className="cursor-pointer rounded-sm border-0 bg-gray-600 p-0 pt-2 text-sm text-gray-100 last:mb-6 hover:bg-gray-500 disabled:cursor-default disabled:bg-none disabled:opacity-40"
            >
              00:00h
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer rounded-sm border-0 bg-gray-600 p-0 pt-2 text-sm text-gray-100 last:mb-6 hover:bg-gray-500 disabled:cursor-default disabled:bg-none disabled:opacity-40"
            >
              01:00h
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer rounded-sm border-0 bg-gray-600 p-0 pt-2 text-sm text-gray-100 last:mb-6 hover:bg-gray-500 disabled:cursor-default disabled:bg-none disabled:opacity-40"
            >
              02:00h
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer rounded-sm border-0 bg-gray-600 p-0 pt-2 text-sm text-gray-100 last:mb-6 hover:bg-gray-500 disabled:cursor-default disabled:bg-none disabled:opacity-40"
            >
              03:00h
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer rounded-sm border-0 bg-gray-600 p-0 pt-2 text-sm text-gray-100 last:mb-6 hover:bg-gray-500 disabled:cursor-default disabled:bg-none disabled:opacity-40"
            >
              04:00h
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer rounded-sm border-0 bg-gray-600 p-0 pt-2 text-sm text-gray-100 last:mb-6 hover:bg-gray-500 disabled:cursor-default disabled:bg-none disabled:opacity-40"
            >
              05:00h
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer rounded-sm border-0 bg-gray-600 p-0 pt-2 text-sm text-gray-100 last:mb-6 hover:bg-gray-500 disabled:cursor-default disabled:bg-none disabled:opacity-40"
            >
              06:00h
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer rounded-sm border-0 bg-gray-600 p-0 pt-2 text-sm text-gray-100 last:mb-6 hover:bg-gray-500 disabled:cursor-default disabled:bg-none disabled:opacity-40"
            >
              07:00h
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer rounded-sm border-0 bg-gray-600 p-0 pt-2 text-sm text-gray-100 last:mb-6 hover:bg-gray-500 disabled:cursor-default disabled:bg-none disabled:opacity-40"
            >
              08:00h
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer rounded-sm border-0 bg-gray-600 p-0 pt-2 text-sm text-gray-100 last:mb-6 hover:bg-gray-500 disabled:cursor-default disabled:bg-none disabled:opacity-40"
            >
              09:00h
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer rounded-sm border-0 bg-gray-600 p-0 pt-2 text-sm text-gray-100 last:mb-6 hover:bg-gray-500 disabled:cursor-default disabled:bg-none disabled:opacity-40"
            >
              10:00h
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer rounded-sm border-0 bg-gray-600 p-0 pt-2 text-sm text-gray-100 last:mb-6 hover:bg-gray-500 disabled:cursor-default disabled:bg-none disabled:opacity-40"
            >
              11:00h
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer rounded-sm border-0 bg-gray-600 p-0 pt-2 text-sm text-gray-100 last:mb-6 hover:bg-gray-500 disabled:cursor-default disabled:bg-none disabled:opacity-40"
            >
              12:00h
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
