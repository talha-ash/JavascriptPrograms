function findMinimumWindowSize(timestamps, k) {
  if (k > timestamps.length) return -1;

  // Convert timestamps to minutes since midnight
  let minutes = timestamps.map((time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  });
  // Sort the minutes
  minutes.sort((a, b) => a - b);
  console.log(minutes);

  const n = minutes.length;

  // Handle the case where times wrap around midnight
  // Create a circular array by appending the first k-1 elements + 1440 (24*60) to the end
  for (let i = 0; i < n; i++) {
    if (minutes[i] < minutes[0]) {
      minutes[i] += 1440; // Add 24 hours to times after midnight
    }
  }

  // Resort after potential adjustments
  minutes.sort((a, b) => a - b);

  // Create circular array for wrap-around windows
  for (let i = 0; i < k - 1; i++) {
    minutes.push(minutes[i] + 1440);
  }

  // Find minimum window of k consecutive timestamps
  let minWindow = Infinity;
  for (let i = 0; i <= n - 1; i++) {
    minWindow = Math.min(minWindow, minutes[i + k - 1] - minutes[i]);
  }

  return minWindow;
}

// Example
const list = ["23:50", "23:55", "00:05", "00:10"];
console.log(
  `Minimum window size for k=2: ${findMinimumWindowSize(list, 2)} minutes`,
); // Should return 10
console.log(
  `Minimum window size for k=3: ${findMinimumWindowSize(list, 3)} minutes`,
);
console.log(
  `Minimum window size for k=4: ${findMinimumWindowSize(list, 4)} minutes`,
); // Should return 20
