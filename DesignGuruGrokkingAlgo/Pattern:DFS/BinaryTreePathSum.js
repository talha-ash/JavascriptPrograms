class TreeNode {
  constructor(value) {
    this.val = value;
    this.next = null;
    this.left = null;
    this.right = null;
  }
}

function minimumSumToLeaf(root, sum) {
  function recur(root, prev) {
    if (root == null) {
      return false;
    }
    if (root.left == null && root.right == null) {
      if (root.val + prev == sum) {
        return true;
      }
      return false;
    }

    let r1 = recur(root.left, root.val + prev);
    let r2 = recur(root.right, root.val + prev);

    return r1 == true || r2 == true ? true : false;
  }

  return recur(root, 0);
}

const root1 = new TreeNode(12);
root1.left = new TreeNode(7);
root1.right = new TreeNode(1);

root1.left.left = new TreeNode(9);
// root1.left.right = new TreeNode(5);

root1.right.left = new TreeNode(10);
root1.right.right = new TreeNode(5);

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

const result = minimumSumToLeaf(root1, 23);
console.log(result);

function hasPath(root, sum) {
  if (root === null) {
    return false;
  }

  // if the current node is a leaf and its value is equal to the sum, we've found a path
  if (root.val === sum && root.left === null && root.right === null) {
    return true;
  }

  // recursively call to traverse the left and right sub-tree
  // return true if any of the two recursive call return true
  return (
    this.hasPath(root.left, sum - root.val) ||
    this.hasPath(root.right, sum - root.val)
  );
}
// Solution
// The Binary Tree Path Sum problem involves determining whether there is a root-to-leaf path in a binary tree such that the sum of the node values along the path equals a given target sum. The algorithm traverses the tree recursively, adjusting the target sum at each step by subtracting the value of the current node. At each step, we pass the updated target sum to the recursive DFS call. If a leaf node is reached and its value matches the adjusted sum, a valid path has been found.

// Step-by-Step Algorithm
// Check if the root is null:

// If the root is null, return false because there is no path in an empty tree.
// Check if the current node is a leaf:

// If the current node is a leaf, and its value matches the current sum (target sum minus the values encountered so far), return true, indicating that a valid path has been found.
// Traverse the left and right subtrees:

// If the current node is not a leaf, adjust the sum by subtracting the value of the current node from the target sum.
// Recursively check both the left and right children, passing the updated sum to both recursive calls.
// Return true if any recursive call returns true:

// If any of the recursive calls (left or right subtree) returns true, return true to indicate that a valid path has been found.
// Otherwise, return false if neither of the recursive calls finds a valid path.
// Algorithm Walkthrough

// Step 1 - Start at the root node (12):

// The current node is 12.
// The target sum is 23.
// Check if the current node is null: No.
// Check if the current node is a leaf: No (it has left and right children).
// Subtract the current node's value from the target sum: 23 - 12 = 11.
// Now recursively check both the left and right subtrees, with the new sum 11.
// Step 2 - Traverse the left subtree (Node 7):

// The current node is 7.
// The target sum is 11.
// Check if the current node is null: No.
// Check if the current node is a leaf: No (it has a left child).
// Subtract the current node's value from the target sum: 11 - 7 = 4.
// Now recursively check the left subtree with the new sum 4 (as the right child is null).
// Step 3 - Traverse the left subtree (Node 9):

// The current node is 9.
// The target sum is 4.
// Check if the current node is null: No.
// Check if the current node is a leaf: Yes (it has no left or right children).
// Check if the current node's value matches the target sum: 9 != 4.
// Since the values do not match, return false and backtrack to node 7.
// Step 4 - Traverse the right subtree of Node 12 (Node 1):

// Backtrack to node 12 and now traverse its right subtree.
// The current node is 1.
// The target sum is 11 (from step 1).
// Check if the current node is null: No.
// Check if the current node is a leaf: No (it has left and right children).
// Subtract the current node's value from the target sum: 11 - 1 = 10.
// Now recursively check both the left and right subtrees with the new sum 10.
// Step 5 - Traverse the left subtree (Node 10):

// The current node is 10.
// The target sum is 10.
// Check if the current node is null: No.
// Check if the current node is a leaf: Yes (it has no left or right children).
// Check if the current node's value matches the target sum: 10 == 10.
// Since the values match, return true indicating that a valid path (12 → 1 → 10) has been found.
// Step 6 - Return final result:

// Since we found a valid path in step 5, the algorithm returns true for the input tree and sum 23.
// Final Output:
// The tree has a path with a sum of 23: 12 → 1 → 10. Hence, the result is true.

//   Time Complexity
//   The time complexity of an algorithm tells us how the time taken to run the algorithm grows with the size of the input data. For the given algorithm:

//   Time complexity: O(N)
//   N represents the total number of nodes in the tree.
//   We visit each node once, so the time it takes to run the algorithm increases linearly with the number of nodes in the tree.
//   Space Complexity
//   The space complexity of an algorithm tells us how much extra space it needs to run, depending on the input data. For the given algorithm:

//   Space complexity: O(N) in the worst case
//   In the worst case scenario, we need to store a recursion stack to keep track of the nodes we visit.
//   For example, if the tree is like a linked list where each node has only one child, the recursion stack could become as large as the number of nodes in the tree.
//   Understanding time and space complexity will help you evaluate the efficiency of algorithms and make informed decisions about which algorithm to use for different situations.
