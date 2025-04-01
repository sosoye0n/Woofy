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
