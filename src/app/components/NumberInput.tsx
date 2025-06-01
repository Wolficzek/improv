'use client'

import {
  NumberInput as MantineNumberInput,
  NumberInputProps,
} from '@mantine/core'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'

interface ControlledNumberInputProps<T extends FieldValues>
  extends Omit<NumberInputProps, 'value' | 'onChange' | 'error'> {
  name: Path<T>
  control: Control<T>
  error?: string
}

export function NumberInput<T extends FieldValues>({
  name,
  control,
  error,
  ...props
}: ControlledNumberInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MantineNumberInput
          {...props}
          {...field}
          value={field.value ?? 0}
          onChange={(value) => field.onChange(value)}
          error={error}
        />
      )}
    />
  )
}
