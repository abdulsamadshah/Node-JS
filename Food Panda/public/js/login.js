// function Registration(event) {
//    event.preventDefault(); // Prevent default form submission

//    let Pan_Photo = document.getElementById("Pan_Photo").value; // Access the file input value
//    let Gst_Photo = document.getElementById('Gst_Photo').value;
//    let MobileNo=document.getElementById('MobileNo').value;
//    console.log("MobileNo:", MobileNo);
//    let mobileNumberPattern = /^[0-9]{10}$/;

//     if (Pan_Photo == "") {
//       alert("Upload Pan Card");
//       return false;
//    } else if (Gst_Photo == "") {
//       alert("Upload Gst Image");
//       return false;
//    } else {
//       console.log("Validation Success");
//       window.location.href = "http://localhost:3000/Registeration";
//       return true;
//    }
// }

// // Attach the validation function to the form submit event
// document.getElementById('signupForm').addEventListener('submit', Registration);
