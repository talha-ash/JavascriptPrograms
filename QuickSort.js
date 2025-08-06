function quickSort(arr) {
  function recurse(arr) {
    if (arr.length < 2) {
      return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const pivot = arr[mid];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length; i++) {
      const ele = arr[i];
      if (i == mid) {
        continue;
      } else if (ele > pivot) {
        right.push(ele);
      } else if (ele <= pivot) {
        left.push(ele);
      }
    }

    const leftTree = quickSort(left).concat([pivot]);
    const rightTree = leftTree.concat(quickSort(right));

    return rightTree;
  }

  return recurse(arr);
}

const arr = [10, 5, 2, 3];
const result = quickSort(arr);
console.log(result);

// In quick sort we select the pivot and then partition the
// Array into two sub array left array contain smaller then pivot
// right array contain bigger then pivot
// in the end we concat both left  and right with pivot after applying
// quick sort to both left and right
//
// Time complexity of quick sort is
// Worst O(n^2)
// Average O(n log n)
// it depend on pivot we chose so iwe choose pivot first element
// each time then its worst algo for sorting O(n^2)
//
// but if we choose middle element as pivot we goes with aaverage case
// all time. Becuase number of call in stack will be less much
// less than what we choose first ele as pivot stack will be O(n)
//
// becuase opeartion done by quick sort is o(n)
// O(n)*O(n) = O(n^2)
// But if we choose middle
// stack will not filled with n frame
// O(log n) * O(n) = O(n log n)
// So contant mattter in this algo

// *There's one exception to this. If all the elements in your
// array are the same, you will always hit the worst case
// runtime without some additional logic

function quickSort2(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const pivot = arr[arr.length - 1];
  const leftArr = [];
  const rightArr = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }
  return [...quickSort2(leftArr), pivot, ...quickSort2(rightArr)];
}
