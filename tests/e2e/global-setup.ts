import { spawn } from "child_process";

async function globalSetup() {
  // Запускаем backend
  const backend = spawn("npm", ["run", "dev"], {
    cwd: "./backend",
    stdio: "pipe",
  });

  // Ждём запуска backend
  await new Promise((resolve) => {
    backend.stdout.on("data", (data) => {
      if (data.toString().includes("Server running")) {
        resolve(true);
      }
    });
  });

  // Сохраняем процесс для остановки
  global.__BACKEND_PROCESS__ = backend;
}

export default globalSetup;
