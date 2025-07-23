import i18next from 'i18next';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';

i18next.init({
  lng: 'ru',
  resources: {
    ru: { zod: {/* ... */} }, // Обычно zod-i18n-map сам подтянет нужные ресурсы
    en: { zod: {/* ... */} },
  },
});
z.setErrorMap(zodI18nMap);

export const formSchema = z.object({
  email: z
    .string()
    .min(2, { message: 'Имя пользователя слишком короткое' })
    .max(20, 'Имя пользователя слишком длинное')
    .transform((v) => v.toLowerCase().replace(/\s+/g, '_')),
  password: z.string().min(6, 'Пароль слишком короткий'),
});