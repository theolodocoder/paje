# Paje

A minimalist, lightweight frontend framework for building reactive user interfaces.

## What is Paje?

Paje is a simple, vanilla JavaScript framework that brings reactive state management and virtual DOM rendering to your projects without unnecessary complexity. It's designed for developers who appreciate minimalism and want to understand how modern frameworks work under the hood.

**Key Principles:**
- 🎯 **Minimalist** - Only essential features, no bloat
- 📦 **Lightweight** - ~6.2KB minified JavaScript
- ⚡ **Reactive** - Automatic UI updates when state changes
- 🔧 **Pure JavaScript** - No special syntax or build step required
- 🎓 **Educational** - Learn how reactive frameworks work

## Features

✨ **Virtual DOM** - Efficient rendering through DOM abstraction
🔄 **Reactive State Management** - Automatic re-rendering on state changes
📡 **Pub/Sub Event System** - Simple action-based state updates
🏗️ **Hyperscript API** - Familiar `h()` function for element creation
🔌 **Lifecycle Methods** - `mount()` and `unmount()` for component control
🎯 **Event Handling** - Built-in DOM event listener management
🎨 **Attribute & Style Management** - Easy class, style, and data attribute handling
📄 **Fragment Support** - Render multiple elements without wrappers

## Installation

```bash
npm install paje
```

## Quick Start

```javascript
import { createPaje, h } from 'paje';

// Define your app
const app = createPaje(
  // Initial state
  { count: 0 },

  // View function - returns virtual DOM
  (state, emit) => h('div', { class: 'app' }, [
    h('h1', {}, [`Count: ${state.count}`]),
    h('button', {
      on: { click: () => emit('increment', {}) }
    }, ['Increment']),
    h('button', {
      on: { click: () => emit('decrement', {}) }
    }, ['Decrement']),
  ]),

  // Reducers - pure functions that update state
  {
    increment: (state) => ({ ...state, count: state.count + 1 }),
    decrement: (state) => ({ ...state, count: state.count - 1 }),
  }
);

// Mount your app to the DOM
app.mount(document.body);
```

## Core Concepts

### 1. State
The single source of truth for your application. It's a plain JavaScript object that contains all the data your UI needs.

```javascript
const state = {
  count: 0,
  todos: [],
  user: { name: 'John', email: 'john@example.com' }
};
```

### 2. View Function
A pure function that takes state and an `emit` function, returning virtual DOM. This function is called whenever state changes.

```javascript
(state, emit) => h('div', {}, [
  h('p', {}, [`Hello, ${state.user.name}`]),
  h('button', { on: { click: () => emit('greet', {}) } }, ['Greet']),
])
```

### 3. Reducers
Pure functions that take the current state and a payload, returning a new state object. They describe how to update state in response to actions.

```javascript
{
  greet: (state, payload) => ({
    ...state,
    greeting: `Hello, ${state.user.name}!`
  })
}
```

### 4. Emit & Dispatch
The `emit()` function in your view dispatches actions that trigger reducers and update state. The app automatically re-renders when state changes.

```javascript
h('button', {
  on: { click: () => emit('actionName', { data: 'payload' }) }
}, ['Click me'])
```

## API Reference

### `createPaje(state, view, reducers)`

Creates and returns a Paje application instance.

**Parameters:**
- `state` (Object) - Initial application state
- `view` (Function) - Pure view function: `(state, emit) => vnode`
- `reducers` (Object) - Map of action names to reducer functions

**Returns:**
- `app` (Object) - Application instance with `mount()` and `unmount()` methods

**Example:**
```javascript
const app = createPaje(
  { count: 0 },
  (state, emit) => h('div', {}, [`Count: ${state.count}`]),
  { increment: (state) => ({ ...state, count: state.count + 1 }) }
);
```

### `h(tag, props, children)`

Creates a virtual DOM element node.

**Parameters:**
- `tag` (String) - HTML tag name (e.g., 'div', 'button', 'span')
- `props` (Object) - Element properties and event handlers
  - Standard HTML attributes: `id`, `class`, `data-*`, etc.
  - `on` (Object) - Event handlers: `{ click: handler, input: handler }`
  - `style` (Object|String) - CSS styles
- `children` (Array) - Array of child vnodes or strings

**Returns:** Virtual DOM element node

**Example:**
```javascript
h('button', {
  id: 'btn-submit',
  class: 'primary-btn',
  on: { click: handleSubmit }
}, ['Submit'])
```

### `hFragment(vnodes)`

Creates a virtual DOM fragment for rendering multiple elements without a wrapper.

