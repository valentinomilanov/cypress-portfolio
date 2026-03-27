import { defineConfig } from 'cypress'
import { setupJsonlLogger } from 'cypress-jsonl-logger/node'

export default defineConfig({
  e2e: {
    baseUrl: 'https://practicesoftwaretesting.com',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    allowCypressEnv: false,
    pageLoadTimeout: 30000,
    defaultCommandTimeout: 10000,
    retries: {
      runMode: 2,
      openMode: 0
    },
    setupNodeEvents(on, config) {
      setupJsonlLogger(on, config)
    }
  }
})
