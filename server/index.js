const express = require('express')
const graphQLHTTP = require('express-graphql')
const schema = require('../graphql/schema')
const cors = require('cors')

function createServer () {
  const server = express()
  server.use('/graphql', cors(), graphQLHTTP({schema, graphiql: true}))
  return server
}

module.exports = {
  createServer
}
