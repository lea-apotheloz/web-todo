import './style.css'

console.log('Hello from typescript')
document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.querySelector<HTMLInputElement>('#todo-input');
  const addTodoButton = document.querySelector('#add-todo-button');
  const todoList = document.querySelector('#todo-list');

  function addTodo() {
    if (todoInput && todoList) {
    const todoText = todoInput.value.trim();
    if (todoText) {
      const li = document.createElement('li');
      li.textContent = todoText;
      li.className = 'todo-element';
      todoList.appendChild(li);
      todoInput.value = '';
    }
    }
  }
  if (addTodoButton  && todoInput) {
    addTodoButton.addEventListener('click', addTodo);

    todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTodo();
      }
    });
  }
});

