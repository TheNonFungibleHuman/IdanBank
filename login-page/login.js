// function validateForm() {
//   var nameInput = document.getElementById("name");
//   var emailInput = document.getElementById("email");
//   var passwordInput = document.getElementById("password");
//   // Check if all required inputs are filled
//   if (
//     nameInput.value == "" ||
//     emailInput.value == "" ||
//     passwordInput.value == ""
//   ) {
//     alert("Please fill in all required fields.");
//     return false;
//   }

//   // Check if name input only contains letters and is at least 3 characters long
//   var nameRegex = /^[A-Za-z]{3,}$/;
//   if (!nameRegex.test(nameInput.value)) {
//     alert("Name must contain only letters and be at least 3 characters long.");
//     return false;
//   }

//   // Check if email input is in correct format
//   var emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
//   if (!emailRegex.test(emailInput.value)) {
//     alert("Please enter a valid email address.");
//     return false;
//   }

//   // Check if password input is at least 8 characters long
//   if (passwordInput.value.length < 8) {
//     alert("Password must be at least 8 characters long.");
//     return false;
//   }

//   // Clear form on successful submission
//   document.getElementById("name").value = "";
//   document.getElementById("email").value = "";
//   document.getElementById("password").value = "";

//   return true;
// }
