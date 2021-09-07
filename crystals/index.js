const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));

if(todos) {
  todos.forEach(todo => {
    add(todo);
  })
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  add();
});


function add(todo) {
  let todoText = input.value;

  if(todo) {
    todoText = todo.text;
  }

  if(todoText.length > 0) {
    const li = document.createElement("li");
    li.innerText = todoText;
    li.classList.add("list-group-item");

    if (todo && todo.completed) {
      li.classList.add("ok");
    };

    li.addEventListener("contextmenu", function
    (event) {
      event.preventDefault();
      if(window.confirm(this.innerText + "___Delete OK？")) {
        li.remove();
      }
      saveData();
    });
    
    li.addEventListener("click", function () {
      //if(window.confirm(this.innerText + "___Check OK？")) {
        //this.classList.add("ok");
        li.classList.toggle("ok");
     // }
      saveData();
    });

    ul.appendChild(li);
    input.value = "";
    saveData();
  };
};

function saveData() {
  const lists = document.querySelectorAll("li");
  let todos = [];
  lists.forEach(list => {
    let todo = {
      text: list.innerText,
      completed: list.classList.contains("ok")
    };
    todos.push(todo);
  });
  localStorage.setItem("todos", JSON.stringify(todos)); 
}