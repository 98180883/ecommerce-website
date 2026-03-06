const menuBtn = document.getElementById("menu-btn");
const nav = document.querySelector(".mob-nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");

    if (nav.classList.contains("open")) {
        document.body.style.overflow = "hidden"; // body won't scroll
        menuBtn.innerHTML="✕";
    } else {
         menuBtn.innerHTML="☰";
        document.body.style.overflow = ""; // restore default
    }
});