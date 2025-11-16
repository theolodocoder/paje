import { destroyDom } from "./destroy-dom";
import { Dispatcher } from "./dispatcher";
import { mountDom } from "./mount-dom";

/**
 * Creates a Paje application instance
 *
 * Manages reactive state updates and automatic UI re-rendering through a pub/sub pattern.
 * Each action dispatched triggers registered reducers, then automatically re-renders the view.
 *
 * @param {Object} state - Initial application state
 * @param {Function} view - Pure render function: (state, emit) => vdom
 * @param {Object} reducers - Map of action handlers: { actionName: (state, payload) => newState }
 * @returns {Object} App instance with mount() and unmount() lifecycle methods
 *
 * @example
 * const app = createPaje(
 *   { todos: [] },
 *   (state, emit) => h('div', {}, [
 *     h('button', { on: { click: () => emit('add', {}) } }, ['Add'])
 *   ]),
 *   { add: (state) => ({ ...state, todos: [...state.todos, {}] }) }
 * );
 * app.mount(document.getElementById('root'));
 */
export function createPaje(state, view, reducers = {}) {
  let parentEl = null;
  let vdom = null;

  const dispatcher = new Dispatcher();
  const subscriptions = [dispatcher.afterCommandHandler(renderApp)];

  function emit(actionName, payload) {
    dispatcher.dispatch(actionName, payload);
  }

  for (const actionName in reducers) {
    const reducer = reducers[actionName];

    const subs = dispatcher.subscribe(actionName, (payload) => {
      state = reducer(state, payload);
    });

    subscriptions.push(subs);
  }

  /**
   * Renders the app by destroying old vdom, creating new vdom, and mounting it
   * Automatically called after every action dispatch
   */
  function renderApp() {
    if (vdom) {
      destroyDom(vdom);
    }
    vdom = view(state, emit);
    mountDom(vdom, parentEl);
  }

  return {
    /**
     * Mount app to a DOM element and render it
     */
    mount(_parentEl) {
      parentEl = _parentEl;
      renderApp();
    },

    /**
     * Unmount app: cleanup DOM, remove event listeners, clear subscriptions
     */
    unmount() {
      destroyDom(vdom);
      vdom = null;
      subscriptions.forEach((unsubscribe) => unsubscribe());
    },
  };
}
