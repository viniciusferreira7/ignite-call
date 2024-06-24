import { Calendar } from '@/components/calendar'

export function CalendarStep() {
  return (
    <div className="relative mx-auto mt-6 grid w-[540px] max-w-full grid-cols-1 rounded-md bg-gray-800">
      <Calendar />
    </div>
  )
}
