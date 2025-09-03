import { convert } from './convert/convert.js'
import { rates } from './rates/rates.js'
import { invoices } from './invoices/invoices.js'
export const services = app => {
  app.configure(convert)

  app.configure(rates)

  app.configure(invoices)

  // All services will be registered here
}
