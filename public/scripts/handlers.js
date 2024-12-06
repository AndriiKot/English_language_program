'use strict';

import { changeCount } from './utils.js';

export const handlers = {
  next: (count, maxCount) => changeCount(count, maxCount, 1),
  prev: (count, maxCount) => changeCount(count, maxCount, -1),
  show: (element) => {
    console.log(element);
  },
  add: () => {
    console.log('add');
  },
};
