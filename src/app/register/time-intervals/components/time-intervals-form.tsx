'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Control, InputRoot } from '@/components/ui/input'
import { getWeekDay } from '@/utils/get-week-day'
import { IconArrowRight } from '@tabler/icons-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

const timeIntervalsFormSchema = z.object({})

export function TimeIntervalsForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  async function handleSetTimeIntervals() { }

  const weekDays = getWeekDay()

  return (
    <div className="mt-6 space-y-4 rounded-md bg-gray-800 p-4 md:p-6">
      <form onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <div className="mb-4 divide-y divide-gray-600 rounded-md border border-gray-600">
          {fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <Checkbox />
                  <p className="text-base font-medium text-gray-100">
                    {weekDays[field.weekDay]}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <InputRoot className="border-none bg-gray-950">
                    <Control
                      type="time"
                      step={60}
                      className="input-time"
                      {...register(`intervals.${index}.startTime`)}
                    />
                  </InputRoot>
                  <InputRoot className="border-none bg-gray-950">
                    <Control
                      type="time"
                      step={60}
                      className="input-time"
                      {...register(`intervals.${index}.endTime`)}
                    />
                  </InputRoot>
                </div>
              </div>
            )
          })}
        </div>
        <Button
          variant="secondary"
          size="h-auto"
          className="flex w-full items-center py-3"
          disabled={isSubmitting}
        >
          Próximo passo <IconArrowRight size={16} />
        </Button>
      </form>
    </div>
  )
}
