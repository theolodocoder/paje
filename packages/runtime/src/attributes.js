/**
 * Sets multiple attributes on a DOM element, handling special cases for style and class.
 * Separates style and class attributes for specialized handling, then processes remaining attributes.
 *
 * @param {HTMLElement} el - The DOM element to set attributes on
 * @param {Object} attr - Object containing attribute names and values
 */
export function setAtrributes(el, attr) {
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

/**
 * Sets a single attribute on a DOM element, handling data attributes specially.
 * If value is null, removes the attribute. Data attributes use setAttribute method,
 * while other attributes are set as properties.
 *
 * @param {HTMLElement} el - The DOM element to set the attribute on
 * @param {string} name - The attribute name
 * @param {*} value - The attribute value (null to remove)
 */
export function setAtrribute(el, name, value) {
  if (value === null) {
    removeAttribute(el, name);
  } else if (name.startsWith("data-")) {
    el.setAttribute(name, value);
  } else {
    el[name] = value;
  }
}

/**
 * Removes an attribute from a DOM element by setting its property to null
 * and removing the attribute completely.
 *
 * @param {HTMLElement} el - The DOM element to remove the attribute from
 * @param {string} name - The name of the attribute to remove
 */
export function removeAttribute(el, name) {
  el[name] = null;
  el.removeAttribute(name);
}

/**
 * Sets CSS classes on a DOM element, supporting both string and array formats.
 * Clears existing classes first, then applies new ones based on the input type.
 *
 * @param {HTMLElement} el - The DOM element to set classes on
 * @param {string|Array} className - Class name(s) as string or array of strings
 */
export function setClass(el, className) {
  el.className = "";
  if (typeof className === "string") {
    // use className attr
    el.className = className;
  }

  if (Array.isArray(className)) {
    // use classList attr
    el.classList.add(...className);
  }
}

/**
 * Sets a CSS style property on a DOM element.
 *
 * @param {HTMLElement} el - The DOM element to set the style on
 * @param {string} name - The CSS property name (e.g., 'color', 'fontSize')
 * @param {string} value - The CSS property value
 */
export function setStyle(el, name, value) {
  el.style[name] = value;
}

/**
 * Removes a CSS style property from a DOM element by setting it to null.
 *
 * @param {HTMLElement} el - The DOM element to remove the style from
 * @param {string} name - The CSS property name to remove
 */
export function removeStyle(el, name) {
  el.style[name] = null;
}
