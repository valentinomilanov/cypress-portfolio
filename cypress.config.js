import { defineConfig } from 'cypress'
import { setupJsonlLogger } from 'cypress-jsonl-logger/node'

export default defineConfig({
  e2e: {
    allowCypressEnv: false,
    setupNodeEvents(on, config) {
      setupJsonlLogger(on, config)
    }
  }
})
