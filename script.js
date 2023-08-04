
let todoItems;

window.onload = () => {
  todoItems = []
  renderTodoList()
}

class ToDoItem {
  constructor(id, task, isCmpleted) {
    this.id = id;
    this.task = task;
    this.isCmpleted = isCmpleted;
  }
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
    completeButton.setAttribute("onClick", `completeTodoItem("${todoItem.id}")`)
    completeButton.innerText = "Complete"
    todoListItemElement.append(completeButton)

    const deleteButton = document.createElement('button')
    deleteButton.setAttribute("type", "submit")
    deleteButton.setAttribute("value", todoItem.id)
    deleteButton.setAttribute("onClick", `deleteTodoItem("${todoItem.id}")`)
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
  inputValue = input.value.trim()
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
  console.log("deletes", targetID)
  todoItems = todoItems.filter(
    (todoItem) => todoItem.id != targetID
  )

  renderTodoList();
}

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

