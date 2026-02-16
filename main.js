


///*=======checking user login status========*/

let loggedin = localStorage.getItem("login");
if (loggedin !== "true") {
  console.log("You are not logged in! please login first for more details click ok");
}
/*===auto clear cached data============*/
const STORAGE_VERSION = "v3";
const Storage_key = "cart_version";
function checkStorage (){
const savedVer = localStorage.getItem(Storage_key);
if(savedVer !== STORAGE_VERSION){
console.log("Old storeage detected");
localStorage.removeItem("products");
localStorage.removeItem("count");
localStorage.removeItem("cart_price");
localStorage.setItem(Storage_key, STORAGE_VERSION);
}
}
checkStorage();

/*===============adding from preview page=================*/
let params = new URLSearchParams(window.location.search);
let previewIndex = params.get("id");




//connect to html

//product list

let products = [
{
name : "ocaml",
price :100,
stock :5,
cartQTY :0
},
{
name : "python",
price :100,
stock :5,
cartQTY :0
},
{
name : "css",
price :100,
stock :5,
cartQTY :0
}
,
{
name : "JavaScript part-I",
price :100,
stock :5,
cartQTY :0
}
,
{
name : "React part-I",
price :100,
stock :5,
cartQTY:0
}
,{
name : "Electronics-I",
price :100,
stock :5,
cartQTY:0
}
,{
name : "Electronics-II",
price :100,
stock :5,
cartQTY :0
}
];
let index=0;
let ship_icon = document.getElementById("ship-icon");
let cart_count = document.getElementById("ca_rt");
let count=0;

let cart_feedback = document.getElementById("cart_message");

let cart_pricebox = document.getElementById("cart_total");
let cart_price =0;


//Local Storage setting
function localCart(){
localStorage.setItem("products" , JSON.stringify(products));
localStorage.setItem("count", count);
localStorage.setItem("cart_price", cart_price);

}
//local load
function loadlocal(){
let saved_products = localStorage.getItem("products");
let saved_count = localStorage.getItem("count");
let saved_price =localStorage.getItem("cart_price");
if(saved_products) {
products = JSON.parse(saved_products);
}
if(saved_count) {
count = Number(saved_count);
}
if(saved_price) {
cart_price= Number(saved_price);
}

} 

//timeout
function timeout() {setTimeout(function(){
cart_feedback.innerText = ""
}, 5000);
}

//cart summary 
let cart_summary = document.getElementById("cartbox");
function summary(){
cart_summary.innerText=" ";
let is_empty= true;

for (let i=0 ; i < products.length ; i++) {
if (products[i].cartQTY > 0){
is_empty = false;

cart_summary.innerText += "📗"+products[i].name + " :" + products[i].cartQTY + "\n" ;
}
}
if(is_empty){
cart_summary.style.color = "red";
cart_summary.innerText="Empty  cart ";
}
}

//delivery free or not

const Free_Ship_limit =500;
let ship_free=document.getElementById("delivery_fee");
function ship (){
if(cart_price >= Free_Ship_limit) {
ship_free.lastChild.nodeValue = "Enjoy Free Shipping";
}
else {
ship_free.innerText = "Add books worth ₹" + (Free_Ship_limit - cart_price ) + " for free ship";

}
}



//All in one UI

function updateUIAdd(parent,index){
let addBtn = parent.querySelector(".p_button");

 cart_count.innerText="Total no of items: " +count;
cart_pricebox.innerText =  "Cart Total: ₹ " + cart_price;
addBtn.innerText = "Add To Cart \n" + products[index].cartQTY ;

 cart_feedback.innerText = products[index].name+ " added " +  products[index].cartQTY;
 cart_feedback.style.color= "green" ;
ship();
 summary();
}

function updateUIDel(parent , index){
let delBtn = parent.querySelector(".d_button");
let addBtn = parent.querySelector(".p_button");

delBtn.innerText = "Remove \n-";
addBtn.innerText = "Added " + products[index].cartQTY +"\n+" ;

 cart_count.innerText="Total no of items: "+count;
cart_pricebox.innerText ="Cart Total: ₹ " + cart_price;
 cart_feedback.innerText = products[index].name+ " removed \n No of : " + products[index].name + " in your cart " + products[index].cartQTY;
cart_feedback.style.color= "red" ;

ship();
summary();
}
/*=============button sync=================*/
function syncButtons(parent , index ){
let addBtn = parent.querySelector(".p_button");
let delBtn = parent.querySelector(".d_button");

if (products[index].cartQTY === 0){
addBtn.style.display= "inline-block";
addBtn.innerText = "Add To Cart" ;
delBtn.style.display= "none";

} 
else if(products[index].cartQTY < products[index].stock) {
addBtn.style.display= "inline-block";
addBtn.innerText = "Added" + products[index].cartQTY +"\n+";
delBtn.style.display= "inline-block";
}
else {
addBtn.style.display= "none";
delBtn.style.display= "Inline-block";
}
}
/*==============================reload if user refresh page=============*/
function reload(){
 loadlocal();
cart_count.innerText ="Total no of items: " + count;
 cart_pricebox.innerText ="Cart Total: ₹ " + cart_price;
 summary();
 ship();
let productsDivs = document.querySelectorAll(".btn"); // parent div
productsDivs.forEach(div => {
  let index = Number(div.getAttribute("data-index"));
  syncButtons(div, index);
});
}
 reload();

 /*===============clear-cart post succesfull order=============*/
