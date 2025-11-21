function withoutNulls(arr) {
  return arr.length > 0 ? arr.filter((item) => item != null) : [];
}

const DOM_TYPES = {
  TEXT: "text",
  ELEMENT: "element",
  FRAGMENT: "fragment",
};
function h(tag, props = {}, children = []) {
  return {
    tag,
    props,
    children: mapTextNodes(withoutNulls(children)),
    type: DOM_TYPES.ELEMENT,
  };
}
function mapTextNodes(children) {
  return children.map((child) =>
    typeof child === "string" ? hString(child) : child
  );
}
function hFragment(vNodes) {
  return {
    type: DOM_TYPES.FRAGMENT,
    children: mapTextNodes(withoutNulls(vNodes)),
  };
}
function hString(str) {
  return {
    type: DOM_TYPES.TEXT,
    value: str,
  };
}

class Dispatcher {
  #subs = new Map();
  #afterHandlers = [];
  subscribe(commandName, handler) {
    if (!this.#subs.has(commandName)) {
      this.#subs.set(commandName, []);
    }
    const handlers = this.#subs.get(commandName);
    if (handlers.includes(handler)) {
      return () => {};
    }
    handlers.push(handler);
    return () => {
      const handlerIdx = handlers.indexOf(handler);
      handlers.splice(handlerIdx, 1);
    };
  }
  afterCommandHandler(handler) {
    this.#afterHandlers.push(handler);
    return () => {
      const afterHandlerIdx = this.#afterHandlers.indexOf(handler);
      this.#afterHandlers.splice(afterHandlerIdx, 1);
    };
  }
  dispatch(commandName, payload) {
    if (this.#subs.has(commandName)) {
      const handlers = this.#subs.get(commandName);
      handlers.forEach((handler) => handler(payload));
    } else {
      console.warn(`No handlers for command: ${commandName}`);
    }
    this.#afterHandlers.forEach((handler) => handler());
  }
}

function setAtrributes(el, attr) {
  const { style, class: className, ...otherAttr } = attr;
  if (className) {
    setClass(el, className);
  }
  if (style) {
    Object.entries(style).forEach(([prop, value]) => {
      setStyle(el, prop, value);
    });
  }
  for (const [name, value] of Object.entries(otherAttr)) {
    setAtrribute(el, name, value);
  }
}
function setAtrribute(el, name, value) {
  if (value === null) {
    removeAttribute(el, name);
  } else if (name.startsWith("data-")) {
    el.setAttribute(name, value);
  } else {
    el[name] = value;
  }
}
function removeAttribute(el, name) {
  el[name] = null;
  el.removeAttribute(name);
}
function setClass(el, className) {
  el.className = "";
  if (typeof className === "string") {
    el.className = className;
  }
  if (Array.isArray(className)) {
    el.classList.add(...className);
  }
}
function setStyle(el, name, value) {
  el.style[name] = value;
}

function addEventListener(el, eventName, handler) {
  el.addEventListener(eventName, handler);
  return handler;
}
function addEventListeners(el, events = {}) {
  const addedEvents = {};
  Object.entries(events).forEach(([eventName, handler]) => {
    const listener = addEventListener(el, eventName, handler);
    addedEvents[eventName] = listener;
  });
  return addedEvents;
}
function removeEventListeners(el, events) {
  Object.entries(events).forEach(([ev, handler]) =>
    removeEventListener(el, ev, handler)
  );
}
function removeEventListener(el, eventName, handler) {
  el.removeEventListener(eventName, handler);
}

function mountDom(vdom, parentEl) {
  switch (vdom.type) {
    case DOM_TYPES.TEXT:
      createTextNode(vdom, parentEl);
      break;
    case DOM_TYPES.ELEMENT:
      createElementNode(vdom, parentEl);
      break;
    case DOM_TYPES.FRAGMENT:
      createFragmentNode(vdom, parentEl);
      break;
    default:
      throw new Error(`Cannot mount dom of type ${vdom.type}`);
  }
}
function createTextNode(vdom, parentEl) {
  const { value } = vdom;
  const textNode = document.createTextNode(value);
  vdom.el = textNode;
  parentEl.appendChild(textNode);
}
function createFragmentNode(vdom, parentEl) {
  const { children } = vdom;
  vdom.el = parentEl;
  children.forEach((child) => mountDom(child, parentEl));
}
function createElementNode(vdom, parentEl) {
  const { tag, props, children } = vdom;
  const elementNode = document.createElement(tag);
  vdom.el = elementNode;
  addProps(elementNode, props, vdom);
  children?.forEach((child) => mountDom(child, elementNode));
  parentEl.appendChild(elementNode);
}
function addProps(el, props, vdom) {
  const { on: events, ...attr } = props;
  vdom.listeners = addEventListeners(el, events);
  setAtrributes(el, attr);
}

function destroyDom(vdom) {
  const { type } = vdom;
  switch (type) {
    case DOM_TYPES.TEXT:
      destroyTextNode(vdom);
      break;
    case DOM_TYPES.ELEMENT:
      destroyElementNode(vdom);
      break;
    case DOM_TYPES.FRAGMENT:
      destroyFragmentNode(vdom);
      break;
    default:
      throw new Error(`Cannot mount dom of type ${vdom.type}`);
  }
}
function destroyTextNode(vdom) {
  const { el } = vdom;
  el.remove();
}
function destroyElementNode(vdom) {
  const { el, children, listeners } = vdom;
  children.forEach(destroyDom);
  if (listeners) {
    removeEventListeners(el, listeners);
    delete vdom.listeners;
  }
  if (el && el.parentNode) {
    el.remove();
  }
}
function destroyFragmentNode(vdom) {
  const { children } = vdom;
  children.forEach(destroyDom);
}

function createPaje(state, view, reducers = {}) {
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
    unmount() {
      destroyDom(vdom);
      vdom = null;
      subscriptions.forEach((unsubscribe) => unsubscribe());
    },
  };
}

console.log("================== Welcome to Paje Runtime! ==================");

export { createPaje, h, hFragment, hString };
