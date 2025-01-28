import './style.css'
import { addTodo } from './addtodo.ts'
import type { Todo } from './interface.ts'
import { stokagetodo } from './stokagetodo.ts'
import { unclick } from './unclick.ts'

console.log('Hello from typescript')

export const todoInput = document.querySelector<HTMLInputElement>('#todo-input')
export const addTodoButton =
  document.querySelector<HTMLButtonElement>('#add-todo-button')
export const todoList = document.querySelector('#todo-list')
const deserialized = localStorage.getItem('value')
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
export let todos: Todo[] = []
if (deserialized) todos = JSON.parse(deserialized)
todos.forEach(addTodo)

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
