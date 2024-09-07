    function loadHeader() {

      fetch('Partials/header.html')
        .then(response => response.text())
        .then(data => {
          document.getElementById('header').innerHTML = data;
        });
    }
    document.addEventListener('DOMContentLoaded', loadHeader);



    function loadNavigation() {
      
      fetch('Partials/Navigationbar.html')
        .then(response => response.text())
        .then(data => {
          document.getElementById('NavigationBar').innerHTML = data;
        });
    }
    document.addEventListener('DOMContentLoaded', loadNavigation);


    function loadDashboard() {
      
      fetch('Partials/Dashboard.html')
        .then(response => response.text())
        .then(data => {
          document.getElementById('Dashboard').innerHTML = data;
        });
    }
    document.addEventListener('DOMContentLoaded', loadDashboard);


    //---------------- Image Load -------------------- //
    function previewImage(event) {
      var input = event.target;
      var reader = new FileReader();
      reader.onload = function() {
        var dataURL = reader.result;
        var output = document.getElementById('imagePreview');
        output.src = dataURL;
        output.style.display = 'block';
      };
      reader.readAsDataURL(input.files[0]);
    }