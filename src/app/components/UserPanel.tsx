import { signOut, useSession } from 'next-auth/react'
import { Button, Container, Text } from '@mantine/core'

export const UserPanel = () => {
  const { data, status } = useSession()
  if (status === 'authenticated' && data) {
    return (
      <Container>
        <Text>Welcome {data.user?.name}</Text>
        <Button fullWidth onClick={() => signOut()}>
          Log out
        </Button>
      </Container>
    )
  }

  return <>Welcome</>
}
