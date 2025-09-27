import { DOM_TYPES } from "./h";

/**
 * Destroys a virtual DOM tree and removes it from the actual DOM
 * @param {Object} vdom - The virtual DOM node to destroy
 */
export function destroyDom(vdom) {
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

/**
 * Removes a text node from the DOM
 * @param {Object} vdom - The virtual text node to destroy
 */
function destroyTextNode(vdom) {
  const { el } = vdom;
  el.remove();
}

/**
 * Destroys an element node and its children, removes event listeners
 * @param {Object} vdom - The virtual element node to destroy
 */
function destroyElementNode(vdom) {
  const { el, children, listeners } = vdom;

  children.forEach(destroyDom);
  if (listeners) {
    removeEventListeners(el, listeners);
    delete vdom.listeners;
  }
}

/**
 * Destroys a fragment node by destroying all its children
 * @param {Object} vdom - The virtual fragment node to destroy
 */
function destroyFragmentNode(vdom) {
  const { children } = vdom;
  children.forEach(destroyDom);
}
