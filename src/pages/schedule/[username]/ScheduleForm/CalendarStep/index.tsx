import { useState } from 'react'
import { Calendar } from '../../../../../components/Calendar'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'
import dayjs from 'dayjs'

export function CalendarStep() {
  const [selectDate, setSelectDate] = useState<Date | null>(null)

  const isDateSelected = !!selectDate

  const weekDay = selectDate ? dayjs(selectDate).format('dddd') : null
  const describeDay = selectDate
    ? dayjs(selectDate).format('DD[ de ]MMMM')
    : null

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectDate={selectDate} onDateSelect={setSelectDate} />
      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{describeDay}</span>
          </TimePickerHeader>
          <TimePickerList>
            <TimePickerItem>8:00</TimePickerItem>
            <TimePickerItem>9:00</TimePickerItem>
            <TimePickerItem>10:00</TimePickerItem>
            <TimePickerItem>11:00</TimePickerItem>
            <TimePickerItem>12:00</TimePickerItem>
            <TimePickerItem>13:00</TimePickerItem>
            <TimePickerItem>14:00</TimePickerItem>
            <TimePickerItem>15:00</TimePickerItem>
            <TimePickerItem>16:00</TimePickerItem>
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
