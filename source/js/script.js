const form = document.querySelector(".form-inner-box");
const inputBox = document.querySelector(".input-box");
const input = document.querySelectorAll(".input");
const succes = document.querySelector(".success");
const pass = document.querySelector(".pass");
const email = document.querySelector(".email");
const fname = document.querySelector(".fname");
const lname = document.querySelector(".lname");
const btn = document.querySelector(".btn-submit");

// console.log(form, input, succes, pass, lname, fname, email);
// const validateForm = function () {
//   input.forEach((el) => {
//     if (el.value === "") console.log("Fealds can't be empty ");
//   });
// };
let tests = true;
const correctAll = function () {
  input.forEach((input) => input.classList.add("success"));
  resetAfterCheck(5);
};

const resetAfterCheck = function (time) {
  setTimeout(function () {
    window.location.reload();
  }, time * 1000);
};

const renderLabel = function (element, msg) {
  const label = element.nextElementSibling;
  label.innerHTML = msg;
};

const addErrorClass = function (childElement) {
  childElement.parentElement.classList.add("error");
};
const checkName = function () {
  if (!fname.value) {
    addErrorClass(fname);
    tests = false;
    resetAfterCheck(2);
  }

  if (!lname.value) {
    addErrorClass(lname);
    tests = false;
    resetAfterCheck(2);
  }
};

const checkEmail = function () {
  // is ther mail
  if (!email.value) {
    addErrorClass(email);
    tests = false;
    resetAfterCheck(2);
    return;
  }

  // does it contain @
  if (!email.value.includes("@")) {
    addErrorClass(email);
    tests = false;
    resetAfterCheck(2);
    return;
  }

  /* regular expresion vill check everthing
  else that is considered invalid */
  const expression =
    /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  // .test will check if it contain
  if (!expression.test(String(email.value).toLowerCase())) {
    addErrorClass(email);
    // select label who is sibling and a next element
    renderLabel(email, "Email cotains invalid caracters!");
    tests = false;
    resetAfterCheck(2);
    return;
  }
};

const checkPassword = function () {
  if (!pass.value) {
    addErrorClass(pass);
    tests = false;
    resetAfterCheck(2);
    return;
  }
  const password = String(pass.value);

  if (password.length < 8 || password.length > 24) {
    addErrorClass(pass);
    renderLabel(pass, "Password must contain between 8 and 24 characters!");
    tests = false;
    resetAfterCheck(2);
    return;
  }

  if (!/[A-Z]/.test(password[0])) {
    addErrorClass(pass);
    renderLabel(pass, "First character in password must be Uppercase!");
    tests = false;
    resetAfterCheck(2);
    return;
  }

  if (!/[0-9]/.test(password)) {
    addErrorClass(pass);
    renderLabel(
      pass,
      "Password must contain at leat one character as a number!"
    );
    tests = false;
    resetAfterCheck(2);
    return;
  }
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkName();
  checkEmail();
  checkPassword();
  if (tests) correctAll();
});
