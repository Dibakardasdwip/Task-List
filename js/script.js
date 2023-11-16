//Define UI element

const form = document.querySelector("#task_form");
const tasklist = document.querySelector("ul");
const clearBtn = document.querySelector("#clear_task_btn");
const filter = document.querySelector("#task_filter");
const taskInput = document.querySelector("#new_task");

// Define event listeners
form.addEventListener("submit", addTask);
tasklist.addEventListener("click", remove);
clearBtn.addEventListener("click", clear);
filter.addEventListener("keyup", filterTask);
document.addEventListener("DOMContentLoaded", getTasks);
// Define function
//Add Task
function addTask(e) {
  e.preventDefault();
  if (taskInput.value === "") {
    alert("Add a Task!");
  } else {
    // Create li element
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(taskInput.value + " "));
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = "x";
    li.appendChild(link);
    tasklist.appendChild(li);
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = "";
  }
}
// Remove Task
function remove(e) {
  if (e.target.hasAttribute("href")) {
    if (confirm("Are you sure?")) {
      let ele = e.target.parentElement;
      ele.remove();
      console.log(ele);
      removeFromLS(ele);
    }
  }
}

// Clear Task

function clear(e) {
  //   tasklist.innerHTML = "";
  while (tasklist.firstChild) {
    tasklist.removeChild(tasklist.firstChild);
  }
  localStorage.clear();
}

// filter Task

function filterTask(e) {
  let text = e.target.value.toLowerCase();
  console.log(text);

  document.querySelectorAll("li").forEach((task) => {
    console.log(task);
    let item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

// Store in local Storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// retrive data from local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(task + " "));
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = "x";
    li.appendChild(link);
    tasklist.appendChild(li);
  });
}

function removeFromLS(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  let li = taskItem;
  li.removeChild(li.lastChild);

  tasks.forEach((task, index) => {
    if (li.textContent.trim() === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
