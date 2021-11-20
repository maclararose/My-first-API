function getTasks() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      let container = document.getElementById("container");
      let responses = JSON.parse(this.responseText);

      for(var i = 0; i < responses.length ; i++) {
        container.insertAdjacentHTML("beforeend", `[${responses[i].id}]: ${responses[i].task} <br/>`);
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

    container.insertAdjacentHTML("beforeend", `[${responses.id}]: ${responses.task} <br/>`);
  };

  var formData = new this.FormData(document.getElementById("form_todo"));
  xhttp.send(formData);
};

getTasks();