import antfu from '@antfu/eslint-config'
import format from 'eslint-plugin-format'

export default antfu({
  files: ['**/*.vue', '**/*.js', '**/*.ts'],
  rules: {
    'unused-imports/no-unused-vars': 0,
    'node/prefer-global/process': 0,
    'no-console': 1,
    'vue/no-mutating-props': 0,
  },
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
    plugins: {
      format,
    },
  },
})
