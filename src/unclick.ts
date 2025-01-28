/**
 * cette function permet a si la case pour enter une nouvelle todo est vide le boutton
 * est inclickable et de limiter le nombre de caractère a 200 maximun
 * @param addTodoButton
 * @param todoInput
 */

export function unclick(
  addTodoButton: HTMLButtonElement,
  todoInput: HTMLInputElement,
) {
  if (todoInput && addTodoButton) {
    addTodoButton.disabled = !(todoInput.value && todoInput.value.length <= 200)
  }
}
