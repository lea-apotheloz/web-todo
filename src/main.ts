import './style.css'
import { addTodo } from './addtodo.ts'
import { type Todo, fetchDeletedall } from './api-todos.ts'
import { stokagetodo } from './stokagetodo.ts'
import { unclick } from './unclick.ts'

console.log('Hello from typescript')

export const todoInput = document.querySelector<HTMLInputElement>('#todo-input')
export const addTodoButton =
  document.querySelector<HTMLButtonElement>('#add-todo-button')
export const todoList = document.querySelector<HTMLUListElement>('#todo-list')
const deleteall = document.querySelector('#delete-all')
export const duedate = document.querySelector<HTMLInputElement>('#due-date')
export const error = document.querySelector<HTMLParagraphElement>(
  '#todo-creation-error',
)
export const errormessage =
  document.querySelector<HTMLParagraphElement>('.errormessage')

if (todoInput && addTodoButton) {
  addTodoButton.disabled = true
  todoInput.addEventListener('input', () => {
    unclick(addTodoButton, todoInput)
  })
}

// add to api fetch deletedall
const response = await fetch('https://api.todos.in.jt-lab.ch/todos')
export const gettodo: Todo[] = await response.json()

export const todos: Todo[] = []
if (todoList)
  if (errormessage)
    for (const [index, todo] of gettodo.entries()) {
      addTodo(todo, index, todoList, gettodo, errormessage)
    }

if (addTodoButton && todoInput && duedate) {
  if (todoList) {
    addTodoButton.addEventListener('click', () => {
      stokagetodo(todoInput, duedate, addTodoButton)
    })
  }

  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      stokagetodo(todoInput, duedate, addTodoButton)
      unclick(addTodoButton, todoInput)
    }
  })
}
if (deleteall) {
  deleteall.addEventListener('click', async () => {
    if (todoList) {
      await fetchDeletedall()
      todos.length = 0
      todoList.innerHTML = ''
    }
  })
}
