class RingBufferBlocking {
  constructor(capacity) {
    this.head = 0;
    this.tail = 0;
    this.size = 0;
    this.items = Array.from({ length: capacity });
    this.capacity = capacity;
  }

  enqueue(item) {
    if (this.isFull) {
      throw new Error("Queue is Full");
    }
    this.items[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;
    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty!");
    }
    const removedItem = this.peek();

    this.items[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this.size--;
    return removedItem;
  }
  peek() {
    return (this.items = this.head);
  }
  isFull() {
    return this.capacity === this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  length() {
    return this.size;
  }

  clear() {
    this.items = [];
    this.head = 0;
    this.tail = 0;
    this.size = 0;
  }

  toArray() {
    return this.items;
  }
}