**Parameters:**
- `vnodes` (Array) - Array of virtual DOM nodes

**Returns:** Virtual DOM fragment node

**Example:**
```javascript
hFragment([
  h('h2', {}, ['Title']),
  h('p', {}, ['Content']),
])
```

### `hString(text)`

Creates a virtual DOM text node.

**Parameters:**
- `text` (String) - Text content

**Returns:** Virtual DOM text node

**Example:**
```javascript
h('span', {}, [hString('Hello, World!')])
```

### `app.mount(parentElement)`

Mounts the application to a DOM element.

**Parameters:**
- `parentElement` (HTMLElement) - DOM element to mount into

**Example:**
```javascript
app.mount(document.body);
app.mount(document.getElementById('app'));
```

### `app.unmount()`

Unmounts the application and cleans up all listeners and DOM nodes.

**Example:**
```javascript
app.unmount();
```

## Examples

Check the `examples/` directory for complete working examples:

### Simple Counter
A basic counter with increment and decrement buttons demonstrating state management and event handling.

```bash
npm run serve:examples
# Open http://localhost:8000/examples/simple-counter/counter.html
```

### Todo App
A complete todo application with add, delete, and check functionality showing real-world patterns.

```bash
npm run serve:examples
# Open http://localhost:8000/examples/vanilla-todo-app/todo.html
```

## Development

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
npm run lint:fix
```

### Test
```bash
npm run test          # Watch mode
npm run test:run      # Single run
```

### Commit Conventions
This project follows [conventional commits](https://www.conventionalcommits.org/). See `docs/COMMIT_CONVENTIONS.md` for details.

```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug"
git commit -m "docs: update documentation"
```

## Browser Support

Paje requires a modern browser with ES6 module support:
- Chrome 61+
- Firefox 67+
- Safari 11+
- Edge 79+

## Project Structure

```
paje/
├── packages/runtime/        # Core framework package
│   ├── src/
│   │   ├── paje.js         # Core createPaje function
│   │   ├── h.js            # Hyperscript API
│   │   ├── dispatcher.js    # Event pub/sub system
│   │   ├── mount-dom.js     # Virtual to real DOM rendering
│   │   ├── destroy-dom.js   # DOM cleanup
│   │   ├── attributes.js    # Attribute/style/class management
│   │   ├── events.js        # Event listener management
│   │   └── __tests__/       # Test files
│   ├── dist/                # Compiled bundle
│   └── package.json
├── examples/                # Example applications
│   ├── simple-counter/
│   └── vanilla-todo-app/
├── docs/                    # Documentation
└── README.md
```

## Bundle Size

- **Minified:** ~6.2KB
- **Gzipped:** ~2.1KB

Perfect for projects where size matters!

## License

MIT © 2025 theolodocoder

## Contributing

Contributions are welcome! Please follow the conventional commit guidelines and ensure tests pass.

```bash
npm run lint:fix
npm run test:run
git add .
git commit -m "feat: your feature description"
```

## Why Paje?

Paje is perfect for:
- Learning how reactive frameworks work
- Building small to medium-sized applications
- Projects where bundle size is critical
- Teams that value simplicity and clarity
- Anyone who enjoys vanilla JavaScript

It's **not** ideal for:
- Large enterprise applications (consider React, Vue, or Angular)
- Projects requiring advanced features like routing or form libraries
- Apps needing TypeScript support (though possible, not built-in)

## FAQ

**Q: Can I use Paje in production?**
A: Yes! It's a stable framework suitable for production use.

**Q: Does Paje have TypeScript support?**
A: Not built-in, but you can use it with TypeScript through declaration files.

**Q: How do I handle forms?**
A: Paje uses standard HTML form elements. Handle form state like any other state through reducers.

**Q: Can I use external libraries?**
A: Yes! Paje plays well with other libraries. Use them alongside your Paje components.

**Q: What about routing?**
A: Paje doesn't include routing. Use a library like `page.js` or implement your own routing logic.

**Q: How do I debug?**
A: Use browser DevTools. The virtual DOM nodes include helpful properties for debugging.

## Resources

- 📚 [Examples](./examples/) - Working examples to learn from
- 📖 [Commit Conventions](./docs/COMMIT_CONVENTIONS.md) - Development guidelines
- 🧪 [Tests](./packages/runtime/src/__tests__/) - Test patterns and examples

## Credits

Created by **theolodocoder** as a minimalist approach to frontend development.

---

**Ready to build something amazing?** Start with the [Quick Start](#quick-start) or check out the [examples](./examples/)!
