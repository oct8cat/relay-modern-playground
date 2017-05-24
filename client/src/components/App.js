const React = require('react')
const {graphql, createFragmentContainer, commitMutation} = require('react-relay')
const {environment} = require('../relay/environment')

const MOTD = ({message}) => {
  return <h1>{message}</h1>
}

const TodoList = ({todos}) => {
  return <div>
    <h2>Todos</h2>
    <ul>
      {todos.map((todo, key) => {
        return <li key={key}>{todo.id} - {todo.text}</li>
      })}
    </ul>
  </div>
}

const CreateTodo = () => {
  const onClick = (e) => {
    const mutation = graphql`
      mutation App_createTodoMutation($input: CreateTodoMutationInput!) {
        createTodo(input: $input) {
          todo {
            id
            text
          }
          clientMutationId
          viewer {
            allTodos {
              id
              text
            }
          }
        }
      }
    `
    const variables = {
      input: {text: 'todo', clientMutationId: Date.now()}
    }
    commitMutation(environment, {mutation, variables})
  }
  return <button type='button' onClick={onClick}>Create todo</button>
}

const App = ({viewer}) => {
  return <div>
    <MOTD message={viewer.motd} />
    <TodoList todos={viewer.allTodos} />
    <CreateTodo />
  </div>
}

module.exports = createFragmentContainer(App, {
  viewer: graphql`
    fragment App_viewer on Viewer {
      motd
      allTodos {
        id
        text
      }
    }
  `
})
