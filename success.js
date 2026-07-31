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