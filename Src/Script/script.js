import BussinesController from "../Controllers/BussinesController.js";

const controller = new BussinesController();
const btnLoadDatasetArray = document.getElementById("loadData");
const btnSorting = document.getElementById("sorting");
const btnSearch = document.getElementById("search");

btnLoadDatasetArray.addEventListener("click", async () => {
  await controller.loadDataArray();
  await controller.loadDataLinkedList();
  updateChartsLoadData();
});

btnSorting.addEventListener("click", async () => {
  await controller.sortingArray();
  await controller.sortLinkedList();
  updateChartsSorting();
});

btnSearch.addEventListener("click", async() =>{
  await controller.linearSearchArray()
  await controller.linearSearchLinkedList()
  updateChartsSearchData();
})

function updateChartsLoadData() {
  try {
    const arrayInsertionTime = controller.insertionTimes.array || 0;
    const linkedListInsertionTime = controller.insertionTimes.linkedList || 0;

    console.log("=============================");
    console.log("Array Insertion time " + arrayInsertionTime);
    console.log("LinkedList Insertion time " + linkedListInsertionTime);

    console.log("=============================");
    var insertionOptions = {
      series: [
        {
          name: "Insertion Time",
          data: [arrayInsertionTime, linkedListInsertionTime],
        },
      ],
      chart: {
        type: "bar",
        height: 350,
      },
      xaxis: {
        categories: ["Array", "LinkedList"],
      },
    };

    var insertionChart = new ApexCharts(
      document.querySelector("#insertionChart"),
      insertionOptions
    );
    insertionChart
      .render()
      .catch((err) => console.error("Error rendering insertion chart:", err));
  } catch (error) {
    console.error("Error in updateCharts:", error);
  }
}

function updateChartsSorting() {
  try {
    const sortTimes = controller.sortTimes || 0;

    console.log("=============================");
    console.log("Sort times " + JSON.stringify(sortTimes));
    console.log("=============================");

    var sortOptions = {
      series: [
        {
          name: "Sort Time Array",
          data: [sortTimes.arrayBuble, sortTimes.arrayMerge, sortTimes.arrayRadix ],
        },
        {
          name: "Sort Time LinkedList",
          data: [sortTimes.linkedListBuble, sortTimes.linkedListMerge, sortTimes.linkedListRadix ],
        },
      ],
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: ["Burbuja", "Merge", "Radix"],
      },
      yaxis: {
          title: {
            text: 'ms'
          }
        },
    };

    var sortChart = new ApexCharts(
      document.querySelector("#sortingChart"),
      sortOptions
    );
    sortChart
      .render()
      .catch((err) => console.error("Error rendering sort chart:", err));
  } catch (error) {
    console.error("Error in updateCharts:", error);
  }
}

function updateChartsSearchData() {
  try {
    console.log("jejej"+JSON.stringify(controller.searchTimes))
    const arraySearchTime = controller.searchTimes.array ;
    const linkedListSearchTime = controller.searchTimes.linkedList ;

    console.log("=============================");
    console.log("Array Search time " + arraySearchTime);
    console.log("LinkedList Search time " + linkedListSearchTime);

    console.log("=============================");
    var insertionOptions = {
      series: [
        {
          name: "Search Time",
          data: [arraySearchTime, linkedListSearchTime],
        },
      ],
      chart: {
        type: "bar",
        height: 350,
      },
      xaxis: {
        categories: ["Array", "LinkedList"],
      },
    };

    var searchChart = new ApexCharts(
      document.querySelector("#searchChart"),
      insertionOptions
    );
    searchChart
      .render()
      .catch((err) => console.error("Error rendering insertion chart:", err));
  } catch (error) {
    console.error("Error in updateCharts:", error);
  }
}

