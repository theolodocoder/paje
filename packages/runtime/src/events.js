/**
 * Adds a single event listener to a DOM element.
 *
 * @param {HTMLElement} el - The DOM element to attach the event listener to
 * @param {string} eventName - The name of the event to listen for (e.g., 'click', 'mouseover')
 * @param {Function} handler - The event handler function to execute when the event fires
 * @returns {Function} The handler function that was attached
 */
function addEventListener(el, eventName, handler) {
  el.addEventListener(eventName, handler);
  return handler;
}

/**
 * Adds multiple event listeners to a DOM element from an events object.
 * Returns a mapping of event names to their handlers for later reference.
 *
 * @param {HTMLElement} el - The DOM element to attach event listeners to
 * @param {Object} events - Object mapping event names to handler functions
 * @returns {Object} Object mapping event names to the attached handler functions
 */
export function addEventListeners(el, events = {}) {
  const addedEvents = {};

  Object.entries(events).forEach(([eventName, handler]) => {
    const listener = addEventListener(el, eventName, handler);
    addedEvents[eventName] = listener;
  });

  return addedEvents;
}
