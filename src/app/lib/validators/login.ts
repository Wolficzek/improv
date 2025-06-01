import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().nonempty('Required'),
})

export type LoginFormValues = z.infer<typeof LoginSchema>
