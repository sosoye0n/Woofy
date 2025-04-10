document.addEventListener("DOMContentLoaded", function () {
  // 사이드바 아코디언 기능 초기화
  initSidebarAccordion();

  // 페이지 로드 시 장바구니 데이터 렌더링
  renderCartItems();

  // Empty Cart 버튼 이벤트 설정
  setupEmptyCartButton();

  // Buy Selected Items 버튼 이벤트 설정
  setupBuyNowButton();
});

/**
 * 장바구니 비우기 버튼 이벤트 설정
 */
function setupEmptyCartButton() {
  const emptyCartBtn = document.querySelector(".empty-cart");
  if (emptyCartBtn) {
    emptyCartBtn.addEventListener("click", function () {
      // 선택된 상품이 있는지 확인
      const selectedItems = getSelectedItemIds();

      if (selectedItems.length === 0) {
        alert("삭제할 상품을 선택해주세요.");
        return;
      }

      if (confirm("선택한 상품을 장바구니에서 삭제하시겠습니까?")) {
        // 선택된 상품만 삭제 (공통 함수 사용)
        removeSelectedItems(selectedItems);

        // 장바구니 페이지 새로고침
        renderCartItems();
      }
    });
  }
}

/**
 * 구매하기 버튼 이벤트 설정
 */
function setupBuyNowButton() {
  const buyNowBtn = document.querySelector(".buy-now");
  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", function () {
      // 선택된 상품의 ID 가져오기
      const selectedIds = getSelectedItemIds();

      if (selectedIds.length === 0) {
        alert("구매할 상품을 선택해주세요.");
        return;
      }

      // 선택된 상품 ID를 저장
      localStorage.setItem("selected-items", JSON.stringify(selectedIds));

      // 결제 페이지로 이동
      window.location.href = "payment.html";
    });
  }
}

/**
 * 전체 선택 체크박스 이벤트 설정 함수
 */
function setupSelectAllCheckbox() {
  // 전체 선택 체크박스
  const selectAllCheckbox = document.getElementById("select-all-items");
  if (!selectAllCheckbox) return;

  // 모든 개별 상품 체크박스
  const itemCheckboxes = document.querySelectorAll(
    ".cart-item input[type='checkbox']"
  );

  // 전체 선택 체크박스에 이벤트 추가
  selectAllCheckbox.addEventListener("change", function () {
    const isChecked = this.checked;

    // 모든 상품 체크박스에 전체 선택 상태 적용
    itemCheckboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });

    // 장바구니 요약 정보 업데이트
    calculateCartSummary();
  });

  // 개별 상품 체크박스에 이벤트 추가
  itemCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      // 장바구니 요약 정보 업데이트
      calculateCartSummary();

      // 전체 선택 체크박스 상태 업데이트
      updateGlobalCheckboxState();
    });
  });
}

function updateGlobalCheckboxState() {
  const selectAllCheckbox = document.getElementById("select-all-items");
  if (!selectAllCheckbox) return;

  const itemCheckboxes = document.querySelectorAll(
    ".cart-item input[type='checkbox']"
  );

  // 모든 상품이 선택되었는지 확인
  const allChecked = Array.from(itemCheckboxes).every(
    (checkbox) => checkbox.checked
  );

  // 전체 선택 체크박스 상태 업데이트
  selectAllCheckbox.checked = allChecked;

  // 상품이 없으면 체크박스 해제
  if (itemCheckboxes.length === 0) {
    selectAllCheckbox.checked = false;
  }
}

function getSelectedItemIds() {
  // 선택된 상품 체크박스 찾기
  const checkedItems = document.querySelectorAll(
    ".cart-item input[type='checkbox']:checked"
  );

  // 체크된 상품의 ID 배열 만들기
  return Array.from(checkedItems).map((checkbox) => {
    return parseInt(checkbox.closest(".cart-item").dataset.id);
  });
}

function renderCartItems() {
  const cartItemsContainer = document.querySelector(".cart-items");
  if (!cartItemsContainer) return;

  // 로컬 스토리지에서 장바구니 가져오기 (공통 함수 사용)
  const cart = getCartItems();

  // 장바구니가 비어있는 경우
  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-cart-message">Empty Cart so...More shopping??</p>';

    // 장바구니 요약 초기화
    updateCartSummary(0, 0);
    return;
  }

  // 장바구니 아이템 HTML 생성
  let cartHTML = "";

  cart.forEach((item) => {
    // 개별 상품 가격 및 합계 계산
    const price = parseInt(item.price.replace(/[^0-9]/g, ""));
    const totalPrice = price * item.quantity;

    cartHTML += `
      <div class="cart-item" data-id="${item.id}">
        <div class="select-column">
          <input type="checkbox" id="item${item.id}" checked />
          <label for="item${item.id}"></label>
        </div>
        
        <div class="product-column">
          <div class="product-image">
            <img src="${item.image}" alt="${item.title}" />
          </div>
          <div class="product-info">
            <h3>${item.title}</h3>
            <p class="option">Option: ${item.option || "기본"}</p>
          </div>
        </div>
        
        <div class="price-column">
          <p>${item.price}</p>
        </div>
        
        <div class="quantity-column">
          <div class="quantity-selector">
            <button class="quantity-btn minus">-</button>
            <div class="num">${item.quantity}</div>
            <button class="quantity-btn plus">+</button>
          </div>
        </div>
      </div>
    `;
  });

  cartItemsContainer.innerHTML = cartHTML;

  // 장바구니 요약 정보 업데이트
  calculateCartSummary();

  // 수량 버튼에 이벤트 리스너 추가
  setupQuantityButtons();

  // 체크박스 이벤트 설정
  setupSelectAllCheckbox();
}

