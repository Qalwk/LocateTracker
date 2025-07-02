import { Palette } from "lucide-react"
import styles from "./Header.module.scss"
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from 'shared/model/themeSlice';
import { useEffect } from "react";
import { setTheme } from 'shared/model/themeSlice';

export function Header() {
  const theme = useSelector((state: any) => state.theme.theme);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme !== theme) {
      dispatch(setTheme(savedTheme));
    }
  }, []);

  useEffect(() => {
    document.body.className = theme; // или добавь/удали класс
    localStorage.setItem('theme', theme); // сохраняем тему
  }, [theme]);

  return (
    <div className={styles.header}>
      <p>LOGO</p>
      <div className={""}>
        <button onClick={() => dispatch(toggleTheme())} className={styles.theme}>
          <Palette color="var(--color-text)"/>
        </button>
      </div>
    </div>
  )
}