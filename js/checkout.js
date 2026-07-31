// HEADER
let buttons=document.querySelectorAll(".drop-btn");
buttons.forEach(btn=>{
    btn.onclick=function(e){
        e.stopPropagation();
        let menu=this.nextElementSibling;
        document.querySelectorAll(".drop-menu").forEach(item=>{
            if(item!=menu){
                item.classList.remove("show");
            }
        });
        menu.classList.toggle("show");
    }
});
window.onclick=function(){
    document.querySelectorAll(".drop-menu").forEach(item=>{
        item.classList.remove("show");
    });
}
function changeLang(name,element){
    document.querySelector("#langBtn span").innerText=name;
    document.querySelectorAll(".dropdown")[0]
    .querySelectorAll(".drop-item")
    .forEach(item=>item.classList.remove("active"));
    element.classList.add("active");
    element.parentElement.classList.remove("show");
}
function changeCurrency(name,element){
    document.querySelector("#currencyBtn span").innerText=name;
    document.querySelectorAll(".dropdown")[1]
    .querySelectorAll(".drop-item")
    .forEach(item=>item.classList.remove("active"));
    element.classList.add("active");
    element.parentElement.classList.remove("show");
}
let  categoryBtn = document.getElementById("categoryBtn");
let   megaMenu = document.getElementById("megaMenu");
categoryBtn.onclick = function(e){
    e.stopPropagation();
    megaMenu.classList.toggle("show");
}
document.addEventListener("click",function(){
    megaMenu.classList.remove("show");
}); 
//================ checkout part===============
// ================= Cart =================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let orderItems = document.getElementById("orderItems");

let subTotalElement = document.getElementById("subTotal");
let discountElement = document.getElementById("discount");
let taxElement = document.getElementById("tax");
let totalElement = document.getElementById("total");

let taxRate = 0.08;
let discount = 24;


function showError(id, message){

    document.getElementById(id).textContent = message;

}


function clearError(id){

    document.getElementById(id).textContent  = "";

}

// ================= Show Products =================

function showProducts() {

    orderItems.innerHTML = "";

    let subTotal = 0;

    cart.forEach(function(item) {

        let productTotal = item.price * item.qty;

        subTotal += productTotal;

        orderItems.innerHTML += `
        <div class="product">

            <img src="${item.image}" alt="">

            <div>

                <div class="product-name">
                    ${item.name}
                </div>

                <div class="product-price">
                    <span class="qty"> ${item.qty} ×</span> $${item.price}
                </div>

            </div>

        </div>
        `;

    });

    let tax = subTotal * taxRate;

    let currentDiscount = cart.length > 0 ? discount : 0;

    let total = subTotal + tax - currentDiscount;

    subTotalElement.innerHTML = "$" + subTotal.toFixed(2);

    discountElement.innerHTML = "$" + currentDiscount.toFixed(2);

    taxElement.innerHTML = "$" + tax.toFixed(2);

    totalElement.innerHTML = "$" + total.toFixed(2);

}

showProducts();


// ================= Validation =================

let placeOrder = document.getElementById("placeOrder");

