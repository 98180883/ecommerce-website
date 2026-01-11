let loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click" , function() {
  // 1. Read values from input
  let loginUser = document.getElementById("username").value;
  let loginpass = document.getElementById("password").value;

  let msg = document.getElementById("msg");

// Read saved data
  let savedUser = localStorage.getItem("username");
  let savedPass = localStorage.getItem("password");

  
  // 2. Check empty fields
  if (loginUser === "" || loginpass === "") {
    msg.innerText = "Fill all fields";
    return;
  }


  // 4. Compare
  if (loginUser === savedUser && loginpass === savedPass) {

    // 5. Save login info
    localStorage.setItem("login", "true");

    msg.innerText = "Login successful";

  } 
  
  else {
    msg.innerText = "Wrong username or password";
  }
});
