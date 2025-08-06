function removeNthLastNode(head, n) {
    let right = head;
    let left = head;
    let counter = 1;
    // Replace this placeholder return statement with your code
    while (right) {
        if (counter > n + 1) {
            left = left.next;
        }
        counter++;
        right = right.next;
    }

    if (left === head) {
        head = left.next;
    } else if (left.next.next) {

        left.next = left.next.next;
    } else {
        left.next = null;
    }

    return head;
}