function clearCart(){
products.forEach(p=> p.cartQTY = 0);
count=0;
cart_price=0;

localStorage.removeItem("products");
localStorage.removeItem("count");
localStorage.removeItem("cart_price");

reload();
}

/*add functions*/
function addToCartByIndex(index) {
  if (products[index].cartQTY < products[index].stock) {
    products[index].cartQTY++;
    count++;
    cart_price += products[index].price;
    localCart();
  }
}


function addToCart(parent , index){
addToCartByIndex(index);
updateUIAdd(parent, index);
}

/*delete functions*/
function deleteCartByIndex(index){
if(products[index].cartQTY > 0 && count>0 && cart_price >= products[index].price){
products[index].cartQTY-=1;
count--;
cart_price -= products[index].price;
localCart();
}}

function delete_FromCart(parent ,index){
deleteCartByIndex(index);
updateUIDel(parent, index);
}


/*===preview addToCart handling===*/
if(previewIndex !== null){
  loadlocal();
  addToCartByIndex(Number(previewIndex));
  reload();
  // remove ?id= from URL
  window.history.replaceState({}, document.title, window.location.pathname);
}




/*=================main page addtocart handling=================*/
let add_buttons = document.querySelectorAll(".p_button");
add_buttons.forEach(function(ad_button) {
ad_button.addEventListener("click" , function ()
{
let proNear = ad_button.parentElement;
let index = Number(proNear.getAttribute("data-index"));

if (products[index].cartQTY < products[index].stock){
addToCart(proNear , index);
syncButtons(proNear, index )
timeout();
}

else{
syncButtons(proNear , index );
ad_button.innerText ="Added: " + products[index].cartQTY + "\n Max Quantity Reached"; 
cart_feedback.innerText =products[index].name+ " Not available more"; 
timeout();
}

});

});
 

let del_buttons = document.querySelectorAll(".d_button");
del_buttons.forEach(function(del_button) {
del_button.addEventListener("click" , function ()
{
let proNear =del_button.parentElement;
let index = Number(proNear.getAttribute("data-index"));

if (products[index].cartQTY>0){
 delete_FromCart(proNear ,index);
syncButtons(proNear, index )


timeout();
}

else{
syncButtons(proNear , index );
del_button.innerText ="Product not added in cart";
cart_feedback.innerText ="No Product in cart to remove "; 
timeout();

}

});

});
let searchbox = document.getElementById("searchbox");
let search_btn = document.getElementById("searchbtn");
let result = document.getElementById("result");

search_btn.addEventListener("click", function () {
  let searchvalue = searchbox.value.trim().toLowerCase();
  result.innerHTML = "";

  if (searchvalue === "") {
    result.innerText = "Please enter a product name";
    return;
  }

  let found = false;

  products.forEach(function(product, index) {
    if (product.name.toLowerCase().includes(searchvalue)) {

      let item = document.createElement("div");
      item.className = "search-item";
      item.innerText = "🎉 Product found: " + product.name + " @ ₹" + product.price;

      /*===scroll to product on click====*/
      item.addEventListener("click", function () {
        let productDiv = document.querySelector(
          `.btn[data-index="${index}"]`
        );

        if (productDiv) {
          productDiv.scrollIntoView({ behavior: "smooth", block: "center" });
          productDiv.style.border = "4px solid green";

          setTimeout(() => {
            productDiv.style.border = "";
          }, 3000);
        }
      });
/*================================*/

      result.appendChild(item);
      found = true;
    }
  });

  if (!found) {
    result.innerText = "Product not found, please try again";
  }
});

/*==clear cart button handling==*/
let clearcartbtn = document.getElementById("clearcart");

clearcartbtn.addEventListener("click", function(){
if(confirm("Are you sure you want to reset the cart?")){
  clearCart();
}
});