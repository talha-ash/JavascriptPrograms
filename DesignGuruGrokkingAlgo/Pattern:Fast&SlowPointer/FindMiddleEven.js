class Node {
  constructor(value, next = null) {
    this.val = value;
    this.next = next;
  }
}
function func(head) {
  let f = head;
  let s = head;

  while (f.next != null && f.next.next != null) {
    f = f.next.next;
    s = s.next;
  }

  if (f.next != null) {
    return s.next.val;
  } else {
    return s.val;
  }
}

const head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);
head.next.next.next.next.next = new Node(6);
head.next.next.next.next.next.next = new Node(7);

const result = func(head);
console.log(result);

// We can use the Fast & Slow pointers method such that the fast pointer is always twice the nodes ahead of the slow pointer. This way, when the fast pointer reaches the end of the LinkedList, the slow pointer will be pointing at the middle node.

// Complexity Analysis
// Time Complexity
// The algorithm uses two pointers (slow and fast) for two-pointer traversal. The slow pointer moves one step at a time, while the fast pointer moves two steps at a time. This allows the fast pointer to reach the end of the linked list when the slow pointer is at the middle. Since both pointers traverse the list linearly, each node is visited once. The total time complexity is O(N), where N is the number of nodes in the linked list.

// Overall time complexity: O(N).

// Space Complexity
// The algorithm uses only two pointers (slow and fast), and these pointers require constant space. No additional data structures are used that depend on the input size.

// Overall space complexity: O(1) (constant space).
