import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addUser, getCompanies } from "shared/api/axiosInstance";

export const AdminAddAccountForm: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState<"admin" | "dispatcher">("admin");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const {
    data: companies,
    isLoading: companiesLoading,
    error: companiesError,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      setLogin("");
      setPassword("");
      setPosition("admin");
      setSelectedCompanies([]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.reset();
    mutation.mutate({
      username: login,
      password,
      role: position,
      companies: position === "admin" ? [] : selectedCompanies,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Логин:</label>
        <input
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
          type="text"
        />
      </div>
      <div>
        <label>Пароль:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Должность:</label>
        <select
          value={position}
          onChange={(e) =>
            setPosition(e.target.value as "admin" | "dispatcher")
          }
          required
        >
          <option value="admin">Администратор</option>
          <option value="dispatcher">Диспетчер</option>
        </select>
      </div>
      {position === "dispatcher" && (
        <div>
          <label>Компании:</label>
          {companiesLoading && <div>Загрузка компаний...</div>}
          {companiesError && (
            <div style={{ color: "red" }}>Ошибка загрузки компаний</div>
          )}
          {companies && (
            <select
              multiple
              value={selectedCompanies}
              onChange={(e) => {
                const options = Array.from(e.target.selectedOptions).map(
                  (opt) => opt.value,
                );
                setSelectedCompanies(options);
              }}
              style={{ minHeight: 80, minWidth: 200 }}
            >
              {companies.map((company: string) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
      {mutation.isError && (
        <div style={{ color: "red", marginTop: 8 }}>
          {(mutation.error as any)?.response?.data?.error ||
            "Ошибка при добавлении пользователя"}
        </div>
      )}
      {mutation.isSuccess && (
        <div style={{ color: "green", marginTop: 8 }}>
          Пользователь успешно добавлен!
        </div>
      )}
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Добавление..." : "Добавить"}
      </button>
    </form>
  );
};
