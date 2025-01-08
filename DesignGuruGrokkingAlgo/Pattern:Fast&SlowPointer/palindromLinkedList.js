class Node {
  constructor(value, next = null) {
    this.val = value;
    this.next = next;
  }
}
function func(head) {
  let f = head;
  let s = head;
  let plus = s.val;
  let str = "" + s.val;
  let str2 = "";
  while (f.next != null && f.next.next != null) {
    f = f.next.next;
    s = s.next;
    plus += s.val;
  }

  if (f.next != null) {
    while (s.next != null) {
      s = s.next;

      plus -= s.val;
    }
  } else {
    plus -= s.val;

    while (s.next != null) {
      s = s.next;

      plus -= s.val;
    }
  }

  return plus == 0 ? true : false;
}

const head = new Node(2);
head.next = new Node(4);
head.next.next = new Node(6);
head.next.next.next = new Node(6);
head.next.next.next.next = new Node(4);
head.next.next.next.next.next = new Node(2);
// head.next.next.next.next.next.next = new Node(7);
// head.next.next.next.next.next.next.next = new Node(8);

const result = func(head);
console.log(result);

// Solution
// As we know, a palindrome LinkedList will have nodes values that read the same backward or forward. This means that if we divide the LinkedList into two halves, the node values of the first half in the forward direction should be similar to the node values of the second half in the backward direction. As we have been given a Singly LinkedList, we can’t move in the backward direction. To handle this, we will perform the following steps:

// We can use the Fast & Slow pointers method similar to Middle of the LinkedList to find the middle node of the LinkedList.
// Once we have the middle of the LinkedList, we will reverse the second half.
// Then, we will compare the first half with the reversed second half to see if the LinkedList represents a palindrome.
// Finally, we will reverse the second half of the LinkedList again to revert and bring the LinkedList back to its original form.
// Here is the visual representation of this algorithm for Example-2:

/*class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}*/

class Solution {
  isPalindrome(head) {
    if (head === null || head.next === null) return true;

    // Find the middle of the LinkedList
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
      slow = slow.next;
      fast = fast.next.next;
    }

    let headSecondHalf = this.reverse(slow); // Reverse the second half
    // Store the head of the reversed part to revert back later
    let copyHeadSecondHalf = headSecondHalf;

    // Compare the first and the second half
    while (head !== null && headSecondHalf !== null) {
      if (head.val !== headSecondHalf.val) {
        return false; // Not a palindrome
      }
      head = head.next;
      headSecondHalf = headSecondHalf.next;
    }

    this.reverse(copyHeadSecondHalf); // Revert the reverse of the second half
    return true;
  }

  reverse(head) {
    let prev = null;
    while (head !== null) {
      let next = head.next;
      head.next = prev;
      prev = head;
      head = next;
    }
    return prev;
  }
}

const sol = new Solution();
const head = new Node(2);
head.next = new Node(4);
head.next.next = new Node(6);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(2);
console.log("Is palindrome:", sol.isPalindrome(head));

head.next.next.next.next.next = new Node(2);
console.log("Is palindrome:", sol.isPalindrome(head));

// Time Complexity
// Finding the middle of the linked list: The algorithm uses the two-pointer technique (slow and fast pointers) to find the middle of the linked list. Both pointers traverse the list once, so this phase takes O(N) time, where N is the number of nodes in the linked list.

// Reversing the second half: After finding the middle, the algorithm reverses the second half of the list. This also takes O(N/2) time, which simplifies to O(N).

// Comparing both halves: Once the second half is reversed, the algorithm compares the values of the first half and the reversed second half. This comparison takes O(N/2) time, which simplifies to O(N).

// Reversing the second half back: To restore the original list structure, the algorithm reverses the second half again. This takes O(N/2) time, which simplifies to O(N).

// Overall time complexity: O(N).

// Space Complexity
// Reversing the second half: The algorithm modifies the linked list in place, and no extra space is required other than the pointers used during the traversal and reversal operations. The algorithm only uses a few extra pointers (slow, fast, prev, etc.), which take constant space.

// Overall space complexity: O(1) (constant space).
