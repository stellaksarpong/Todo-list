

const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "flex items-center justify-between p-2 border rounded";
//
    const leftBox = document.createElement("div");
    leftBox.className = "flex items-center flex-1";
// Create a checkbox for completion status
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.className =
      "mr-2 w-4 h-4 text-orange-500 rounded focus:ring focus:ring-orange-600";
    checkbox.addEventListener("change", () => toggleComplete(index));

// Create a span for the todo text
    const span = document.createElement("span");
    span.textContent = todo.text;
    span.className = `text-gray-800 ${
      todo.completed ? "line-through text-gray-400" : ""
    }`;

    leftBox.append(checkbox, span);

    //  Create Edit Button
    const editBtn = document.createElement("img");
    editBtn.src = "image/img1.svg";
    editBtn.alt = "Edit";
    editBtn.className =
      "w-6 h-6 cursor-pointer hover:scale-110 transition duration-150";
    editBtn.addEventListener("click", () => editTodo(index));

    //  Create Delete Button
    const deleteBtn = document.createElement("img");
    deleteBtn.src = "image/trash-2.svg";
    deleteBtn.alt = "Delete";
    deleteBtn.className =
      "w-6 h-6 cursor-pointer hover:scale-110 transition duration-150";
    deleteBtn.addEventListener("click", () => deleteTodo(index));

    // Wrap icons together
    const iconWrap = document.createElement("div");
    iconWrap.className = "flex space-x-3";
    iconWrap.append(editBtn, deleteBtn);

    li.append(leftBox, iconWrap);
    list.appendChild(li);
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
// Function to add a new todo item
function addTodo() {
  const text = input.value.trim();
  if (text !== "") {
    todos.push({ text, completed: false });
    input.value = "";
    renderTodos();
  }
}
// Function to delete a todo item
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}
// Function to toggle the completion status of a todo item
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}
// Function to edit a todo item
function editTodo(index) {
  const newText = prompt("Edit your task:", todos[index].text);
  if (newText !== null && newText.trim() !== "") {
    todos[index].text = newText.trim();
    renderTodos();
  }
}
// Add event listeners
addBtn.addEventListener("click", addTodo);
window.addEventListener("DOMContentLoaded", renderTodos);
