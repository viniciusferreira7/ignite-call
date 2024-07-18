import '../lib/dayjs'

import { getWeekDays } from '@/utils/get-week-day'
import { IconCaretLeft, IconCaretRight } from '@tabler/icons-react'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { Button } from './ui/button'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useParams, useSearchParams } from 'next/navigation'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

type CalendarWeeks = CalendarWeek[]

interface BlockedDates {
  blockedWeekdays: number[]
}

interface CalendarProps {
  selectedDate: Date | null
  onDateSelected: (date: Date) => void
}

export function Calendar({ selectedDate, onDateSelected }: CalendarProps) {
  const { username } = useParams<{ username: string }>()
  const [animationParent] = useAutoAnimate()

  const [currentDate, setCurrentDate] = useState(() => dayjs().set('date', 1))

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonthDate)
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, 'month')

    setCurrentDate(nextMonthDate)
  }

  const shortWeekDays = getWeekDays({ weekday: 'short' })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const { data: blockedDates } = useQuery<BlockedDates>({
    queryKey: [
      'blocked-dates',
      'year',
      currentDate.get('year'),
      'month',
      currentDate.get('month'),
    ],
    queryFn: async () => {
      const response = await api.get(`/users/${username}/blocked-dates`, {
        params: {
          year: currentDate.get('year'),
          month: currentDate.get('month'),
        },
      })

      return response.data
    },
  })

  console.log(currentDate.get('month'))

  const calendarWeeks = useMemo(() => {
    const dayjsInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, index) => {
      return currentDate.set('date', index + 1)
    })

    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, index) => {
        return currentDate.subtract(index + 1, 'day')
      })
      .reverse()

    const lastDayInMonth = currentDate.set('date', currentDate.daysInMonth())

    const lastWeekDay = lastDayInMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, index) => {
      return lastDayInMonth.add(index + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
      ...dayjsInMonthArray.map((date) => {
        return {
          date,
          disabled:
            date.endOf('date').isBefore() ||
            blockedDates?.blockedWeekdays.includes(date.get('day')),
        }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }
        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate, blockedDates])

  return (
    <div ref={animationParent} className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="mt-2 text-lg font-medium capitalize">
          {currentMonth} <span className="text-gray-400">{currentYear}</span>
        </h2>
        <div className="flex items-center gap-2 text-gray-200">
          <Button
            title="Mês anterior"
            variant="ghost"
            className="p-2"
            onClick={handlePreviousMonth}
          >
            <IconCaretLeft className="size-5" />
          </Button>
          <Button
            title="Próximo mês"
            variant="ghost"
            className="p-2"
            onClick={handleNextMonth}
          >
            <IconCaretRight className="size-5" />
          </Button>
        </div>
      </div>
      <table
        ref={animationParent}
        className="w-full table-fixed border-spacing-1 font-roboto"
      >
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => {
              return (
                <th key={weekDay} className="text-sm font-medium text-gray-200">
                  {weekDay.toUpperCase()}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className="before:leading-9 before:text-gray-800 before:content-['.']">
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled }) => {
                  return (
                    <td className="box-border" key={date.toString()}>
                      <Button
                        variant="ghost"
                        size="h-auto"
                        disabled={disabled}
                        className="aspect-square w-full bg-gray-600 p-0 disabled:cursor-default disabled:bg-transparent disabled:opacity-40"
                        onClick={() => onDateSelected(date.toDate())}
                      >
                        {date.get('date')}
                      </Button>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
