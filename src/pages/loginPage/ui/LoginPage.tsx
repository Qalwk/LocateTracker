import { useForm } from "react-hook-form"
import styles from "./LoginPage.module.scss"
import { useAuth } from "shared/model/auth/model/authContext"
import { useNavigate } from "react-router"
import { users } from "shared/mocks/UserData"
import type z from "zod"
import { formSchema } from "features/auth/model/loginSchema"
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from "react"

type FormSchema = z.infer<typeof formSchema>

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setFocus,
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) })

  const onSubmit = (data: FormSchema) => {
    const foundUser = users.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if(foundUser) {
      // Здесь должен быть запрос к серверу и получение токена
      login("demo-token"); // временно
      navigate("/");
    } else {
      setError("password", { type: "manual", message: "Неверный email или пароль" });
    }
  };

  useEffect(() => {
    // устанавливаем фокус на первое поле (имя пользователя) после монтирования компонента
    setFocus('email')
  }, [])

  const navigate = useNavigate();

  const { login } = useAuth();

  return (
    <div className={styles.loginWrapper}>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.loginTitle}>Вход в SkyTrack</h1>
        <div className={styles.loginFieldWrapper}>
          <div className={styles.loginField}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              autoComplete="username"
              {...register("email", {
                required: "Введите email",
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Введите корректный email"
                }
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
              {...register("password", { required: "Введите пароль" })}
            />
          </div>
          {errors.password && (
            <span className={styles.loginError}>{errors.password.message}</span>
          )}
        </div>
        <button type="submit" className={styles.loginButton}>Войти</button>
        <button
          type="button"
          className={styles.loginButton}
          onClick={() => {
            login("demo-token");
            navigate("/");
          }}
        >
          Авто-вход
        </button>
      </form>
    </div>
  )
}