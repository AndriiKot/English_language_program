'use strict';

import { changeCount } from './utils.js';

export const handlers = {
  next: (count, maxCount) => changeCount(count, maxCount, 1),
  prev: (count, maxCount) => changeCount(count, maxCount, -1),
  show: () => {
    console.log('translation');
  },
  add: () => {
    console.log('add');
  },
};
