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
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
} from './styles'
import { ArrowRight } from 'phosphor-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { getWeekDay } from '../../../utils/get-week-days'

const timeIntervalsFormSchema = z.object({})

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitted, errors },
  } = useForm({
    defaultValues: {
      intervals: [
        { weekDay: 0, enable: false, startTime: '08:00', endTime: '10:00' },
        { weekDay: 1, enable: true, startTime: '08:00', endTime: '10:00' },
        { weekDay: 2, enable: true, startTime: '08:00', endTime: '10:00' },
        { weekDay: 3, enable: true, startTime: '08:00', endTime: '10:00' },
        { weekDay: 4, enable: true, startTime: '08:00', endTime: '10:00' },
        { weekDay: 5, enable: true, startTime: '08:00', endTime: '10:00' },
        { weekDay: 6, enable: false, startTime: '08:00', endTime: '10:00' },
      ],
    },
  })

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  const weekDays = getWeekDay()

  async function handleSetTimeIntervals() { }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil!, Ah, você
          pode editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={3} />
      </Header>
      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalContainer>
          {fields.map((field, index) => {
            return (
              <IntervalItem key={field.id}>
                <IntervalDay>
                  <Checkbox />
                  <Text>{weekDays[field.weekDay]}</Text>
                </IntervalDay>
                <IntervalInputs>
                  <TextInput
                    size="md"
                    type="time"
                    step={60}
                    {...register(`intervals.${index}.startTime`)}
                  />
                  <TextInput
                    size="md"
                    type="time"
                    step={60}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </IntervalInputs>
              </IntervalItem>
            )
          })}
        </IntervalContainer>
        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
