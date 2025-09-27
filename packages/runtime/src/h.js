import { withoutNulls } from "./utils/arrays.js";

/**
 * Enum for DOM node types.
 * @readonly
 * @enum {string}
 */
export const DOM_TYPES = {
  TEXT: "text",
  ELEMENT: "element",
  FRAGMENT: "fragment",
};


/**
 * Hyperscript function to create a virtual DOM element node.
 * @param {string} tag - The tag name of the element (e.g., 'div', 'span').
 * @param {Object} [props={}] - The properties/attributes of the element.
 * @param {Array} [children=[]] - The children of the element (strings or VNodes).
 * @returns {Object} Virtual DOM node representing an element.
 */
export function h(tag, props = {}, children = []) {
  return {
    tag,
    props,
    children: mapTextNodes(withoutNulls(children)),
    type: DOM_TYPES.ELEMENT,
  };
}

/**
 * Maps string children to text VNodes.
 * @param {Array} children - Array of children (strings or VNodes).
 * @returns {Array} Array of VNodes.
 */
function mapTextNodes(children) {
  return children.map((child) =>
    typeof child === "string" ? hString(child) : child
  );
}

/**
 * Creates a virtual DOM Fragment node.
 * @param {Array} vNodes - An array of virtual Nodes.
 * @returns {Object} Virtual DOM node representing an element.
 */
function hFragment(vNodes) {
  return {
    type: DOM_TYPES.FRAGMENT,
    children: mapTextNodes(withoutNulls(vNodes)),
  };
}

/**
 * Creates a virtual DOM text node.
 * @param {string} str - The text content.
 * @returns {Object} Virtual DOM node representing a text node.
 */
function hString(str) {
  return {
    type: DOM_TYPES.TEXT,
    value: str,
  };
}

function lipsum(num) {
  const text = `“Lorem ipsum dolor sit amet, consectetur adipisc
ing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
 ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea com
modo consequat`;

  return hFragment(Array(num).fill(h("p", {}, [text])));
}

function MessageComponent({ level, message }) {
  return h("div", { class: `message message--${level}` }[h("p", {}, message)]);
}


