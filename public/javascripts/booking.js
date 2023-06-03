const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".video-promo");
const contents = document.querySelectorAll(".content");

var sliderPromo= function(manual){
    btns.forEach((btn) => {
        btn.classList.remove("active");
    })

    slides.forEach((slide) => {
        slide.classList.remove("active");
    })

    contents.forEach((content) => {
        content.classList.remove("active");
    })

    btns[manual].classList.add("active");
    slides[manual].classList.add("active");
    contents[manual].classList.add("active");
}

btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        sliderPromo(i)
    })
})

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


//highlight search page
var SearchMainPage = document.querySelector('.search-container');
var SearchPage = document.querySelector('.train-form');
var divBaruDibuat = false;

SearchPage.addEventListener('click', function(event) {
  SearchPage.classList.add('z-index-999');

  if(!divBaruDibuat){
    var divBaru = document.createElement('div');
    divBaru.classList.add('overlay-searchpage');
    divBaru.textContent = '';
  
    SearchMainPage.appendChild(divBaru);
  
    divBaruDibuat = true;
  }

  event.stopPropagation();
});

document.addEventListener('click', function(event) {
  if (!SearchPage.contains(event.target)) {
    SearchPage.classList.remove('z-index-999');

    var divBaru = document.querySelector('.overlay-searchpage');
    if (divBaru) {
      divBaru.remove();
      divBaruDibuat = false;
    }
  }
});