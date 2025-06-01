import { Center, Container, Loader } from '@mantine/core'

export const LoaderCentered = () => {
  return (
    <Container size="responsive" style={{ height: '100vh' }}>
      <Center style={{ height: '100%' }}>
        <Loader type="dots" size="xl" />
      </Center>
    </Container>
  )
}
