import {
  createPaje,
  hFragment,
  h,
} from "https://unpkg.com/paje@1.0.1/dist/paje.js";

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
  return hFragment({}, [
    h("h1", {}, ["Todo List App - using Paje"]),
    CreateTodo(state, emit),
    TodoList(state, emit),
  ]);
}

function CreateTodo(state, emit) {
  const { currentTodo } = state;
  return h("div", { style: { marginTop: "20px" } }, [
    h("label", { for: "new-todo-input" }, ["Create New Todo"]),
    h("input", {
      type: "text",
      id: "new-todo-input",
      value: currentTodo,
      on: {
        input: (e) => emit("update-current-todo", e.target.value),
        keypress: (e) => {
          if (e.key === "Enter") {
            emit("add-todo");
          }
        },
      },
    }),
    h("button", { on: { click: () => emit("add-todo") } }, ["Add Todo"]),
  ]);
}

function TodoList(state, emit) {
  return h("ul", {}, [
    state.todos.length === 0
      ? h("li", {}, ["No todos yet."])
      : state.todos.map((todo, idx) => {
          return h("li", { key: idx }, [todo]);
        }),
  ]);
}

createPaje(state, App, reducers).mount(document.body);
