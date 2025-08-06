// class TreeNode {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }

class Solution {
  findDepth(root) {
    if (root === null) {
      return 0;
    }

    const queue = [];
    queue.push(root);
    let minimumTreeDepth = 0;
    while (queue.length > 0) {
      minimumTreeDepth += 1;
      let levelSize = queue.length;
      for (let i = 0; i < levelSize; i++) {
        let currentNode = queue.shift();

        // check if this is a leaf node
        if (currentNode.left === null && currentNode.right === null) {
          return minimumTreeDepth;
        }
        // insert the children of current node in the queue
        if (currentNode.left !== null) {
          queue.push(currentNode.left);
        }
        if (currentNode.right !== null) {
          queue.push(currentNode.right);
        }
      }
    }
    return minimumTreeDepth;
  }
}

const sol = new Solution();
const root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
console.log(`Tree Minimum Depth: ${sol.findDepth(root)}`);
root.left.left = new TreeNode(9);
root.right.left.left = new TreeNode(11);
console.log(`Tree Minimum Depth: ${sol.findDepth(root)}`);

// Similar Problems
// Problem 1: Given a binary tree, find its maximum depth (or height) using Tree BFS traversal.

// Solution: We will follow a similar approach. Instead of returning as soon as we find a leaf node, we will keep traversing for all the levels, incrementing maximumDepth each time we complete a level. Here is what the code will look like:
