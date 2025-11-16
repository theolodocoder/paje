import { destroyDom } from "./destroy-dom";
import { Dispatcher } from "./dispatcher";
import { mountDom } from "./mount-dom";

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

  // App renderer
  function renderApp() {
    if (vdom) {
      destroyDom(vdom);
    }
    vdom = view(state, emit);
    mountDom(vdom, parentEl);
  }

  return {
    mount(_parentEl) {
      parentEl = _parentEl;
      renderApp();
    },
  };
}
