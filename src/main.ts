import './style.css'
interface Todo {
  text: string
}
console.log('Hello from typescript')
//document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.querySelector<HTMLInputElement>('#todo-input')
  const addTodoButton = document.querySelector('#add-todo-button')
  const todoList = document.querySelector('#todo-list')
  const deserialized = localStorage.getItem('value')



  let todos: Todo[] = []
  if (deserialized) todos = JSON.parse(deserialized)
  todos.forEach(addTodo)

  function addTodo(todo: Todo, index: number) {
    if (todoList) {
      const todoText = todo.text
      if (todoText) {
        const li = document.createElement('li')
        li.textContent = todoText

        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'delete'
        deleteButton.addEventListener('click', () => {
          deleteTodo(index)
        })
        li.appendChild(deleteButton)

        li.className = 'todo-element'
        todoList.appendChild(li)
      }
    }
  }
  function deleteTodo(index: number){
    if (todoList) {
      todos.splice(index, 1)
      localStorage.setItem('value', JSON.stringify(todos))
      todoList.remove()
      todos.forEach(addTodo)
    }
  }
  if (addTodoButton && todoInput) {
    addTodoButton.addEventListener('click', stokagetodo)

    todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        stokagetodo()
      }
    })
  }
  function stokagetodo() {
    if (todoInput) {
      const text: string = todoInput.value.trim()
      if (text) {
        const newtodo: Todo = { text }
        todos.push(newtodo)
        const serialized = JSON.stringify(todos)
        localStorage.setItem('value', serialized)
        todoInput.value = ''
        addTodo(newtodo, todos.length - 1)

      }
    }
  }
//})
