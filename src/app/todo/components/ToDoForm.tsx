import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import {
  Group,
  Button,
  ButtonProps,
  Modal,
  Stack,
  Switch,
  ActionIcon,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useFieldArray, useForm } from 'react-hook-form'
import { TextInput } from '@/components/TextInput'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  ModalButton: React.FC<{ onClick: () => void } | ButtonProps>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toDoData?: any
}

export const ToDoForm = ({ ModalButton }: Props) => {
  const [opened, { open, close }] = useDisclosure(false)

  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: {
      isDaily: true,
      tasks: [{ label: '', note: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tasks',
  })

  const isDaily = watch('isDaily')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listData = data.tasks.map((task: any) => ({
      ...task,
    }))

    const list = {
      tasks: listData,
      type: isDaily ? 'daily' : 'reminder',
    }
    console.log(list)
    close()
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Create To-Do List" centered>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Switch label="Daily Tasks" {...register('isDaily')} mt="md" />

          <Stack mt="md">
            <AnimatePresence initial={false}>
              {fields.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                >
                  <Group key={item.id} align="flex-start">
                    <TextInput
                      placeholder="What to do?"
                      required
                      control={control}
                      name={`tasks.${index}.label`}
                      style={{ flex: 1 }}
                    />
                    <ActionIcon
                      color="red"
                      onClick={() => remove(index)}
                      style={{ height: '100%' }}
                      size={36}
                    >
                      <IconTrash />
                    </ActionIcon>
                  </Group>
                </motion.div>
              ))}
            </AnimatePresence>
          </Stack>

          <Button
            leftSection={<IconPlus size={16} />}
            variant="light"
            fullWidth
            mt="lg"
            onClick={() => append({ label: '', note: '' })}
            type="button"
          >
            Add Task
          </Button>

          <Button fullWidth mt="xl" type="submit">
            Save List
          </Button>
        </form>
      </Modal>

      <ModalButton onClick={open} />
    </>
  )
}
