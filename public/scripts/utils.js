'use strict';

const limitCount = (count, max) => {
  if (count < 1) count = 1;
  if (count > max) count = max;
  return count;
};

const changeCount = (currentCount, maxCount, change) => {
  const newCount = limitCount(currentCount + change, maxCount);
  return newCount;
};

export { changeCount };
