import { addTodo } from './addtodo.ts'

import { type Todo, fetchDeleted } from './api-todos.ts'

/**
 * cette function permet de de supprimer des todos une par une
 * @param index
 * @param todos
 * @param todoList
 * @param errormessage
 * @param deletedtodo
 */

export async function deleteTodo(
  index: number,
  todos: Todo[],
  todoList: HTMLUListElement,
  errormessage: HTMLParagraphElement,
  deletedtodo: Todo,
) {
  if (todoList) {
    todos.splice(index, 1)
    todoList.innerHTML = ''
    // add fetch
    await fetchDeleted(deletedtodo)
    for (const [index, todo] of todos.entries()) {
      // entries() renvoie un tableau qui correspondent aux propriétés énumérables
      addTodo(todo, index, todoList, todos, errormessage)
    }
  }
}
