export function updateChartsLoadData(insertionTimes) {
    console.log(JSON.stringify(insertionTimes));
  try {
    const arrayInsertionTime = insertionTimes.array || 0;
    const linkedListInsertionTime = insertionTimes.linkedList || 0;
    const insertionOptions = {
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
      yaxis: {
        title: {
          text: "ms",
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "ms";
          },
        },
      },
    };

    const insertionChart = new ApexCharts(
      document.querySelector("#insertionChart"),
      insertionOptions
    );
    insertionChart
      .render()
      .catch((err) => console.error("Error rendering insertion chart:", err));
  } catch (error) {
    console.error("Error in updateChartsLoadData:", error);
  }
}

export function updateChartsSorting(sortTimes) {
  try {
    const sortOptions = {
      series: [
        {
          name: "Sort Time Array",
          data: [
            sortTimes.arrayBuble,
            sortTimes.arrayMerge,
            sortTimes.arrayRadix,
          ],
        },
        {
          name: "Sort Time LinkedList",
          data: [
            sortTimes.linkedListBuble,
            sortTimes.linkedListMerge,
            sortTimes.linkedListRadix,
          ],
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
          text: "ms",
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "ms";
          },
        },
      },
    };

    const sortChart = new ApexCharts(
      document.querySelector("#sortingChart"),
      sortOptions
    );
    sortChart
      .render()
      .catch((err) => console.error("Error rendering sort chart:", err));
  } catch (error) {
    console.error("Error in updateChartsSorting:", error);
  }
}

export function updateChartsSearchData(searchTimes) {
  try {
    const arraySearchTime = searchTimes.array;
    const linkedListSearchTime = searchTimes.linkedList;

    const searchOptions = {
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
      yaxis: {
        title: {
          text: "ms",
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "ms";
          },
        },
      },
    };

    const searchChart = new ApexCharts(
      document.querySelector("#searchChart"),
      searchOptions
    );
    searchChart
      .render()
      .catch((err) => console.error("Error rendering search chart:", err));
  } catch (error) {
    console.error("Error in updateChartsSearchData:", error);
  }
}
