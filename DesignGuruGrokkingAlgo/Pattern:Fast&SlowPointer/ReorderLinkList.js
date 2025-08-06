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
    f = f.next;
  }

  let headSecondHalf = reverse(s.next);
  let headFirstHalf = head;
  while (headFirstHalf !== null && headSecondHalf !== null) {
    let temp = headFirstHalf.next;
    headFirstHalf.next = headSecondHalf;
    headFirstHalf = temp;

    temp = headSecondHalf.next;
    headSecondHalf.next = headFirstHalf;
    headSecondHalf = temp;
  }

  function reverse(head) {
    let prev = null;
    while (head !== null) {
      let next = head.next;
      head.next = prev;
      prev = head;
      head = next;
    }
    return prev;
  }
  // set the next of the last node to 'null'
  if (headFirstHalf !== null) {
    headFirstHalf.next = null;
  }
  // while (head.next != null) {
  //   console.log(head.val);
  //   head = head.next;
  // }
  return head;
}

const head = new Node(2);
head.next = new Node(4);
head.next.next = new Node(6);
head.next.next.next = new Node(6);
head.next.next.next.next = new Node(4);
head.next.next.next.next.next = new Node(2);
head.next.next.next.next.next.next = new Node(7);
head.next.next.next.next.next.next.next = new Node(8);

const result = func(head);
console.log(result);

// Solution
// This problem shares similarities with Palindrome LinkedList. To rearrange the given LinkedList we will follow the following steps:

// We can use the Fast & Slow pointers method similar to Middle of the LinkedList to find the middle node of the LinkedList.
// Once we have the middle of the LinkedList, we will reverse the second half of the LinkedList.
// Finally, we’ll iterate through the first half and the reversed second half to produce a LinkedList in the required order.
// Here is the visual representation of this algorithm for Example-1:

// Complexity Analysis
// Time Complexity
// Finding the middle of the linked list: $O(N)$, where N is the number of nodes in the linked list.
// Reversing the second half: $O(N/2)$ which simplifies to $O(N)$.
// Merging the two halves: $O(N)$.
// Overall time complexity: $O(N)$, where N is the number of nodes in the linked list.
// Space Complexity
// The algorithm modifies the linked list in place, and no extra space is used other than the pointers (slow, fast, prev, etc.).
// The space required for these variables is constant, so the space complexity is $O(1)$.
// Overall space complexity: $O(1)$ (constant space).
