import { setAtrributes } from "./attributes";
import { addEventListeners } from "./events";
import { DOM_TYPES } from "./h";

/**
 * Mounts a virtual DOM tree into the actual DOM
 * @param {Object} vdom - The virtual DOM node to mount
 * @param {HTMLElement} parentEl - The parent DOM element to mount into
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
 * Creates and mounts a text node to the DOM
 * @param {Object} vdom - The virtual text node
 * @param {HTMLElement} parentEl - The parent element to append to
 */
function createTextNode(vdom, parentEl) {
  const { value } = vdom;

  const textNode = document.createTextNode(value);
  // save a reference to the domNode on the el propery
  vdom.el = textNode;
  parentEl.appendChild(textNode);
}

/**
 * Creates a fragment node (a collection of nodes without a wrapper element)
 * @param {Object} vdom - The virtual fragment node
 * @param {HTMLElement} parentEl - The parent element to append children to
 */
function createFragmentNode(vdom, parentEl) {
  const { children } = vdom;
  vdom.el = parentEl;

  children.forEach((child) => mountDom(child, parentEl));
}

/**
 * Creates and mounts an HTML element node to the DOM
 * @param {Object} vdom - The virtual element node
 * @param {HTMLElement} parentEl - The parent element to append to
 */
function createElementNode(vdom, parentEl) {
  const { tag, props, children } = vdom;

  // TODO: tag might be undefined xx
  const elementNode = document.createElement(tag);
  // saves ref to elements in a el key on the vdom obj
  vdom.el = elementNode;

  addProps(elementNode, props, vdom);
  children.forEach((child) => mountDom(child, parentEl));
  parentEl.appendChild(elementNode);
}

/**
 * Adds properties (attributes and event listeners) to a DOM element
 * @param {HTMLElement} el - The DOM element to add properties to
 * @param {Object} props - The properties object containing attributes and events
 * @param {Object} vdom - The virtual DOM node to store listener references
 */
function addProps(el, props, vdom) {
  const { on: events, ...attr } = props;
  // saves ref to events in a listneres key on the vdom obj
  vdom.listeners = addEventListeners(el, events);
  setAtrributes(el, attr);
}
