class Node {
  constructor(data) {
    this.data = data; // Store the data in this node
    this.next = null; // Initialize the next node as null
  }
}

class Stack {
  constructor() {
    this.top = null; // Initialize the top of the stack as null
  }

  pop() {
    if (this.top === null) {
      throw new Error("Stack is empty"); // Throw an error if the stack is empty
    }
    const item = this.top.data; // Store the top item's data
    this.top = this.top.next; // Update the top to be the next node
    return item; // Return the popped item
  }

  push(item) {
    const node = new Node(item); // Create a new node with the provided data
    node.next = this.top; // Set the next of this new node to be the current top
    this.top = node; // Update the top to be the new node
  }

  peek() {
    if (this.top === null) {
      throw new Error("Stack is empty"); // Throw an error if the stack is empty
    }
    return this.top.data; // Return the top item's data
  }

  isEmpty() {
    return this.top === null; // Return true if the stack is empty, false otherwise
  }
}
