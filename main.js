// This is a  Todo List application that allows users to add, edit, delete, and filter tasks.
const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");
const filterButtons = document.querySelectorAll(".filter-btn");
const todoCount = document.getElementById("todoCount");
// I use localStorage to persist the todo list across page reloads. The todos are stored as an array of objects, each with a text and completed status.
let todos = JSON.parse(localStorage.getItem("todos")) || [];
// I define a filter variable to manage the current filter state. It can be "all", "active", or "completed".
let filter = "all";
// The renderTodos function is responsible for displaying the todo items based on the current filter. It clears the list, filters the todos, and creates list items for each todo.
function renderTodos() {
  list.innerHTML = "";

  const filtered = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  filtered.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "flex items-center justify-between p-2 border rounded";
// I create a list item for each todo. Each item has a checkbox, text, and buttons for editing and deleting.
    const leftBox = document.createElement("div");
    leftBox.className = "flex items-center flex-1";
// I create a checkbox for each todo item. When checked, it marks the todo as completed or not.
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.className =
      "mr-2 w-4 h-4 text-orange-500 rounded focus:ring focus:ring-orange-600";
    checkbox.addEventListener("change", () => toggleComplete(index));
// I create a span element to display the todo text. If the todo is completed, it applies a line-through style.
    const span = document.createElement("span");
    span.textContent = todo.text;
    span.className = `text-gray-800 ${
      todo.completed ? "line-through text-gray-400" : ""
    }`;

    leftBox.append(checkbox, span);
// I create buttons for editing and deleting the todo item. Each button has an event listener that triggers the respective action.
    const editBtn = document.createElement("img");
    editBtn.src = "image/img1.svg";
    editBtn.alt = "Edit";
    editBtn.className =
      "w-6 h-6 cursor-pointer hover:scale-110 transition duration-150";
    editBtn.addEventListener("click", () => editTodo(index));

    const deleteBtn = document.createElement("img");
    deleteBtn.src = "image/trash-2.svg";
    deleteBtn.alt = "Delete";
    deleteBtn.className =
      "w-6 h-6 cursor-pointer hover:scale-110 transition duration-150";
    deleteBtn.addEventListener("click", () => deleteTodo(index));
// I create a wrapper for the edit and delete buttons to align them horizontally.
    const iconWrap = document.createElement("div");
    iconWrap.className = "flex space-x-3";
    iconWrap.append(editBtn, deleteBtn);

    li.append(leftBox, iconWrap);
    list.appendChild(li);
  });

  // I save the updated todos to localStorage so that they persist across page reloads.
  localStorage.setItem("todos", JSON.stringify(todos));

  // I update the todo count display to show the total number of todos and how many are completed.
  const completed = todos.filter(t => t.completed).length;
  todoCount.textContent = `${todos.length} total — ${completed} completed`;
}
//This function is triggered when you click the Add button. It takes the input, checks if it’s not empty, adds it to the list, and re-renders the UI.
function addTodo() {
  const text = input.value.trim();
  if (text !== "") {
    todos.push({ text, completed: false });
    input.value = "";
    renderTodos();
  }
}
//Each of these handles a specific action: deleting a task, marking it as complete, or editing its content. They all call renderTodos() again to update the view.
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function editTodo(index) {
  const newText = prompt("Edit your task:", todos[index].text);
  if (newText !== null && newText.trim() !== "") {
    todos[index].text = newText.trim();
    renderTodos();
  }
}

addBtn.addEventListener("click", addTodo);
window.addEventListener("DOMContentLoaded", renderTodos);

// I add event listeners to the filter buttons so that when clicked, they set the filter and re-render the list with the filtered results.
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filter = btn.dataset.filter;
    renderTodos();
  });
});
