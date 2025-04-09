// 헤더 요소
const loginSuccesChange = document.querySelector(".loginSucces");

console.log(loginSuccesChange);

// 모달 요소
const couponModal = document.querySelector("#couponModal");
const pointModal = document.querySelector("#pointModal");
const membershipModal = document.querySelector("#membershipModal");

// 오픈 트리거
const coupon = document.querySelector(".couponOpen");
const point = document.querySelector(".pointOpen");
const membership = document.querySelector(".memberhshipOpen");
const membershipLevel = document.querySelector(".membershipLevel");

// 닫기 버튼
const closeBtns = document.querySelectorAll(".close");
const bg = document.querySelector(".bg");

// 모달 오픈
coupon.addEventListener("click", () => {
  couponModal.classList.add("on");
  // bg.classList.add("on");
});
point.addEventListener("click", () => {
  pointModal.classList.add("on");
});
membership.addEventListener("click", () => {
  membershipModal.classList.add("on");
});
membershipLevel.addEventListener("click", () => {
  membershipModal.classList.add("on");
});

// 모달 닫기
closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest("#couponModal, #pointModal, #membershipModal");
    if (modal) {
      modal.classList.remove("on");
      bg.classList.remove("on");
    }
  });
});

// 로그인 성공사 헤더 변경
loginSuccesChange.innerHTML = `<span>logout</span><i class="fa-solid fa-right-from-bracket"></i>`;

// function updateHeaderLoginState() {
//   loginSuccesChange.innerHTML = "logout";
//   loginSuccesChange.setAttribute("href", "/mypage.html");
//   updateHeaderLoginState();
// }
