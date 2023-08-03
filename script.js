const todoItems = [];

function renderTodoList() {
  const todoList = document.getElementById('todoList')
  let content = ''
  todoList.innerHTML = content

  if (todoItems.length == 0) {
    return
  }

  const todoListElement = document.createElement('ul')

  todoItems.forEach(todoItem => {

    const todoListItemElement = document.createElement('li')
    todoListItemElement.innerHTML = `<span>${todoItem}</span>`;

    todoListElement.append(todoListItemElement)

  })

  content = todoListElement
  todoList.appendChild(content)
}
renderTodoList();

const addButton = document.getElementById('addBtn')
addButton.addEventListener('click', () => {
  const input = document.getElementById('todoInput')
  inputValue = input.value.trim()
  if (!inputValue) {
    return
  }
  todoItems.push(inputValue);

  renderTodoList();
  input.value = '';
})
