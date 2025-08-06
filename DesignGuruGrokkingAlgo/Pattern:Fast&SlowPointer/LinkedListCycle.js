class Node {
  constructor(value, next = null) {
    this.val = value;
    this.next = next;
  }
}

function hasCycle(head) {
  let f = head;
  let s = null;
  let counter = 0;
  let cycle = false;
  let len = 0;
  while (f.next) {
    counter++;
    if (f.next == s?.next) {
      if (cycle) {
        break;
      }
      cycle = true;
    }
    if (counter == 2 && cycle == false) {
      s = s ? s.next : head;
      counter = 0;
    }
    if (cycle) {
      len++;
    }
    f = f.next;
  }

  // TODO: Write your code here
  return [cycle, len];
}

const head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);
head.next.next.next.next.next = new Node(6);

// Create a cycle in the linked list by connecting the last node to a previous node.
head.next.next.next.next.next.next = head.next.next;

const result = hasCycle(head);
console.log(result);

// function hasCycle(head) {
//   let slow = head,
//     fast = head;

//   // Use two pointers to traverse the linked list
//   while (fast !== null && fast.next !== null) {
//     fast = fast.next.next; // Move the fast pointer two steps ahead
//     slow = slow.next; // Move the slow pointer one step ahead

//     if (slow === fast) {
//       return true; // If they meet, there's a cycle in the linked list
//     }
//   }
//   return false; // If we reach the end of the list, there's no cycle
// }
// Solution
// Imagine two racers running in a circular racing track. If one racer is faster than the other, the faster racer is bound to catch up and cross the slower racer from behind. We can use this fact to devise an algorithm to determine if a LinkedList has a cycle in it or not.

// Imagine we have a slow and a fast pointer to traverse the LinkedList. In each iteration, the slow pointer moves one step and the fast pointer moves two steps. This gives us two conclusions:

// If the LinkedList doesn’t have a cycle in it, the fast pointer will reach the end of the LinkedList before the slow pointer to reveal that there is no cycle in the LinkedList.

// The slow pointer will never be able to catch up to the fast pointer if there is no cycle in the LinkedList.

// If the LinkedList has a cycle, the fast pointer enters the cycle first, followed by the slow pointer. After this, both pointers will keep moving in the cycle infinitely. If at any stage both of these pointers meet, we can conclude that the LinkedList has a cycle in it. Let’s analyze if it is possible for the two pointers to meet. When the fast pointer is approaching the slow pointer from behind we have two possibilities:

// The fast pointer is one step behind the slow pointer.
// The fast pointer is two steps behind the slow pointer.
// All other distances between the fast and slow pointers will reduce to one of these two possibilities. Let’s analyze these scenarios, considering the fast pointer always moves first:

// If the fast pointer is one step behind the slow pointer: The fast pointer moves two steps and the slow pointer moves one step, and they both meet.
// If the fast pointer is two steps behind the slow pointer: The fast pointer moves two steps and the slow pointer moves one step. After the moves, the fast pointer will be one step behind the slow pointer, which reduces this scenario to the first scenario. This means that the two pointers will meet in the next iteration.
// This concludes that the two pointers will definitely meet if the LinkedList has a cycle. A similar analysis can be done where the slow pointer moves first. Here is a visual representation of the above discussion:

// Time Complexity
// The algorithm uses two pointers, slow and fast, to traverse the linked list.
// In the worst case (when there is no cycle), the fast pointer will traverse the entire list at twice the speed of the slow pointer. Therefore, the slow pointer moves through N nodes, where N is the number of nodes in the list.
// The time complexity is , where N is the number of nodes in the linked list.
// Space Complexity
// The algorithm uses two pointers, slow and fast, which only take up a constant amount of space.
// There are no additional data structures or memory allocations that depend on the size of the input.
// Overall space complexity:  (constant space).

// Conclusion:
// Time Complexity:
// Space Complexity:

//For Cycle Length
// Time Complexity
// Phase 1: Detecting the cycle
// The algorithm uses two pointers (slow and fast) to detect a cycle. In the worst case (when there is a cycle), the fast pointer moves twice as fast as the slow pointer. Therefore, the two pointers will meet within a linear traversal of the list. Detecting the cycle requires $O(N)$, where N is the number of nodes in the linked list.

// Phase 2: Calculating the cycle length
// Once a cycle is detected, the algorithm calculates the length of the cycle by traversing the cycle with a single pointer. This process also takes $O(C)$ time, where C is the length of the cycle. Since $C \leq N$, this part is also bounded by $O(N)$ in the worst case.

// Overall time complexity: $O(N)$, where N is the total number of nodes in the linked list.

// Space Complexity
// The algorithm uses two pointers (slow and fast) to detect the cycle and another pointer (current) to calculate the cycle length. These pointers take constant space. No additional data structures are used that scale with the input size.

// Overall space complexity: $O(1)$ (constant space).
