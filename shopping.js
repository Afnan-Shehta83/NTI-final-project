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
let categoryBtn = document.getElementById("categoryBtn");
let megaMenu = document.getElementById("megaMenu");
categoryBtn.onclick = function(e){
    e.stopPropagation();
    megaMenu.classList.toggle("show");
}
document.addEventListener("click",function(){
    megaMenu.classList.remove("show");
}); 



const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", function () {
    window.location.href = "https://www.google.com";
});

// Run the code after the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // Tax rate and fixed discount
    const TAX_RATE = 0.08
    const DISCOUNT = 24

    // Get page elements
    const table = document.getElementById("cart-table")
    const subTotalEl = document.getElementById("sub-total")
    const discountEl = document.getElementById("discount")
    const taxEl = document.getElementById("tax")
    const grandTotalEl = document.getElementById("grand-total")
    const checkoutBtn = document.getElementById("checkoutBtn")

    let savedCart = JSON.parse(localStorage.getItem("cart"))

    if (savedCart) {
        document.querySelectorAll("#cart-table tbody tr").forEach(function (row, index) {
            if (savedCart[index]) {
                row.querySelector(".qty-input").value = padQty(savedCart[index].qty)
            }
        })
    }

    // Format number as money
    function formatMoney(num) {
        return "$" + num.toFixed(2).replace(/\.00$/, "")
    }

    // Add a leading zero to the quantity if needed
    function padQty(num) {
        return num < 10 ? "0" + num : String(num)
    }

    // Get product quantity
    function getQty(row) {
        const qtyInput = row.querySelector(".qty-input")
        let qty = parseInt(qtyInput.value, 10)

        if (isNaN(qty) || qty < 1) qty = 1

        return qty
    }

    // Set product quantity
    function setQty(row, qty) {
        row.querySelector(".qty-input").value = padQty(qty)
    }

    // Save cart data in localStorage
    function saveCart() {
        let cart = []

        document.querySelectorAll("#cart-table tbody tr").forEach(function (row) {
            cart.push({
                name: row.querySelector("td span.small").innerText,
                image: row.querySelector("img").getAttribute("src"),
                price: parseFloat(row.dataset.price),
                qty: parseInt(row.querySelector(".qty-input").value)
            })
        })

        localStorage.setItem("cart", JSON.stringify(cart))
    }

    // Calculate all cart totals
    function calculateTotals() {
        let subTotal = 0

        // Calculate each product subtotal
        table.querySelectorAll("tbody tr").forEach(function (row) {
            const price = parseFloat(row.dataset.price)
            const qty = getQty(row)

            setQty(row, qty)

            const rowSubTotal = price * qty
            row.querySelector(".sub-total").textContent = formatMoney(rowSubTotal)

            subTotal += rowSubTotal
        })

        // Calculate final totals
        const rowCount = table.querySelectorAll("tbody tr").length
        const tax = subTotal * TAX_RATE
        const discount = rowCount > 0 ? DISCOUNT : 0
        const grandTotal = subTotal + tax - discount

        // Display totals
        subTotalEl.textContent = formatMoney(subTotal)
        discountEl.textContent = formatMoney(discount)
        taxEl.textContent = formatMoney(tax)
        grandTotalEl.textContent = formatMoney(grandTotal < 0 ? 0 : grandTotal) + " USD"

        saveCart()
    }

    // Handle quantity buttons
    table.addEventListener("click", function (e) {
        const row = e.target.closest("tr")
        if (!row) return

        // Increase quantity
        if (e.target.closest(".qty-plus")) {
            setQty(row, getQty(row) + 1)
            calculateTotals()
        }

        // Decrease quantity
        if (e.target.closest(".qty-minus")) {
            const current = getQty(row)

            if (current > 1) {
                setQty(row, current - 1)
                calculateTotals()
            }
        }
    })

    // Update totals after editing quantity
    table.addEventListener("blur", function (e) {
        if (e.target.classList.contains("qty-input")) {
            calculateTotals()
        }
    }, true)

    checkoutBtn.addEventListener("click", function (e) {
        e.preventDefault()

        saveCart()

        window.location.href = "checkout.html"
    })

    // Initial calculation
    calculateTotals()
})

function validateCoupon() {

    let coupon = document.getElementById("couponInput").value.trim()
    let error = document.getElementById("couponError")

    let lettersOnly = /^[A-Za-z]+$/

    error.innerHTML = ""

    if (coupon === "") {
        return
    }

    if (!lettersOnly.test(coupon)) {
        error.innerHTML = "Coupon code must contain letters only."
        return
    }
}
