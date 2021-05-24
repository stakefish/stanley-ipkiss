module.exports = {
  extends: "standard-with-typescript",
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    quotes: ["error", "double"],
    "@typescript-eslint/quotes": ["error", "double"],
  },
}
