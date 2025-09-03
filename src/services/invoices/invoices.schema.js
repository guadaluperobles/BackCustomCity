// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const invoicesSchema = {
  $id: 'Invoices',
  type: 'object',
  additionalProperties: false,
  required: [
    '_id',
    'invoiceNumber',
    'clientName',
    'date',
    'status',
    'amount',
    'delete'
  ],
  properties: {
    _id: ObjectIdSchema(),
    invoiceNumber: { type: 'string' },
    clientName: { type: 'string' },
    date: { type: 'string', format: 'date-time' },
    status: { type: 'boolean' },
    amount: { type: 'number' },
    delete: { type: 'string',  format: 'date-time' }
  }
}

/**

 */
export const invoicesValidator = getValidator(invoicesSchema, dataValidator)
export const invoicesResolver = resolve({})

export const invoicesExternalResolver = resolve({})

// Schema for creating new data
export const invoicesDataSchema = {
  $id: 'InvoicesData',
  type: 'object',
  additionalProperties: false,
  required: ['invoiceNumber'],
  properties: {
    ...invoicesSchema.properties
  }
}
export const invoicesDataValidator = getValidator(invoicesDataSchema, dataValidator)
export const invoicesDataResolver = resolve({})

// Schema for updating existing data
export const invoicesPatchSchema = {
  $id: 'InvoicesPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...invoicesSchema.properties
  }
}
export const invoicesPatchValidator = getValidator(invoicesPatchSchema, dataValidator)
export const invoicesPatchResolver = resolve({})

// Schema for allowed query properties
export const invoicesQuerySchema = {
  $id: 'InvoicesQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(invoicesSchema.properties)
  }
}
export const invoicesQueryValidator = getValidator(invoicesQuerySchema, queryValidator)
export const invoicesQueryResolver = resolve({})