/**
 * 수량 버튼 이벤트 설정
 */
function setupQuantityButtons() {
  // 수량 증가 버튼
  const plusButtons = document.querySelectorAll(".quantity-btn.plus");
  plusButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const itemId = parseInt(this.closest(".cart-item").dataset.id);

      // 공통 함수 사용
      const newQuantity = increaseQuantity(itemId);

      if (newQuantity !== null) {
        // 화면 업데이트
        const quantityElement = document.querySelector(
          `.cart-item[data-id="${itemId}"] .num`
        );
        if (quantityElement) {
          quantityElement.textContent = newQuantity;
        }

        // 개별 상품 총액 업데이트
        updateItemTotal(itemId);

        // 장바구니 요약 정보 업데이트
        calculateCartSummary();
      }
    });
  });

  // 수량 감소 버튼
  const minusButtons = document.querySelectorAll(".quantity-btn.minus");
  minusButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const itemId = parseInt(this.closest(".cart-item").dataset.id);

      // 공통 함수 사용
      const newQuantity = decreaseQuantity(itemId);

      if (newQuantity !== null) {
        // 화면 업데이트
        const quantityElement = document.querySelector(
          `.cart-item[data-id="${itemId}"] .num`
        );
        if (quantityElement) {
          quantityElement.textContent = newQuantity;
        }

        // 개별 상품 총액 업데이트
        updateItemTotal(itemId);

        // 장바구니 요약 정보 업데이트
        calculateCartSummary();
      }
    });
  });
}

function updateItemTotal(itemId) {
  const cart = getCartItems();
  const item = cart.find((item) => item.id === itemId);

  const totalElement = document.querySelector(
    `.cart-item[data-id="${itemId}"] .total-column p`
  );

  if (totalElement && item) {
    const price = parseInt(item.price.replace(/[^0-9]/g, ""));
    const totalPrice = price * item.quantity;
    totalElement.textContent = `${totalPrice.toLocaleString()} KRW`;
  }
}

/**
 * 장바구니 총액 계산 함수 - 선택된 상품만 계산
 */
function calculateCartSummary() {
  // 선택된 상품 아이디 가져오기
  const selectedIds = getSelectedItemIds();
  const cart = getCartItems();

  // 총액 계산 (선택된 상품만)
  let totalPrice = 0;

  cart.forEach((item) => {
    // 선택된 상품만 계산에 포함
    if (selectedIds.includes(item.id)) {
      // 가격에서 숫자만 추출
      const price = parseInt(item.price.replace(/[^0-9]/g, ""));
      totalPrice += price * item.quantity;
    }
  });

  // 배송비 고정 0원
  const shippingFee = 0;

  // 장바구니 요약 업데이트
  updateCartSummary(totalPrice, shippingFee);
}

/**
 * 장바구니 요약 업데이트 함수
 */
function updateCartSummary(totalPrice, shippingFee) {
  const summaryValues = document.querySelectorAll(".summary-value");
  if (summaryValues.length >= 3) {
    // 상품가
    summaryValues[0].textContent = `${totalPrice.toLocaleString()} KRW`;

    // 배송료
    summaryValues[1].textContent = `+ ${shippingFee.toLocaleString()} KRW`;

    // 총 결제 금액
    const totalPayment = totalPrice + shippingFee;
    summaryValues[2].textContent = `${totalPayment.toLocaleString()} KRW`;
  }
}

/**
 * 사이드바 아코디언 기능 초기화 함수
 */
function initSidebarAccordion() {
  const accordionToggles = document.querySelectorAll(
    ".sidebar .category .title-top"
  );

  document
    .querySelectorAll(".sidebar .category .subcategory")
    .forEach((subcategory) => {
      subcategory.style.transition = "height 0.3s ease, opacity 0.3s ease";
      subcategory.style.overflow = "hidden";
      subcategory.style.display = "flex";
      subcategory.style.flexWrap = "wrap";
      subcategory.style.height = "auto";
      subcategory.style.opacity = "1";

      const icon = subcategory.previousElementSibling.querySelector("i");
      if (icon) {
        icon.style.transform = "rotate(0deg)";
        icon.style.transition = "transform 0.3s ease";
      }
    });

  accordionToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const subcategory = this.nextElementSibling;
      const icon = this.querySelector("i");

      const isCollapsed =
        subcategory.style.height === "0px" || subcategory.style.height === "";

      if (isCollapsed) {
        subcategory.style.height = "auto";
        const autoHeight = subcategory.offsetHeight + "px";

        subcategory.style.height = "0px";

        setTimeout(() => {
          subcategory.style.height = autoHeight;
          subcategory.style.opacity = "1";
        }, 10);

        if (icon) {
          icon.style.transform = "rotate(0deg)";
        }
      } else {
        subcategory.style.height = "0px";
        subcategory.style.opacity = "0";

        if (icon) {
          icon.style.transform = "rotate(90deg)";
        }
      }
    });
  });
}
