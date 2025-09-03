// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  convertDataValidator,
  convertPatchValidator,
  convertQueryValidator,
  convertResolver,
  convertExternalResolver,
  convertDataResolver,
  convertPatchResolver,
  convertQueryResolver
} from './convert.schema.js'
import { ConvertService, getOptions } from './convert.class.js'
import { convertPath, convertMethods } from './convert.shared.js'

export * from './convert.class.js'
export * from './convert.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const convert = app => {
  // Register our service on the Feathers application
  app.use(convertPath, new ConvertService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: convertMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(convertPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(convertExternalResolver),
        schemaHooks.resolveResult(convertResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(convertQueryValidator), schemaHooks.resolveQuery(convertQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(convertDataValidator), schemaHooks.resolveData(convertDataResolver)],
      patch: [schemaHooks.validateData(convertPatchValidator), schemaHooks.resolveData(convertPatchResolver)],
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
