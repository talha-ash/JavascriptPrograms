function sumo(num) {
    if (num === 1) {
      return 1;
    }
    //pre zone
    const value = sumo(num - 1); //recurs zone
    //post zone
    console.log(value);
    return num + value;
  }
  
  const result = sumo(10);
  
  console.log(result);
  