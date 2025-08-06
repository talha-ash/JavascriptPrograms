class TreeNode {
  constructor(value) {
    this.val = value;
    this.next = null;
    this.left = null;
    this.right = null;
  }
}

function minimumSumToLeaf(root) {
  if (root == null) {
    return Infinity;
  }
  if (root.left == null && root.right == null) {
    return root.val;
  }

  let leftSum = minimumSumToLeaf(root.left);
  let rightSum = minimumSumToLeaf(root.right);

  const min = Math.min(leftSum, rightSum);
  return root.val + min;
}

const root1 = new TreeNode(10);
root1.left = new TreeNode(5);
root1.right = new TreeNode(15);
root1.right.left = new TreeNode(7);
root1.right.right = new TreeNode(20);

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

const result = minimumSumToLeaf(root1);
console.log(result);
