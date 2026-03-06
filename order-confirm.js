 
 let customerInfo = JSON.parse(localStorage.getItem("customerInfo"));
 let name = customerInfo.name;
    let email = customerInfo.email;
    let phone = customerInfo.phone;
    let adress = customerInfo.adress;
/*invoice info*/
let productQty = Number(localStorage.getItem("productQty"));
let orderAmount = Number (localStorage.getItem("orderAmount"));
let customerPh=Number(phone);

let orderId = document.getElementById("order-id");
orderId.innerText= "Order ID:   ENGG-pdf-" + new Date().getTime();
orderId.style.fontWeight='bold';
document.getElementById("order-qty").innerText=  "No of Items Ordered :    " + productQty;
document.getElementById("sub-total").innerText=  "Sub Total :    ₹" + orderAmount ; 
document.getElementById("total").innerText=  "Order Amount :    ₹" + orderAmount ; 

/*customer info*/
document.getElementById("name").innerText=  "Name: " + name;
document.getElementById("email").innerText=  "Email: " + email ; 
document.getElementById("ph").innerText=  "Contact No: +91-" + customerPh; 
document.getElementById("adress").innerText=  "Delivery Adress : " + adress ; 


let feedbackBtn = document.getElementById("feedBtn");
feedbackBtn.addEventListener("click", function(event){
let feedback = document.getElementById("feed").value.trim();
if(!feedback){
    alert("Please provide your feedback before submitting.");
    }
    else{ 
        alert("Thank you for your feedback! Continue Shopping.");
    };
 
});