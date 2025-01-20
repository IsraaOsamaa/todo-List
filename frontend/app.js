// App Logic
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const authForm = document.getElementById("authForm");
const authTitle = document.getElementById("authTitle");
const authSubmit = document.getElementById("authSubmit");
const usernameInput = document.getElementById("username");

const userpasswordInput = document.getElementById("userpassword");
const todoSection = document.getElementById("todoSection");
const addTaskBtn = document.getElementById("addTask");
const newTaskInput = document.getElementById("newTask");
const todoList = document.getElementById("todoList");

let currentUser = null;
let users = {};

const url = "http://localhost:5000";

// Show registration/login form
registerBtn.addEventListener("click", () => {
  authTitle.textContent = "Register";
  authForm.classList.remove("hidden");
  todoSection.classList.add("hidden");
  removeNoteDiv();
});

function showLoginForm() {
  authTitle.textContent = "Login";
  authForm.classList.remove("hidden");
  todoSection.classList.add("hidden");
  removeNoteDiv();
}

// Handle registration/login
authSubmit.addEventListener("click", async () => {
  const username = usernameInput.value;
  const password = userpasswordInput.value;
  if (!username) {
    alert("Username cannot be empty");
    return;
  } else if (!password) {
    alert("password cannot be empty");
    return;
  }

  const body = {
    username: username,
    password: password,
  };
  //submit register Form
  if (authTitle.textContent === "Register") {
    console.log(authTitle);
    //api for register
    fetch(`${url}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((responce) => responce.json())
      .then((json) => {
        const data = json;
        if (data.Error !== undefined) {
          showAlert(data.Error, "danger");
          showNoteDiv();
          return;
        }
        console.log(data);
        showLoginForm();
        showAlert(data.message, "success");
      })
      .catch((err) => {
        showAlert(err, "danger");
        console.log(err);
      });
  }
  //submit login Form
  else {
    //api for login
    console.log(authTitle);
    login();
  }

  usernameInput.value = "";
  userpasswordInput.value = "";
  authForm.classList.add("hidden");
});
function login() {
  const username = usernameInput.value;
  const password = userpasswordInput.value;
  const body = {
    username: username,
    password: password,
  };
  fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((responce) => responce.json())
    .then((json) => {
      const data = json;
      const token = data.token;
      console.log(data);
      if (data.Error !== undefined) {
        showAlert(data.Error, "danger");
        showNoteDiv();
        return;
      }
      loadTodoList();
      showAlert(data.massege, "success");
      setUserAndTokenToLocalStorage(data.user, token);
    })
    .catch((err) => {
      showAlert(err, "danger");
    });
}
// Load user's to-do list

//apear todo Section
function loadTodoList() {
  todoSection.classList.remove("hidden");
  renderTodoList();
}

// Render the to-do list
function renderTodoList() {
  const userId = getUserFromLocalStorage().id;
  console.log(userId);
  fetch(`${url}/todos/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((responce) => responce.json())
    .then((json) => {
      const data = json;
      console.log(data);

      if (data.Error !== undefined) {
        showAlert(data.Error, "danger");
        return;
      }
      //add todo list to page
      todoList.innerHTML = "";
      let todoId;
      console.log(data[0]);
      console.log(typeof data[0]);
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        console.log(typeof data[i]);

        todoId = data[i][0];
        const li = `
          <li>
            <p>${data[i][1]}</p>
            <div class="icons">
              <img src="./images/check.png " onclick="deleteTask(${todoId})"  alt="">
              <img src="./images/remove.png" onclick="deleteTask(${todoId})" alt="">
              
            </div>
          </li>
        `;
        todoList.innerHTML += li;
      }
      console.log("fetch todo list has done !");
    })
    .catch((err) => {
      showAlert(err, "danger");
    });
}

// Add a new task
addTaskBtn.addEventListener("click", () => {
  const userId = getUserFromLocalStorage().id;
  if (!userId) {
    showAlert("You have to Login", "danger");
    return;
  }
  const task = newTaskInput.value;
  if (!task) {
    showAlert("Task cannot be empty", "danger");
    return;
  }
  const body = {
    userId: userId,
    text: task,
  };

  fetch(`${url}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((responce) => responce.json())
    .then((json) => {
      const data = json;

      if (data.Error !== undefined) {
        showAlert(data.Error, "danger");
        return;
      }
      showAlert(data.message, "success");
      renderTodoList();
    })
    .catch((err) => {
      showAlert(err, "danger");
      console.log("Error Adding New Task");
    });
  newTaskInput.value = "";
});

// Delete a task
async function deleteTask(index) {
  //api delete task then  renderTodoList(); to refresh tasks
  fetch(`${url}/todos/${index}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((responce) => responce.json())
    .then((json) => {
      const data = json;
      if (data.Error !== undefined) {
        showAlert(data.Error, "danger");
        return;
      }
      showAlert(data.massege, "success");
      renderTodoList();
    })
    .catch((err) => {
      showAlert(err, "danger");
      console.log("Error Deleting A Task");
    });
}

function getUserFromLocalStorage() {
  return JSON.parse(localStorage.getItem("user"));
}
function getTokenFromLocalStorage() {
  return localStorage.getItem("token");
}
function setUserAndTokenToLocalStorage(userObj, token) {
  localStorage.setItem("user", JSON.stringify(userObj));
  localStorage.setItem("token", token);
}

function showAlert(massege, status) {
  const alertDiv = document.getElementById("alert");
  alertDiv.querySelector("p").innerHTML = massege;
  if (status === "success") {
    alertDiv.style.backgroundColor = "#07f70794";
  } else if (status === "danger") {
    alertDiv.style.backgroundColor = "#ff00008c";
  }
  alertDiv.style.visibility = "visible";
}
function hideAlert() {
  document.getElementById("alert").style.visibility = "hidden";
}
function removeNoteDiv() {
  document.querySelector(".note").classList.add("hidden");
}
function showNoteDiv() {
  document.querySelector(".note").classList.remove("hidden");
}
//todo when open the page do this function
// window.onload(() => {
//   let userId = getUserFromLocalStorage().id;
//   if (!(userId === "undefined")) {
//     login();
//   }
// });

//todo test delete function
