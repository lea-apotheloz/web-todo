export interface Todo {
  id: string
  title: string
  content: string
  due_date: string
  done: boolean
}

export async function fetchPost(
  title: string,
  due_date: string,
  done: boolean,
) {
  await fetch('https://api.todos.in.jt-lab.ch/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      due_date: due_date,
      done: done,
    }),
  })
}

export async function fetchDeleted(deletedtodo: Todo) {
  await fetch(`https://api.todos.in.jt-lab.ch/todos?id=eq.${deletedtodo.id}`, {
    method: 'DELETE',
  })
}

export async function fetchDeletedall() {
  await fetch('https://api.todos.in.jt-lab.ch/todos', {
    method: 'DELETE',
  })
}

export async function fetchPatch(
  todospatch: Todo,
  todos: Todo[],
  index: number,
) {
  console.log(todospatch)
  fetch(`https://api.todos.in.jt-lab.ch/todos?id=eq.${todospatch.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      done: todos[index].done,
    }),
  })
}
