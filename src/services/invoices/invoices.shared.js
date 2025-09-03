export const invoicesPath = 'invoices'

export const invoicesMethods = ['find', 'get', 'create', 'patch', 'remove']

export const invoicesClient = client => {
  const connection = client.get('connection')

  client.use(invoicesPath, connection.service(invoicesPath), {
    methods: invoicesMethods
  })
}
