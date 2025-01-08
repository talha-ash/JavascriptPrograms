function throwPromise() {
    throw new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Promise Resolved Done");
      }, 1000);
    });
  }
  
  try {
    throwPromise();
  } catch (e) {
    console.log("error");
  
    e.then((message) => {
      console.log("Promise Resolved Message");
      console.log(message);
    });
  }
  