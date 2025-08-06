const util = require("util");

//Insertion-O(log n)
//Searching-O(log n)
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  dfs(order) {
    if (!this.root) return null;
    let arr = [];
    (function loop(node) {
      switch (order) {
        case "inOrder": //use to get non decreasing order
          if (node.left) loop(node.left);
          arr.push(node.value);
          if (node.right) loop(node.right);
          break;
        case "postOrder": //use to postfix
          if (node.left) loop(node.left);
          if (node.right) loop(node.right);
          arr.push(node.value);
          break;
        default:
          //Pre Order use to prefix
          arr.push(node.value);
          if (node.left) loop(node.left);
          if (node.right) loop(node.right);
      }
    })(this.root);
    return arr;
  }

  bfs(value) {
    if (!this.root) return null;
    let arr = [this.root];
    let find = null;
    (function loop(arr) {
      console.log(arr);
      if (arr.length) {
        const current = arr.shift();
        if (current.value == value) {
          find = value;
          return find;
        }
        if (current.left) {
          arr.unshift(current.left);
        }
        if (current.right) {
          arr.unshift(current.right);
        }
        loop(arr);
      } else {
        return null;
      }
    })(arr);
    return find;
  }

  find(value) {
    let pointer = this.root;
    let find = null;
    (function loop(pointer) {
      if (pointer) {
        if (value == pointer.value) {
          find = value;
          return find;
        }
        if (value > pointer.value) {
          loop(pointer.right);
        } else if (value < pointer.value) {
          loop(pointer.left);
        }
      } else {
        return null;
      }
    })(pointer);
    return find;
  }

  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
    } else {
      //   let loop = true;
      let pointer = this.root;
      (function loop(pointer) {
        if (value > pointer.value) {
          if (pointer.right) {
            pointer = pointer.right;
            loop(pointer);
          } else {
            pointer.right = new Node(value);
            return pointer;
          }
        } else if (value < pointer.value) {
          if (pointer.left) {
            pointer = pointer.left;
            loop(pointer);
          } else {
            pointer.left = new Node(value);
            return pointer;
          }
        }
      })(pointer);
      //   while (loop) {
      //     if (value > pointer.value) {
      //       if (pointer.right) {
      //         pointer = pointer.right;
      //       } else {
      //         pointer.right = new Node(value);
      //         loop = false;
      //       }
      //     } else {
      //       if (pointer.left) {
      //         pointer = pointer.left;
      //       } else {
      //         pointer.left = new Node(value);
      //         loop = false;
      //       }
      //     }
      //   }
    }
  }
}

const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(12);
bst.insert(11);
bst.insert(9);
bst.insert(14);
// console.log(util.inspect(bst.root, false, null /* enable colors */));
// console.log(bst.find(10));
// console.log(bst.bfs(14));
console.log(bst.dfs("postOrder"));
