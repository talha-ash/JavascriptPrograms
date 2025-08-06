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
    let currentLevel = [];
    for (let i = 0; i < levelSize; i++) {
      let ele = queue.shift();
      // if need zigzag we can use here unshift and push each level
      // direction ? currentLevel.push(ele.val) : currentLevel.unshift(ele.val);
      currentLevel.push(ele.val);
      if (ele.left !== null) {
        queue.push(ele.left);
      }
      if (ele.right !== null) {
        queue.push(ele.right);
      }
    }
    //For reversal storage mean bottom first then use unShift
    result.push(currentLevel);
  }
  return result;
}

const root = new Node(1);

root.right = new Node(60);
root.right.left = new Node(30);
root.right.left.right = new Node(65);

const result = treeTraversalArrayByLevel(root);
console.log(result);

// Solution
// Since we need to traverse all nodes of each level before moving onto the next level, we can use the Breadth First Search (BFS) or Level Order traversal technique to solve this problem.

// We can use a Queue to efficiently traverse a tree level-by-level. Here are the steps of our algorithm:

// Start by pushing the root node to the queue.
// Keep iterating until the queue is empty.
// In each iteration, first count the elements in the queue (let’s call it levelSize). We will have these many nodes in the current level.
// Next, remove levelSize nodes from the queue and push their value in an array to represent the current level.
// After removing each node from the queue, insert both of its children into the queue.
// If the queue is not empty, repeat from step 3 for the next level.
// Let’s take the example-2 mentioned above to visually represent our algorithm:
// Time Complexity
// The time complexity of the algorithm is O(N), meaning the time it takes to run the algorithm increases linearly with the number of nodes in the tree (N).
// This is because we need to traverse each node in the tree exactly once. For example, if we have 10 nodes in the tree, the algorithm will take 10 units of time to complete.
// Space Complexity
// The space complexity of the algorithm is also O(N), meaning the amount of memory needed increases linearly with the number of nodes in the tree (N).
// This is because we need to store a list containing the level order traversal, which requires space proportional to the number of nodes. Additionally, we use a queue to keep track of the nodes we visit, which also requires space proportional to the number of nodes in the tree.
// For example, if we have a tree with 10 nodes, the algorithm will need to use 10 units of memory to store the level order traversal and the queue.
// By understanding the time and space complexity of an algorithm, we can make informed decisions about its efficiency and potential performance.
