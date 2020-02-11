const employeeAPI = "https://randomuser.me/api/";
const employeeList = document.getElementsByClassName("employee");
const overlay = document.getElementById("overlay");

var employeeCell;
var employeeAddress;
var employeeDOB;

function fetchData(url, HTML) {
  fetch(url)
    .then(response => response.json())
    .then(data => generateHTML(HTML, data.results[0]))
    .catch(error => console.error("Looks like there was a problem!", error));
}

function generateHTML(employee, data) {
  const employeeImage = data.picture.large;
  const employeeFullname = data.name.first + " " + data.name.last;
  const employeeEmail = data.email;
  const employeeCity = data.location.city;
  employeeCell = data.phone;
  employeeAddress =
    data.location.street.number +
    " " +
    data.location.street.name +
    ", " +
    data.location.state +
    " " +
    data.location.postcode;

  let year = data.dob.date.substring(2, 4);
  let month = data.dob.date.substring(5, 7);
  let day = data.dob.date.substring(8, 10);
  let converted = month + "/" + day + "/" + year;
  employeeDOB = "Birthday: " + converted;

  employee.innerHTML = `
    <img class="image" src=${employeeImage}>
    <div class="details">
        <h4 class="full-name">${employeeFullname}</h4>
        <p class="email">${employeeEmail}</p>
        <p class="city">${employeeCity}</p>
    </div>
    `;
}

function displayUsers() {
  for (let i = 0; i < employeeList.length; i++) {
    fetchData(employeeAPI, employeeList[i]);
  }
}

window.addEventListener("load", function() {
  displayUsers();
});

for (let i = 0; i < employeeList.length; i += 1) {
  employeeList[i].addEventListener("click", event => {
    overlay.style.display = "block";
    let id = event.target.id;
    if (id == null || id == "") {
      id = event.target.parentNode.id;
      if (id == null || id == "") {
        id = event.target.parentNode.parentNode.id;
      }
    }
    let parent = document.getElementById(id);
    overlay.innerHTML = `
    <p class="backward"><</p>
    <div class="overlay-content" id="overlay-content">
    <p class="close">X</p>
    ${parent.innerHTML}
    <div class="contact">
    <p>${employeeCell}</p>
    <p>${employeeAddress}</p>
    <p>${employeeDOB}</p>
    </div>
    </div>
    <p class="forward">></p>
 `;

    document.querySelector(".close").addEventListener("click", () => {
      overlay.style.display = "none";
    });
  });
}
