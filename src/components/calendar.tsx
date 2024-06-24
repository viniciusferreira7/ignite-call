import { getWeekDays } from '@/utils/get-week-day'
import { IconCaretLeft, IconCaretRight } from '@tabler/icons-react'

export function Calendar() {
  const shortWeekDays = getWeekDays({ weekday: 'short' })

  return (
    <div>
      <div>
        <h3 className="mt-2 text-lg font-bold">
          Junho <span>2022</span>
        </h3>
        <div>
          <button>
            <IconCaretLeft />
          </button>
          <button>
            <IconCaretRight />
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => {
              return <th key={weekDay}>{weekDay.toUpperCase()}</th>
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button>1</button>
            </td>
            <td>
              <button>2</button>
            </td>
            <td>
              <button>3</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
