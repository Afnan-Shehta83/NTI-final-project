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
// variables

const signInTab = document.querySelector(".tab1");
const signUpTab = document.querySelector(".tab2");
const tabLine = document.querySelector(".line-throw");
const signIn = document.querySelector(".sign-in");
const signUp = document.querySelector(".sign-up");
const signInNav = document.querySelector(".sign-in-nav");
const signUpNav = document.querySelector(".sign-up-nav");
const signUpForm = document.getElementById("sign-Up-form");
const signInForm = document.getElementById("sign-in-form");
const invalidPass = document.querySelector(".invalid-pass");
const invalidName = document.querySelector(".invalid-name");
const invalidEmail = document.querySelector(".invalid-email");
const matchPass = document.querySelector(".match-pass");
const signUpPass = document.querySelector("#signup-pass");
const confirmInput = document.querySelector("#confirm-pass");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("signup-email");
const existEmail = document.querySelector(".exist");
const showAndHide = document.querySelectorAll(".show");
const signInEmail = document.getElementById("signin-email");
const signInPass = document.getElementById("signin-pass");
const successMag = document.querySelector(".success");

// transformation

signUpTab.addEventListener("click", () => {
  tabLine.classList.add("transform");
  signInTab.classList.add("text-secondary");
  signUpTab.classList.remove("text-secondary");
  signIn.classList.add("d-none");
  signUp.classList.remove("d-none");
  signInNav.classList.add("d-none");
  signUpNav.classList.remove("d-none");
});
signInTab.addEventListener("click", () => {
  tabLine.classList.remove("transform");
  signInTab.classList.remove("text-secondary");
  signUpTab.classList.add("text-secondary");
  signIn.classList.remove("d-none");
  signUp.classList.add("d-none");
  signInNav.classList.remove("d-none");
  signUpNav.classList.add("d-none");
});

// show/hide

showAndHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let prevInput = icon.previousElementSibling;
    prevInput.type = prevInput.type === "password" ? "text" : "password";

    icon.classList.toggle("fa-eye-slash");
    icon.classList.toggle("fa-eye");
  });
});

//validation for sign up

const nameValidation = (input) => {
  let nameValue = input.value.trim();
  if (nameValue.length < 3) {
    invalidName.classList.remove("d-none");
    return false;
  } else {
    invalidName.classList.add("d-none");
    return true;
  }
};

const signUpEmailValidation = (input) => {
  let signUpEmailValue = input.value.trim();
  const signUpEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (signUpEmailRegex.test(signUpEmailValue)) {
    invalidEmail.classList.add("d-none");
    return true;
  } else {
    invalidEmail.classList.remove("d-none");
    return false;
  }
};

const signUpPassValidation = (input) => {
  let signUpPassValue = input.value.trim();
  const signUpPassRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (signUpPassRegex.test(signUpPassValue)) {
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
  if (confirmValue === signUpPass.value.trim()) {
    matchPass.classList.add("d-none");
    return true;
  } else {
    matchPass.classList.remove("d-none");
    return false;
  }
};

signUpForm.addEventListener("input", (e) => {
  switch (e.target.id) {
    case "name":
      nameValidation(e.target);
      break;
    case "signup-email":
      signUpEmailValidation(e.target);
      break;
    case "signup-pass":
      signUpPassValidation(e.target);
      confirmPass(confirmInput);
      break;
    case "confirm-pass":
      confirmPass(e.target);
      break;
  }
});

emailInput.addEventListener("input", () => {
  existEmail.classList.add("d-none");
});

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let users = JSON.parse(localStorage.getItem("data")) || [];
  if (
    nameValidation(nameInput) &&
    signUpEmailValidation(emailInput) &&
    signUpPassValidation(signUpPass) &&
    confirmPass(confirmInput)
  ) {
    let isExist = users.some(
      (user) =>
        user.email.toLowerCase() === emailInput.value.toLowerCase().trim(),
    );
    if (isExist) {
      existEmail.classList.remove("d-none");
      return;
    } else {
      existEmail.classList.add("d-none");
    }
    users.push({
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      password: signUpPass.value.trim(),
    });
    localStorage.setItem("data", JSON.stringify(users));

    signUpForm.reset();
    setTimeout(() => {
      //-----home page url--------------
      window.location.href = "../../Homepage.html";
    }, 500);
  }
});
//validation for sign in.

const checkLogin = () => {
  let users = JSON.parse(localStorage.getItem("data")) || [];
  const signInEmailValue = signInEmail.value.trim();
  const signInPassValue = signInPass.value.trim();

  let checked = users.find(
    (item) =>
      item.email === signInEmailValue && item.password === signInPassValue,
  );
  if (checked) {
    successMag.innerHTML = "Successful sign in";
    successMag.classList.add("text-success");
    successMag.classList.remove("text-danger");
    signInForm.reset();
    setTimeout(() => {
      //-----home page url--------------
      console.log(window.location.href);
      window.location.href = "../../Homepage.html";
    }, 500);
  } else {
    successMag.innerHTML = "Email or Password is wrong";
    successMag.classList.add("text-danger");
    successMag.classList.remove("text-success");
  }
};
signInForm.addEventListener("input", () => {
  successMag.textContent = "";
});
signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  checkLogin();
});
