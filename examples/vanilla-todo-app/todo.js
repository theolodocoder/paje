// state of the app
const todos = [];

// HTML Element reference
const addTodoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo-btn");
const todosList = document.getElementById("todos-list");

// Initialize todos view
for (const todo of todos) {
  todosList.append(renderTodosInReadMode(todo));
}

function isValidTodo(str) {
  return str.trim().length >= 3 && !todos.includes(str.trim());
}

function updateAddButtonState() {
  addTodoButton.disabled = !isValidTodo(addTodoInput.value);
}

addTodoInput.addEventListener("input", updateAddButtonState);

addTodoInput.addEventListener("keydown", ({ key }) => {
  if (key === "Enter" && isValidTodo(addTodoInput.value)) {
    addTodo();
  }
});

addTodoButton.addEventListener("click", () => addTodo());

// Functions
function renderTodosInReadMode(todo) {
  const li = document.createElement("li");
  const span = document.createElement("span");

  span.textContent = todo;

  span.addEventListener("dblclick", () => {
    const todoIdx = todos.indexOf(todo);
    todosList.replaceChild(
      renderTodosInEditMode(todo),
      todosList.childNodes[todoIdx]
    );
  });

  li.append(span);

  const button = document.createElement("button");
  button.textContent = "Done";

  button.addEventListener("click", () => {
    const todoIdx = todos.indexOf(todo);
    removeTodo(todoIdx);
  });

  li.append(button);
  return li;
}

function renderTodosInEditMode(todo) {
  const todoIdx = todos.indexOf(todo);
  const li = document.createElement("li");

  const input = document.createElement("input");
  input.type = "text";
  input.value = todo;
  input.autofocus = true;

  li.append(input);

  const saveButton = document.createElement("button");
  const cancelButton = document.createElement("button");

  saveButton.textContent = "Save";
  cancelButton.textContent = "Cancel";

  function updateSaveButtonState() {
    saveButton.disabled =
      input.value.trim().length < 3 ||
      (todos.includes(input.value.trim()) && input.value.trim() !== todo);
  }

  input.addEventListener("input", updateSaveButtonState);

  saveButton.addEventListener("click", () => {
    const newValue = input.value.trim();
    if (
      newValue.length < 3 ||
      (todos.includes(newValue) && newValue !== todo)
    ) {
      return;
    }
    todos[todoIdx] = newValue;
    todosList.replaceChild(
      renderTodosInReadMode(newValue),
      todosList.childNodes[todoIdx]
    );
  });

  cancelButton.addEventListener("click", () => {
    todosList.replaceChild(
      renderTodosInReadMode(todo),
      todosList.childNodes[todoIdx]
    );
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !saveButton.disabled) {
      saveButton.click();
    }
    if (e.key === "Escape") {
      cancelButton.click();
    }
  });

  li.append(saveButton, cancelButton);

  setTimeout(() => input.focus(), 0);
  updateSaveButtonState();

  return li;
}

function addTodo() {
  const todo = addTodoInput.value.trim();
  if (!isValidTodo(todo)) return;

  todos.push(todo);
  const todoList = renderTodosInReadMode(todo);
  todosList.append(todoList);

  addTodoInput.value = "";
  updateAddButtonState();
}

function removeTodo(idx) {
  if (idx < 0 || idx >= todos.length) return;
  todos.splice(idx, 1);
  todosList.childNodes[idx].remove();
}
