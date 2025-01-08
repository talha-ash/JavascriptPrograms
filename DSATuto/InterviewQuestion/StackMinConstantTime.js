var MinStack = function () {
  this.stack = [];
  this.minStack = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  if (this.minStack.length) {
    const lastVal = this.minStack[this.minStack.length - 1];
    if (val < lastVal) {
      this.minStack.push(val);
    } else {
      this.minStack.push(lastVal);
    }
  } else {
    this.minStack.push(val);
  }
  return this.stack.push(val);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  if (this.stack.length) {
    this.minStack.pop();
    return this.stack.pop();
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  if (this.stack.length) {
    return this.stack[this.stack.length - 1];
  }
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  if (this.minStack.length) {
    return this.minStack[this.minStack.length - 1];
  }
};
