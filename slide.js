

const slider = document.querySelector(".products");

const leftBtn = document.getElementById("L-slideBtn");
const rightBtn = document.getElementById("R-slideBtn");


 //slide
rightBtn.onclick = () =>
 slider.scrollBy({ left:200, behavior: "smooth" });

  leftBtn.onclick = () =>
   slider.scrollBy({ left:-200, behavior: "smooth" });
