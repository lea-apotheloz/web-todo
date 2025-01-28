import type { Todo } from './interface.ts'
import { errormessage } from './main.ts'

/**
 * cette function permet de de regarder le que l'on est et si une date est deja passer afficher un message d'error
 * @param today
 * @param todos
 */

export function overdueMessage(today: Date, todos: Todo[]) {
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
