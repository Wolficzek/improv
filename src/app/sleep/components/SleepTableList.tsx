import { Button, Container, Table, Text } from '@mantine/core'
import { SelectSleepData } from '@/db/types/db-types'
import { formatDate } from '@/utils/utils'
import { SleepForm } from '@/app/sleep/components/SleepForm'
import { IconEdit, IconTrash } from '@tabler/icons-react'

interface SleepTableListProps {
  data?: SelectSleepData[]
  onDelete: (id: number) => void
}

interface SleepRowProps {
  row: SelectSleepData
  onDelete: (id: number) => void
}

const SleepRow = ({ row, onDelete }: SleepRowProps) => {
  return (
    <Table.Tr key={row.id}>
      <Table.Td>{formatDate(row.date)}</Table.Td>
      <Table.Td>{row.bedTime}</Table.Td>
      <Table.Td>{row.wakeTime}</Table.Td>
      <Table.Td>{row.timeTillAsleep}</Table.Td>
      <Table.Td>{row.sleepTime}</Table.Td>
      <Table.Td>{row.wakeUps}</Table.Td>
      <Table.Td>{row.snoozes}</Table.Td>
      <Table.Td>{row.tiredness}</Table.Td>
      <Table.Td>{row.medications}</Table.Td>
      <Table.Td>
        <SleepForm
          sleepData={row}
          ModalButton={(props) => (
            <Button {...props}>
              <IconEdit />
            </Button>
          )}
        />
        <Button onClick={() => onDelete(row.id)}>
          <IconTrash />
        </Button>
      </Table.Td>
    </Table.Tr>
  )
}

export const SleepTableList = ({ data, onDelete }: SleepTableListProps) => {
  console.log(data)

  if (!data || !data.length) return <Text>No data</Text>

  const rows = data.map((element) => (
    <SleepRow key={element.id} row={element} onDelete={onDelete} />
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
      <Table striped>
        <Table.Thead>{head}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Container>
  )
}
