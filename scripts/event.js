const uploadEvent = document.querySelector(".e01");
const drawEvent = document.querySelector(".e02");

const mySwiper = new Swiper(".swiper", {
  // slidesPerView: 1,
  // loop: true,
  effect: "fade",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },
});

const modal = document.querySelector("#eventModal");
const openModal = document.querySelector(".coupon");
const modalBtn = document.querySelector(".modalBtn");
const closeModal = document.querySelector(".closeModal");

openModal.addEventListener("click", function () {
  modal.classList.add("on");
});
closeModal.addEventListener("click", () => {
  modal.classList.remove("on");
});
modalBtn.addEventListener("click", () => {
  modal.classList.remove("on");
});
