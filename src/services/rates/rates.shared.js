export const ratesPath = 'rates'

export const ratesMethods = ['find', 'get', 'create', 'patch', 'remove']

export const ratesClient = client => {
  const connection = client.get('connection')

  client.use(ratesPath, connection.service(ratesPath), {
    methods: ratesMethods
  })
}
