class Node {
  constructor(value) {
    this.val = value;
    this.next = null;
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

    for (let i = 0; i < levelSize; i++) {
      let ele = queue.shift();

      if (i == levelSize - 1) {
        result.push(ele.val);
      }
      if (ele.left !== null) {
        queue.push(ele.left);
      }
      if (ele.right !== null) {
        queue.push(ele.right);
      }
    }
  }
  return result;
}

const root = new Node(1);

root.left = new Node(2);
root.right = new Node(3);

root.left.left = new Node(4);
root.left.right = new Node(5);

// root.right.left = new Node(6);
// root.right.right = new Node(7);

const result = treeTraversalArrayByLevel(root);
console.log(result);

class Solution {
  traverse(root) {
    let result = [];
    if (root === null) {
      return result;
    }

    let queue = new Queue();
    queue.enqueue(root);

    while (!queue.isEmpty()) {
      let levelSize = queue.length();
      let currentNode = null;
      for (let i = 0; i < levelSize; i++) {
        currentNode = queue.dequeue();
        // insert the children of current node in the queue
        if (currentNode.left !== null) {
          queue.enqueue(currentNode.left);
        }
        if (currentNode.right !== null) {
          queue.enqueue(currentNode.right);
        }
      }
      // Add last node of the current level to the result.
      result.push(currentNode.val);
    }

    return result;
  }
}

// Similar Questions
// Problem 1: Given a binary tree, return an array containing nodes in its left view. The left view of a binary tree is the set of nodes visible when the tree is seen from the left side.

// Solution: We will be following a similar approach, but instead of appending the last element of each level, we will be appending the first element of each level to the output array.
//
// Solution
// To solve this problem, we will use the Breadth-First Search (BFS) agorithm to traverse the binary tree and compute the right view of the tree. It processes the tree level by level, ensuring that at each level, the last node encountered (rightmost node) is stored in the result list. A queue is used to facilitate level-wise traversal, and at the end of each level, the last node is added to the result.

// Step-by-Step Algorithm
// Base Case: If the root is null, return an empty list since there are no nodes to process.

// Initialize Queue: Create an empty queue and add the root node to it. This queue is used to traverse the tree level by level, starting from the root.

// While the Queue is Not Empty:

// Determine Level Size: Calculate the number of nodes at the current level using queue.size(). This ensures that we process all nodes at the same level before moving to the next level.

// Process Each Node at the Current Level:

// For each node in the current level:
// Dequeue the Current Node: Poll the node from the front of the queue.
// Add its Left Child to the Queue: If the current node has a left child, add it to the queue to process in the next level.
// Add its Right Child to the Queue: If the current node has a right child, add it to the queue for the next level.
// Add the Last Node of the Level to the Result: After processing all nodes at the current level, add the value of the last node (rightmost node) to the result list. This node will represent the right view at that level.

// Repeat: Continue this process for each level until the queue is empty, meaning all levels have been processed.

// Return the Result: After processing all levels, the result list will contain the nodes visible from the right view of the tree.

// Algorithm Walkthrough
// Input: root = [12, 7, 1, null, 9, 10, 5, null, 3]
