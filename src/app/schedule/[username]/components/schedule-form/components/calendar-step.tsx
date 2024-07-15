'use client'

import { Calendar } from '@/components/calendar'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { cn } from '@/lib/utils'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'
import { useState } from 'react'

interface Params {
  [key: string]: string
  username: string
}

interface Availability {
  possibleTimes: number[]
  availabilityTimes: number[]
}

export function CalendarStep() {
  const { username } = useParams<Params>()
  const [animationParent] = useAutoAnimate()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const dayWithMonth = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>({
    queryKey: ['availability-times', selectedDateWithoutTime],
    queryFn: async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return response.data
    },
    enabled: !!selectedDate,
  })

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
            {availability?.possibleTimes.map((possibleTime, index) => {
              const blockTime =
                !availability?.availabilityTimes.includes(possibleTime)

              return (
                <Button
                  key={index}
                  variant="outline"
                  className="cursor-pointer rounded-sm border-0 bg-gray-600 p-0 pt-2 text-sm text-gray-100 last:mb-6 hover:bg-gray-500 disabled:cursor-default disabled:bg-none disabled:opacity-40"
                  disabled={blockTime}
                >
                  {possibleTime.toString().padStart(2, '0')}:00h
                </Button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
