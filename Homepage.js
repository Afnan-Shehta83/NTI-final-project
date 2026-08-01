//زرار القفل
const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", function ()
 {
    window.location.href = "https://www.google.com";
});

//عشان الدروب داون بتاعة اللغة و العملة نضغط عليها و تبين القايمة
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
};

//قايمة تغيير الغة
function changeLang(name,element){
    document.querySelector("#langBtn span").innerText=name;
    document
            .querySelectorAll(".dropdown")[0]
            .querySelectorAll(".drop-item")
            .forEach(item=>item.classList.remove("active"));

    element.classList.add("active");
    element.parentElement.classList.remove("show");
}

//قايمة تغيير العملة 
function changeCurrency(name,element){
    document.querySelector("#currencyBtn span").innerText=name;
    document.querySelectorAll(".dropdown")[1]
    .querySelectorAll(".drop-item")
    .forEach(item=>item.classList.remove("active"));
    element.classList.add("active");
    element.parentElement.classList.remove("show");
}

//عشان لما نضغط على زرار all category يستجيب
let categoryBtn = document.getElementById("categoryBtn");
let megaMenu = document.getElementById("megaMenu");

categoryBtn.onclick = function(e){
    e.stopPropagation();
    megaMenu.classList.toggle("show");
}
document.addEventListener("click",function(){
    megaMenu.classList.remove("show");
}); 
 

//التايمر
const endDate = new Date("August 15, 2026 23:59:59").getTime();
const timer = document.querySelector(".timer");

function updateTimer() 
{
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance <= 0) 
        {
        timer.innerHTML = "Expired";
        clearInterval(countdown);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timer.innerHTML = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
}
updateTimer();
const countdown = setInterval(updateTimer, 1000);