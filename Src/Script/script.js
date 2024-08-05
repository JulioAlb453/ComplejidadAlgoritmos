import BussinesController from "../Controllers/BussinesController.js";

import { updateChartsLoadData, updateChartsSorting, updateChartsSearchData } from "../views/charts.js";

const controller = new BussinesController();
const btnLoadDatasetArray = document.getElementById("loadData");
const btnSorting = document.getElementById("sorting");
const btnSearch = document.getElementById("search");
const inputCP = document.getElementById("cpInput");

btnLoadDatasetArray.addEventListener("click", async () => {
  await controller.loadDataArray();
  await controller.loadDataLinkedList();
  const insertionTimes = await controller.getInsertionTimes();
  updateChartsLoadData(insertionTimes);
});

btnSorting.addEventListener("click", async () => {
  const sortTimes = await controller.sortingArray();
  await controller.sortLinkedList();
  updateChartsSorting(sortTimes);
});

btnSearch.addEventListener("click", async () => {
  const cp = parseInt(inputCP.value);
  const arrayResult = await controller.searchArray(cp);
  const linkedListResult = await controller.searchLinkedList(cp);
  displaySearchResults(arrayResult, linkedListResult);
  const searchTimes = controller.searchTimes;
  updateChartsSearchData(searchTimes);
});

function displaySearchResults(arrayResult, linkedListResult) {
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = '';

  const arrayResultText = arrayResult ? `Array Result: CP: ${arrayResult.CP}, Name: ${arrayResult.name}` : 'Array Result: Not found';
  const linkedListResultText = linkedListResult ? `LinkedList Result: CP: ${linkedListResult.CP}, Name: ${linkedListResult.name}` : 'LinkedList Result: Not found';

  const arrayResultElement = document.createElement("p");
  arrayResultElement.textContent = arrayResultText;
  const linkedListResultElement = document.createElement("p");
  linkedListResultElement.textContent = linkedListResultText;

  resultsContainer.appendChild(arrayResultElement);
  resultsContainer.appendChild(linkedListResultElement);
}
