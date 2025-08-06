function func(list) {
  const subset = [[]];

  for (let i = 0; i < list.length; i++) {
    const ele = list[i];
    const subsetLength = subset.length;
    for (let a = 0; a < subsetLength; a++) {
      const subsetEle = subset[a];
      subset.push([...subsetEle, ele]);
    }
  }

  return subset;
}

const result = func([1, 3, 5]);
console.log(result);

// Explanation of Time and Space Complexity
// Time Complexity

//     Explanation: The time complexity refers to the amount of time it takes for an algorithm to run based on the size of the input.
//         Example: If you have an array of 5 elements and it takes 10 operations to run the algorithm, the time complexity would be O(10), or simply O(1) for constant time.

// Space Complexity

//     Explanation: The space complexity refers to the amount of memory used by an algorithm based on the size of the input.
//         Example: If an algorithm creates a new array to store the results, and the size of the array depends on the input, then the space complexity would be O(n) where n is the size of the input.

// Application to the Given Algorithm

//     Time Complexity: The algorithm mentioned in the text has a time complexity of O(2^N), where N is the total number of elements in the input set. This is because the number of subsets doubles with each new element added.
//     Space Complexity: The algorithm uses O(2^N * N) space, as each subset can take up to O(N) space and there are a total of 2^N subsets.

// Summary

// The time complexity of the algorithm is O(2^N), and the space complexity is O(2^N * N), based on the explanation provided in the given text.
