import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { Container, Header } from '../styles'
import {
  IntervaLItem,
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
} from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { getWeekDays } from '../../../utils/get-week-days'

const TimeIntervalsSchema = z.object({})

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      intervals: [
        { weekday: 0, enabled: false, startTime: '8:00', endTime: '10:00' },

        { weekday: 1, enabled: true, startTime: '8:00', endTime: '10:00' },

        { weekday: 2, enabled: true, startTime: '8:00', endTime: '10:00' },

        { weekday: 3, enabled: true, startTime: '8:00', endTime: '10:00' },

        { weekday: 4, enabled: true, startTime: '8:00', endTime: '10:00' },

        { weekday: 5, enabled: true, startTime: '8:00', endTime: '10:00' },

        { weekday: 6, enabled: false, startTime: '8:00', endTime: '10:00' },
      ],
    },
  })

  const weekDays = getWeekDays()

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  async function handleSetTimeIntervals() {}

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <MultiStep size={4} currentStep={3} />
      </Header>
      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalContainer>
          {fields.map((field, index) => (
            <IntervaLItem key={field.id}>
              <IntervalDay>
                <Checkbox />
                <Text>{weekDays[field.weekday]}</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.startTime`)}
                />
                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.endTime`)}
                />
              </IntervalInputs>
            </IntervaLItem>
          ))}
        </IntervalContainer>
        <Button type="submit">
          Próximo passo <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
