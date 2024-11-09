import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        process: 'readonly',
        window: 'readonly',
        document: 'readonly',
      },
    },
  },
  pluginJs.configs.recommended,
];
