/**
 * Event dispatcher implementing pub/sub pattern for state management
 *
 * Allows multiple handlers to subscribe to actions, and executes them when
 * an action is dispatched. Global afterHandlers fire after every dispatch.
 */
export class Dispatcher {
  #subs = new Map();
  #afterHandlers = [];

  /**
   * Subscribe a handler to a specific action name
   * @param {string} commandName - Action name
   * @param {Function} handler - Called with payload when action is dispatched
   * @returns {Function} Unsubscribe function
   */
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

  /**
   * Register a handler that fires after ANY action is dispatched
   * @param {Function} handler - Called with no arguments after dispatch
   * @returns {Function} Unsubscribe function
   */
  afterCommandHandler(handler) {
    this.#afterHandlers.push(handler);
    return () => {
      const afterHandlerIdx = this.#afterHandlers.indexOf(handler);
      this.#afterHandlers.splice(afterHandlerIdx, 1);
    };
  }

  /**
   * Dispatch an action to all subscribed handlers, then run afterHandlers
   * @param {string} commandName - Action name
   * @param {*} payload - Data passed to handlers
   */
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
