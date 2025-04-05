// // 모달 공통
// const modalContainer = document.querySelector(".modalContainer");
// const modal = document.querySelector(".modal");

// // 멤버십 모달
// const membershipModal = document.querySelector(".membership");
// const closeBtn = document.querySelector(".close");
// const openMembership = document.querySelector(".");
// const openMembershipLevel = document.querySelector(".membershipInfo");

// //오픈
// openMembership.addEventListener("click", () => {
//   modal.classList.add("on");
//   membershipModal.classList.add("on");

//   console.log(openMembership);
// });

// // **--멤버십 모달--**
// // 오픈 - 이전ver
// // couponModalOpen.addEventListener("click", () => {
// //   membershipModal.classList.add("on");
// // });

// // membershipModalOpen.addEventListener("click", () => {
// //   membershipModal.classList.add("on");
// // });
// // // 닫기
// // modalClose.addEventListener("click", () => {
// //   membershipModal.classList.remove("on");
// // });
// // closeModal.addEventListener("click", () => {
// //   membershipModal.classList.remove("on");
// // });

////
// // 멤버십 모달 팝업 -이전ver
// // const membershipModal = document.querySelector("#membershipModal");
// // const couponModalOpen = document.querySelector(".membershipBox");
// // const membershipModalOpen = document.querySelector(".membershipLevel");
// // const modalClose = document.querySelector(".close");

// document.addEventListener("DOMContentLoaded", () => {
//   const modals = document.querySelectorAll(".modal");
//   const modalContainer = document.getElementById("modalContainer");
//   const closeButtons = document.querySelectorAll(".modal .close");

//   // 모달 닫기 함수
//   function closeModals() {
//     modals.forEach((modal) => modal.classList.remove("active"));
//     modalContainer.classList.remove("show");
//   }

//   // 모달 열기 함수
//   function openModal(modalClass) {
//     closeModals(); // 다른 모달 열리지 않도록
//     const modal = document.querySelector(`.modal.${modalClass}`);
//     if (modal) {
//       modal.classList.add("active");
//       modalContainer.classList.add("show");
//     }
//   }

//   // 닫기 버튼 클릭 시
//   closeButtons.forEach((button) => {
//     button.addEventListener("click", closeModals);
//   });

//   // 배경 클릭 시 모달 닫기
//   modalContainer.addEventListener("click", (e) => {
//     if (e.target === modalContainer) {
//       closeModals();
//     }
//   });

//   // 쿠폰 영역 클릭 시
//   document.querySelector(".detailInfo:nth-child(1)").addEventListener("click", () => {
//     openModal("coupon");
//   });

//   // 포인트 영역 클릭 시
//   document.querySelector(".detailInfo:nth-child(2)").addEventListener("click", () => {
//     openModal("point");
//   });

//   // 멤버십 영역 클릭 시
//   document.querySelector(".membershipLevel").addEventListener("click", () => {
//     openModal("membership");
//   });
// });
