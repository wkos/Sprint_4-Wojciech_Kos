const parent = document.getElementById("taskContainer");
const taskList = document.createElement("ul");
taskList.setAttribute("class", "taskList");
parent.appendChild(taskList);

document.getElementById("addTask").addEventListener("click", createTask);

function createTask() {
  taskInput = document.getElementById("taskTitle");
  if (taskInput.value !== "") {
    const newTask = document.createElement("li");
    newTask.textContent = taskInput.value;
    taskList.appendChild(newTask);

    const newEditButton = document.createElement("button");
    newEditButton.setAttribute("class", "button");
    newEditButton.textContent = "Edytuj";
    newTask.appendChild(newEditButton);

    const newDeleteButton = document.createElement("button");
    newDeleteButton.setAttribute("class", "button");
    newDeleteButton.textContent = "Usuń zadanie";
    newTask.appendChild(newDeleteButton, newTask);

    taskInput.value = "";

    newEditButton.addEventListener("click", editTask);
    newDeleteButton.addEventListener("click", removeTask);
  } else {
    alert("Nazwa zadania nie może być pusta");
  }
}

function editTask(event) {
  const button = event.target;
  const taskItem = button.parentNode;
  const currentText = taskItem.firstChild.textContent;
  console.log("current text", currentText);
  const newInput = document.createElement("input");
  newInput.value = currentText;
  taskItem.firstChild.textContent = "";
  taskItem.insertBefore(newInput, button);
  button.textContent = "Zapisz zmiany";
  button.removeEventListener("click", editTask);
  button.addEventListener("click", saveTask);
}

function saveTask(event) {
  const button = event.target;
  const taskItem = button.parentNode;
  const input = taskItem.querySelector("input");
  if (input.value !== "") {
    taskItem.firstChild.textContent = input.value;
    taskItem.removeChild(input);
    button.textContent = "Edytuj";
    button.removeEventListener("click", saveTask);
    button.addEventListener("click", editTask);
  } else {
    alert("Nazwa zadania nie może być pusta");
  }
}

function removeTask(event) {
  const button = event.target;
  const taskItem = button.parentNode;
  const taskList = taskItem.parentNode;
  taskList.removeChild(taskItem);
}
