class LinkedList {
    head = null;
    tail = null;
    length = 0;
    get(index, returnNode) {
      let currentNode = this.head;
      let atIndex = 0;
      let result = returnNode ? null : -1;
      while (currentNode) {
        if (index === atIndex) {
          return returnNode ? currentNode : currentNode.val;
        }
        currentNode = currentNode.next;
        atIndex++;
      }
  
      return result;
    }
    addAtHead(val) {
      if (!this.head) {
        this.head = { next: null, prev: null, val };
        this.tail = this.head;
        this.length++;
        return;
      }
  
      let currentNode = this.head;
      let newHead = { next: null, prev: null, val };
      newHead.next = currentNode;
      currentNode.prev = newHead;
      this.head = newHead;
      this.length++;
    }
  
    addAtTail(val) {
      if (!this.head) {
        this.head = { next: null, prev: null, val };
        this.tail = this.head;
        this.length++;
        return;
      }
  
      let currentNode = this.tail;
      let newTail = { next: null, prev: null, val };
      newTail.prev = currentNode;
      currentNode.next = newTail;
      this.tail = newTail;
      this.length++;
    }
  
    deleteAtIndex(index) {
      debugger;
      let nodeAtIndex = this.get(index, true);
      if (nodeAtIndex) {
        if (nodeAtIndex.prev == null) {
          this.head = this.head.next;
          if (this.head) {
            this.head.prev = null;
          }
        } else if (nodeAtIndex.next == null) {
          this.tail = nodeAtIndex.prev;
          if (this.tail) {
            this.tail.next = null;
          }
        } else {
          let prevNode = nodeAtIndex.prev;
          let nextNode = nodeAtIndex.next;
          prevNode.next = nextNode;
          nextNode.prev = prevNode;
        }
        this.length--;
      }
    }
  
    addAtIndex(index, val) {
      debugger;
      let nodeAtIndex = this.get(index, true);
      if (nodeAtIndex) {
        if (nodeAtIndex.prev == null) {
          this.addAtHead(val);
        } else {
          let prevNode = nodeAtIndex.prev;
          let newNode = { next: null, prev: null, val };
          newNode.next = nodeAtIndex;
          newNode.prev = prevNode;
          prevNode.next = newNode;
          nodeAtIndex.prev = newNode;
          this.length++;
        }
      } else if (index == this.length) {
        this.addAtTail(val);
      }
    }
  }
  
  const list = new LinkedList();
  
  list.addAtHead(24);
  console.log(list.get(1));
  list.addAtTail(18);
  list.deleteAtIndex(1);
  console.log(list.get(1));
  
  // for (let i = 0; i < list.length; i++) {
  //   console.log(list.get(i));
  // }
  