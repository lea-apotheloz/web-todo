import { addTodo } from './addtodo.ts'
import { fetchPost } from './api-todos.ts'
import { error, errormessage, todoList, todos } from './main.ts'
import { unclick } from './unclick.ts'

/**
 * cette function sert a gerer le stokage  et le mettre dans le localstorage
 *
 */

export async function stokagetodo(
  todoInput: HTMLInputElement,
  duedate: HTMLInputElement,
  addTodoButton: HTMLButtonElement,
) {
  if (todoInput && duedate && addTodoButton && todos && todoList) {
    if (errormessage && error) {
      const text: string = todoInput.value.trim()
      const dates = new Date(duedate.value)
      if (Number.isNaN(dates.valueOf())) {
        error.textContent = 'invalid date'
      } else {
        const due_date: string = duedate.value.trim()
        if (text) {
          const newtodo = {
            done: false,
            due_date,
            title: text,
            id: text,
            content: text,
          }
          // add to api fetch
          await fetchPost(newtodo.title, newtodo.due_date, newtodo.done)

          todos.push(newtodo)
          todoInput.value = ''
          addTodo(newtodo, todos.length - 1, todoList, todos, errormessage)
          unclick(addTodoButton, todoInput)
          error.textContent = ''
        }
      }
    }
  }
}
