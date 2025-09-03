// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const convertSchema = {
  $id: 'Convert',
  type: 'object',
  additionalProperties: false,
  required: ['_id', 'text'],
  properties: {
    _id: ObjectIdSchema(),
    text: { type: 'string' }
  }
}
export const convertValidator = getValidator(convertSchema, dataValidator)
export const convertResolver = resolve({})

export const convertExternalResolver = resolve({})

// Schema for creating new data
export const convertDataSchema = {
  $id: 'ConvertData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    ...convertSchema.properties
  }
}
export const convertDataValidator = getValidator(convertDataSchema, dataValidator)
export const convertDataResolver = resolve({})

// Schema for updating existing data
export const convertPatchSchema = {
  $id: 'ConvertPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...convertSchema.properties
  }
}
export const convertPatchValidator = getValidator(convertPatchSchema, dataValidator)
export const convertPatchResolver = resolve({})

// Schema for allowed query properties
export const convertQuerySchema = {
  $id: 'ConvertQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(convertSchema.properties)
  }
}
export const convertQueryValidator = getValidator(convertQuerySchema, queryValidator)
export const convertQueryResolver = resolve({})
