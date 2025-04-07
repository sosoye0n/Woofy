//
const couponModal = document.querySelector("#couponModal");
const couponOpen = document.querySelector(".couponOpen");

// console.log(couponModal, couponOpen);

// 쿠폰모달
couponOpen.addEventListener("click", () => {
  couponModal.classList.add("on");
});
