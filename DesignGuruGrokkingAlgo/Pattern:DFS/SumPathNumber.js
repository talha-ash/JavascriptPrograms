class TreeNode {
  constructor(value) {
    this.val = value;
    this.next = null;
    this.left = null;
    this.right = null;
  }
}

function minimumSumToLeaf(root) {
  function recur(root, str) {
    if (root == null) {
      return 0;
    }
    if (root.left == null && root.right == null) {
      str = str + root.val;

      return parseInt(str);
    }

    let r1 = recur(root.left, str + root.val);
    let r2 = recur(root.right, str + root.val);

    return r1 + r2;
  }

  return recur(root, "");
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(7);
root1.right = new TreeNode(9);

root1.left.left = new TreeNode(4);
root1.left.right = new TreeNode(5);

root1.right.left = new TreeNode(2);
root1.right.right = new TreeNode(7);

const root2 = new TreeNode(-1);
root2.left = new TreeNode(2);
root2.right = new TreeNode(3);
root2.left.left = new TreeNode(4);
root2.left.right = new TreeNode(5);
root2.right.left = new TreeNode(1);

const root3 = new TreeNode(8);
root3.left = new TreeNode(40);
root3.right = new TreeNode(12);
root3.right.left = new TreeNode(10);
root3.right.right = new TreeNode(18);
root3.right.left.left = new TreeNode(2);

const result = minimumSumToLeaf(root1, 12);
console.log(result);

// Explanation of Calculating Path Number for a Node
// Beginner Level
// When following the Binary Tree Path Sum pattern, we can use a Depth-First Search (DFS) approach to solve the problem. In addition to this, we need to keep track of the number representing the current path.

// Understanding Path Number Calculation:

// The path number for a node is calculated by taking the number representing the current path and appending the value of the node to it.
// Example:

// For instance, if we are at node ‘7’ and the current path number is ‘1’, we can calculate the path number for this node as follows:
// 1 * 10 + 7 = 17
// This means the path number for node ‘7’ is ‘17’.
// Intermediate Level
// When traversing a binary tree using a Depth-First Search (DFS) approach, it's important to calculate the path number for each node. This plays a crucial role in solving problems related to the Binary Tree Path Sum pattern.

// Calculation Method:

// To calculate the path number for a node, we can use the current path number and append the value of the node to it.
// For example, if the current path number is ‘1’ and we are at node ‘7’, the calculation would be:
// 1 * 10 + 7 = 17
// Therefore, the path number for node ‘7’ is ‘17’.
// Applying the Approach:

// This approach helps us keep track of the path number for each node, which is useful for various problems related to binary tree paths and sums.
// Advanced Level
// In the context of the Binary Tree Path Sum pattern, it is essential to understand the detailed process of calculating the path number for a node. This process is integral to effectively solving problems that involve navigating through binary tree structures and performing calculations based on the paths.

// Calculation Procedure:

// The path number for a node is derived by taking the current path number and appending the value of the node to it. This effectively creates a new path number for the node.
// For example, if the current path number is ‘1’ and we encounter a node with the value ‘7’, the calculation would be:
// 1 * 10 + 7 = 17
// Thus, the path number for the node with value ‘7’ is ‘17’.
// Significance:

// Calculating the path number for each node allows us to represent the unique paths within the binary tree and facilitates problem-solving related to path sums and traversals.
// By understanding and applying this approach, developers and engineers can efficiently address challenges related to binary tree path calculations and utilize the path numbers to derive solutions pertaining to path sums and related scenarios.

//   Explanation of Time and Space Complexity in Algorithms
//   Time Complexity
//   Time complexity refers to the measure of the amount of time an algorithm takes to complete, as a function of the size of its input.
//   In this algorithm, the time complexity is denoted as O(N), where 'N' represents the total number of nodes in the tree.
//   This means that as the number of nodes in the tree increases, the time taken to traverse the tree will increase at a linear rate.
//   Understanding O(N)
//   For example, if there are 10 nodes in the tree, the algorithm would take 10 units of time. If there are 100 nodes, it would take 100 units, and so on.
//   Space Complexity
//   Space complexity refers to the measure of the amount of memory space an algorithm uses, as a function of the size of its input.
//   In the worst case scenario, the space complexity for this algorithm is O(N), meaning it will use memory space that increases linearly with the number of nodes in the tree.
//   This space is mainly used to store the recursion stack, which keeps track of the function calls while traversing the tree.
//   Visualizing Space Usage
//   If the tree is like a straight line with each node having only one child, the recursion stack will grow as tall as the number of nodes, using more and more memory space.
//   Overall Understanding
//   In summary, the time complexity O(N) indicates that the algorithm's time taken increases linearly with the number of nodes, and the space complexity O(N) means that memory usage also increases linearly with the number of nodes.
//   By understanding the time and space complexity, we can assess the efficiency and resource requirements of an algorithm. These insights can be crucial in making informed decisions when choosing algorithms for different tasks or problems.
