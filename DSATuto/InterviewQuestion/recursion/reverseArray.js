const arr = [1, 2, 3, 4, 5,1, 2, 3, 4, 5];

function reverseArray(arr) {
  let newArr = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    newArr.push(arr[i]);
  }
  return newArr;
}

function reverseArrayInPlace(arr) {
  const mid = Math.floor(arr.length / 2);
  let counter = arr.length - 1;
  for (let i = 0; i < mid; i++) {
    const temp = arr[counter];
    arr[counter] = arr[i];
    arr[i] = temp;
    counter--;
  }
  return arr;
}
debugger;

function reverseArrayRecursive(arr) {
  const newArr = [];
  // (function loop() {
  //   if (arr.length == 1) {
  //     newArr.push(arr[0]);
  //     return arr[0];
  //   }
  //   const value = arr.shift();
  //   loop(arr);
  //   newArr.push(value);
  //   return value;
  // })(arr);

  function recurseImproved(arr, l, r) {
    if (l >= r) {
      return true;
    }

    recurseImproved(arr, l+1, r-1);
    let temp = arr[l];
    arr[l] = arr[r];
    arr[r] = temp;
    return;
  }

  recurseImproved(arr, 0, arr.length-1);
  return arr;
}

const result = reverseArrayRecursive(arr);
console.log(result);
