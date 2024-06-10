'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Control, InputRoot } from '@/components/ui/input'
import { api } from '@/lib/axios'
import { convertTimeToMinutes } from '@/utils/convert-time-to-minutes'
import { getWeekDay } from '@/utils/get-week-day'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconArrowRight } from '@tabler/icons-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().lte(6).gte(0),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length >= 1, {
      message: 'Você precisa selecionar pelo menos um dia da semana.',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeToMinutes(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        )
      },
      {
        message:
          'O horário de término deve ser pelo menos 1 hora distante do início.',
      },
    ),
})

type TimeIntervalsFormSchemaInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormSchemaOutput = z.output<typeof timeIntervalsFormSchema>

export function TimeIntervalsForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<TimeIntervalsFormSchemaInput, any, TimeIntervalsFormSchemaOutput>(
    {
      resolver: zodResolver(timeIntervalsFormSchema),
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
    },
  )

  // FIXME: The control is conflicting with the input and output typing of the zod scheme
  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  async function handleSetTimeIntervals({
    intervals,
  }: TimeIntervalsFormSchemaOutput) {
    await api.post('/users/time-intervals', { intervals })
  }

  const weekDays = getWeekDay()

  const intervals = watch('intervals')

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
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        onCheckedChange={(checked) => {
                          field.onChange(checked === true)
                        }}
                        checked={field.value}
                      />
                    )}
                  />
                  <p className="text-base font-medium text-gray-100">
                    {weekDays[field.weekDay]}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <InputRoot className="border-none bg-gray-950">
                    <Control
                      type="time"
                      step={60}
                      disabled={!intervals[index].enabled}
                      className="input-time disabled:text-gray-500"
                      {...register(`intervals.${index}.startTime`)}
                    />
                  </InputRoot>
                  <InputRoot className="border-none bg-gray-950">
                    <Control
                      type="time"
                      step={60}
                      disabled={!intervals[index].enabled}
                      className="input-time disabled:text-gray-500"
                      {...register(`intervals.${index}.endTime`)}
                    />
                  </InputRoot>
                </div>
              </div>
            )
          })}
        </div>
        {errors.intervals && (
          <p className="mb-2 text-xs text-red-500">
            {errors.intervals.root?.message}
          </p>
        )}
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
