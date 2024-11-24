'use sctrict';

const validationCurrentCount = (count, min = 0, max = 1) => {
  if (min < 1) count = 1;
  if (count > max) count = max;
  return count;
};

export { validationCurrentCount };
