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
const invalidPass = document.querySelector(".invalid-pass");
const showAndHide = document.querySelectorAll(".show");
const matchPass = document.querySelector(".match-pass");
const resetPass = document.querySelector("#new-pass");
const confirmInput = document.querySelector("#confirm-new-pass");
const resetForm = document.getElementById("resetForm");
const successMsg = document.querySelector(".success");

showAndHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let prevInput = icon.previousElementSibling;
    prevInput.type = prevInput.type === "password" ? "text" : "password";

    icon.classList.toggle("fa-eye-slash");
    icon.classList.toggle("fa-eye");
  });
});

const resetValidation = (input) => {
  let resetValue = input.value.trim();
  const resetRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (resetValue === "") {
    invalidPass.classList.add("d-none");
    return false;
  }
  if (resetRegex.test(resetValue)) {
    invalidPass.classList.add("d-none");
    return true;
  } else {
    invalidPass.classList.remove("d-none");
    return false;
  }
};

const confirmPass = (input) => {
  const confirmValue = input.value.trim();
  if (confirmValue === "") {
    matchPass.classList.add("d-none");
    return false;
  }
  if (confirmValue === resetPass.value.trim()) {
    matchPass.classList.add("d-none");
    return true;
  } else {
    matchPass.classList.remove("d-none");
    return false;
  }
};

resetForm.addEventListener("input", (e) => {
  switch (e.target.id) {
    case "new-pass":
      resetValidation(e.target);
      confirmPass(confirmInput);
      break;
    case "confirm-new-pass":
      confirmPass(e.target);
      break;
  }
});

resetForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (resetValidation(resetPass) && confirmPass(confirmInput)) {
    const resetUser = JSON.parse(localStorage.getItem("resetEmail"));
    let users = JSON.parse(localStorage.getItem("data")) || [];
    let resetObj = users.find((item) => item.email == resetUser);
    console.log(resetObj);
    resetObj.password = resetPass.value.trim();
    console.log(resetObj);
    localStorage.setItem("data", JSON.stringify(users));
    successMsg.innerHTML = "Password changed successfully";
    localStorage.removeItem("resetEmail");

    setTimeout(() => {
      window.location.href = "../login/auth.html";
      resetForm.reset();
    }, 500);
  }
});
