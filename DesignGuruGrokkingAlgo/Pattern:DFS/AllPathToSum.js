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
      return null;
    }
    if (root.left == null && root.right == null) {
      if (root.val + prev == sum) {
        return [[root.val]];
      }
      return null;
    }

    let r1 = recur(root.left, root.val + prev);
    let r2 = recur(root.right, root.val + prev);

    let resultArray = [];
    if (r1 && r2) {
      resultArray = r1.concat(r2);
    } else if (r1) {
      resultArray = r1;
    } else if (r2) {
      resultArray = r2;
    }

    resultArray.map((arr) => arr.push(root.val));
    return resultArray;
  }

  return recur(root, 0);
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

function findPaths(root, sum) {
  let allPaths = [];
  let currentPath = [];
  this.findPathsRecursive(root, sum, currentPath, allPaths);
  return allPaths;
}

function findPathsRecursive(currentNode, sum, currentPath, allPaths) {
  if (currentNode === null) return;

  // add the current node to the path
  currentPath.push(currentNode.val);

  // if the current node is a leaf and its value is equal to sum, save the current path
  if (
    currentNode.val === sum &&
    currentNode.left === null &&
    currentNode.right === null
  ) {
    allPaths.push([...currentPath]);
  } else {
    // traverse the left sub-tree
    this.findPathsRecursive(
      currentNode.left,
      sum - currentNode.val,
      currentPath,
      allPaths,
    );
    // traverse the right sub-tree
    this.findPathsRecursive(
      currentNode.right,
      sum - currentNode.val,
      currentPath,
      allPaths,
    );
  }

  // remove the current node from the path to backtrack,
  // we need to remove the current node while we are going up the recursive call stack.
  currentPath.pop();
}

// Beginner
// Time Complexity The time complexity of an algorithm tells us how the runtime of the algorithm grows as the input size increases. In this case, the time complexity of the algorithm is O(N), where N is the total number of nodes in the tree. This means that the runtime of the algorithm grows linearly with the number of nodes in the tree.

// Space Complexity Space complexity refers to the amount of memory used by an algorithm. In this case, the space complexity of the algorithm is O(N) in the worst case, where N is the number of nodes in the tree. This means that the amount of memory required by the algorithm grows linearly with the number of nodes in the tree.

// Intermediate
// Time Complexity The time complexity of the algorithm is O(N), where N is the total number of nodes in the tree. This is because we traverse each node once, which takes O(N) time, and for every leaf node, we might have to store its path, which also takes O(N) time.

// Space Complexity The space complexity of the algorithm is O(N) in the worst case, due to the recursion stack. In addition, the space required for the allPaths array is also a consideration. In the worst case, the number of elements in allPaths will be at most the number of leaves in the tree, and each path can have a maximum of log(N) nodes. Therefore, the total size of the allPaths list will be O(N * log(N)).

// Advanced
// Time Complexity The time complexity of the algorithm is O(N) because we traverse each of the N nodes once, and for each leaf node, we might have to copy log(N) nodes to store its path. This results in a time complexity of O(N * log(N)).

// Space Complexity The space complexity of the algorithm is O(N) in the worst case due to the recursion stack, and O(N * log(N)) due to the storage required for allPaths. This analysis accounts for the scenario in which the given tree is a linked list, as well as the maximum possible paths and nodes in a binary tree.
