var signupinputName = document.getElementById("signupName");
var signupinputEmail = document.getElementById("signupEmail");
var signupinputPassword = document.getElementById("signupPassword");
var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");
var signupError = document.getElementById("signupError");
var signinError = document.getElementById("SigninError");
var home = document.getElementById("home");
var heading = document.getElementById("heading");
var users = [];
var user = {
  name: "",
  email: "",
  password: "",
};
var logedinUser = "";
function signup() {
  var nameValid = /^\w{3,15}(\s\w{3,15})?$/;
  var emailValid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  var passwordValid = /\w{6,15}\W?/;
  var users = JSON.parse(localStorage.getItem("users")) || [];
  if (nameValid.test(signupinputName.value) == false) {
    signupError.innerHTML = "Please enter valid name";
  } else if (emailValid.test(signupinputEmail.value) == false) {
    signupError.innerHTML = "Please enter valid email";
  } else if (passwordValid.test(signupinputPassword.value) == false) {
    signupError.innerHTML = "Please enter valid password";
  } else if (
    nameValid.test(signupinputName.value) &&
    emailValid.test(signupinputEmail.value.toLowerCase()) &&
    passwordValid.test(signupinputPassword.value)
  ) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === signupinputEmail.value.toLowerCase()) {
        signupError.innerHTML = "Email already exists";
        return;
      }
    }
    var user = {
      name: signupinputName.value.toLowerCase(),
      email: signupinputEmail.value.toLowerCase(),
      password: signupinputPassword.value,
    };
    users.push(user);
    // console.log(users);
    signupinputName.value = "";
    signupinputEmail.value = "";
    signupinputPassword.value = "";
    signupError.innerHTML = "Success";
    signupError.style.color = "green";
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "/";
  } else {
    signupError.innerHTML = "Please enter valid data";
  }
}

var users = JSON.parse(localStorage.getItem("users")) || [];
logedinUser = localStorage.getItem("logedinUser");
console.log(users);
console.log("userName " + logedinUser);
console.log(typeof logedinUser);
function login() {
  if (users.length > 0) {
    for (var i = 0; i < users.length; i++) {
      if (
        users[i].email == signinEmail.value.toLowerCase() &&
        users[i].password == signinPassword.value
      ) {
        signinError.innerHTML = "";
        logedinUser = users[i].name;
        localStorage.setItem("logedinUser", logedinUser);
        window.location.href = "home.html";
      } else if (users[i].email != signinEmail.value.toLowerCase()) {
        signinError.innerHTML = "Check your email";
      } else if (users[i].password != signinPassword.value) {
        signinError.innerHTML = "Check your password";
      }
    }
  } else {
    signinError.innerHTML = "Check your email and password";
  }
}

function logout() {
  logedinUser = "";
  localStorage.setItem("logedinUser", logedinUser);
  window.location.href = "/";
}

function welcome() {
  if (typeof logedinUser == "string" && logedinUser.length > 2) {
    heading.innerHTML = `Welcome <span class="text-danger text-capitalize">${logedinUser}</span>`;
  } else {
    window.location.href = "/";
  }
}

function loginCheck() {
  if (typeof logedinUser == "string" && logedinUser.length > 2) {
    window.location.href = "home.html";
  }
}
