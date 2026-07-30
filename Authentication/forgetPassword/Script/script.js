// !!!!!!!!!!!!!!!!!!nav bar !!!!!!!!!!!!!!!!
let buttons = document.querySelectorAll(".drop-btn");
buttons.forEach((btn) => {
  btn.onclick = function (e) {
    e.stopPropagation();
    let menu = this.nextElementSibling;
    document.querySelectorAll(".drop-menu").forEach((item) => {
      if (item != menu) {
        item.classList.remove("show");
      }
    });
    menu.classList.toggle("show");
  };
});
window.onclick = function () {
  document.querySelectorAll(".drop-menu").forEach((item) => {
    item.classList.remove("show");
  });
};
function changeLang(name, element) {
  document.querySelector("#langBtn span").innerText = name;
  document
    .querySelectorAll(".dropdown")[0]
    .querySelectorAll(".drop-item")
    .forEach((item) => item.classList.remove("active"));
  element.classList.add("active");
  element.parentElement.classList.remove("show");
}
function changeCurrency(name, element) {
  document.querySelector("#currencyBtn span").innerText = name;
  document
    .querySelectorAll(".dropdown")[1]
    .querySelectorAll(".drop-item")
    .forEach((item) => item.classList.remove("active"));
  element.classList.add("active");
  element.parentElement.classList.remove("show");
}
let categoryBtn = document.getElementById("categoryBtn");
let megaMenu = document.getElementById("megaMenu");
categoryBtn.onclick = function (e) {
  e.stopPropagation();
  megaMenu.classList.toggle("show");
};
document.addEventListener("click", function () {
  megaMenu.classList.remove("show");
});
// !!!!!!!!!!!!!!!!!!nav bar !!!!!!!!!!!!!!!!
const forgetEmail = document.querySelector("#forget-email");
const forgetForm = document.querySelector("#forget-form");
const error = document.querySelector(".invalid-email");

const emailValidation = (input) => {
  let emailValue = input.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(emailValue)) {
    error.innerHTML = "";
    return true;
  } else {
    error.innerHTML = "invalid Email";
    return false;
  }
};
const existEmail = () => {
  let users = JSON.parse(localStorage.getItem("data")) || [];
  const isExist = users.some(
    (user) =>
      user.email.toLowerCase() === forgetEmail.value.toLowerCase().trim(),
  );
  if (isExist) {
    error.innerHTML = "";
    return true;
  } else {
    error.innerHTML = "This Email doesn't exist";
    return false;
  }
};

forgetForm.addEventListener("input", () => {
  error.textContent = "";
});

forgetForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (emailValidation(forgetEmail) && existEmail()) {
     

    let code = Math.floor(100000 + Math.random() * 900000);
    console.log(code);
    localStorage.setItem("code", JSON.stringify(code));

    let users = JSON.parse(localStorage.getItem("data")) || [];
    let editedUser = users.find(
      (item) =>
        item.email.toLowerCase() === forgetEmail.value.trim().toLowerCase(),
    );
    localStorage.setItem("resetEmail", JSON.stringify(editedUser.email));
    error.innerHTML="We Have Found Your Email"
    error.classList.add('text-success')
    error.classList.remove('text-danger')
    forgetForm.reset()

setTimeout(()=>{
    window.location.href = "../verification/verify.html";
},800)
  }
});
