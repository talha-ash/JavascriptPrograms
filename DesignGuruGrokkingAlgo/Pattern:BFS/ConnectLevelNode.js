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

    let prevNode = null;
    for (let i = 0; i < levelSize; i++) {
      let ele = queue.shift();
      if (prevNode) {
        prevNode.next = ele;
        ele.next = null;
        prevNode = ele;
      } else {
        ele.next = null;
        prevNode = ele;
      }

      if (ele.left !== null) {
        queue.push(ele.left);
      }
      if (ele.right !== null) {
        queue.push(ele.right);
      }
    }
  }
  return root;
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
