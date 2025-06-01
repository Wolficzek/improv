'use client'
import { useForm } from 'react-hook-form'
import {
  Button,
  Container,
  Group,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core'
import { signIn } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormValues, LoginSchema } from '@/lib/validators/login'

export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    const result = await signIn('credentials', {
      username: email,
      password: password,
      redirect: true,
      callbackUrl: '/sleep',
    })

    if (result?.error) {
      console.error(result?.error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container style={{ marginTop: '1rem' }}>
        <Stack>
          <TextInput
            withAsterisk
            placeholder={'Email'}
            {...register('email')}
            error={errors.email?.message}
          />
          <PasswordInput
            withAsterisk
            placeholder={'Password'}
            {...register('password')}
            error={errors.password?.message}
          />

          <Group>
            <Button type="submit" fullWidth>
              Submit
            </Button>
          </Group>
        </Stack>
      </Container>
    </form>
  )
}
