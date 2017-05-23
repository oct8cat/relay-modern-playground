const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql')

const {
  viewer
} = require('./resolvers')

const Todo = new GraphQLObjectType({
  name: 'Todo',
  fields: {
    text: {type: GraphQLString}
  }
})

const Viewer = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    motd: {type: GraphQLString},
    allTodos: {type: new GraphQLList(Todo)}
  }
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {type: Viewer, resolve: viewer}
  }
})

module.exports = new GraphQLSchema({
  query: Query
})
