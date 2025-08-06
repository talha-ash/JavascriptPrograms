const list = { value: 1, next: { value: 2, next: { value: 3, next: null } } };

function reverseList(head) {
  let currentNode = head;
  let prevNode = null;
  let nextNode = null;
  //   while (currentNode) {
  //     nextNode = currentNode.next;

  //     currentNode.next = prevNode;

  //     prevNode = currentNode;
  //     currentNode = nextNode;
  //   }

  function recurse(currentNode) {
    if (currentNode === null) {
      return 1;
    }

    nextNode = currentNode.next;
    currentNode.next = prevNode;
    prevNode = currentNode;

    return recurse(nextNode);
  }

  function realRecurse(currentNode) {
    if (!currentNode) {
      return null;
    }

    let newHead = currentNode;

    if (currentNode.next) {
      newHead = realRecurse(currentNode.next);
      newHead.next = currentNode;
    } else {
      prevNode = currentNode;
    }
    currentNode.next = null;

    return currentNode;
  }
debugger;
  console.log(realRecurse(currentNode));
  return prevNode;
}

const result = reverseList(list);

console.log(result);
