'use client'

import { TextInput as MantineTextInput, TextInputProps } from '@mantine/core'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'

interface ControlledNumberInputProps<T extends FieldValues>
  extends Omit<TextInputProps, 'value' | 'onChange' | 'error'> {
  name: Path<T>
  control: Control<T>
  error?: string
}

export function TextInput<T extends FieldValues>({
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
        <MantineTextInput
          {...props}
          {...field}
          value={field.value ?? ''}
          onChange={(value) => field.onChange(value)}
          error={error}
        />
      )}
    />
  )
}
