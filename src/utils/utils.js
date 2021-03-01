let count = 1;

/**
 * 防抖
 * @param {*} fn
 * @param {*} wait
 */
export const debounce = (fn, wait = 0) => {
  let timer = null;
  return function(...args) {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(null, args);
    }, wait);
  };
};

/**
 *
 * @param {Function} fn 需要被节流的函数
 * @param {Number} delay 延时
 */
export const throttle = (fn, delay = 1000) => {
  // console.log('调用', count++)

  let timer = null;
  let firstTime = true;

  return function(...args) {
    if (firstTime) {
      fn.apply(this, args);
      return (firstTime = false);
    }
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      fn.apply(this, args);
    }, delay);
  };
};
