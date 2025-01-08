/*class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}*/

class Solution {
  findCycleStart(head) {
    let cycleLength = 0;

    // Find the LinkedList cycle using Floyd's Tortoise and Hare algorithm
    let slow = head,
      fast = head;
    while (fast !== null && fast.next !== null) {
      fast = fast.next.next; // Move two steps at a time
      slow = slow.next; // Move one step at a time
      if (slow === fast) {
        // Found the cycle
        cycleLength = this.calculateCycleLength(slow);
        break;
      }
    }
    return this.findStart(head, cycleLength);
  }

  calculateCycleLength(slow) {
    let current = slow,
      cycleLength = 0;

    // Calculate the length of the cycle by moving through it
    while (true) {
      current = current.next;
      cycleLength += 1;
      if (current === slow) {
        // Reached back to the starting point of the cycle
        break;
      }
    }
    return cycleLength;
  }

  findStart(head, cycleLength) {
    let pointer1 = head,
      pointer2 = head;

    // Move pointer2 ahead 'cycleLength' nodes
    while (cycleLength > 0) {
      pointer2 = pointer2.next;
      cycleLength -= 1;
    }

    // Increment both pointers until they meet at the start of the cycle
    while (pointer1 !== pointer2) {
      pointer1 = pointer1.next;
      pointer2 = pointer2.next;
    }

    return pointer1;
  }
}

const sol = new Solution();
const head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);
head.next.next.next.next.next = new Node(6);

// Create a cycle by connecting nodes
head.next.next.next.next.next.next = head.next.next;
console.log(`LinkedList cycle start: ${sol.findCycleStart(head).val}`);

// Create a different cycle
head.next.next.next.next.next.next = head.next.next.next;
console.log(`LinkedList cycle start: ${sol.findCycleStart(head).val}`);

// Create a cycle that points back to the head
head.next.next.next.next.next.next = head;
console.log(`LinkedList cycle start: ${sol.findCycleStart(head).val}`);

// Think of it like this:

// If you're K steps before cycle start (slow pointer)
// And I'm M steps after cycle start (fast pointer)
// And we know K = nC - M
// When we both walk at same speed, we'll meet at cycle start!

// It's like two people walking around a track:

// One starts K steps before the track (slow)
// One starts M steps into the track (fast)
// If K = track_length - M
// They'll meet right at track start!

// If we know the length of the LinkedList cycle, we can find the start of the cycle through the following steps:

// Take two pointers. Let’s call them pointer1 and pointer2.
// Initialize both pointers to point to the start of the LinkedList.
// We can find the length of the LinkedList cycle using the approach discussed in LinkedList Cycle. Let’s assume that the length of the cycle is ‘K’ nodes.
// Move pointer2 ahead by ‘K’ nodes.
// Now, keep incrementing pointer1 and pointer2 until they both meet.
// As pointer2 is ‘K’ nodes ahead of pointer1, which means, pointer2 must have completed one loop in the cycle when both pointers meet. Their meeting point will be the start of the cycle.

//   Time Complexity
//   Phase 1: Cycle detection
//   The algorithm uses Floyd's Tortoise and Hare (fast and slow pointer) approach to detect a cycle in the linked list. Both pointers traverse the list at different speeds, with the fast pointer moving twice as fast as the slow pointer. In the worst case, they traverse the entire list once until they meet inside the cycle or confirm there is no cycle.

//   This phase takes $O(N)$ time, where N is the number of nodes in the linked list.

//   Phase 2: Cycle length calculation
//   After detecting the cycle, the algorithm calculates the cycle's length by traversing the cycle with the slow pointer. The maximum number of steps taken is equal to the length of the cycle, denoted as $C$. Since $C \leq N$, this phase is bounded by $O(N)$ time.

//   Phase 3: Finding the start of the cycle
//   Once the cycle length is known, the algorithm uses two pointers to find the start of the cycle. The first pointer starts from the head, while the second pointer is moved ahead by C nodes. Both pointers then traverse the list one step at a time until they meet at the cycle's start. Since each pointer traverses part of the list, this phase also takes $O(N)$ time.

//   Overall time complexity: $O(N)$, where N is the total number of nodes in the linked list.

// An Alternate Approach
// Here is the second approach to solve the "Start of LinkedList Cycle" problem using Floyd’s Tortoise and Hare algorithm. This method employs two pointers moving at different speeds to detect the cycle and identify its starting node.

// The algorithm begins by initializing two pointers, slow and fast, both starting at the head of the linked list. The slow pointer moves one step at a time, while the fast pointer moves two steps. If there is a cycle, these pointers will eventually meet inside the cycle. Once a meeting point is found, the slow pointer is reset to the head, and both pointers move one step at a time. The point where they meet again is the start of the cycle.

//   An Alternate Approach
//   Here is the second approach to solve the "Start of LinkedList Cycle" problem using Floyd’s Tortoise and Hare algorithm. This method employs two pointers moving at different speeds to detect the cycle and identify its starting node.

