import type { Todo } from './interface.ts'
/**
 * cette function permet de de regarder le que l'on est et si une date est deja passer afficher un message d'error
 * @param today
 * @param todos
 * @param errormessage
 */

export function overdueMessage(
  today: Date,
  todos: Todo[],
  errormessage: HTMLParagraphElement,
) {
  let container = 0
  for (const todo of todos) {
    if (today.toISOString().slice(0, 10) > todo.date) {
      container++
    }
  }
  if (errormessage) {
    if (container > 0) {
      errormessage.textContent = 'you have a todo that is due'
    } else {
      errormessage.textContent = ''
    }
  }
}
