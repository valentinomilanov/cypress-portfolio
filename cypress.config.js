import { defineConfig } from 'cypress'
import { setupJsonlLogger } from 'cypress-jsonl-logger/node'

export default defineConfig({
  e2e: {
    allowCypressEnv: false,
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://practicesoftwaretesting.com',
    pageLoadTimeout: 30000,
    defaultCommandTimeout: 10000,
    retries: {
      runMode: 2,
      openMode: 0
    },
    setupNodeEvents(on, config) {
      setupJsonlLogger(on, config)
      on('task', {
        getApiUrl() {
          return process.env.CYPRESS_API_URL || 'https://api.practicesoftwaretesting.com'
        }
      })
    }
  }
})