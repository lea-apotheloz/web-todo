import './style.css'
interface Todo {
  text: string
  status: string
  date: string
}
console.log('Hello from typescript')
const todoInput = document.querySelector<HTMLInputElement>('#todo-input')
const addTodoButton =
  document.querySelector<HTMLButtonElement>('#add-todo-button')
const todoList = document.querySelector('#todo-list')
const deserialized = localStorage.getItem('value')
const deleteall = document.querySelector('#delete-all')
const duedate = document.querySelector<HTMLInputElement>('#due-date')
const error = document.querySelector<HTMLParagraphElement>(
  '#todo-creation-error',
)
const errormessage =
  document.querySelector<HTMLParagraphElement>('.errormessage')

if (todoInput && addTodoButton) {
  addTodoButton.disabled = true
  todoInput.addEventListener('input', () => {
    unclick(addTodoButton, todoInput)
  })
}
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
      deleteButton.innerHTML =
        '<img width="20" height="20" src="https://cdn-icons-png.flaticon.com/256/8567/8567781.png" alt="filled-trash"/>'
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

      const today = new Date()
      const deadline = new Date(todo.date)
      const afterfordays = new Date(today)
      afterfordays.setDate(afterfordays.getDate() + 4)

      const formatToday = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
      const formatDeadline = `${deadline.getFullYear()}-${deadline.getMonth() + 1}-${deadline.getDate()}`

      const dates = document.createElement('p')
      const time = document.createElement('time')
      time.textContent = todo.date
      if (
        deadline.toISOString().slice(0, 10) < today.toISOString().slice(0, 10)
      ) {
        dates.style.color = '#FF00FF'
      } else if (formatDeadline === formatToday) {
        dates.style.color = '#ff7800'
      } else if (deadline > today && deadline < afterfordays) {
        dates.style.color = '#f0fc00'
      } else {
        dates.style.color = '#19fc9c'
      }
      dates.appendChild(time)
      li.appendChild(dates)

      li.className = 'todo-element'
      todoList.appendChild(li)
      overdueMessage(today, todos)
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
      unclick(addTodoButton, todoInput)
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
  if (todoInput && duedate && addTodoButton && error && errormessage) {
    const text: string = todoInput.value.trim()
    const dates = new Date(duedate.value)
    if (Number.isNaN(dates.valueOf())) {
      error.textContent = 'invalid date'
    } else {
      const date: string = duedate.value.trim()
      if (text) {
        const newtodo: Todo = { text, status: 'undone', date }
        todos.push(newtodo)
        const serialized = JSON.stringify(todos)
        localStorage.setItem('value', serialized)
        todoInput.value = ''
        addTodo(newtodo, todos.length - 1)
        unclick(addTodoButton, todoInput)
        error.textContent = ''
      }
    }
  }
}
function unclick(
  addTodoButton: HTMLButtonElement,
  todoInput: HTMLInputElement,
) {
  if (todoInput && addTodoButton) {
    addTodoButton.disabled = !(todoInput.value && todoInput.value.length <= 200)
  }
}

function overdueMessage(today: Date, todos: Todo[]) {
  let container = 0
  for (const todo of todos) {
    if (today.toISOString().slice(0, 10) > todo.date) {
      container++
    }
  }
  if (errormessage) {
    if (container > 0) {
      errormessage.textContent = 'you have a todo that is due'
    } else {
      errormessage.textContent = ''
    }
  }
}
