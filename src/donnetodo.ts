import type { Todo } from './interface.ts'

export function donetodo(
  index: number,
  todoList: HTMLUListElement,
  todos: Todo[],
) {
  if (todoList) {
    if (todos[index].status === 'done') {
      todos[index].status = 'undone '
    } else {
      todos[index].status = 'done'
    }
    localStorage.setItem('value', JSON.stringify(todos))
  }
}
