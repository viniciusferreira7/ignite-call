import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './styles'
import Image from 'next/image'
import { ClaimUsernameForm } from './components/claimUsernameForm'

export function Home() {
  return (
    <Container>
      <Hero>
        <Heading as="h1" size="4xl">
          Agendamento descomplicado
        </Heading>
        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
        <ClaimUsernameForm />
      </Hero>
      <Preview>
        <Image
          src="/assets/preview.png"
          alt="Calendário simbolizando aplicação em funcionamento"
          width={800}
          height={400}
          quality={100}
          priority
        />
      </Preview>
    </Container>
  )
}
