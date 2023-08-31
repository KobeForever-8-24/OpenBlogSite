export class LocalMemoryStorage implements Storage {
  #data = new Map();

  constructor() {
    return new Proxy(this, {
      // reveal keys in Reflect.ownKeys()
      ownKeys: () => {
        return Array.from(this.#data.keys());
      },

      // reveal keys in Object.keys()
      getOwnPropertyDescriptor: (target, prop) => {
        const hasKey = target.#data.has(prop);
        const value = hasKey ? target.getItem(prop) : undefined;
        return {
          value,
          writable: false,
          enumerable: hasKey,
          configurable: true,
        };
      },

      // bind methods to target, otherwise calls that access private class fields
      // will have the proxy as their context and calls will fail with:
      // "Cannot read private member from an object whose class did not declare it"
      get: (target, name) => {
        let ret = Reflect.get(target, name);
        if (typeof ret === 'function') {
          return ret.bind(target);
        }
        // otherwise retrieve the value of the corresponding key (e.g. for Object.values)
        return this.getItem(name);
      },
      set: (target, name, value) => {
        return Reflect.set(target, name, value);
      },
    });
  }

  get length(): number {
    return this.#data.size;
  }

  key(index: number): string | null {
    if (arguments.length === 0) {
      throw new TypeError('MemoryWebStorage requires 1 argument, received 0.');
    }
    return Array.from(this.#data.keys())[index];
  }

  getItem(key: unknown): string | null {
    return this.#data.has(key) ? this.#data.get(key) : null;
  }

  setItem(key: string, value: string): void {
    this.#data.set(String(key), String(value));
  }

  removeItem(key: string): void {
    this.#data.delete(key);
  }

  clear() {
    this.#data.clear();
  }

  get [Symbol.toStringTag]() {
    return 'LocalMemoryStorage';
  }
}

// Required to avoid typescript erroring when accessing value by index
export interface LocalMemoryStorage extends Storage {
  // Element implicitly has an 'any' type because expression of type '"a"' can't be used to index type 'LocalMemoryStorage'.
}

export const memoryStorage = new LocalMemoryStorage();
export default LocalMemoryStorage;
