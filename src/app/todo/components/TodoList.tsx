import { Button, Container, Group } from '@mantine/core'
import { ToDoForm } from '@/app/todo/components/ToDoForm'
import { useMediaQuery } from '@mantine/hooks'

export const TodoList = () => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return (
    <Container>
      <ToDoForm
        ModalButton={(props) => (
          <Group justify="flex-end">
            <Button
              fullWidth={isMobile}
              style={{
                marginTop: '1rem',
                marginBottom: '1rem',
              }}
              {...props}
            >
              Add new
            </Button>
          </Group>
        )}
      />
    </Container>
  )
}
