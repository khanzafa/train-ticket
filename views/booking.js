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



