import { addTodo } from './addtodo.ts'
import { todos } from './main.ts'
import { todoList } from './main.ts'

/**
 * cette function permet de de supprimer des todos une par une
 * @param index
 */

export function deleteTodo(index: number) {
  if (todoList) {
    todos.splice(index, 1)
    localStorage.setItem('value', JSON.stringify(todos))
    todoList.innerHTML = ''
    todos.forEach(addTodo)
  }
}
