const {Environment, Network, RecordSource, Store} = require('relay-runtime')

const network = Network.create((operation, variables) => {
  const url = 'http://localhost:3000/graphql'
  const request = {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({query: operation.text, variables})
  }
  return window.fetch(url, request).then(r => r.json())
})

const store = new Store(new RecordSource())

const environment = new Environment({network, store})

module.exports = {
  environment,
  store
}
