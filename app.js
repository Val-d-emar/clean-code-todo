const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTasksList = document.getElementById("incompleteTasks");
const completedTasksList = document.getElementById("completed-tasks");

const createNewTaskElement = function (taskText) {
  const listItem = document.createElement("li");

  const checkbox = document.createElement("input");

  const label = document.createElement("label");

  const editInput = document.createElement("input");

  const editButton = document.createElement("button");

  const deleteButton = document.createElement("button");
  const deleteButtonIcon = document.createElement("img");

  label.innerText = taskText;
  label.className = "task";

  checkbox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonIcon.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonIcon);

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTasksList.appendChild(listItem);
  bindTaskEvents(listItem);

  taskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector(".edit");
  const isEditMode = listItem.classList.contains("editMode");
  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const toggleTask = function () {
  const listItem = this.parentNode;
  const targetHolder = this.checked ? completedTasksList : incompleteTasksList;
  targetHolder.appendChild(listItem);
};

addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem) {
  const checkbox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;

  deleteButton.onclick = deleteTask;

  checkbox.onchange = toggleTask;
};

for (let i = 0; i < incompleteTasksList.children.length; i++) {
  bindTaskEvents(incompleteTasksList.children[i]);
}

for (let i = 0; i < completedTasksList.children.length; i++) {
  bindTaskEvents(completedTasksList.children[i]);
}
