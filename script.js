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
  var nameValid = /^\w{4,30}$/;
  var emailValid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  var passwordValid = /^\w{6,15}\W?$/;
  var users = JSON.parse(localStorage.getItem("users")) || [];

  if (
    nameValid.test(signupinputName.value) &&
    emailValid.test(signupinputEmail.value) &&
    passwordValid.test(signupinputPassword.value)
  ) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === signupinputEmail.value) {
        signupError.innerHTML = "Email already exists";
        return;
      }
    }
    var user = {
      name: signupinputName.value,
      email: signupinputEmail.value,
      password: signupinputPassword.value,
    };
    users.push(user);
    console.log(users);
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
console.log(logedinUser);

function login() {
  for (var i = 0; i < users.length; i++) {
    if (
      users[i].email == signinEmail.value &&
      users[i].password == signinPassword.value
    ) {
      signinError.innerHTML = "";
      logedinUser = users[i].name;
      localStorage.setItem("logedinUser", logedinUser);
      console.log(logedinUser);
      window.location.href = "home.html";
    } else {
      signinError.innerHTML = "Check your email and password";
    }
  }
  if (signinEmail.value == "" && signinPassword.value == "") {
    signinError.innerHTML = "Please enter email and password";
  }
}

function logout() {
  logedinUser = "";
  localStorage.setItem("logedinUser", logedinUser);
  window.location.href = "/";
}

function welcome() {
  if (logedinUser != "") {
    heading.innerHTML = "Welcome " + logedinUser;
  } else {
    window.location.href = "/";
  }
}
