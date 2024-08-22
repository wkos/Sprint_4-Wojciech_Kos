const taskList = document.querySelector("ul");

// document.getElementById("addTask").addEventListener("click", createTask); zamiast tego lepiej to, co niżej.
// Dobrą praktyką jest pobranie referencji do danego elementu, zapisanie jej do zmiennej, a następnie przekazanie listenera.

const addTaskButton = document.getElementById("addTask");
addTaskButton.addEventListener("click", createTask);
const taskInput = document.getElementById("taskTitle");

function createButton(buttonClass, textOnButton, handlingFunction) {
  const newButton = document.createElement("button");
  newButton.className = buttonClass;
  newButton.textContent = textOnButton;
  newButton.addEventListener("click", handlingFunction);
  return newButton;
}

function createTask() {
  if (taskInput.value !== "") {
    const newTask = document.createElement("li");
    newTask.textContent = taskInput.value;
    taskList.appendChild(newTask);

    const btnEdit = createButton("button", "Edytuj", handleEditTask);
    newTask.appendChild(btnEdit);
    const btnDelete = createButton("button", "Usuń zadanie", removeTask);
    newTask.appendChild(btnDelete);

    taskInput.value = "";
  } else {
    alert("Nazwa zadania nie może być pusta");
  }
}

function handleEditTask(event) {
  const button = event.target;
  const taskItem = button.parentNode;
  if (button.textContent === "Edytuj") {
    const newInput = document.createElement("input");
    const currentText = taskItem.firstChild.textContent;
    newInput.value = currentText;
    taskItem.firstChild.textContent = "";
    taskItem.insertBefore(newInput, button);
    button.textContent = "Zapisz zmiany";
  } else {
    const input = taskItem.querySelector("input");
    if (input.value !== "") {
      taskItem.firstChild.textContent = input.value;
      taskItem.removeChild(input);
      button.textContent = "Edytuj";
    } else {
      alert("Nazwa zadanie nie może być pusta");
    }
  }
  // button.removeEventListener("click", handleEditTask);
  button.addEventListener("click", handleEditTask);
}

function removeTask(event) {
  const taskItem = event.target.parentNode;
  taskItem.remove();
}
