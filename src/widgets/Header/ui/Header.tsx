import { Palette } from "lucide-react"
import styles from "./Header.module.scss"
import { useSelector, useDispatch } from 'react-redux';
import { setTheme, toggleTheme } from 'shared/model/themeSlice';
import type { RootState } from 'app/store';
import { useEffect } from "react";
import { useNavigate } from "react-router";
export function Header() {

  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme);
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const handleHomeLink = () => navigate('/')

  useEffect(() => {
    if (currentTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [currentTheme]);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('Theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('Theme', currentTheme);
  }, [currentTheme]);
  
  return (
    <div className={styles.header}>
        <div onClick={handleHomeLink}>
          <p>LOGO</p>
        </div>
        <div>
          <button onClick={() => dispatch(toggleTheme())} className={styles.theme}>
            <Palette color="var(--color-text)"/>
          </button>
        </div>
    </div>
  )
}