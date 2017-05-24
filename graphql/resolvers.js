const db = {
  todos: [
    {id: '1', text: 'Item #1'},
    {id: '2', text: 'Item #2'}
  ]
}

const wrapNode = (_type, node) => Object.assign(node, {_type})

const viewer = () => ({
  motd: 'relay-modern-playground',
  allTodos: db.todos
})

const todo = (id) => {
  const node = db.todos.find(todo => todo.id === id)
  return wrapNode('Todo', node)
}

const createTodo = ({text}) => {
  const id = String(db.todos.length + 1)
  const todo = {id, text: `Item #${db.todos.length + 1}`}
  db.todos.push(todo)
  return {todo}
}

module.exports = {
  viewer,
  todo,
  createTodo
}
