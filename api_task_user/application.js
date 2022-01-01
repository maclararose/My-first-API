function getTasks() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      let container = document.getElementById("container");
      let responses = JSON.parse(this.responseText);

      for(var i = 0; i < responses.length ; i++) {
        container.insertAdjacentHTML("afterbegin", createResponse(responses[i]));
      };
    };
  };

  xhttp.open("GET", "http://localhost:3001/todos", true);
  xhttp.send();
};

window.sendForm = function(event) {
  event.preventDefault();
  var xhttp = new this.XMLHttpRequest();

  xhttp.open("POST", "http://localhost:3001/todos", true);
  xhttp.onload = function(event) {
    let container = document.getElementById("container");
    let responses = JSON.parse(event.target.response);

    container.insertAdjacentHTML("afterbegin", createResponse(responses));
  };

  var formData = new this.FormData(document.getElementById("form-todo"));
  xhttp.send(formData);
  document.getElementById("task_input").value = "";
};

function createResponse(response) {
  return(
    `<div class="task" id="${response.id}">
        <table class="table table-striped">
          <thead>
            <th scope="col">ID</th>
            <th scope="col">Task Description</th>
            <th scope="col">Actions</th>
          </thead>
          <tbody>
            <tr>
              <th scope="row">${response.id}</th>
              <th>${response.task}</th>
              <th><button class="btn btn-danger" onclick="deleteResponse(${response.id})">Delete</button></th>
            </tr>
          </tbody>
        </table>
      <br/>
    </div>`
  );
};

function deleteResponse(response_id) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", `http://localhost:3001/todos/${response_id}`, true);
  xhttp.onload = function() {
    let target = document.getElementById(response_id);
    target.parentNode.removeChild(target);
  };
  xhttp.send(null);
};

getTasks();