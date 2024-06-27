import { getWeekDays } from '@/utils/get-week-day'
import { IconCaretLeft, IconCaretRight } from '@tabler/icons-react'
import { Button } from './ui/button'

export function Calendar() {
  const shortWeekDays = getWeekDays({ weekday: 'short' })

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="mt-2 text-lg font-medium">
          Junho <span className="text-gray-400">2022</span>
        </h2>
        <div className="flex items-center gap-2 text-gray-200">
          <Button variant="ghost" className="p-2">
            <IconCaretLeft className="size-5" />
          </Button>
          <Button variant="ghost" className="p-2">
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
                disabled={true}
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
