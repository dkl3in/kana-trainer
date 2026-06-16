import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['src/**/*.{js,vue}'],
    languageOptions: {
      globals: {
        // Browser globals — this is a browser SPA with no node runtime
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        console: 'readonly'
      }
    },
    rules: {
      // Vue rules
      'vue/no-unused-vars': 'error',
      'vue/require-v-for-key': 'error',
      'vue/no-use-v-if-with-v-for': 'error',

      // JS rules
      'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    }
  },
  {
    // Test files may use globals freely
    files: ['src/**/*.test.js'],
    rules: {
      'no-unused-vars': 'warn'
    }
  },
  {
    // Ignore generated/config files
    ignores: ['dist/', 'node_modules/', 'scripts/', 'public/']
  }
]
