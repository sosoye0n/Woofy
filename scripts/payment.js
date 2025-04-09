document.addEventListener("DOMContentLoaded", function () {
  // 최근배송지와 직접입력 요소 선택
  const recentAddressBtn = document.querySelector(".direct-input"); // HTML에서 최근배송지가 direct-input 클래스로 되어 있음
  const directInputBtn = document.querySelector(".recent-address"); // HTML에서 직접입력이 recent-address 클래스로 되어 있음

  // 입력 필드 선택
  const recipientInput = document.querySelector(".recipient-input");
  const addressInput = document.querySelector(".address-input");
  const phoneInput = document.querySelector(".phone-input");

  // 최근배송지 클릭 이벤트
  recentAddressBtn.addEventListener("click", function () {
    // 최근배송지 정보로 변경
    recipientInput.value = "정재기";
    addressInput.value = "경기도 광명시 오리로 1003";
    phoneInput.value = "010-1234-5678";

    // 버튼 스타일 변경 (활성화 상태 표시)
    recentAddressBtn.style.borderBottom = "1px solid #333";
    recentAddressBtn.style.fontWeight = "400";
    directInputBtn.style.borderBottom = "none";
    directInputBtn.style.fontWeight = "300";
  });

  // 직접입력 클릭 이벤트
  directInputBtn.addEventListener("click", function () {
    // 입력 필드 초기화
    recipientInput.value = "";
    addressInput.value = "";
    phoneInput.value = "";

    // 첫 번째 입력 필드에 포커스
    recipientInput.focus();

    // 버튼 스타일 변경 (활성화 상태 표시)
    directInputBtn.style.borderBottom = "1px solid #333";
    directInputBtn.style.fontWeight = "400";
    recentAddressBtn.style.borderBottom = "none";
    recentAddressBtn.style.fontWeight = "300";
  });

  // 전역 변수로 모달 요소들을 저장할 객체 생성
  let addressModal, couponModal, paymentConfirmModal;

  // 모달 외부 클릭 시 닫기 공통 핸들러 (한 번만 정의)
  window.addEventListener("click", function (e) {
    if (addressModal && e.target === addressModal) {
      addressModal.style.display = "none";
    } else if (couponModal && e.target === couponModal) {
      couponModal.style.display = "none";
    } else if (paymentConfirmModal && e.target === paymentConfirmModal) {
      paymentConfirmModal.style.display = "none";
    }
  });

  // 모달 창 HTML 구조 생성
  const addressModalHTML = `
    <div class="address-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>배송지 목록</h3>
          <button class="address-close-modal close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <ul class="address-list">
            <li class="address-item" data-name="강동호" data-address="서울특별시 강서구 강동호네집" data-phone="010-1234-5678">
              <div class="address-number">1.</div>
              <div class="address-info-modal">강동호 - 2025.02</div>
            </li>
            <li class="address-item" data-name="김소연" data-address="서울특별시 영등포구 김소연네집" data-phone="010-2345-6789">
              <div class="address-number">2.</div>
              <div class="address-info-modal">김소연 - 2025.03</div>
            </li>
            <li class="address-item" data-name="김다예" data-address="서울특별시 장한평 김다예네집" data-phone="010-3456-7890">
              <div class="address-number">3.</div>
              <div class="address-info-modal">김다예 - 2025.04</div>
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="select-address">Selected</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", addressModalHTML);

  // 필요한 요소들 선택
  addressModal = document.querySelector(".address-modal");
  const addressBookLink = document.querySelector(".address-book-link a");
  const addressCloseButton = addressModal.querySelector(".address-close-modal");
  const addressSelectButton = addressModal.querySelector(".select-address");
  const addressItems = addressModal.querySelectorAll(".address-item");

  // 배송지 목록 링크 클릭 시 모달 열기
  addressBookLink.addEventListener("click", function (e) {
    e.preventDefault();
    addressModal.style.display = "flex";
  });

  // 닫기 버튼 클릭 시 모달 닫기
  addressCloseButton.addEventListener("click", function () {
    addressModal.style.display = "none";
  });

  // 주소 항목 클릭 시 선택 표시
  addressItems.forEach((item) => {
    item.addEventListener("click", function () {
      // 이전 선택 항목 제거
      addressModal
        .querySelectorAll(".address-item.selected")
        .forEach((selected) => {
          selected.classList.remove("selected");
        });

      // 현재 항목 선택
      this.classList.add("selected");
    });
  });

  // Selected 버튼 클릭 시 선택한 배송지 정보 적용
  addressSelectButton.addEventListener("click", function () {
    const selectedItem = addressModal.querySelector(".address-item.selected");

    if (selectedItem) {
      const name = selectedItem.dataset.name;
      const address = selectedItem.dataset.address;
      const phone = selectedItem.dataset.phone;

      // 입력 필드에 값 설정
      document.querySelector(".recipient-input").value = name;
      document.querySelector(".address-input").value = address;
      document.querySelector(".phone-input").value = phone;

      // 최근배송지 스타일 활성화
      document.querySelector(".direct-input").style.borderBottom =
        "1px solid #333";
      document.querySelector(".direct-input").style.fontWeight = "400";
      document.querySelector(".recent-address").style.borderBottom = "none";
      document.querySelector(".recent-address").style.fontWeight = "300";
    }

    // 모달 닫기
    addressModal.style.display = "none";
  });

  // 쿠폰 모달 HTML 구조 생성
  const couponModalHTML = `
    <div class="coupon-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>보유 쿠폰</h3>
          <button class="coupon-close-modal close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <ul class="coupon-list">
            <li class="coupon-item" data-coupon-id="1" data-coupon-value="5000" data-coupon-type="fixed">
              <div class="coupon-number">1.</div>
              <div class="coupon-info-modal">
                <div class="coupon-name">welcome: 5000원</div>
                <div class="coupon-expiry">유효기간: 2025.06.30</div>
              </div>
            </li>
            <li class="coupon-item" data-coupon-id="2" data-coupon-value="10" data-coupon-type="percent">
              <div class="coupon-number">2.</div>
              <div class="coupon-info-modal">
                <div class="coupon-name">happy birth: 10%</div>
                <div class="coupon-expiry">유효기간: 2025.05.15</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="select-coupon">쿠폰 적용</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", couponModalHTML);

  // 필요한 요소들 선택
  couponModal = document.querySelector(".coupon-modal");
  const couponButton = document.querySelector(".coupon-button");
  const couponCloseButton = couponModal.querySelector(".coupon-close-modal");
  const couponSelectButton = couponModal.querySelector(".select-coupon");
  const couponItems = couponModal.querySelectorAll(".coupon-item");

  // 쿠폰 적용 버튼 클릭 시 모달 열기
  couponButton.addEventListener("click", function (e) {
    e.preventDefault();
    couponModal.style.display = "flex";
  });

  // 닫기 버튼 클릭 시 모달 닫기
  couponCloseButton.addEventListener("click", function () {
    couponModal.style.display = "none";
  });

  // 쿠폰 항목 클릭 시 선택 표시
  couponItems.forEach((item) => {
    item.addEventListener("click", function () {
      // 이전 선택 항목 제거
      couponModal
        .querySelectorAll(".coupon-item.selected")
        .forEach((selected) => {
          selected.classList.remove("selected");
        });

      // 현재 항목 선택
      this.classList.add("selected");
    });
  });

  // 쿠폰 적용 버튼 클릭 시 선택한 쿠폰 적용
  couponSelectButton.addEventListener("click", function () {
    const selectedItem = couponModal.querySelector(".coupon-item.selected");

    if (selectedItem) {
      const couponType = selectedItem.dataset.couponType;
      const couponValue = selectedItem.dataset.couponValue;

      const couponValueElement = document.querySelector(
        ".coupon-row .option-value"
      );

      if (couponType === "fixed") {
        couponValueElement.textContent = `-${couponValue}KRW`;
      } else if (couponType === "percent") {
        const originalPrice = 147000;
        const discount = Math.round(originalPrice * (couponValue / 100));
        couponValueElement.textContent = `-${discount}KRW`;
      }

      updateTotalAmount();
    }

    couponModal.style.display = "none";
  });

  // 결제 확인 모달 HTML 구조 생성
  const paymentConfirmModalHTML = `
    <div class="payment-confirm-modal">
      <div class="modal-content">
        <div class="modal-body">
          <p class="confirm-message">결제 서비스 준비중입니다....</p>
        </div>
        <div class="modal-footer">
          <button class="move-to-cart">Move To Cart</button>
          <button class="continue-shopping">Continue Shopping</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", paymentConfirmModalHTML);

  // 필요한 요소들 선택
  paymentConfirmModal = document.querySelector(".payment-confirm-modal");
  const checkoutButton = document.querySelector(".checkout-button");
  const moveToCartButton = document.querySelector(".move-to-cart");
  const continueShoppingButton = document.querySelector(".continue-shopping");

  // 결제하기 버튼 클릭 시 모달 열기
  checkoutButton.addEventListener("click", function () {
    paymentConfirmModal.style.display = "flex";
  });

  // 장바구니로 이동
  moveToCartButton.addEventListener("click", function () {
    window.location.href = "./cart.html";
  });

  // 쇼핑 계속하기
  continueShoppingButton.addEventListener("click", function () {
    window.location.href = "./detail.html";
  });

  function updateTotalAmount() {
    const productAmount = document.querySelector(
      ".summary-row:nth-child(1) .summary-amount"
    );
    const shippingAmount = document.querySelector(
      ".summary-row:nth-child(2) .summary-amount"
    );
    const discountAmount = document.querySelector(
      ".summary-row:nth-child(3) .summary-amount"
    );
    const totalAmount = document.querySelector(
      ".summary-row.total .summary-amount"
    );
    const paymentButton = document.querySelector(".checkout-button");

    const productPrice = 147000;
    productAmount.textContent = `${productPrice} KRW`;

    const shippingCost = 0;
    shippingAmount.textContent = `${shippingCost} KRW`;

    const couponText = document.querySelector(
      ".coupon-row .option-value"
    ).textContent;
    let discount = 0;
    if (couponText.includes("-")) {
      discount = parseInt(couponText.replace(/[^0-9]/g, ""));
    }
    discountAmount.textContent = `-${discount} KRW`;

    const total = productPrice + shippingCost - discount;
    totalAmount.textContent = `${total} KRW`;

    paymentButton.textContent = `${total} KRW 결제하기`;
  }

  // 초기 가격 설정
  updateTotalAmount();
});
