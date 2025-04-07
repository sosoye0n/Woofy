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

// event1 modal
const modal = document.querySelector("#modalBg");
const openModal = document.querySelector(".coupon");
const closeModal = document.querySelector(".closeModal");
const modalBtn = document.querySelector(".modalBtn");

// open
openModal.addEventListener("click", () => {
  modal.classList.add("on");
});

// close
closeModal.addEventListener("click", closeModalHandler);
modalBtn.addEventListener("click", closeModalHandler);

// bg click close
modal.addEventListener("click", closeModalHandler);

// class remove
function closeModalHandler() {
  modal.classList.remove("on");
}

// event2 modal
const drawModal = document.querySelector("#modalDrawBg");
const openDrawModal = document.querySelector(".drawBtn");
const closeDrawModal = document.querySelector(".closeDrawModal");
const confirmBtn = document.querySelector(".modalDrawBtn");

// open
openDrawModal.addEventListener("click", () => {
  drawModal.classList.add("open");
});

[closeDrawModal, confirmBtn, drawModal].forEach((e) => {
  e.addEventListener("click", closeDrawModalHandler);
});

function closeDrawModalHandler() {
  drawModal.classList.remove("open");
}

// eventBtn scroll
const event1Btn = document.querySelectorAll(".btn");
event1Btn.forEach((item) => {
  item.addEventListener("click", () => {
    // console.log(this);
    // e.preventDefault();
    const targetId = item.getAttribute("data-target"); // 이동할 대상 ID 가져오기
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start", // 화면의 맨 위로 이동
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  function startCountdown(targetDate) {
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        document.getElementById("countdown").innerHTML = "이벤트 종료 ☻";
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hrs = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const sec = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("countdown").innerHTML =
        `${days}<span>days</span> ` +
        `${String(hrs).padStart(2, "0")} : ` +
        `${String(min).padStart(2, "0")} : ` +
        `${String(sec).padStart(2, "0")}`;
    }

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
  }

  const targetDate = new Date("2025-04-11T14:30:00").getTime();
  startCountdown(targetDate);
});
