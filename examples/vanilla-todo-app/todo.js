/**
 * State of the app: Array of todo strings.
 * @type {string[]}
 */
const todos = [];

/**
 * Speech synthesis instance and available voices.
 * @type {SpeechSynthesis}
 */
const synth = window.speechSynthesis;
/**
 * @type {SpeechSynthesisVoice[]}
 */
const voices = synth.getVoices();

// HTML Element references
/** @type {HTMLInputElement} */
const addTodoInput = document.getElementById("todo-input");
/** @type {HTMLButtonElement} */
const addTodoButton = document.getElementById("add-todo-btn");
/** @type {HTMLUListElement} */
const todosList = document.getElementById("todos-list");
/** @type {HTMLButtonElement} */
const clearAllTodosButton = document.getElementById("clear-all-btn");

// Initialize todos view
for (const todo of todos) {
  todosList.append(renderTodosInReadMode(todo));
}

/**
 * Checks if a todo string is valid (trimmed, min 3 chars, not duplicate).
 * @param {string} str
 * @returns {boolean}
 */
function isValidTodo(str) {
  return str.trim().length >= 3 && !todos.includes(str.trim());
}

/**
 * Updates the disabled state of the add button based on input validity.
 * @returns {void}
 */
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
clearAllTodosButton.addEventListener("click", () => removeAllTodos());

/**
 * Renders a todo item in read mode (not editing).
 * @param {string} todo
 * @returns {HTMLLIElement}
 */
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
    if (todoIdx !== -1) {
      // Line through the todo and prevent editing
      span.style.textDecoration = "line-through";
      span.style.color = "#888";
      span.style.pointerEvents = "none";
      button.disabled = true;
    }
  });

  li.append(button);
  return li;
}

/**
 * Renders a todo item in edit mode.
 * @param {string} todo
 * @returns {HTMLLIElement}
 */
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

  /**
   * Updates the disabled state of the save button based on input validity.
   * @returns {void}
   */
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

/**
 * Adds a new todo to the list if valid.
 * @returns {void}
 */
function addTodo() {
  const todo = addTodoInput.value.trim();
  if (!isValidTodo(todo)) return;

  todos.push(todo);
  const todoList = renderTodosInReadMode(todo);
  todosList.append(todoList);

  speak(todo);

  addTodoInput.value = "";
  updateAddButtonState();
}

/**
 * Removes a todo at the given index.
 * @param {number} idx
 * @returns {void}
 */
function removeTodo(idx) {
  if (idx < 0 || idx >= todos.length) return;
  todos.splice(idx, 1);
  todosList.childNodes[idx].remove();
}

/**
 * Removes all todos from the list and UI.
 * @returns {void}
 */
function removeAllTodos() {
  todos.splice(0, todos.length);
  todosList.innerHTML = "";
}

/**
 * Uses speech synthesis to speak the given todo.
 * @param {string} todo
 * @returns {void}
 */
function speak(todo) {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }

  const utterThis = new SpeechSynthesisUtterance(todo);

  utterThis.onend = function () {
    console.log("SpeechSynthesisUtterance.onend");
  };

  utterThis.onerror = function () {
    console.error("SpeechSynthesisUtterance.onerror");
  };

  utterThis.voice = voices[0];
  utterThis.pitch = 2;
  utterThis.rate = 1;

  synth.speak(utterThis);
}