//   The algorithm begins by initializing two pointers, slow and fast, both starting at the head of the linked list. The slow pointer moves one step at a time, while the fast pointer moves two steps. If there is a cycle, these pointers will eventually meet inside the cycle. Once a meeting point is found, the slow pointer is reset to the head, and both pointers move one step at a time. The point where they meet again is the start of the cycle.

//   Step-by-Step Algorithm
//   Phase 1: Detecting the Cycle Using Two Pointers
//   Initialize Pointers:

//   Set both slow and fast pointers to the head of the linked list to start traversing from the beginning.
//   Traverse to Detect Cycle:

//   Loop while fast and fast.next are not null:
//   Move slow one step forward.
//   Move fast two steps forward.
//   If slow and fast meet, a cycle is detected and exit the loop.
//   Check for No Cycle:

//   After the loop, if fast is null or fast.next is null, return null as there is no cycle in the list.
//   Phase 2: Finding the Start of the Cycle
//   Reset slow Pointer:

//   Move slow back to the head of the linked list to begin locating the cycle's start.
//   Move Both Pointers to Find Cycle Start:

//   Loop until slow equals fast:
//   Move slow one step forward.
//   Move fast one step forward.
//   When they meet, slow (or fast) points to the cycle's starting node.
//   Return the Starting Node:

//   Return the node where slow and fast meet as the start of the cycle.
//   Algorithm Walkthrough
//   Input: List = [1, 2, 3, 4, 5, 6], Cycle Start at Node 3

//   Linked List Structure:
//   1 -> 2 -> 3 -> 4 -> 5 -> 6
//             ^              |
//             |--------------|
//   Steps:
//   Initialize Pointers:

//   slow = 1, fast = 1
//   First Iteration:

//   Move slow to 2.
//   Move fast to 3.
//   slow != fast
//   Second Iteration:

//   Move slow to 3.
//   Move fast to 5.
//   slow != fast
//   Third Iteration:

//   Move slow to 4.
//   Move fast to 3 (since fast was at 5, fast.next is 6, and fast.next.next is 3).
//   slow != fast
//   Fourth Iteration:

//   Move slow to 5.
//   Move fast to 5.
//   slow == fast (Cycle detected)
//   Find Cycle Start:

//   Reset slow to 1.
//   Move both slow and fast one step at a time:
//   Move slow to 2, fast to 6.
//   Move slow to 3, fast to 3.
//   slow == fast at node 3 (Cycle starts here)
//   Return Cycle Start:

//   The start of the cycle is node 3.

// class Node {
//     constructor(x) {
//         this.val = x;
//         this.next = null;
//     }
// }

// class Solution {
//     // Function to find the start of the cycle in a linked list
//     findCycleStart(head) {
//         if (head === null) return null;

//         let slow = head;
//         let fast = head;

//         // Step 1: Detect cycle using two pointers
//         while (fast !== null && fast.next !== null) {
//             slow = slow.next;         // Move slow pointer by 1
//             fast = fast.next.next;    // Move fast pointer by 2

//             if (slow === fast) {      // Cycle detected
//                 break;
//             }
//         }

//         // If no cycle is found
//         if (fast === null || fast.next === null) {
//             return null;
//         }

//         // Step 2: Find the start of the cycle
//         slow = head;                  // Reset slow to head
//         while (slow !== fast) {
//             slow = slow.next;         // Move slow by 1
//             fast = fast.next;         // Move fast by 1
//         }

//         // Both pointers meet at the start of the cycle
//         return slow;
//     }
// }

// const sol = new Solution();
// const head = new Node(1);
// head.next = new Node(2);
// head.next.next = new Node(3);
// head.next.next.next = new Node(4);
// head.next.next.next.next = new Node(5);
// head.next.next.next.next.next = new Node(6);

// // Create a cycle by connecting nodes
// head.next.next.next.next.next.next = head.next.next;
// console.log(`LinkedList cycle start: ${sol.findCycleStart(head).val}`);

// // Create a different cycle
// head.next.next.next.next.next.next = head.next.next.next;
// console.log(`LinkedList cycle start: ${sol.findCycleStart(head).val}`);

// // Create a cycle that points back to the head
// head.next.next.next.next.next.next = head;
// console.log(`LinkedList cycle start: ${sol.findCycleStart(head).val}`);
//
//
//
//
// Complexity Analysis
// Time Complexity
// Cycle Detection:

// The initial loop where slow and fast pointers traverse the linked list runs in $O(n)$ time in the worst case, where n is the number of nodes in the list.
// The slow pointer moves one step at a time, and the fast pointer moves two steps. They will meet within a finite number of steps proportional to the number of nodes.
// Finding Cycle Start:

// After detecting the cycle, resetting slow to head and moving both slow and fast one step at a time also takes $O(n)$ time in the worst case.
// Overall Time Complexity:

// The combined operations result in a total time complexity of $O(n)$.
// Space Complexity
// Pointer Variables:

// Only a constant number of pointers (slow and fast) are used, resulting in $O(1)$ space.
// No Additional Data Structures:

// The algorithm does not utilize any additional data structures that scale with input size.
// Overall Space Complexity:

// The space complexity is $O(1)$.
