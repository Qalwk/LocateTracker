import z from 'zod';

export const formSchema = z.object({
  email: z
    .string()
    .min(2, { message: 'Имя пользователя слишком короткое' })
    .max(20, 'Имя пользователя слишком длинное')
    .transform((v) => v.toLowerCase().replace(/\s+/g, '_')),
  password: z.string().min(6, 'Пароль слишком короткий'),
});
