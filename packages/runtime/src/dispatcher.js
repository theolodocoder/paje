export class Dispatcher {
  #subs = new Map();
  #afterHandlers = [];

  subscribe(commandName, handler) {
    if (!this.#subs.has(commandName)) {
      // if the cmdName doesnt exist initialize as part of subscription Map
      this.#subs.set(commandName, []);
    }

    const handlers = this.#subs.get(commandName);
    if (handlers.includes(handler)) {
      // no need to unsub from a reg handler belonging to that cmdName
      return () => {};
    }

    // handler isnt reg so add it
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

    // call the afterHandler for notifiation of DOM
    this.#afterHandlers.forEach((handler) => handler());
  }
}
