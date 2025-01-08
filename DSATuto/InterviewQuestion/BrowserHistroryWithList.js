class BrowserHistory {
  constructor(homepage) {
    this.head = { next: null, prev: null, val: homepage };
    this.currentPage = this.head;
  }

  visit(url) {
    let newPage = { next: null, prev: null, val: url };
    newPage.prev = this.currentPage;
    this.currentPage.next = newPage;
    this.currentPage = newPage;
  }

  back(steps) {
    let currentPage = this.currentPage;
    while (currentPage && steps > 0) {
      if (currentPage.prev == null) {
        steps = 0;
      } else {
        currentPage = currentPage.prev;
        steps--;
      }
    }
    this.currentPage = currentPage;
    return currentPage.val;
  }

  forward(steps) {
    let currentPage = this.currentPage;
    while (currentPage && steps > 0) {
      if (currentPage.next == null) {
        steps = 0;
      } else {
        currentPage = currentPage.next;
        steps--;
      }
    }
    this.currentPage = currentPage;
    return currentPage.val;
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
