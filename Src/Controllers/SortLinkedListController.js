class SortLinkedListController {
  constructor() {
    this.linkedList = null;
  }

  setLinkedList(linkedList) {
    this.linkedList = linkedList;
    this.head = this.linkedList.head;
  }

  bubbleSortLinkedList() {
    const t0 = performance.now();
    console.time("Bubble Sort Time");

    if (this.head === null || this.head.next === null) return;

    let swapped;
    do {
      swapped = false;
      let current = this.head;
      while (current.next !== null) {
        if (current.data.CP > current.next.data.CP) {
          const temp = current.data;
          current.data = current.next.data;
          current.next.data = temp;
          swapped = true;
        }
        current = current.next;
      }
    } while (swapped);
    const t1 = performance.now();
    console.timeEnd("Bubble Sort Time");
    return (t1 - t0).toFixed(4);
  }

  mergeSortLinkedList() {
    const t0 = performance.now();
    this.head = this.#mergeSortHelper(this.head);
    const t1 = performance.now();

    return (t1 - t0).toFixed(4);
  }

  #mergeSortHelper(head) {
    if (head === null || head.next === null) return head;

    const middle = this.#getMiddle(head);
    const nextToMiddle = middle.next;
    middle.next = null;

    const left = this.#mergeSortHelper(head);
    const right = this.#mergeSortHelper(nextToMiddle);

    return this.merge(left, right);
  }

  #getMiddle(head) {
    if (head === null) return head;

    let slow = head;
    let fast = head.next;

    while (fast !== null && fast.next !== null) {
      slow = slow.next;
      fast = fast.next.next;
    }

    return slow;
  }

  merge(left, right) {
    if (left === null) return right;
    if (right === null) return left;

    if (left.data.CP <= right.data.CP) {
      left.next = this.merge(left.next, right);
      return left;
    } else {
      right.next = this.merge(left, right.next);
      return right;
    }
  }

  radixSortLinkedList() {
    const t0 = performance.now();
    if (this.head === null) return;

    let maxCP = this.getMaxCP();
    let exp = 1;

    while (Math.floor(maxCP / exp) > 0) {
      this.countingSort(exp);
      exp *= 10;
    }
    const t1 = performance.now();
    return (t1 - t0).toFixed(4);
  }

  getMaxCP() {
    let maxCP = this.head.data.CP;
    let current = this.head;
    while (current !== null) {
      if (current.data.CP > maxCP) {
        maxCP = current.data.CP;
      }
      current = current.next;
    }

    return maxCP;
  }

  countingSort(exp) {
    const buckets = Array.from({ length: 10 }, () => []);
    let current = this.head;

    while (current !== null) {
      let index = Math.floor(current.data.CP / exp) % 10;
      buckets[index].push(current.data);
      current = current.next;
    }

    let newHead = null;
    let tail = null;

    for (const bucket of buckets) {
      for (const data of bucket) {
        const newNode = new Node(data);
        if (newHead === null) {
          newHead = newNode;
          tail = newHead;
        } else {
          tail.next = newNode;
          tail = tail.next;
        }
      }
    }

    this.head = newHead;
  }
}

export default SortLinkedListController;
