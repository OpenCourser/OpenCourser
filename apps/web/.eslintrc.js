const fs = require('fs');
const ignoredSortingDirectories = ['.git', '.next', '.vscode', 'node_modules'];

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  root: true,
  env: {
    browser: true,
    node: true,
  },
  rules: {
    '@next/next/no-html-link-for-pages': 1,
    'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
    'import/order': [
      1,
      {
        groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'],
        pathGroups: [
          ...getDirectoriesToSort().map((singleDir) => ({
            pattern: `${singleDir}/**`,
            group: 'internal',
          })),
          { pattern: 'env', group: 'internal' },
          { pattern: 'theme', group: 'internal' },
          { pattern: 'public/**', group: 'internal', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: ['internal'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};

function getDirectoriesToSort() {
  return getDirectories(process.cwd()).filter((f) => !ignoredSortingDirectories.includes(f));
}

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + '/' + file).isDirectory();
  });
}
