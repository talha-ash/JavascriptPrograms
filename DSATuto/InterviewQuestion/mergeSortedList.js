const l1 = { val: 1, next: { val: 2, next: { val: 4, next: null } } };
const l2 = { val: 1, next: { val: 3, next: { val: 4, next: null } } };
// const l1 = { val: 1, next: null };
// const l2 = { val: null, next: null };
function mergeTwoSortedList(list1, list2) {
  let head = { next: null };
  let tail = head;
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    }else if (list1.val > list2.val) {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }
  tail.next = list1 || list2;
  return head.next;
}

var mergeTwoListsRecurse = function(list1, list2) {
  const isBaseCase1 = list1 === null;
  if (isBaseCase1) return list2;

  const isBaseCase2 = list2 === null;
  if (isBaseCase2) return list1;

  const isL2Greater = list1.val <= list2.val;
  if (isL2Greater) {
      list1.next = mergeTwoListsRecurse(list1.next, list2);/* Time O(N + M) | Space O(N + M) */

      return list1;
  }

  const isL2Less = list2.val <= list1.val;
  if (isL2Less) {
      list2.next = mergeTwoListsRecurse(list1, list2.next);/* Time O(N + M) | Space O(N + M) */

      return list2;
  }
}
debugger;
let result = mergeTwoSortedList(l1, l2);
console.log(result);
while (result) {
  console.log(result.val);
  result = result.next;
}
