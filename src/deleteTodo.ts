import { addTodo } from './addtodo.ts'
import type { Todo } from './interface.ts'

/**
 * cette function permet de de supprimer des todos une par une
 * @param index
 * @param todos
 * @param todoList
 * @param errormessage
 */

export function deleteTodo(
  index: number,
  todos: Todo[],
  todoList: HTMLUListElement,
  errormessage: HTMLParagraphElement,
) {
  if (todoList) {
    todos.splice(index, 1)
    localStorage.setItem('value', JSON.stringify(todos))
    todoList.innerHTML = ''
    for (const [index, todo] of todos.entries()) {
      addTodo(todo, index, todoList, todos, errormessage)
    }
  }
}
