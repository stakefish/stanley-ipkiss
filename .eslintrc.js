module.exports = {
  extends: "standard-with-typescript",
  parserOptions: {
    project: "./tsconfig.json"
  },
  rules: {
    quotes: ["error", "double"],
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/explicit-function-return-type": "off"
  }
}
