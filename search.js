let searchbox = document.getElementById("searchbox");
let search_btn = document.getElementById("searchbtn");
let result = document.getElementById("result");

let hideTimeout; // store timeout id
 function search() {

  clearTimeout(hideTimeout); // clear previous timeout
  result.style.display = "block"; // ensure visible
  result.innerHTML = "";

  let searchvalue = searchbox.value.trim().toLowerCase();

  if (searchvalue === "") {
    result.innerText = "Please enter a product name";
    autoHide();
    return;
  }

  let found = false;

  products.forEach(function(product, index) {
    if (product.name.toLowerCase().includes(searchvalue)) {

      let item = document.createElement("div");
      item.className = "search-item";
      item.innerText = "🎉 Product found: " + product.name + " ₹" + product.price;

      item.addEventListener("click", function () {
        let productDiv = document.querySelector(
          `.btn[data-index="${index}"]`
        );

        if (productDiv) {
          productDiv.scrollIntoView({ behavior: "smooth", block: "center" });
          productDiv.style.border = "4px solid green";

          setTimeout(() => {
            productDiv.style.border = "";
          }, 5000);
        }
      });

      result.appendChild(item);
      found = true;
    }
  });

  if (!found) {
    result.innerText = "Product not found, please try again";
  }

  autoHide();
}



search_btn.addEventListener("click", function (e) {
  search();
  // call hide function once
});

function autoHide() {
  hideTimeout = setTimeout(() => {
    result.innerHTML = "";
    result.style.display = "none";
  }, 5000);
}

searchbox.addEventListener("keydown", function(e) {
  e.preventDefault();
  if(e.key==="Enter"){
  search();
  }
})