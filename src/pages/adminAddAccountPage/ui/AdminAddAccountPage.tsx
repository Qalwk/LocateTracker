import React from "react";
import { AdminAddAccountForm } from "features/adminAddAccount/AdminAddAccountForm";
import { Header } from "widgets/Header";
import styles from "./AdminAddAccountPage.module.scss";

const AdminAddAccountPage: React.FC = () => {
  return (
    <div className={styles.adminAddAccountWrapper}>
      <Header />
      <div className={styles.centered}>
        <h1>Добавить аккаунт администратора</h1>
        <AdminAddAccountForm />
      </div>
    </div>
  );
};

export default AdminAddAccountPage;
