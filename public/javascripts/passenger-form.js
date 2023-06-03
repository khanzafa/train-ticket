document.addEventListener('DOMContentLoaded', function() {
    var dropdownInput = document.querySelector('.dropdown-input');
    var dropdownList = document.querySelector('.dropdown-list');
    var dropdownItems = document.querySelectorAll('.dropdown-item');
  
    dropdownInput.addEventListener('click', function() {
        dropdownList.style.display = 'block';
    });
  
    dropdownItems.forEach(function(item) {
        item.addEventListener('click', function() {
            var value = item.getAttribute('data-value');
            dropdownInput.value = item.textContent;
            dropdownList.style.display = 'none';
            // Do something with the selected value
        });
    });
  
    document.addEventListener('click', function(event) {
        if (!dropdownInput.contains(event.target)) {
            dropdownList.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var dropdownInput = document.querySelector('.input');
    var dropdownList = document.querySelector('.list');
    var dropdownItems = document.querySelectorAll('.item');
  
    dropdownInput.addEventListener('click', function() {
        dropdownList.style.display = 'block';
    });
  
    dropdownItems.forEach(function(item) {
        item.addEventListener('click', function() {
            var value = item.getAttribute('value');
            dropdownInput.value = item.textContent;
            dropdownList.style.display = 'none';
            // Do something with the selected value
        });
    });
  
    document.addEventListener('click', function(event) {
        if (!dropdownInput.contains(event.target)) {
            dropdownList.style.display = 'none';
        }
    });
});

var checkbox = document.getElementById("notice-check");
var submitButton = document.getElementById("submit");

checkbox.addEventListener("change", function() {
  if (checkbox.checked) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});