const React = require('react')
const {graphql, createFragmentContainer, commitMutation} = require('react-relay')
const environment = require('../relay/environment')

const MOTD = ({message}) => {
  return <h1>{message}</h1>
}

const TodoList = ({todos}) => {
  return <div>
    <h2>Todos</h2>
    <ul>
      {todos.map((todo, key) => {
        return <li key={key}>{todo.text}</li>
      })}
    </ul>
  </div>
}

const App = ({viewer}) => {
  return <div>
    <MOTD message={viewer.motd} />
    <TodoList todos={viewer.allTodos} />
  </div>
}

module.exports = createFragmentContainer(App, {
  viewer: graphql`
    fragment App_viewer on Viewer {
      motd
      allTodos {
        text
      }
    }
  `
})
