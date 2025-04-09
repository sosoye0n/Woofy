// const couponModalContainer = document.querySelector("#couponModal");

// const couponModal = document.createElement("div");
// couponModal.id = "couponModal";
// couponModal.innerHTML = `
//         <div class="coupon">
//           <div class="modalHeader">
//             <i class="fas fa-xmark close"></i>
//             <div class="modalTitle">
//               <p>보유쿠폰</p>
//               <span>coupon</span>
//             </div>
//           </div>
//           <ul class="couponContents">
//             <li class="modalCouponInfoCon">
//               <div class="modalCoupon">
//                 <div class="couponBox1">
//                   <div class="modalInfo">
//                     <div class="membershipInfo">
//                       <p>12<b>%</b></p>
//                       <span>[프로모션] 스프링시즌세일</span>
//                     </div>
//                     <p class="subInfo">신규멤버, 첫구매 쿠폰 제공</p>
//                   </div>
//                 </div>
//                 <div class="couponBox2">
//                   <i class="fas fa-circle-check"></i>
//                 </div>
//               </div>
//             </li>
//             <li class="modalCouponInfoCon">
//               <div class="modalCoupon">
//                 <div class="couponBox1">
//                   <div class="modalInfo">
//                     <div class="membershipInfo">
//                       <p>30<b>%</b></p>
//                       <span>[이미스] 브랜드 중복쿠폰</span>
//                     </div>
//                     <p class="subInfo">50,000원 이상 구매시 사용 가능</p>
//                   </div>
//                 </div>
//                 <div class="couponBox2">
//                   <i class="fas fa-circle-check"></i>
//                 </div>
//               </div>
//             </li>
//             <li class="modalCouponInfoCon">
//               <div class="modalCoupon">
//                 <div class="couponBox1">
//                   <div class="modalInfo">
//                     <div class="membershipInfo">
//                       <p><b>무료배송</b></p>
//                       <span>[멤버십] 가입감사쿠폰</span>
//                     </div>
//                     <p class="subInfo">신규멤버십 가입 회원 대상</p>
//                   </div>
//                 </div>
//                 <div class="couponBox2">
//                   <i class="fas fa-circle-check"></i>
//                 </div>
//               </div>
//             </li>
//           </ul>
//         </div>
// `;

// couponModalContainer.appendChild(couponModal);

// console.log(couponModal);

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
