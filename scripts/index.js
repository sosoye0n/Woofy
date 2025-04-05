const mySwiper = new Swiper(".swiper", {
  // slidesPerView: 1,
  // loop: true,
  effect: "fade",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".pagination-progressbar",
    type: "progressbar",
  },
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },
});
const pagingSwiper = new Swiper(".swiper", {
  // loop: true,
  effect: "fade",
  pagination: {
    el: ".pagination-fraction",
    type: "fraction",
  },
});
mySwiper.controller.control = pagingSwiper;

const mySwiper02 = new Swiper(".swiper02", {
  slidesPerView: 4,
  spaceBetween: 20,
  // loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".pagination-progressbar",
    type: "progressbar",
  },
  breakpoints: {
    340: {
      slidesPerView: 2, //브라우저가 768보다 클 때
      spaceBetween: 20,
    },
    500: {
      slidesPerView: 2, //브라우저가 768보다 클 때
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4, //브라우저가 1024보다 클 때
      spaceBetween: 20,
    },
  },
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },
});

const itemLike = document.querySelectorAll(".itemLike i");

itemLike.forEach((item) => {
  item.addEventListener("click", function () {
    const likeVal = this.parentElement.querySelector(".itemLike span");
    this.classList.toggle("fa-regular");
    this.classList.toggle("fa-solid");
    let likeNum = Number(likeVal.innerText);
    if (this.classList.contains("fa-solid")) {
      likeNum += 1;
      likeVal.innerText = likeNum;
      likeVal.style.color = "#99bdff";
    } else {
      likeNum -= 1;
      likeVal.innerText = likeNum;
      likeVal.style.color = "#a9a9a9";
    }
  });
});

var image = document.getElementsByClassName("thumbnail");
new simpleParallax(image, {
  scale: 1.2,
  orientation: "up",
  delay: 1,
});
var image = document.getElementsByClassName("thumbnail2");
new simpleParallax(image, {
  scale: 1.2,
  orientation: "down",
  delay: 1,
});
