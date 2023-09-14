const taskList = document.querySelector(".list-container");
const textInput = document.querySelector(".input-text");
const doneTask = document.querySelector(".done-task");
const addItemBtn = document.querySelector(".add-item");
const removeCheckedBtn = document.querySelector(".remove-checked");

let count = 0;
let editElement;
let editFlag = false;
let editId = "";

addItemBtn.addEventListener("click", addItemToList);

function addItemToList(e) {
  e.preventDefault();
  const value = textInput.value;
  const id = new Date().getTime().toString();
  const checkedItem = filterTasklist();
  if (value && !editFlag) {
    initListItem(value, id);
    count += 1;
    textInput.value = "";
  } else if (value && editFlag) {
    editElement.innerText = value;
    textInput.value = "";
  }
  updateDoneTasks(count, checkedItem.length);
}

function editCurrentItem(e) {
  editElement =
    e.currentTarget.parentElement.previousElementSibling.lastElementChild;
  textInput.value = editElement.innerText;
  editFlag = true;
  editId = editElement.id;
}

function deleteItem(e) {
  const currentItem = e.currentTarget.parentElement.parentElement;
  const checkedItem = filterTasklist();
  currentItem.remove();
  count -= 1;
  updateDoneTasks(count, checkedItem.length);
  textInput.value = "";
}

function initListItem(value, id) {
  const task = `<div
  id=${id} class="p-4 flex justify-between items-center border-y-2 border-solid border-gray-300 hover:bg-blue-100 hover:bg-opacity-50"
  >
  <div class="flex items-center">
  <input class="input-check" type="checkbox" name="check" id="check" />
  <p class="task-content ml-3 text-lg text-blue-500">${value}</p>
  </div>
  <div class="flex items-center">
  <button
  class="edit-item p-2 text-base text-gray-300 font-semibold hover:text-gray-400"
  >
  <i class="fa-solid fa-pen"></i>
  </button>
  <button
  class="delete-item p-2 text-xl text-gray-300 font-semibold hover:text-gray-400"
  >
  <i class="fa-solid fa-xmark"></i>
  </button>
  </div>
  </div>`;
  taskList.insertAdjacentHTML("afterbegin", task);

  const editItemBtn = document.querySelector(".edit-item");
  editItemBtn.addEventListener("click", editCurrentItem);

  const deleleItemBtn = document.querySelector(".delete-item");
  deleleItemBtn.addEventListener("click", deleteItem);

  const checkInput = document.querySelector(".input-check");
  checkInput.addEventListener("input", updateCheckedItems);
}

removeCheckedBtn.addEventListener("click", removeItemFromList);

function removeItemFromList() {
  const tasks = convertTasklistIntoArray();
  const checkedItem = filterTasklist();
  for (let item of checkedItem) {
    item.remove();
    count = tasks.length - checkedItem.length;
    updateDoneTasks(count, checkedItem.length);
  }
}

function updateDoneTasks(count, checked) {
  if (count > 0) {
    doneTask.innerText = `${checked} task(s) of ${count} to be done`;
    doneTask.classList.replace("left-1/4", "left-8");
  } else {
    doneTask.innerText = "There is no task";
    doneTask.classList.replace("left-8", "left-1/4");
  }
}

function updateCheckedItems() {
  const checkedItem = filterTasklist();
  updateDoneTasks(count, checkedItem.length);
  updateProgressBar(checkedItem.length, count);
}

function filterTasklist() {
  const tasks = convertTasklistIntoArray();
  const checkedItem = tasks.filter(
    (task) => task.firstElementChild.firstElementChild.checked === true
  );
  return checkedItem;
}

function convertTasklistIntoArray() {
  const tasksNode = taskList.childNodes;
  const tasks = Array.from(tasksNode);
  return tasks;
}

function updateProgressBar(checked, count) {
  const firstBar = doneTask.nextElementSibling;
  firstBar.style.width = `${
    checked / count === 1 ? "100%" : `${(checked / count) * 100}%`
  }`;
}
