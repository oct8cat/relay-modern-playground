const {Environment, Network, RecordSource, Store} = require('relay-runtime')

const network = Network.create((operation) => {
  const url = 'http://localhost:3000/graphql'
  const request = {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({query: operation.text})
  }
  return window.fetch(url, request).then(r => r.json())
})

const store = new Store(new RecordSource())

module.exports = new Environment({network, store})
