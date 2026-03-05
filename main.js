


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
name : "HTMl & CSS",
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
name : "C++ Project part-I",
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
let cart_count = document.getElementById("cart-count");
let count=0;

let cart_feedback = document.getElementById("cart_message");

let cart_pricebox = document.getElementById("cart_total");
let cart_price =0;



/*UI defensive update*/ 
function updateCartSummaryUI() {
  if (cart_count) {
    cart_count.innerText = "Items: "+count;
  }

  if (cart_pricebox) {
    cart_pricebox.innerText = "Cart Total: ₹ " + cart_price;
  }
}

function updateFeedback(message, color) {
  if (cart_feedback) {
    cart_feedback.innerText = message;
    cart_feedback.style.color = color;
  }
}


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
if (cart_feedback) {
  cart_feedback.innerText = "";
}
}, 5000);
}



//All in one UI

function updateUIAdd(parent,index){
let addBtn = parent.querySelector(".p_button");

updateCartSummaryUI();
updateFeedback(products[index].name + " added " + products[index].cartQTY, "green");
}

function updateUIDel(parent , index){
let delBtn = parent.querySelector(".d_button");
let addBtn = parent.querySelector(".p_button");

delBtn.innerText = "-";
addBtn.innerText = "+" + products[index].cartQTY;

 updateCartSummaryUI();

updateFeedback(
  products[index].name + " removed. No of " +
  products[index].name + " in cart: " +
  products[index].cartQTY,
  "red"
);
}
/*=============button sync=================*/
function syncButtons(parent , index ){
let addBtn = parent.querySelector(".p_button");
let delBtn = parent.querySelector(".d_button");

if (products[index].cartQTY === 0){
addBtn.style.display= "inline-block";
addBtn.innerText = "+" ;
delBtn.style.display= "none";

} 
else if(products[index].cartQTY < products[index].stock) {
addBtn.style.display= "inline-block";
addBtn.innerText = "+" + products[index].cartQTY;
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
updateCartSummaryUI();

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

/*==============add functions================*/
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

/*================delete functions================*/
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