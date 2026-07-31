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
const verfiyInput = document.querySelector("#verfiy-code");
const resendLink = document.querySelector(".resend");
const invalidMsg = document.querySelector(".invalid");
const verifyForm = document.querySelector("#verify-form");

verifyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let verfiy = JSON.parse(localStorage.getItem("code"));
  let verfiyValue = verfiyInput.value.trim();

  if (verfiy === Number(verfiyValue)) {
    invalidMsg.classList.remove("d-none", "text-danger");
    invalidMsg.classList.add("text-success");
    invalidMsg.innerHTML = "Right Code";
    localStorage.removeItem("code");

    setTimeout(() => {
      window.location.href = "../reset/reset.html";
      verifyForm.reset();
    }, 500);
  } else {
    invalidMsg.classList.remove("d-none", "text-success");
    invalidMsg.classList.add("text-danger");
    invalidMsg.innerHTML = " Invalid verification code";
  }
});
resendLink.addEventListener("click", (e) => {
  e.preventDefault();
  let code = Math.floor(100000 + Math.random() * 900000);
  localStorage.setItem("code", JSON.stringify(code));
});
verfiyInput.addEventListener("input", () => {
  invalidMsg.textContent = "";
});
