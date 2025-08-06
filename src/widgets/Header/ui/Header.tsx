import type { RootState } from "app/store";
import { LogOut, Palette } from "lucide-react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { useAuth } from "shared/model/auth/context/authContext";
import { setTheme, toggleTheme } from "shared/model/themeSlice";

import styles from "./Header.module.scss";

export function Header() {
  const currentTheme = useSelector(
    (state: RootState) => state.theme.currentTheme,
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleHomeLink = () => navigate("/");
  const handleTableLink = () => navigate("/flight-table");
  const handleAddUserLink = () => navigate("/admin/add-account");

  const { logout, user } = useAuth();

  useEffect(() => {
    if (currentTheme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [currentTheme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("Theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("Theme", currentTheme);
  }, [currentTheme]);

  return (
    <div className={styles.header}>
      <p
        onClick={handleHomeLink}
        onMouseEnter={() => import("pages/homePage")}
        style={{ cursor: "pointer" }}
      >
        LOGO
      </p>
      <div className={styles.btnWrap}>
        <p
          onClick={handleTableLink}
          onMouseEnter={() => import("pages/flightTablePage")}
          style={{ cursor: "pointer" }}
        >
          Flight Table
        </p>
        {user?.role === "admin" && (
          <p onClick={handleAddUserLink} style={{ cursor: "pointer" }}>
            Add User
          </p>
        )}
        <button
          onClick={() => dispatch(toggleTheme())}
          className={styles.theme}
        >
          <Palette color="var(--color-text)" />
        </button>
        {user && (
          <div className={styles.userInfo}>
            <span>{user.username}</span>
            {user.role === "admin" ? (
              <span className={styles.adminBadge}>Админ</span>
            ) : (
              <span className={styles.companyBadge}>{user.company}</span>
            )}
          </div>
        )}
        <button onClick={logout} className={styles.theme}>
          <LogOut color="var(--color-text)" />
        </button>
      </div>
    </div>
  );
}
