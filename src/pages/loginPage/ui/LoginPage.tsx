import { zodResolver } from '@hookform/resolvers/zod';
import type z from 'zod';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { formSchema } from 'features/auth/model/loginSchema';

// import { users } from 'shared/mocks/UserData';
import { useAuth } from 'shared/model/auth/model/authContext';

import styles from './LoginPage.module.scss';

import { useMutation } from '@tanstack/react-query';

import { loginRequest } from 'features/auth/api/login';

type FormSchema = z.infer<typeof formSchema>;

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setFocus,
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

  const onSubmit = (data: FormSchema) => {
    loginMutation.mutate(data);
  };

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (result) => {
      login(result.accessToken, result.refreshToken);
      navigate('/');
    },
    onError: (error: any) => {
      setError('password', { 
        type: 'manual', 
        message: error.response?.data?.error || error.message 
      });
    }
  });

  useEffect(() => {
    // устанавливаем фокус на первое поле (имя пользователя) после монтирования компонента
    setFocus('email');
  }, []);

  const navigate = useNavigate();

  const { login } = useAuth();

  return (
    <div className={styles.loginWrapper}>
      <form
        className={styles.loginForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className={styles.loginTitle}>Вход в SkyTrack</h1>
        <div className={styles.loginFieldWrapper}>
          <div className={styles.loginField}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              autoComplete="username"
              {...register('email', {
                required: 'Введите email',
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: 'Введите корректный email',
                },
              })}
            />
          </div>
          {errors.email && (
            <span className={styles.loginError}>{errors.email.message}</span>
          )}
          <div className={styles.loginField}>
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register('password', { required: 'Введите пароль' })}
            />
          </div>
          {errors.password && (
            <span className={styles.loginError}>{errors.password.message}</span>
          )}
        </div>
        <button
          type="submit"
          className={styles.loginButton}
        >
          Войти
        </button>
        <button
          type="button"
          className={styles.loginButton}
          onClick={() => {
            login('demo-acces-token', 'demo-refresh-token');
            navigate('/');
          }}
        >
          Авто-вход
        </button>
      </form>
    </div>
  );
}
