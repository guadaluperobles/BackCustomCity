// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  ratesDataValidator,
  ratesPatchValidator,
  ratesQueryValidator,
  ratesResolver,
  ratesExternalResolver,
  ratesDataResolver,
  ratesPatchResolver,
  ratesQueryResolver
} from './rates.schema.js'
import { RatesService, getOptions } from './rates.class.js'
import { ratesPath, ratesMethods } from './rates.shared.js'

export * from './rates.class.js'
export * from './rates.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const rates = app => {
  // Register our service on the Feathers application
  app.use(ratesPath, new RatesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ratesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(ratesPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(ratesExternalResolver), schemaHooks.resolveResult(ratesResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(ratesQueryValidator), schemaHooks.resolveQuery(ratesQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(ratesDataValidator), schemaHooks.resolveData(ratesDataResolver)],
      patch: [schemaHooks.validateData(ratesPatchValidator), schemaHooks.resolveData(ratesPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
