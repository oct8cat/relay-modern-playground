const db = {
  todos: [
    {text: 'Item #1'},
    {text: 'Item #2'}
  ]
}

const viewer = () => ({
  motd: 'relay-modern-playground',
  allTodos: db.todos
})

module.exports = {
  viewer
}
