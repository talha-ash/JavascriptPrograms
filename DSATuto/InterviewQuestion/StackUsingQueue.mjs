class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(value) {
    return this.queue.push(value);
  }

  dequeue() {
    return this.queue.shift();
  }

  length() {
    return this.queue.length;
  }
}

// Using two queues: O(n) pop operation and O(1) push operation
console.log("---------Using two queues: O(n) pop operation and O(1) push operation--------------------------");
class PopNQueueStack {
  constructor() {
    this.q1 = new Queue();
    this.q2 = new Queue();
    this.stackLength = 0;
  }

  push(value) {
    this.q1.enqueue(value);
    this.stackLength++;
    return this.stackLength;
  }

  pop() {
    if (!this.q1.length()) {
      return undefined;
    }
    while (this.q1.length() >= 2) {
      const value = this.q1.dequeue();
      this.q2.enqueue(value);
    }
    const stackValue = this.q1.dequeue();
    this.stackLength--;
    this.q1 = this.q2;
    this.q2 = new Queue();
    return stackValue;
  }
}

const popNQueueStack = new PopNQueueStack();
popNQueueStack.push(1);
popNQueueStack.push(2);
popNQueueStack.push(3);
popNQueueStack.push(4);
console.log(popNQueueStack.q1);
console.log(popNQueueStack.pop());
console.log(popNQueueStack.pop());
console.log(popNQueueStack.pop());
console.log(popNQueueStack.pop());
console.log(popNQueueStack.pop());
popNQueueStack.push(4);
console.log(popNQueueStack.pop());

// Using two queues: O(1) pop operation and O(n) push operation
console.log("------Using two queues: O(1) pop operation and O(n) push operation-------------------------------------");
class PushNQueueStack {
  constructor() {
    this.q1 = new Queue();
    this.q2 = new Queue();
    this.stackLength = 0;
  }

  push(value) {
    if (!this.q1.length()) {
      return this.q1.enqueue(value);
    }

    this.q2.enqueue(value);
    while (this.q1.length()) {
      const value = this.q1.dequeue();
      this.q2.enqueue(value);
    }
    this.q1 = this.q2;
    this.q2 = new Queue();
    this.stackLength++;

    return this.stackLength;
  }

  pop() {
    this.stackLength--;
    return this.q1.dequeue();
  }
}

const pushNQueueStack = new PushNQueueStack();
pushNQueueStack.push(1);
pushNQueueStack.push(2);
pushNQueueStack.push(3);
pushNQueueStack.push(4);
console.log(pushNQueueStack.q1);
console.log(pushNQueueStack.pop());
console.log(pushNQueueStack.pop());
console.log(pushNQueueStack.pop());
console.log(pushNQueueStack.pop());
console.log(pushNQueueStack.pop());
pushNQueueStack.push(4);
console.log(pushNQueueStack.pop());

// Using a single queue: O(1) pop operation and O(n) push operation
console.log(
  "----- Using a single queue: O(1) pop operation and O(n) push operation--------------------------------------"
);
class SingleQueueStack {
  constructor() {
    this.q1 = new Queue();
    this.stackLength = 0;
  }

  push(value) {
    this.q1.enqueue(value);

    let queueSize = this.q1.length();
    this.stackLength++;
    while (queueSize > 1) {
      const value = this.q1.dequeue();
      this.q1.enqueue(value);
      queueSize--;
    }

    return this.stackLength;
  }

  pop() {
    this.stackLength--;
    return this.q1.dequeue();
  }
}

const singleQueueStack = new SingleQueueStack();
singleQueueStack.push(1);
singleQueueStack.push(2);
singleQueueStack.push(3);
singleQueueStack.push(4);
console.log(singleQueueStack.q1);
console.log(singleQueueStack.pop());
console.log(singleQueueStack.pop());
console.log(singleQueueStack.pop());
console.log(singleQueueStack.pop());
console.log(singleQueueStack.pop());
singleQueueStack.push(4);
console.log(singleQueueStack.pop());
