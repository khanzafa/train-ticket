/*-----replace search preview----*/
var MainPage = document.querySelector('.search-result-page');
var changeBtn = document.getElementById("change-btn");
changeBtn.addEventListener("click", function() {
    var searchPreviewDiv = document.querySelector(".search-preview");
    var newDiv = document.createElement("div");
    newDiv.classList.add("search-change");
    newDiv.classList.add("z-index-999");
    newDiv.innerHTML = "<form class='train-form'><div class='form-group'><div class='form-component from'><div class='title'><label>From</label></div><div class='input-group'><div class='icon'><i class='fa-solid fa-train'></i></div><input placeholder='Kota atau Stasiun Asal' class='form-control' type='text'></div></div><div class='form-component to'><div class='title'><label>To</label></div><div class='input-group'><div class='icon'><i class='fa-solid fa-train'></i></div><input placeholder='Stasiun Tujuan' class='form-control' type='text'></div></div><div class='form-component depart'><div class='title'><label>Departure</label></div><div class='input-group'><div class='icon'><i class='fa-solid fa-calendar'></i></div><input class='form-control' type='date'></div></div><div class='form-component return'><div class='title'><div class='check'><input type='checkbox' id='check'><label>Return</label></div></div><div class='input-group'><div class='icon'><i class='fa-solid fa-calendar'></i></div><input class='form-control' type='date' id='input' disabled></div></div><div class='form-component passenger'><div class='title'><label>Passenger</label></div><div class='input-group'><div class='btn'><button id='minus' class='disabled'><i class='fa-solid fa-minus'></i></button></div><input type='text' id='counter' value='1' readonly><div class='btn'><button id='plus'><i class='fa-solid fa-plus'></i></button></div></div></div></div><div class='footer-form'><button id='search-ticket'>Cari Tiket</button></div></form>";
    searchPreviewDiv.parentNode.replaceChild(newDiv, searchPreviewDiv);

    var divBaru = document.createElement('div');
    divBaru.classList.add('overlay-searchpage');
    divBaru.textContent = '';

    MainPage.appendChild(divBaru);
});

/*-----replace kembali search preview----*/
var SearchPage = document.querySelector('.search-change');
var searchBtn = document.getElementById("search-ticket");

searchBtn.addEventListener("click", function() {
    document.addEventListener('click', function(event) {
        if (!SearchPage.contains(event.target)) {
            var divBaru = document.querySelector('.overlay-searchpage');
            divBaru.remove();
        }
      });

    var divBaru = document.querySelector('.overlay-searchpage');
    divBaru.remove();
});

/*-----check return----*/
var checkbox = document.getElementById('check');
var input = document.getElementById('input');

checkbox.addEventListener('change', function() {
if (checkbox.checked) {
    input.disabled = false;
} else {
    input.disabled = true;
    input.value = ''; // Mengosongkan nilai input saat checkbox tidak dicentang
}
});


/*-----plus minus----*/
const inputNumber = document.getElementById("counter");
const btnPlus = document.getElementById("plus");
const btnMinus = document.getElementById("minus");

btnPlus.addEventListener("click", function() {
    event.preventDefault();
    inputNumber.value = parseInt(inputNumber.value) + 1;
    btnMinus.classList.remove("disabled");
});

btnMinus.addEventListener("click", function() {
    event.preventDefault();
    const currentValue = parseInt(inputNumber.value);
    if (currentValue > 1) {
        inputNumber.value = currentValue - 1;
    }

    if (parseInt(inputNumber.value) === 1) {
        btnMinus.classList.add("disabled");
    }
});

