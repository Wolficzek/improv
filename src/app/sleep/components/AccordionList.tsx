import { Accordion, Button, Group, Stack, Text } from '@mantine/core'
import {
  IconEdit,
  IconTrash,
  IconCalendarWeekFilled,
  IconBed,
  IconSun,
  IconZzz,
  IconBatteryAutomotive,
  IconAlarmSnooze,
  IconStopwatch,
  IconMoonOff,
  IconPillFilled,
} from '@tabler/icons-react'
import { SleepForm } from './SleepForm'
import { formatDate } from '@/utils/utils'
import { SelectSleepData } from '@/db/types/db-types'

export const AccordionList = ({
  data,
  onDelete,
}: {
  data: SelectSleepData[]
  onDelete: (id: number) => void
}) => {
  return (
    <Accordion variant="contained">
      <Stack>
        {data.map((item) => (
          <Accordion.Item key={item.id} value={item.id.toString()}>
            <Accordion.Control>
              <Group gap={4}>
                <IconCalendarWeekFilled size={24} />
                <Text>{formatDate(item.date)}</Text>
              </Group>
              <Group gap={4}>
                <IconBed size={24} />
                <Text>{item.bedTime}</Text>
                <IconSun size={24} />
                <Text>{item.wakeTime}</Text>
                <IconZzz size={24} />
                <Text>{item.sleepTime}</Text>
                <IconStopwatch size={24} />
                <Text>{item.timeTillAsleep}</Text>
              </Group>
              <Group gap={4}>
                <IconBatteryAutomotive size={24} />
                <Text>{item.tiredness}</Text>
                <IconAlarmSnooze size={24} />
                <Text>{item.snoozes}</Text>
                <IconMoonOff size={24} />
                <Text>{item.wakeUps}</Text>
              </Group>
              <Group gap={4}>
                <IconPillFilled size={24} />
                <Text>{item.medications}</Text>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Text>Bed Time: {item.bedTime}</Text>
              <Text>Wake Time: {item.wakeTime}</Text>
              <Text>Time till asleep: {item.timeTillAsleep}</Text>
              <Text>Sleep Time: {item.sleepTime}</Text>
              <Text>Wake ups: {item.wakeUps}</Text>
              <Text>Tiredness: {item.tiredness}</Text>
              <Text>Snoozes: {item.snoozes}</Text>
              <Text>Medications: {item.medications}</Text>
              <Group mt="sm">
                <SleepForm
                  sleepData={item}
                  ModalButton={(props) => (
                    <Button {...props}>
                      <IconEdit />
                    </Button>
                  )}
                />
                <Button color="red" onClick={() => onDelete(item.id)}>
                  <IconTrash />
                </Button>
              </Group>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Stack>
    </Accordion>
  )
}
