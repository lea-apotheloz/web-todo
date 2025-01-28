import { deleteTodo } from './deleteTodo.ts'
import { donetodo } from './donnetodo.ts'
import { overdueMessage } from './overdueMessage.ts'
import type { Todo } from './interface.ts'
import { todos } from './main.ts'
import { todoList } from './main.ts'

/**
 * cette function permet permett d'ajouter des todo dans un liste "li"
 * cration du bottent qui permet de les ajouter et les supprimer
 * genere aussi le jours ou l on écrite cette todos en creant un paragraphe qui
 * sera ou est mis la date.
 * @param todo
 * @param index
 */

export function addTodo(todo: Todo, index: number) {
  if (todoList) {
    const todoText = todo.text
    if (todoText) {
      const li = document.createElement('li')
      li.textContent = todoText

      const deleteButton = document.createElement('button')
      deleteButton.innerHTML =
        '<img width="20" height="20" src="https://cdn-icons-png.flaticon.com/256/8567/8567781.png" alt="filled-trash"/>'
      deleteButton.addEventListener('click', () => {
        deleteTodo(index)
      })
      li.appendChild(deleteButton)

      const status = document.createElement('input')
      status.type = 'checkbox'
      status.checked = todo.status === 'done'
      status.addEventListener('change', () => {
        donetodo(index)
      })
      li.appendChild(status)

      const today = new Date()
      const deadline = new Date(todo.date)
      const afterfordays = new Date(today)
      afterfordays.setDate(afterfordays.getDate() + 4)

      const formatToday = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
      const formatDeadline = `${deadline.getFullYear()}-${deadline.getMonth() + 1}-${deadline.getDate()}`

      const dates = document.createElement('p')
      const time = document.createElement('time')
      time.textContent = todo.date
      if (
        deadline.toISOString().slice(0, 10) < today.toISOString().slice(0, 10)
      ) {
        dates.style.color = '#FF00FF'
      } else if (formatDeadline === formatToday) {
        dates.style.color = '#ff7800'
      } else if (deadline > today && deadline < afterfordays) {
        dates.style.color = '#f0fc00'
      } else {
        dates.style.color = '#19fc9c'
      }
      dates.appendChild(time)
      li.appendChild(dates)

      li.className = 'todo-element'
      todoList.appendChild(li)
      overdueMessage(today, todos)
    }
  }
}
