import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import { Button, ButtonProps, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Controller, useForm } from 'react-hook-form'
import { DatePickerInput, TimeInput } from '@mantine/dates'
import { IconClock } from '@tabler/icons-react'
import { InsertSleepData, SelectSleepData } from '@/db/types/db-types'
import { useCreateSleepData } from '@/app/sleep/hooks/useCreateSleepData'
import { useEditSleepData } from '@/app/sleep/hooks/useEditSleepData'
import { zodResolver } from '@hookform/resolvers/zod'
import { SleepSchema, SleepFormValues } from '@/lib/validators/sleep'
import { NumberInput } from '@/components/NumberInput'
import { TextInput } from '@/components/TextInput'

interface Props {
  ModalButton: React.FC<{ onClick: () => void } | ButtonProps>
  sleepData?: SelectSleepData
}

const DEFAULT_VALUES: InsertSleepData = {
  date: new Date(),
  snoozes: 0,
  tiredness: 0,
  bedTime: '',
  wakeTime: '',
  timeTillAsleep: '',
  sleepTime: '',
  wakeUps: 0,
  medications: '',
}

export const SleepForm = ({ sleepData, ModalButton }: Props) => {
  const [opened, { open, close }] = useDisclosure(false)
  const { mutate: createMutation } = useCreateSleepData()
  const { mutate: editMutation } = useEditSleepData()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SleepFormValues>({
    defaultValues: DEFAULT_VALUES,
    values: sleepData,
    resolver: zodResolver(SleepSchema),
  })

  const onSubmit = (data: InsertSleepData) => {
    if (sleepData) {
      const { id, ...rest } = data as SelectSleepData
      editMutation({ id, data: rest })
    } else {
      createMutation(data)
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add sleep data">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePickerInput
                {...field}
                label="Date"
                placeholder="Select date"
                withAsterisk
                value={new Date(field.value)}
                onChange={(date) => field.onChange(date)}
                error={errors.date?.message}
              />
            )}
          />
          <NumberInput
            name={'snoozes'}
            control={control}
            withAsterisk
            label={'Snoozes'}
            placeholder={'Snoozes'}
            error={errors.snoozes?.message}
          />
          <NumberInput
            name={'tiredness'}
            control={control}
            withAsterisk
            label={'Tiredness'}
            placeholder={'Tiredness'}
            error={errors.tiredness?.message}
          />
          <TimeInput
            label="Bed Time"
            placeholder="Bed Time"
            withAsterisk
            leftSection={<IconClock size={16} stroke={1.5} />}
            {...register('bedTime')}
            error={errors.bedTime?.message}
          />
          <TimeInput
            label="Wake Time"
            placeholder="Wake Time"
            withAsterisk
            leftSection={<IconClock size={16} stroke={1.5} />}
            {...register('wakeTime')}
            error={errors.wakeTime?.message}
          />
          <TextInput
            name={'timeTillAsleep'}
            control={control}
            withAsterisk
            label={'Time till asleep'}
            placeholder={'Time till asleep'}
            error={errors.timeTillAsleep?.message}
          />
          <TimeInput
            withAsterisk
            label={'Time asleep'}
            placeholder={'Time asleep'}
            {...register('sleepTime')}
            error={errors.sleepTime?.message}
          />
          <NumberInput
            name="wakeUps"
            control={control}
            withAsterisk
            label={'Wake ups'}
            placeholder={'Wake ups'}
            error={errors.wakeUps?.message}
          />
          <TextInput
            name={'medications'}
            control={control}
            label={'Medications'}
            placeholder={'Medications'}
            error={errors.medications?.message}
          />
          <Button style={{ marginTop: '1rem', width: '100%' }} type="submit">
            Add
          </Button>
        </form>
      </Modal>

      <ModalButton onClick={open} />
    </>
  )
}
