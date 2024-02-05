import { useState } from 'react'
import { CalendarStep } from './CalendarStep'
import { ConfirmStep } from './ConfirmStep'

export function ScheduleForm() {
  const [selectDateForm, setSelectDateForm] = useState<Date | null>(null)

  function handleClearSelectedDate() {
    return setSelectDateForm(null)
  }

  if (selectDateForm) {
    return (
      <ConfirmStep
        schedulingDate={selectDateForm}
        onRedirect={handleClearSelectedDate}
      />
    )
  }

  return <CalendarStep onSelectDateTime={setSelectDateForm} />
}
