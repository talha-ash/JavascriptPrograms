const arr = [100, 20, 15, 2, 23, 44, 67];
const arr1 = [3, 4];
function findPeakElements(arr) {
  const peaksElements = [];
  if (arr[0] > arr[1]) peaksElements.push(arr[0]);
  if (arr[arr.length - 1] > arr[arr.length - 2])
    peaksElements.push(arr[arr.length - 1]);

  for (let x = 1; x < arr.length - 1; x++) {
    if (arr[x] > arr[x - 1] && arr[x] > arr[x + 1]) peaksElements.push(arr[x]);
  }
  return peaksElements;
}

const result = findPeakElements(arr);

console.log(result);
// we exclude first and last element from loop because we check it in advance either they are 
// peak or not then we loop from second element to second last element
// comparing either element is greater from its neighbours then add to peaks element array

