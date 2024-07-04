import '../lib/dayjs'

import { getWeekDays } from '@/utils/get-week-day'
import { IconCaretLeft, IconCaretRight } from '@tabler/icons-react'
import { Button } from './ui/button'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'

export function Calendar() {
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

    return [...previousMonthFillArray, ...dayjsInMonthArray]
  }, [currentDate])

  console.log({ calendarWeeks })

  return (
    <div className="flex flex-col gap-6 p-6">
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
      <table className="w-full table-fixed border-spacing-1 font-roboto">
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
          <tr>
            <td className="box-border"></td>
            <td className="box-border"></td>
            <td className="box-border"></td>
            <td className="box-border"></td>
            <td className="box-border">
              <Button
                variant="ghost"
                size="h-auto"
                disabled
                className="aspect-square w-full bg-gray-600 p-0 disabled:cursor-default disabled:bg-transparent disabled:opacity-40"
              >
                1
              </Button>
            </td>
            <td className="box-border">
              <Button
                variant="ghost"
                size="h-auto"
                className="aspect-square w-full bg-gray-600 p-0"
              >
                2
              </Button>
            </td>
            <td className="box-border">
              <Button
                variant="ghost"
                size="h-auto"
                className="aspect-square w-full bg-gray-600 p-0"
              >
                3
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
