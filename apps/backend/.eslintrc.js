module.exports = {
  extends: ['../../.eslintrc.js'],
  rules: {
    'no-console': 'off', // Allow console in backend
    '@typescript-eslint/explicit-function-return-type': ['warn', {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
    }],
  },
  ignorePatterns: ['node_modules', 'dist', 'build', 'coverage'],
};

