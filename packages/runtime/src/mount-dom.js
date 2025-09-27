import { setAtrributes } from "./attributes";
import { addEventListeners } from "./events";
import { DOM_TYPES } from "./h";

/**
 * Mounts a virtual DOM node to the actual DOM by creating the appropriate DOM elements
 * and attaching them to the specified parent element.
 *
 * @param {Object} vdom - The virtual DOM node to mount
 * @param {HTMLElement} parentEl - The parent DOM element to mount the vdom into
 */
export function mountDom(vdom, parentEl) {
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

/**
 * Creates a text node from a virtual DOM text node and appends it to the parent element.
 *
 * @param {Object} vdom - The virtual DOM text node containing the text value
 * @param {HTMLElement} parentEl - The parent DOM element to append the text node to
 */
function createTextNode(vdom, parentEl) {
  const { value } = vdom;

  const textNode = document.createTextNode(value);
  // save a reference to the domNode on the el propery
  vdom.el = textNode;
  parentEl.appendChild(textNode);
}

/**
 * Creates a fragment node by mounting all its children directly to the parent element.
 * Fragments are virtual containers that don't create actual DOM elements.
 *
 * @param {Object} vdom - The virtual DOM fragment node containing children
 * @param {HTMLElement} parentEl - The parent DOM element to mount children into
 */
function createFragmentNode(vdom, parentEl) {
  const { children } = vdom;
  vdom.el = parentEl;

  children.forEach((child) => mountDom(child, parentEl));
}

/**
 * Creates an HTML element from a virtual DOM element node, applies its properties,
 * mounts its children, and appends it to the parent element.
 *
 * @param {Object} vdom - The virtual DOM element node with tag, props, and children
 * @param {HTMLElement} parentEl - The parent DOM element to append the created element to
 */
function createElementNode(vdom, parentEl) {
  const { tag, props, children } = vdom;

  const elementNode = document.createElement(tag);
  // saves ref to elements in a el key on the vdom obj
  vdom.el = elementNode;

  addProps(elementNode, props, vdom);
  children.forEach((child) => mountDom(child, elementNode));
  parentEl.appendChild(elementNode);
}

/**
 * Applies properties to a DOM element by separating event listeners from attributes.
 * Event listeners are handled separately and stored on the vdom for later reference.
 *
 * @param {HTMLElement} el - The DOM element to apply properties to
 * @param {Object} props - The properties object containing events (on) and attributes
 * @param {Object} vdom - The virtual DOM node to store event listener references on
 */
function addProps(el, props, vdom) {
  const { on: events, ...attr } = props;
  // saves ref to events in a listneres key on the vdom obj
  vdom.listeners = addEventListeners(el, events);
  setAtrributes(el, attr);
}
