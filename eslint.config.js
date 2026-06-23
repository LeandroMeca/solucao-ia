import { defineConfig, globalIgnores } from 'eslint/config';

// Import parser and plugin packages (top-level await allowed in ESM)
const tsParser = await import('@typescript-eslint/parser').then(
  (m) => m.default || m
);
const tsPlugin = await import('@typescript-eslint/eslint-plugin').then(
  (m) => m.default
);
const reactHooks = await import('eslint-plugin-react-hooks').then(
  (m) => m.default
);
const reactRefresh = await import('eslint-plugin-react-refresh').then(
  (m) => m.default
);
const prettierPlugin = await import('eslint-plugin-prettier').then(
  (m) => m.default
);
const unusedImports = await import('eslint-plugin-unused-imports').then(
  (m) => m.default
);
const simpleImportSort = await import('eslint-plugin-simple-import-sort').then(
  (m) => m.default
);
const importPlugin = await import('eslint-plugin-import').then(
  (m) => m.default
);

// Helper to merge plugin config objects into base config
function mergePluginConfigInto(base, pluginConfig) {
  if (!pluginConfig) return;
  if (pluginConfig.languageOptions) {
    base.languageOptions = base.languageOptions || {};
    base.languageOptions.parserOptions = {
      ...(pluginConfig.languageOptions.parserOptions || {}),
      ...(base.languageOptions.parserOptions || {}),
    };
  }
  if (pluginConfig.settings) {
    base.settings = {
      ...(pluginConfig.settings || {}),
      ...(base.settings || {}),
    };
  }
  if (pluginConfig.rules) {
    base.rules = { ...(pluginConfig.rules || {}), ...(base.rules || {}) };
  }
}

const base = {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
      // To enable type-aware rules, uncomment and set the project fields
      // project: ['./tsconfig.node.json', './tsconfig.app.json'],
      // tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    prettier: prettierPlugin,
    'unused-imports': unusedImports,
    'simple-import-sort': simpleImportSort,
    import: importPlugin,
  },
  rules: {
    'prettier/prettier': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    // 'import/order' removed because it's incompatible with this ESLint/plugin setup;
    // simple-import-sort is used for import ordering instead.
  },
  settings: { react: { version: 'detect' } },
};

// Merge selected plugin-provided configs (prefer plugin defaults, but keep our custom rules overriding them)
mergePluginConfigInto(
  base,
  tsPlugin.configs &&
    (tsPlugin.configs.recommendedTypeChecked || tsPlugin.configs.recommended)
);
mergePluginConfigInto(
  base,
  reactHooks.configs && reactHooks.configs.recommended
);
mergePluginConfigInto(
  base,
  reactRefresh.configs && reactRefresh.configs.recommended
);
mergePluginConfigInto(
  base,
  prettierPlugin.configs && prettierPlugin.configs.recommended
);

export default defineConfig([globalIgnores(['dist', 'node_modules']), base]);
