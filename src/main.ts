import './style.css'
import { stockageCategories } from './addcategorie.ts'
import { addTodo } from './addtodo.ts'
import { type Todo, fetchDeletedall } from './api-todos.ts'
import { afficherCategories } from './categorie.ts'
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

//categories
const addCategoriesButton =
  document.querySelector<HTMLButtonElement>('#category-button')
const categoriesColor =
  document.querySelector<HTMLInputElement>('#categoriesColor')
const categoriesInput =
  document.querySelector<HTMLInputElement>('#categoriesInput')
export const ulCategories =
  document.querySelector<HTMLLIElement>('#category-list')

export interface CAT {
  id: number
  title: string
  color: string
}

const responsecategorie = await fetch(
  'https://api.todos.in.jt-lab.ch/categories',
)
export const getcategorie: CAT[] = await responsecategorie.json()
for (const [indexCat, categorie] of getcategorie.entries()) {
  afficherCategories(categorie, indexCat, ulCategories)
}

if (addCategoriesButton) {
  addCategoriesButton.addEventListener('click', () => {
    if (categoriesInput && categoriesColor) {
      stockageCategories(categoriesInput, categoriesColor, getcategorie)
      categoriesInput.value = ''
    }
  })
}

// fin categories

export const errormessage =
  document.querySelector<HTMLParagraphElement>('.errormessage')

if (todoInput && addTodoButton) {
  addTodoButton.disabled = true
  todoInput.addEventListener('input', () => {
    unclick(addTodoButton, todoInput)
  })
}

// add to api fetch
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
