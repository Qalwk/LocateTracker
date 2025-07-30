module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // Новая функциональность
        "fix", // Исправление багов
        "docs", // Документация
        "style", // Форматирование кода
        "refactor", // Рефакторинг
        "test", // Тесты
        "chore", // Обновление зависимостей
        "ci", // CI/CD изменения
        "perf", // Улучшение производительности
        "revert", // Откат изменений
      ],
    ],
    "subject-case": [2, "always", "lower-case"],
    "subject-max-length": [2, "always", 72],
    "body-max-line-length": [2, "always", 100],
  },
};
