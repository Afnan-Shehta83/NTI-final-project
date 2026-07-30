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