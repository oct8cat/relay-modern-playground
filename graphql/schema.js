const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql')

const {
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId
} = require('graphql-relay')

const {
  viewer,
  todo,
  createTodo
} = require('./resolvers')

const {nodeInterface: Node, nodeField: node} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId)
    if (type === 'Todo') return todo(id)
  },
  (node) => {
    switch (node._type) {
      case 'Todo': return Todo
    }
  }
)

const Todo = new GraphQLObjectType({
  name: 'Todo',
  fields: {
    id: globalIdField(),
    text: {type: GraphQLString}
  },
  interfaces: [Node]
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
    node,
    viewer: {type: Viewer, resolve: viewer}
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createTodo: mutationWithClientMutationId({
      name: 'CreateTodoMutation',
      inputFields: {
        text: {type: GraphQLString}
      },
      outputFields: {
        todo: {type: Todo},
        viewer: {type: Viewer, resolve: viewer}
      },
      mutateAndGetPayload: createTodo
    })
  }
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})
