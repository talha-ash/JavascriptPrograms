class BrowserHistory {
    constructor(homepage) {
      this.history = [homepage];
      this.currentPageIndex = 0;
    }
  
    visit(url) {
      if (this.history.length === this.currentPageIndex + 1) {
        this.history.push(url);
        this.currentPageIndex++;
      } else {
        this.history[this.currentPageIndex + 1] = url;
        this.currentPageIndex++;
        this.history.length = this.currentPageIndex + 1;
      }
    }
  
    back(steps) {
      let diff = this.currentPageIndex - steps;
      if (diff >= 0) {
        this.currentPageIndex = diff;
      } else {
        this.currentPageIndex = 0;
      }
      return this.history[this.currentPageIndex];
    }
  
    forward(steps) {
      let diff = this.currentPageIndex + steps;
      if (diff < this.history.length) {
        this.currentPageIndex = diff;
      } else {
        this.currentPageIndex = this.history.length - 1;
      }
      return this.history[this.currentPageIndex];
    }
  }
  
  let bh = new BrowserHistory("leetcode.com");
  let arr = [undefined];
  // debugger;
  arr[1] = bh.visit("google.com");
  arr[2] = bh.visit("facebook.com");
  arr[3] = bh.visit("youtube.com");
  arr[4] = bh.back(1);
  arr[5] = bh.back(1);
  arr[6] = bh.forward(1);
  arr[7] = bh.visit("linkedin.com");
  arr[8] = bh.forward(2);
  arr[9] = bh.back(2);
  arr[10] = bh.back(7);
  console.log(arr);
  