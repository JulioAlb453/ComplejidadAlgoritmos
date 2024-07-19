class SortArrayController {
  
  constructor() {
    this.aux = [];
  }
  
  setArray(aux){
    this.aux = aux;
  }
  
  bubbleSortArray() {
    const t0 = performance.now();
    const n = this.aux.length;
    let swapped;
    console.time("Bubble Sort Time");
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        if (this.aux[i].CP > this.aux[i + 1].CP) {
          // Swap elements
          const temp = this.aux[i];
          this.aux[i] = this.aux[i + 1];
          this.aux[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
    console.timeEnd("Bubble Sort Time");
    const t1 = performance.now();
    return (t1-t0).toFixed(4)
  }

  mergeSortArray() {
    const t0 = performance.now();
    console.time("Merge Sort Time");
    this.aux = this.#mergeSortHelper(this.aux);
    console.timeEnd("Merge Sort Time");
    const t1 = performance.now();
    return(t1-t0).toFixed(4)
  }

   #mergeSortHelper(array) {
    if (array.length <= 1) {
      return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return this.#merge(this.#mergeSortHelper(left), this.#mergeSortHelper(right));
  }

  #merge(left, right) {
    let resultArray = [],
      leftIndex = 0,
      rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex].CP < right[rightIndex].CP) {
        resultArray.push(left[leftIndex]);
        leftIndex++;
      } else {
        resultArray.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return resultArray
      .concat(left.slice(leftIndex))
      .concat(right.slice(rightIndex));
  }

  radixSortArray() {
    const t0 = performance.now();
    let maxCP = Math.max(...this.aux.map((bussines) => parseInt(bussines.CP)));
    let digitCount = Math.floor(Math.log10(maxCP)) + 1;
    let buckets = Array.from({ length: 10 }, () => []);

    console.time("Radix Sort Time");
    for (let i = 0; i < digitCount; i++) {
      this.aux.forEach((bussines) => {
        let digit = this.#getDigit(parseInt(bussines.CP), i);
        buckets[digit].push(bussines);
      });

      this.aux = [].concat(...buckets);
      buckets.forEach((bucket) => (bucket.length = 0));
    }
    console.timeEnd("Radix Sort Time");
    const t1 = performance.now();
    return(t1-t0).toFixed(4)
  }

  #getDigit(num, place) {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
  }
}

export default SortArrayController;
