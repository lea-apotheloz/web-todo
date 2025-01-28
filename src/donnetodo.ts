import { todoList } from './main.ts'
import { todos } from './main.ts'

export function donetodo(index: number) {
  if (todoList) {
    if (todos[index].status === 'done') {
      todos[index].status = 'undone '
    } else {
      todos[index].status = 'done'
    }
    localStorage.setItem('value', JSON.stringify(todos))
  }
}
