import { addTodo } from './addtodo.ts'
import { unclick } from './unclick.ts'
import type { Todo } from './interface.ts'
import { errormessage } from './main.ts'
import { todos } from './main.ts'
import { duedate } from './main.ts'
import { error } from './main.ts'
import { todoInput } from './main.ts'
import { addTodoButton } from './main.ts'

/**
 * cette function sert a gerer le stokage  et le mettre dans le localstorage
 * ainsi que précicer leur status stocker aussi dans le local storage.
 */

export function stokagetodo() {
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
