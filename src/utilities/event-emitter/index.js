function createEmitter() {
  const listeners = {};

  return {
    on(name, cb) {
      if (!(name in listeners)) listeners[name] = [];
      listeners[name].push(cb);
    },

    off(name, cb) {
      const index = listeners[name].indexOf(cb);
      listeners[name].splice(index, 1);
    },

    emit(name, ...args) {
      for (const cb of listeners[name]) {
        cb(...args);
      }
    },

    once(name, cb) {
      const fn = (...args) => {
        this.off(name, fn);
        cb(...args);
      };
      this.on(name, fn);
    },
  };
}

export default createEmitter;
