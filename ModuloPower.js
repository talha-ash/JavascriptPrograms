const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "NoDay"
  ];
  
  function circulateList(arr, times) {
    const iterationAmount = arr.length * times;
  
    for (let i = 0; i < iterationAmount; i++) {
      console.log(
        `Day: ${arr[i % arr.length]} - Modulo operation: ${i} % ${arr.length} = ${
          i % arr.length
        }`
      );
    }
  }
  
  circulateList(days, 3);
  