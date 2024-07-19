import LinkedList from "../models/LinkedListModel.js";
import BussinesModel from "../models/BussinesModel.js";
import SortArrayController from './SortArrayController.js'
import SortLinkedListController from "./SortLinkedListController.js";


class BussinesController {
  constructor() {
    this.aux = [];
    this.linkedList = new LinkedList();
    this.sortArrayController = new SortArrayController();
    this.sortLinkedListController = new SortLinkedListController()
    this.insertionTimes = { array: 0, linkedList: 0 };
    this.sortTimes = { arrayBuble: 0, linkedListBuble: 0, arrayMerge: 0, linkedListMerge: 0 ,arrayRadix: 0, linkedListRadix: 0};
    this.searchTimes = { array: 0, linkedList: 0 };
  }

  async loadDataArray() {
    try {
      const response = await fetch("../assets/bussines.json");
      const data = await response.json();
      console.time("Array Insertion Time");
      const t0 = performance.now();
      data.slice(0,1000).forEach((item) => {
        const bussines = new BussinesModel(item.postal_code, item.name);
        this.aux.push(bussines);
      });
      console.timeEnd("Array Insertion Time");
      const t1 = performance.now();
      this.insertionTimes.array = (t1 - t0).toFixed(4); // Actualiza el tiempo 
    } catch (error) {
      console.error("Error loading data:", error);
      console.log(data)
    }
  }

  async loadDataLinkedList() {
    try {
      const response = await fetch("../assets/bussines.json");
      const data = await response.json();
      const t0 = performance.now();
      data.slice(0,1000).forEach((item) => {
        const bussines = new BussinesModel(item.postal_code, item.name);
        this.linkedList.insert(bussines);
      });
      const t1= performance.now ()
      this.insertionTimes.linkedList =(t1-t0).toFixed(4); 
    } catch (error) {
      console.error("Error loading data:", error);
      console.log(data)
    }
  }

  async sortingArray(){
    this.sortArrayController.setArray(this.aux);
    this.sortTimes.arrayBuble = this.sortArrayController.bubbleSortArray();
    this.sortTimes.arrayMerge = this.sortArrayController.mergeSortArray();
    this.sortTimes.arrayRadix = this.sortArrayController.radixSortArray(); 
  }
  
  async sortLinkedList(){
    this.sortLinkedListController.setLinkedList(this.linkedList)
    this.sortTimes.linkedListBuble = this.sortLinkedListController.bubbleSortLinkedList();
    this.sortTimes.linkedListMerge = this.sortLinkedListController.mergeSortLinkedList();
    this.sortTimes.linkedListRadix = this.sortLinkedListController.radixSortLinkedList();
  }
 
  async searchArray(){
    this.searchTimes.array = this.linearSearchArray(37015);
    this.searchTimes.linkedList = this.linearSearchLinkedList(37015);
  }

  linearSearchArray(target) {
    const t0 = performance.now();
 
    for (let i = 0; i < this.aux.length; i++) {
      if (this.aux[i].CP === target) {
        const t1 = performance.now()
        this.searchTimes.array = (t1-t0)
        return this.aux[i];
      }
    }
  
    const t1 = performance.now();
    console.log("---->"+(t1-t0));
    return (t1-t0);
  }
  
  linearSearchLinkedList(target) {
    const t0 = performance.now();
    
    let current = this.linkedList.head;
    while (current !== null) {
      if (current.data.CP === target) {
        const t1 = performance.now()
        this.searchTimes.linkedList = (t1-t0)
        return current.data;
      }
      current = current.next;
    }
    const t1 = performance.now();
    console.log("---->"+(t1-t0));
    return (t1-t0);
  }
}

export default BussinesController;