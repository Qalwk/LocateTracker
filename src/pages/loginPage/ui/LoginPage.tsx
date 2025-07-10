import styles from "./LoginPage.module.scss"

export function LoginPage() {
  return (
    <div className={styles.loginWrapper}>
      <form className={styles.loginForm}>
        <h1 className={styles.loginTitle}>Вход в SkyTrack</h1>
        <div className={styles.loginFieldWrapper}>
          <div className={styles.loginField}>
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              autoComplete="username" 
              required
            />
          </div>
          <div className={styles.loginField}>
            <label htmlFor="password">Пароль</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              autoComplete="current-password" 
              required 
            />
          </div>
        </div>
        <button type="submit" className={styles.loginButton}>Войти</button>
        <div className={styles.loginError}></div>
      </form>
    </div>
  )
}