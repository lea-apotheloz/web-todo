import './style.css'
interface Todo {
  text: string
  status: string
}
console.log('Hello from typescript')
const todoInput = document.querySelector<HTMLInputElement>('#todo-input')
const addTodoButton = document.querySelector('#add-todo-button')
const todoList = document.querySelector('#todo-list')
const deserialized = localStorage.getItem('value')
const deleteall = document.querySelector('#delete-all')

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

      const status = document.createElement('input')
      status.type = 'checkbox'
      status.checked = todo.status === 'done'
      status.addEventListener('change', () => {
        donetodo(index)
      })
      li.appendChild(status)

      li.className = 'todo-element'
      todoList.appendChild(li)
    }
  }
}

function deleteTodo(index: number) {
  if (todoList) {
    todos.splice(index, 1)
    localStorage.setItem('value', JSON.stringify(todos))
    todoList.innerHTML = ''
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
if (deleteall) {
  deleteall.addEventListener('click', () => {
    if (todoList) {
      todos.length = 0
      localStorage.removeItem('value')
      todoList.innerHTML = ''
    }
  })
}

function donetodo(index: number) {
  if (todoList) {
    if (todos[index].status === 'done') {
      todos[index].status = 'undone '
    } else {
      todos[index].status = 'done'
    }
    localStorage.setItem('value', JSON.stringify(todos))
  }
}

function stokagetodo() {
  if (todoInput) {
    const text: string = todoInput.value.trim()
    if (text) {
      const newtodo: Todo = { text, status: 'undone' }
      todos.push(newtodo)
      const serialized = JSON.stringify(todos)
      localStorage.setItem('value', serialized)
      todoInput.value = ''
      addTodo(newtodo, todos.length - 1)
    }
  }
}
