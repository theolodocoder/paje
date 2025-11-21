import { createPaje, h } from "https://unpkg.com/paje@1.0.1/dist/paje.js";
import { styles } from "./styles.js";

console.log("Todo List App using Paje");

const state = {
  currentTodo: "",
  edit: {
    idx: null,
    originalText: "",
    editText: "",
  },
  todos: [],
};

const reducers = {
  "update-current-todo": (state, currentTodo) => {
    return { ...state, currentTodo };
  },
  "add-todo": (state) => {
    return {
      ...state,
      currentTodo: "",
      todos: [...state.todos, state.currentTodo],
    };
  },
  "start-editing-todo": (state, idx) => ({
    ...state,
    edit: { idx, originalText: state.todos[idx], editText: state.todos[idx] },
  }),
  "edit-todo": (state, editText) => ({
    ...state,
    edit: { ...state.edit, editText },
  }),
  "save-edited-todo": (state) => {
    const todos = [...state.todos];
    todos[state.edit.idx] = state.edit.editText;
    return {
      ...state,
      edit: { idx: null, originalText: null, editText: null },
      todos,
    };
  },
  "cancel-editing-todo": (state) => ({
    ...state,
    edit: { idx: null, originalText: null, editText: null },
  }),
  "remove-todo": (state, idx) => ({
    ...state,
    todos: state.todos.filter((_, i) => i !== idx),
  }),
};

function App(state, emit) {
  return h("div", { style: styles.appContainer }, [
    h("h1", { style: styles.appTitle }, ["Todo List App"]),
    CreateTodo(state, emit),
    TodoList(state, emit),
  ]);
}

function CreateTodo(state, emit) {
  const { currentTodo } = state;
  return h("div", { style: styles.createTodoSection }, [
    h("label", { htmlFor: "new-todo-input", style: styles.createTodoLabel }, [
      "Add a new task",
    ]),
    h("input", {
      type: "text",
      id: "new-todo-input",
      placeholder: "What needs to be done?",
      value: currentTodo,
      style: styles.createTodoInput,
      on: {
        input: (e) => emit("update-current-todo", e.target.value),
        keypress: (e) => {
          if (e.key === "Enter") {
            emit("add-todo");
          }
        },
      },
    }),
    h(
      "button",
      {
        style: {
          ...styles.createTodoBtn,
          ...(currentTodo.trim().length < 3
            ? styles.createTodoBtnDisabled
            : {}),
        },
        on: {
          click: () => emit("add-todo"),
        },
        disabled: currentTodo.trim().length < 3,
      },
      ["Add Task"]
    ),
  ]);
}

function TodoList({ todos, edit }, emit) {
  return h("ul", { style: styles.todoList }, [
    todos.length === 0
      ? h("li", { style: styles.todoEmptyState }, ["No todos yet."])
      : null,
    ...todos.map((todo, idx) => TodoItem({ edit, idx, todo }, emit)),
  ]);
}

function TodoItem({ edit, idx, todo }, emit) {
  const isEditing = edit.idx === idx;
  if (isEditing) {
    // render edit mode
    return h("li", { key: `todo-${idx}`, style: styles.todoItemEdit }, [
      h("input", {
        type: "text",
        value: edit.editText,
        style: styles.todoEditInput,
        on: {
          input: (e) => emit("edit-todo", e.target.value),
        },
      }),
      h(
        "button",
        {
          style: styles.todoSaveBtn,
          on: {
            click: () => emit("save-edited-todo"),
          },
        },
        ["Save"]
      ),
      h(
        "button",
        {
          style: styles.todoCancelBtn,
          on: {
            click: () => emit("cancel-editing-todo"),
          },
        },
        ["Cancel"]
      ),
    ]);
  } else {
    // render normal mode
    return h("li", { key: `todo-${idx}`, style: styles.todoItem }, [
      h(
        "span",
        {
          style: styles.todoText,
          on: {
            dblclick: () => emit("start-editing-todo", idx),
          },
        },
        [todo]
      ),
      h(
        "button",
        {
          style: styles.todoDoneBtn,
          on: {
            click: () => emit("remove-todo", idx),
          },
        },
        ["Done"]
      ),
    ]);
  }
}

createPaje(state, App, reducers).mount(document.body);
