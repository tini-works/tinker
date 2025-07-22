module.exports = {
  extends: ['../../.eslintrc.js'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': ['error', {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
    }],
    '@typescript-eslint/no-explicit-any': 'error', // Stricter for shared package
  },
  ignorePatterns: ['node_modules', 'dist', 'build', 'coverage'],
};

