class TreeNode {
  constructor(value) {
    this.val = value;
    this.next = null;
    this.left = null;
    this.right = null;
  }
}

function minimumSumToLeaf(root, sequence) {
  let index = 0;
  function recur(root, index) {
    if (root == null) {
      return false;
    }
    if (root.left == null && root.right == null) {
      return sequence[index] == root.val;
    }
    const result = sequence[index] == root.val;
    index++;
    let r1 = recur(root.left, index);
    let r2 = recur(root.right, index);

    if (result) {
      return r1 || r2;
    } else {
      return false;
    }
  }

  return recur(root, index);
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(7);
root1.right = new TreeNode(9);

// root1.left.left = new TreeNode(4);
// root1.left.right = new TreeNode(5);

root1.right.left = new TreeNode(2);
root1.right.right = new TreeNode(9);

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

const result = minimumSumToLeaf(root1, [1, 9, 9]);
console.log(result);
