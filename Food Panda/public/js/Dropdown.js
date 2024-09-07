document.addEventListener("DOMContentLoaded", function () {
  const dropdownItemsContainer = document.getElementById("dropdownItemsContainer");
  const dropdownSearch = document.getElementById("dropdownSearch");
  const dropdownButton = document.getElementById("dropdownMenuButton");
  let Category_Name=document.getElementById("Category_Name");

  // Function to fetch categories from server
  function fetchCategories() {
      fetch("/getCategoryName")
          .then(response => {
              if (!response.ok) {
                  throw new Error("Network response not ok");
              }
              return response.json();
          })
          .then(data => {
              populateDropdown(data.categories);
          })
          .catch(error => {
              console.error("Error fetching categories:", error);
          });
  }

  // Function to populate dropdown items
  function populateDropdown(categories) {
      dropdownItemsContainer.innerHTML = ""; // Clear existing items

      categories.forEach(category => {
          const dropdownItem = document.createElement("a");
          dropdownItem.classList.add("dropdown-item");
          dropdownItem.textContent = category;
          dropdownItem.href = "#"; // Adjust href as needed

          dropdownItem.addEventListener("click", function () {
              // Handle item selection if needed
              dropdownButton.textContent = category;
            Category_Name.value=category;
    
          });

          dropdownItemsContainer.appendChild(dropdownItem);
      });
  }

  // Event listener for dropdown button click to fetch categories
  dropdownButton.addEventListener("click", function () {
      fetchCategories();
  });

  // Event listener for dropdown search input
  dropdownSearch.addEventListener("input", function () {
      const searchValue = dropdownSearch.value.toLowerCase();
      const dropdownItems = dropdownItemsContainer.querySelectorAll(".dropdown-item");

      dropdownItems.forEach(item => {
          const textContent = item.textContent.toLowerCase();
          if (textContent.includes(searchValue)) {
              item.style.display = "block"; // Show matching items
          } else {
              item.style.display = "none"; // Hide non-matching items
          }
      });
  });

  // Fetch categories and populate dropdown on page load
  fetchCategories();
});
