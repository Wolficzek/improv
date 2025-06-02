import { SleepForm } from '@/app/sleep/components/SleepForm'
import { Button, Group } from '@mantine/core'

export const SleepListControl = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <SleepForm
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
  )
}
