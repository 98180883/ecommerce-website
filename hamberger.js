/*menu mobile*/

const menuBtn = document.getElementById("menu-btn");
const nav = document.querySelector(".mob-nav");

menuBtn.addEventListener("click" , () => {
    nav.classList.toggle("open");
})