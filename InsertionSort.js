function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }

  return arr;
}

const result = insertionSort([1, 3, 56, 78, 3, 12, 6, 9]);
console.log(result);

// it is best when we have array who is 50 to 60 % sorted
// array size is small
//
// its start from index 1 and campare ele from its previous
// index and put in right place if array is asorted more sorted form
// then we did need to iterate more in inner loop
//
//
//
