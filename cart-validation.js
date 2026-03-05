
const checkout_form = document.getElementById("checkout-form");
const checkout_response = document.getElementById("checkout-message");
let proceed_go = document.getElementById("proceed"); 
 let cart = document.querySelector(".cart");
/*===============delivery free or not function===========*/

const Free_Ship_limit =500;
const ship_free=document.getElementById("delivery_fee");
function ship (){
if(cart_price >= Free_Ship_limit) {
ship_free.lastChild.nodeValue = "Enjoy Free Shipping";
}
else {
ship_free.lastChild.nodeValue = "Add books worth ₹" + (Free_Ship_limit - cart_price ) + " for free ship";

}
}
ship();
/*================cart summary function=============*/ 
let cart_summary = document.getElementById("cartbox");
function summary(){
cart_summary.innerText=" ";
let is_empty= true;

for (let i=0 ; i < products.length ; i++) {
if (products[i].cartQTY > 0){
is_empty = false;

cart_summary.innerText += "📗"+products[i].name + ": " + products[i].cartQTY + "\n" ;
}
}
if(is_empty){
cart_summary.style.color = "red";
cart_summary.innerText="Empty  cart ";
}
}

summary();
if(cart_price!==0){
   proceed_go.style.display = "Inline-block";
proceed_go.addEventListener("click" , function(){
document.querySelector(".checkout").classList.toggle("open");
cart.style.display="none";
} )
checkout_form.addEventListener("submit", function(event){
const name = document.getElementById("name").value.trim();
const phone=document.getElementById("phone").value.trim();
const email = document.getElementById("email").value.trim();
const adress = document.getElementById("adress").value.trim();

event.preventDefault();// stop reload 

//stop invalid form
if(!name || !phone || !email || !adress ){
    checkout_response.innerText= "All fiels required";
    checkout_response.style.color= "red";
    return ;
}
//check phone 
if(phone.length !== 10 || isNaN(phone)){
     checkout_response.innerText= "Invalid phone number";
      checkout_response.style.color = "red";
     return;
}
 //if everything valid
  checkout_response.innerText= "Order Placed Successfully";
 checkout_response.style.color = "green";

 localStorage.setItem("productQty",count);
localStorage.setItem("orderAmount",cart_price);

 /*========setting cust info in local storage for order confirm page =======*/
let customerInfo =
{
   name,
    phone,
     email,
     adress
};
localStorage.setItem("customerInfo" , JSON.stringify(customerInfo));



/*==go to order confirm page==*/
 window.location.href = "order-confirm.html";

 checkout_form.reset();
clearCart(); //defined in main.js
});
}
else {
    proceed_go.style.display = "none";
    checkout_response.innerText= "Cart is empty , add products to place order";
    checkout_response.style.color = "red";
}



