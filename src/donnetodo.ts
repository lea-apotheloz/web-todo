
import {fetchPatch,type Todo} from './api-todos.ts'

export async function donetodo(
  index: number,
  todoList: HTMLUListElement,
  todos: Todo[],
  todospatch: Todo
) {
  console.log(todos)
  if (todoList) {
    if (todos[index]) {
      todos[index].done = !todos[index].done;
    }
  }
  await fetchPatch(todospatch, todos, index)
}
