class BinaryMaxHeap {
  constructor() {
    this.values = [];
  }

  insert(value) {
    this.values.push(value);
    this._bubbleUp(this.values.length - 1);
  }
  _bubbleUp(index) {
    let idx = index;
    (function loop(ctx) {
      const parentIndex = Math.floor((idx - 1) / 2);
      if (ctx.values[idx] > ctx.values[parentIndex]) {
        const temp = ctx.values[idx];
        ctx.values[idx] = ctx.values[parentIndex];
        ctx.values[parentIndex] = temp;
        idx = parentIndex;
        loop(ctx);
      } else {
        return;
      }
    })(this);
  }

  extractMax() {
    const idx = this.values.length - 1;
    const temp = this.values[idx];
    this.values[idx] = this.values[0];
    this.values[0] = temp;
    const result = this.values.pop();
    let root = 0;
    (function loop(ctx) {
      let child1 = 2 * root + 1;
      let child2 = 2 * root + 2;
      let biggerChild =
        ctx.values[child1] > ctx.values[child2] ? child1 : child2;

      if (ctx.values[root] < ctx.values[biggerChild]) {
        const temp = ctx.values[root];
        ctx.values[root] = ctx.values[biggerChild];
        ctx.values[biggerChild] = temp;
        root = biggerChild;
        loop(ctx);
      } else {
        return;
      }
    })(this);

    return result;
  }
}

const maxHeap = new BinaryMaxHeap();

maxHeap.insert(70);
maxHeap.insert(67);
maxHeap.insert(65);
maxHeap.insert(45);
maxHeap.insert(58);
maxHeap.insert(40);
maxHeap.insert(53);
maxHeap.insert(44);
maxHeap.insert(15);
maxHeap.insert(31);

console.log(maxHeap.extractMax());
console.log(maxHeap.values);
