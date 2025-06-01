import { Button, Container, Group, Table } from '@mantine/core'
import { SleepForm } from '@/app/sleep/components/SleepForm'
import { useSleepData } from '@/app/sleep/hooks/useSleepData'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { useDeleteSleepData } from '@/app/sleep/hooks/useDeleteSleepData'
import { formatDate } from '@/utils/utils'
import { useMediaQuery } from '@mantine/hooks'
import { AccordionList } from './AccordionList'
import { LoaderCentered } from '@/components/LoaderCentered'

//TODO: MOVE SLEEP LIST AND FETCHING INTO SEPARATE COMPONENTS SO THERE IS NO DATA === null ERRORS

export const SleepList = () => {
  const { data, isFetching } = useSleepData()
  const { mutate: removeSleepEntry } = useDeleteSleepData()
  const isMobile = useMediaQuery('(max-width: 600px)')

  const onDelete = (id: number) => {
    removeSleepEntry(id)
  }

  const rows =
    data &&
    data.map((element) => (
      <Table.Tr key={element.id}>
        <Table.Td>{formatDate(element.date)}</Table.Td>
        <Table.Td>{element.bedTime}</Table.Td>
        <Table.Td>{element.wakeTime}</Table.Td>
        <Table.Td>{element.timeTillAsleep}</Table.Td>
        <Table.Td>{element.sleepTime}</Table.Td>
        <Table.Td>{element.wakeUps}</Table.Td>
        <Table.Td>{element.snoozes}</Table.Td>
        <Table.Td>{element.tiredness}</Table.Td>
        <Table.Td>{element.medications}</Table.Td>
        <Table.Td>
          <SleepForm
            sleepData={element}
            ModalButton={(props) => (
              <Button {...props}>
                <IconEdit />
              </Button>
            )}
          />
          <Button onClick={() => onDelete(element.id)}>
            <IconTrash />
          </Button>
        </Table.Td>
      </Table.Tr>
    ))

  const head = (
    <Table.Tr>
      <Table.Th>Date</Table.Th>
      <Table.Th>Bed Time</Table.Th>
      <Table.Th>Wake Time</Table.Th>
      <Table.Th>Time Till asleep</Table.Th>
      <Table.Th>Sleep Time</Table.Th>
      <Table.Th>Wake ups</Table.Th>
      <Table.Th>Snoozes</Table.Th>
      <Table.Th>Tiredness</Table.Th>
      <Table.Th>Medications</Table.Th>
      <Table.Th />
    </Table.Tr>
  )

  return (
    <Container size="responsive">
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
      {!data || (isFetching && <LoaderCentered />)}
      {data && isMobile ? (
        <AccordionList data={data} onDelete={onDelete} />
      ) : (
        <Table striped>
          <Table.Thead>{head}</Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      )}
    </Container>
  )
}
