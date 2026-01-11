
/*=====================================
====================================contact-form valididation*/
const contact_form = document.getElementById("contact-form");
const contact_response = document.getElementById("contact-message");

contact_form.addEventListener("submit", function(event){
event.preventDefault();// stop reload 
const name= document.getElementById("user-name").value.trim();
const phone=document.getElementById("user-phone").value.trim();
const email = document.getElementById("user-email").value.trim();
const adress =document.getElementById("user-adress").value.trim();

//stop invalid form
if(!name || !phone || !email || !adress ){
    contact_response.innerText= "Invalid Input";
     contact_response.style.color = "red";
    return ;
}
//check phone 
if(phone.length !== 10 || isNaN(phone)){
     contact_response.innerText= "Invalid phone number";
      contact_response.style.color = "red";
     return;
}
 //if everything valid
  contact_response.innerText= "Message Sent Successfully";
  contact_response.style.color = "black";
 contact_form.reset();
 window.location.href = "index.html";

;})