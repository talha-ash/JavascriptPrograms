class Heap {
  constructor(compareFn) {
    this.compareFn = compareFn;
    this.items = [];
  }

  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.items.length;
  }

  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.items.length;
  }

  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }

  leftChild(index) {
    return this.items[this.getLeftChildIndex(index)];
  }

  rightChild(index) {
    return this.items[this.getRightChildIndex(index)];
  }

  parent(index) {
    return this.items[this.getParentIndex(index)];
  }

  length() {
    return this.items.length;
  }

  swap(index1, index2) {
    const temp = this.items[index1];
    this.items[index1] = this.items[index2];
    this.items[index2] = temp;
  }

  peek() {
    return this.items[0];
  }

  pop() {
    if (this.items.length === 0) {
      return null;
    }
    if (this.items.length === 1) {
      return this.items.pop();
    }
    const item = this.items[0];
    this.items[0] = this.items.pop();
    this.heapifyDown();
    return item;
  }

  push(item) {
    this.items.push(item);
    this.heapifyUp();
  }

  remove(item) {
    const index = this.items.indexOf(item);
    if (index === -1) {
      return false;
    }
    this.items[index] = this.items[this.items.length - 1];
    this.items.pop();
    this.heapifyDown(index);
    return true;
  }

  heapifyUp(index) {
    let currentIndex = index || this.items.length - 1;
    while (
      this.hasParent(currentIndex) &&
      this.compareFn(this.items[currentIndex], this.parent(currentIndex)) < 0
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  heapifyDown(index) {
    // Start at the index passed in or the root if not provided
    let currentIndex = index || 0;
    // While the current index has a left child
    while (this.hasLeftChild(currentIndex)) {
      // Find the smaller child index between the left and right children
      let smallerChildIndex = this.getLeftChildIndex(currentIndex);
      if (
        this.hasRightChild(currentIndex) &&
        this.compareFn(
          this.rightChild(currentIndex),
          this.leftChild(currentIndex),
        ) < 0
      ) {
        smallerChildIndex = this.getRightChildIndex(currentIndex);
      }
      // If the current item is smaller than the smaller child, we're done
      if (
        this.compareFn(
          this.items[currentIndex],
          this.items[smallerChildIndex],
        ) < 0
      ) {
        break;
      }
      // Otherwise, swap the current item with the smaller child and continue
      this.swap(currentIndex, smallerChildIndex);
      currentIndex = smallerChildIndex;
    }
  }
}

class Solution {
  constructor() {
    this.maxHeap = new Heap((a, b) => b - a); // containing first half
    this.minHeap = new Heap((a, b) => a - b); // containing second half
  }

  insertNum(num) {
    if (this.maxHeap.length() === 0 || this.maxHeap.peek() >= num) {
      this.maxHeap.push(num);
    } else {
      this.minHeap.push(num);
    }

    // either both the heaps will have equal number of elements or max-heap will have one
    // more element than the min-heap
    if (this.maxHeap.length() > this.minHeap.length() + 1) {
      this.minHeap.push(this.maxHeap.pop());
    } else if (this.maxHeap.length() < this.minHeap.length()) {
      this.maxHeap.push(this.minHeap.pop());
    }
  }

  findMedian() {
    if (this.maxHeap.length() === this.minHeap.length()) {
      // we have even number of elements, take the average of middle two elements
      return this.maxHeap.peek() / 2.0 + this.minHeap.peek() / 2.0;
    }

    // because max-heap will have one more element than the min-heap
    return this.maxHeap.peek() / 1.0;
  }
}

const sol = new Solution();
sol.insertNum(3);
sol.insertNum(1);
console.log(`The median is: ${sol.findMedian()}`);
sol.insertNum(5);
console.log(`The median is: ${sol.findMedian()}`);
sol.insertNum(4);
console.log(`The median is: ${sol.findMedian()}`);

// Solution
// As we know, the median is the middle value in an ordered integer list. So a brute force solution could be to maintain a sorted list of all numbers inserted in the class so that we can efficiently return the median whenever required. Inserting a number in a sorted list will take O(N) time if there are ‘N’ numbers in the list. This insertion will be similar to the Insertion sort. Can we do better than this? Can we utilize the fact that we don’t need the fully sorted list - we are only interested in finding the middle element?

// Assume ‘x’ is the median of a list. This means that half of the numbers in the list will be smaller than (or equal to) ‘x’ and half will be greater than (or equal to) ‘x’. This leads us to an approach where we can divide the list into two halves: one half to store all the smaller numbers (let’s call it smallNumList) and one half to store the larger numbers (let’s call it largeNumList). The median of all the numbers will either be the largest number in the smallNumList or the smallest number in the largeNumList. If the total number of elements is even, the median will be the average of these two numbers.

// The best data structure that comes to mind to find the smallest or largest number among a list of numbers is a Heap. Let’s see how we can use a heap to find a better algorithm.

// We can store the first half of numbers (i.e., smallNumList) in a Max Heap. We should use a Max Heap as we are interested in knowing the largest number in the first half.
// We can store the second half of numbers (i.e., largeNumList) in a Min Heap, as we are interested in knowing the smallest number in the second half. Inserting a number in a heap will take O(logN), which is better than the brute force approach. At any time, the median of the current list of numbers can be calculated from the top element of the two heaps.
// Let’s take the Example-1 mentioned above to go through each step of our algorithm:

// insertNum(3): We can insert a number in the Max Heap (i.e. first half) if the number is smaller than the top (largest) number of the heap. After every insertion, we will balance the number of elements in both heaps, so that they have an equal number of elements. If the count of numbers is odd, let’s decide to have more numbers in Max Heap than the Min Heap.
// Image
// insertNum(1): As ‘1’ is smaller than ‘3’, let’s insert it into the Max Heap.
// Image
// Now, we have two elements in the Max Heap and no elements in Min Heap. Let’s take the largest element from the Max Heap 3 and insert it into the Min Heap, to balance the number of elements in both heaps.

// Image
// findMedian(): As we have an even number of elements, the median will be the average of the top element of both the heaps -> (1+3)/2 = 2.0

// insertNum(5): As ‘5’ is greater than the top element of the Max Heap, we can insert it into the Min Heap. After the insertion, the total count of elements will be odd. As we had decided to have more numbers in the Max Heap than the Min Heap, we can take the top (smallest) number from the Min Heap and insert it into the Max Heap.

// Image
// findMedian(): Since we have an odd number of elements, the median will be the top element of Max Heap -> 3. An odd number of elements also means that the Max Heap will have one extra element than the Min Heap.

// insertNum(4): Insert ‘4’ into Min Heap.

// Image
// findMedian(): As we have an even number of elements, the median will be the average of the top element of both the heaps -> (3+4)/2 = 3.5
