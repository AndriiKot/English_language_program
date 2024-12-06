'use strict';

import { changeCount, hiddenElement } from './utils.js';

export const handlers = {
  next: (count, maxCount) => {
    return changeCount(count, maxCount, 1);
  },
  prev: (count, minCount) => {
    return changeCount(count, minCount, -1);
  },
  show: (element) => {
    console.log(element);
    hiddenElement(element);
  },

  add: (element) => {
    console.log('add');
    console.log(element);
    hiddenElement(element);
  },
};
