// 멤버십 모달 팝업
const membershipModal = document.querySelector("#membershipModal");
const couponModalOpen = document.querySelector(".membershipBox");
const membershipModalOpen = document.querySelector(".membershipInfoLevel");
const modalClose = document.querySelector(".close");

// 쿠폰 모달 팝업
const couponModal = document.querySelector("#couponModal");
const couponPopupOpen = document.querySelector(".couponBox");
const modalClose2 = document.querySelector(".close2");

// 배경클릭시 모달 제거
const closeModal = document.querySelector("#membershipModal");
const closeModal2 = document.querySelector("#couponModal");

// **--멤버십 모달--**
// 오픈
couponModalOpen.addEventListener("click", () => {
  membershipModal.classList.add("on");
});

membershipModalOpen.addEventListener("click", () => {
  membershipModal.classList.add("on");
});
// 닫기
modalClose.addEventListener("click", () => {
  membershipModal.classList.remove("on");
});
closeModal.addEventListener("click", () => {
  membershipModal.classList.remove("on");
});

// **--쿠폰 모달--**
// 오픈
couponPopupOpen.addEventListener("click", () => {
  couponModal.classList.add("on");
});
//닫기
modalClose2.addEventListener("click", () => {
  couponModal.classList.remove("on");
});
closeModal2.addEventListener("click", () => {
  couponModal.classList.remove("on");
});
