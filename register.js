
let RegisterBtn = document.getElementById("Register-btn");
RegisterBtn.addEventListener("click" , function() {
  // 1. Read input values
   let email = document.getElementById("email");
    let user = document.getElementById("newUser").value;
  let pass = document.getElementById("newPass").value;
  let confirmPass = document.getElementById("confirmPass").value;


  let msg = document.getElementById("msg");


// 2. Check empty fields
  if ( email === "" || pass === "" || confirmPass === "") {
    msg.innerText = "All fields required";
   
  }
  

  // 3. Save user info
  localStorage.setItem("username", user);
  localStorage.setItem("password", pass);

  msg.innerText = "Signup successful! Go to login page.";
});