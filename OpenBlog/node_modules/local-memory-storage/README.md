# local-memory-storage

[![npm](https://img.shields.io/npm/v/local-memory-storage)](https://www.npmjs.com/package/local-memory-storage) [![github checks](https://github.com/cheapsteak/local-memory-storage/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/cheapsteak/local-memory-storage) [![bundle size](https://img.shields.io/bundlephobia/minzip/local-memory-storage)](https://bundlephobia.com/package/local-memory-storage) 

An in-memory typescript implementation of the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) that should be API-compatible with `localStorage`.

In addition to supporting Web Storage methods (`getItem`, `setItem`, `removeItem`, `clear`), this library also closely matches localStorage's behaviour for enumerating and serializing its keys and values.

## Usage Example

```js
import { memoryStorage } from 'local-memory-storage';

memoryStorage.setItem('abc', 'xyz');

memoryStorage.getItem('abc'); //> 'xyz'

memoryStorage['abc']; //> 'xyz'

Object.keys(memoryStorage); //> ['abc']

JSON.stringify(memoryStorage); //> {"abc":"xyz"}
```

If separate instances are desired, the base class can imported instead

```js
import { LocalMemoryStorage } from 'local-memory-storage';

const memoryStorage = new LocalMemoryStorage();
```

## Sample usage for conditionally replacing localStorage

```js
import { memoryStorage } from 'localmemorystorage';

const canUseLocalStorage = () => {
  try {
    const testKey = '__test_if_localstorage_is_available__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

export const localStorageWithMemoryFallback = canUseLocalStorage()
  ? localStorage
  : memoryStorage;
```

## Motivation

Trying to access localStorage in incognito mode if your app is being embedded can result in this error:

> Uncaught SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document

One way to solve that would be to create a file like the above example to export a `localStorageWithMemoryFallback`, and set eslint rules to disallow direct usage of localStorage

```js
// eslintrc.js
module.exports = {
  // ...
  rules: {
    // ...
    "no-restricted-globals": [
      {
        name: "localStorage",
        message: "Use `localStorageWithMemoryFallback` instead",
      },
    ],
    "no-restricted-properties": [
      "error",
      {
        object: "window",
        property: "localStorage",
        message: "Use `localStorageWithMemoryFallback` instead",
      },
    ],
  },
};
```
