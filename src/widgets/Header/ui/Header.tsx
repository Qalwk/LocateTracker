import { Palette } from "lucide-react"
import styles from "./Header.module.scss"
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from 'shared/model/themeSlice';
import { useEffect } from "react";

export function Header() {
  const theme = useSelector((state: any) => state.theme.theme);
  const dispatch = useDispatch();
  
  useEffect(() => {
    document.body.className = theme; // или добавь/удали класс
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