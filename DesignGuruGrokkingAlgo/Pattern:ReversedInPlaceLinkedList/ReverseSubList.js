class Node {
  constructor(value, next = null) {
    this.val = value;
    this.next = next;
  }
}
function func(head, start, end) {
  let subHead = head;
  let endTail = head;
  let startNode = head;
  while (end > 1) {
    if (start > 1) {
      startNode = subHead;
      subHead = subHead.next;
      start--;
    }
    endTail = endTail.next;

    end--;
  }

  let lastNode = endTail.next;

  endTail.next = null;
  startNode.next = reverse(subHead);
  subHead.next = lastNode;

  let result = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  return result;
  function reverse(head) {
    let prev = null;
    let start = head;
    let next = null;
    while (start != null) {
      next = start.next;
      start.next = prev;
      prev = start;
      start = next;
    }
    return prev;
  }
}

const head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);
head.next.next.next.next.next = new Node(6);
head.next.next.next.next.next.next = new Node(7);

const result = func(head, 2, 4);
console.log(result);

// Let me break down this solution approach that uses the "In-place Reversal of a LinkedList" pattern:
// Let's understand this step by step with an example:
// Original List: 1 -> 2 -> 3 -> 4 -> 5
// Let's say p = 2, q = 4

// Skip first p-1 nodes:

// javascriptCopy// For p=2, skip 1 node
// // We'll stop at node 1
// 1 -> (2 -> 3 -> 4) -> 5

// Remember node at p-1:

// javascriptCopy// Save node 1 (p-1 node)
// // We'll need this to reconnect later
// [1] -> (2 -> 3 -> 4) -> 5

// Reverse nodes from p to q:

javascriptCopy; // Before: 2 -> 3 -> 4
// After:  2 <- 3 <- 4
// [1] -> (4 -> 3 -> 2) -> 5

// Connect p-1 and q+1:

javascriptCopy; // Connect node 1 to node 4
// Connect node 2 to node 5
// 1 -> 4 -> 3 -> 2 -> 5
// Here's the code implementation with detailed comments:
// javascriptCopyfunction
function reverseSubList(head, p, q) {
  // If p==q, no need to reverse
  if (p === q) {
    return head;
  }

  // Skip the first p-1 nodes
  let current = head;
  let previous = null;
  let i = 0;

  while (current !== null && i < p - 1) {
    previous = current;
    current = current.next;
    i++;
  }

  // previous is now at p-1 node
  // current is now at p node
  let lastNodeOfFirstPart = previous;

  // Remember the node at p (will be last node after reversal)
  let lastNodeOfSubList = current;

  // Reverse nodes from p to q
  // Using standard linked list reversal with 3 pointers
  let next = null;
  i = 0;

  while (current !== null && i < q - p + 1) {
    next = current.next;
    current.next = previous;
    previous = current;
    current = next;
    i++;
  }

  // Connect with first part
  if (lastNodeOfFirstPart !== null) {
    // p was not at start
    lastNodeOfFirstPart.next = previous;
  } else {
    // p was at start
    head = previous;
  }

  // Connect with last part
  lastNodeOfSubList.next = current;

  return head;
}
// Key insights:

// We use three pointers (previous, current, next) for reversal
// We track the node before reversal starts (lastNodeOfFirstPart)
// We track the first node of reversed portion (lastNodeOfSubList)
// Special handling when p=1 (reversal starts at head)

// Time Complexity: O(N) where N is the total nodes
// Space Complexity: O(1) as we only use a few pointers
// This in-place approach is efficient because:

// No extra space needed
// Single pass through the list
// Only pointer manipulation, no data copying

// Intermediate Level Explanation
// Problem 1: Reverse the first ‘k’ elements of a given LinkedList
// To reverse the first ‘k’ nodes of a LinkedList, we can use the same approach as reversing a sublist in the list.
// We need to pass the starting position p=1 and the ending position q=k to reverse the first ‘k’ elements.
// Solution:
// To reverse the first ‘k’ nodes of the list, we use the same technique as reversing a sublist.
// The reverse function takes the head of the list and the positions p and q as parameters.
// For Problem 1, we would call the reverse function with p=1 and q=k to reverse the first ‘k’ nodes.
// Problem 2: Reverse a LinkedList based on its size
// Given a LinkedList with ‘n’ nodes, the reversal process changes based on whether ‘n’ is even or odd.
// When ‘n’ is even:
// We reverse the first ‘n/2’ nodes and then reverse the last ‘n/2’ nodes.
// When ‘n’ is odd:
// We keep the middle node as it is and reverse the first ‘n/2’ nodes and the last ‘n/2’ nodes, skipping the middle node in the second reversal step.
// Solution:
// To reverse based on the size of the LinkedList, we use a combination of the reverse function and conditional logic to handle even and odd cases.
// When ‘n’ is even, we perform two calls to the reverse function:
// head = reverse(head, 1, n/2) to reverse the first ‘n/2’ nodes
// head = reverse(head, n/2 + 1, n) to reverse the last ‘n/2’ nodes
// When ‘n’ is odd, we perform similar steps, but with a slight adjustment on the second call to reverse to skip the middle node.
// This explanation should help you understand how to reverse parts of a LinkedList based on specific criteria.
