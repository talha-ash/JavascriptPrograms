class Node {
  constructor(value) {
    this.val = value;
    this.left = null;
    this.right = null;
  }
}

function treeTraversalArrayByLevel(root) {
  let queue = [];
  let result = [];
  if (root == null) {
    return result;
  }

  queue.push(root);
  while (queue.length) {
    const levelSize = queue.length;
    let currentLevelSum = 0;
    for (let i = 0; i < levelSize; i++) {
      let ele = queue.shift();
      currentLevelSum = currentLevelSum + ele.val;

      if (ele.left !== null) {
        queue.push(ele.left);
      }
      if (ele.right !== null) {
        queue.push(ele.right);
      }
    }

    result.push(currentLevelSum / levelSize);
  }
  return result;
}

const root = new Node(1);

root.left = new Node(2);
root.right = new Node(3);

root.left.left = new Node(4);
root.left.right = new Node(5);

root.right.left = new Node(6);
root.right.right = new Node(7);

const result = treeTraversalArrayByLevel(root);
console.log(result);

// Intermediate Level Explanation

// In this problem, we want to find the largest value on each level of a binary tree. Here's a breakdown of the solution:

// Understanding the Problem:

// We are given a binary tree, which is a data structure where each node has at most two child nodes.
// We need to find the largest value on each level of the tree.
// Tracking the Maximum Value:

// We will start by initializing a variable called maxValue to keep track of the maximum value on each level.
// As we traverse the tree, we will compare the value of each node with the current maxValue and update maxValue if the node's value is greater.
// Pseudocode Solution:

// Initialize maxValue to negative infinity
// Create a queue to store nodes for level-order traversal
// Enqueue the root node of the tree into the queue
// While the queue is not empty:
//     Initialize maxValue for the current level to negative infinity
//     Get the size of the queue (this will give us the number of nodes at the current level)
//     Iterate through the nodes at the current level:
//         Dequeue a node from the front of the queue
//         Update maxValue for the current level if the node's value is greater
//         Enqueue the child nodes of the dequeued node if they exist
//     Store the maxValue for the current level in a result list
// Return the result list containing the maximum value on each level
// Example:

// Consider the following binary tree:
//           5
//          / \
//         3   8
//        /   / \
//       1   7   10
// For this tree, the maximum value on each level would be [5, 8, 10].
// Coding Implementation:

// The given pseudocode can be translated into a programming language like Python or Java to solve the problem.
// By following this approach, we can find the largest value on each level of a binary tree.
