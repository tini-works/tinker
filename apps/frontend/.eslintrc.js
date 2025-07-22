module.exports = {
  extends: ['../../.eslintrc.js', 'plugin:react-hooks/recommended', 'plugin:react/recommended'],
  plugins: ['react', 'react-hooks', 'react-refresh'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
    'react/self-closing-comp': ['warn', { component: true, html: true }],
  },
  ignorePatterns: ['node_modules', 'dist', 'build', 'coverage'],
};