placeOrder.addEventListener("click", function (e) {

    e.preventDefault();

    let valid = true;

  // ================= First Name =================

    let firstName = document.getElementById("firstName").value.trim();

    if (firstName.length < 3) {

        showError("firstNameError","First name must be at least 3 characters");

        valid = false;

    }

    else {

        clearError("firstNameError");

    }


    // ================= Last Name =================

    let lastName = document.getElementById("lastName").value.trim();

    if (lastName.length < 3) {

        showError("lastNameError","Last name must be at least 3 characters");

        valid = false;

    }

    else {

        clearError("lastNameError");

    }


    // ================= Address =================

    let address = document.getElementById("address").value.trim();

    if (address == "") {

        showError("addressError","Address is required");

        valid = false;

    }

    else {

        clearError("addressError");

    }


    // ================= Country =================

    let country = document.getElementById("country").value;

    if (country == "") {

        showError("countryError","Select your country");

        valid = false;

    }

    else {

        clearError("countryError");

    }


    // ================= Region =================

    let region = document.getElementById("region").value.trim();

    if (region == "") {

    showError("regionError","Region is required");

    valid = false;

}

else {

    clearError("regionError");

}


    // ================= City =================

    let city = document.getElementById("city").value.trim();

    if (city == "") {

    showError("cityError","City is required");

    valid = false;

}

    else {

        clearError("cityError");

}


    // ================= Zip Code =================

    let zip = document.getElementById("zip").value.trim();

    if (zip == "") {

    showError("zipError","Zip Code is required");

    valid = false;

}

else {

    clearError("zipError");

}


    // ================= Email =================

    let email = document.getElementById("email").value.trim();

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email == "") {

    showError("emailError","Email is required");

    valid = false;

}

else if (!emailPattern.test(email)) {

    showError("emailError","Enter valid email");

    valid = false;

}

else {

    clearError("emailError");

}

// ================= Phone =================

let phone = document.getElementById("phone").value.trim();

let phonePattern = /^[0-9]{11}$/;

if (!phonePattern.test(phone)) {

    showError("phoneError","Phone number must be 11 digits");

    valid = false;

}

else {

    clearError("phoneError");

}
    // ================= Payment =================

    let payment = document.querySelector('input[name="payment"]:checked');

    if (payment == null) {

    showError("paymentError","Choose payment method");

    valid = false;

}

else {

    clearError("paymentError");

}


    // ================= Card Name =================

    let cardName = document.getElementById("cardName").value.trim();

    if (cardName == "") {

    showError("cardNameError","Card name is required");

    valid = false;

}

else {

    clearError("cardNameError");

}


    // ================= Card Number =================

let cardNumber = document.getElementById("cardNumber").value.trim();

let cardPattern = /^[0-9]{16}$/;

if (!cardPattern.test(cardNumber)) {

    showError("cardNumberError","Card number must be 16 digits");

    valid = false;

}

else {

    clearError("cardNumberError");

}

// ================= Expire Date =================

let expire = document.getElementById("expire").value.trim();

let expirePattern = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;

if (!expirePattern.test(expire)) {

    showError("expireError","Enter date as MM/YY");

    valid = false;

}

else {

    clearError("expireError");

}


// ================= CVC =================

let cvc = document.getElementById("cvc").value.trim();

let cvcPattern = /^[0-9]{3}$/;

if (!cvcPattern.test(cvc)) {

    showError("cvcError","CVC must be 3 digits");

    valid = false;

}

else {

    clearError("cvcError");

}


    // ================= Finish =================

    if (valid) {
    window.location.href = "success.html";
}

});
// ================= Country - Region - City =================

let data = {

    Egypt: {
        Cairo: ["Nasr City", "Maadi", "Heliopolis"],
        Giza: ["Dokki", "Mohandessin", "6th October"],
        Minya: ["Minya", "Mallawi", "Maghagha", "Beni Mazar"],
        Alexandria: ["Smouha", "Miami", "Stanley"]
    },

    USA: {
        California: ["Los Angeles", "San Diego", "San Jose"],
        Texas: ["Houston", "Dallas", "Austin"],
        Florida: ["Miami", "Orlando", "Tampa"]
    },

    UK: {
        England: ["London", "Manchester", "Liverpool"],
        Scotland: ["Edinburgh", "Glasgow"],
        Wales: ["Cardiff", "Swansea"]
    }

};

let country = document.getElementById("country");
let region = document.getElementById("region");
let city = document.getElementById("city");

country.addEventListener("change", function () {

    region.innerHTML = '<option value="">Select...</option>';
    city.innerHTML = '<option value="">Select...</option>';

    if (this.value == "") return;

    for (let state in data[this.value]) {

        region.innerHTML += `
            <option value="${state}">
                ${state}
            </option>
        `;

    }

});

region.addEventListener("change", function () {

    city.innerHTML = '<option value="">Select...</option>';

    if (this.value == "") return;

    let cities = data[country.value][this.value];

    cities.forEach(function(item){

        city.innerHTML += `
            <option value="${item}">
                ${item}
            </option>
        `;

    });

});