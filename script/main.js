import ToDoItem from "./ToDoItem.js";
import uuidv4 from "./uuidv4.js";

let todoItems;

window.onload = () => {
  todoItems = []
  renderTodoList()
  
}

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

    let innerElement = ''

    if (todoItem.isCmpleted) {
      innerElement = document.createElement('s')
    } else {
      innerElement = document.createElement('span')
    }

    innerElement.innerText = todoItem.task;
    todoListItemElement.append(innerElement)

    const completeButton = document.createElement('button')
    completeButton.setAttribute("type", "submit")
    completeButton.setAttribute("value", todoItem.id)
    completeButton.innerText = "Complete"
    completeButton.addEventListener('click', () => { completeTodoItem(todoItem.id) })
    todoListItemElement.append(completeButton)

    const deleteButton = document.createElement('button')
    deleteButton.setAttribute("type", "submit")
    deleteButton.setAttribute("value", todoItem.id)
    deleteButton.addEventListener('click', () => { deleteTodoItem(todoItem.id) })
    deleteButton.innerText = "Delete"
    todoListItemElement.append(deleteButton)

    todoListElement.append(todoListItemElement)

  })

  content = todoListElement
  todoList.appendChild(content)
}

const addButton = document.getElementById('addButton')

addButton.addEventListener('click', () => {
  const input = document.getElementById('todoInput')
  const inputValue = input.value.trim()
  if (!inputValue) {
    return
  }
  const newTodoItem = new ToDoItem(uuidv4(), inputValue, false)
  todoItems.push(newTodoItem);

  renderTodoList();

  input.value = '';
})

function completeTodoItem(targetID) {
  todoItems.forEach(todoItem => {
    if (todoItem.id == targetID) {
      todoItem.isCmpleted = !todoItem.isCmpleted
    }
  });

  renderTodoList();
}

function deleteTodoItem(targetID) {
  todoItems = todoItems.filter(
    (todoItem) => todoItem.id != targetID
  )

  renderTodoList();
}
