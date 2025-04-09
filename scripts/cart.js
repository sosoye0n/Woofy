document.addEventListener("DOMContentLoaded", function () {
  // 페이지 로드 시 장바구니 데이터 렌더링
  renderCartItems();

  // 페이지 로드 시 장바구니 카운터 업데이트
  updateCartCounter();

  // Empty Cart 버튼 이벤트 설정
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
        // 선택된 상품만 삭제
        removeSelectedItems(selectedItems);

        // 장바구니 페이지 새로고침
        renderCartItems();

        // 장바구니 카운터 업데이트
        updateCartCounter();
      }
    });
  }

  // Buy Selected Items 버튼 이벤트 설정
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

  // 상품 상세 페이지의 버튼 이벤트 설정 (상세 페이지에 있을 경우만 실행)
  setupProductDetailButtons();
});

// 전체 선택 체크박스 이벤트 설정 함수
function setupSelectAllCheckbox() {
  const outerCheckboxes = document.querySelectorAll(
    '.cart-item .checkbox-container input[type="checkbox"]'
  );
  const itemCheckboxes = document.querySelectorAll(
    '.cart-item .items input[type="checkbox"]'
  );

  // 외부 체크박스(전체 선택)에 이벤트 추가
  outerCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const cartItem = this.closest(".cart-item");
      const itemCheckbox = cartItem.querySelector(
        '.items input[type="checkbox"]'
      );

      // 전체 선택 체크박스의 상태를 아이템 체크박스에 반영
      if (itemCheckbox) {
        itemCheckbox.checked = this.checked;
      }

      // 장바구니 요약 정보 업데이트
      calculateCartSummary();
    });
  });

  // 내부 체크박스(개별 상품)에 이벤트 추가
  itemCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const cartItem = this.closest(".cart-item");
      const outerCheckbox = cartItem.querySelector(
        '.checkbox-container input[type="checkbox"]'
      );

      // 아이템 체크박스의 상태를 전체 선택 체크박스에 반영
      if (outerCheckbox) {
        outerCheckbox.checked = this.checked;
      }

      // 장바구니 요약 정보 업데이트
      calculateCartSummary();
    });
  });
}

// 선택된 상품 ID 배열 반환 함수
function getSelectedItemIds() {
  // 선택된 상품 체크박스 찾기 (내부 체크박스 사용)
  const checkedItems = document.querySelectorAll(
    '.cart-item .items input[type="checkbox"]:checked'
  );

  // 체크된 상품의 ID 배열 만들기
  return Array.from(checkedItems).map((checkbox) => {
    return parseInt(checkbox.closest(".cart-item").dataset.id);
  });
}

// 선택된 상품 삭제 함수
function removeSelectedItems(itemIds) {
  // 로컬 스토리지에서 장바구니 가져오기
  let cart = localStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : [];

  // 선택되지 않은 상품만 필터링하여 저장
  const remainingItems = cart.filter((item) => !itemIds.includes(item.id));
  localStorage.setItem("cart", JSON.stringify(remainingItems));

  // 선택된 상품이 모두 삭제된 경우
  if (remainingItems.length === 0) {
    alert("장바구니가 비었습니다.");
  } else {
    alert("선택한 상품이 삭제되었습니다.");
  }
}

// 상품 상세 페이지 버튼 이벤트 설정 함수
function setupProductDetailButtons() {
  // 장바구니 추가 버튼
  const addToCartBtn = document.querySelector(".add-to-cart-btn");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // 사이즈 선택 여부 확인
      if (!checkSizeSelected()) {
        alert("필수옵션을 선택해주세요");
        return;
      }

      // 선택된 상품 정보 가져오기
      const productTitle = document.querySelector(".product-title").textContent;
      const productPrice = document.querySelector(".price-value").textContent;
      const productImage = document
        .querySelector(".swiper-slide:first-child")
        .style.backgroundImage.replace(/url\(['"](.+)['"]\)/, "$1");
      const productSize = document.querySelector(".option-select select").value;

      // 상품 객체 생성
      const product = {
        id: Date.now(), // 고유 ID 생성
        title: productTitle,
        price: productPrice,
        image: productImage,
        option: productSize,
        quantity: 1,
      };

      // 장바구니에 추가
      addToCart(product);

      // 장바구니 추가 성공 알림
      alert("상품이 장바구니에 추가되었습니다.");
    });
  }

  // 바로 구매 버튼
  const buyNowDetailBtn = document.querySelector(".buy-now-btn");
  if (buyNowDetailBtn) {
    buyNowDetailBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // 사이즈 선택 여부 확인
      if (!checkSizeSelected()) {
        alert("필수옵션을 선택해주세요");
        return;
      }

      // 선택된 상품 정보 가져오기
      const productTitle = document.querySelector(".product-title").textContent;
      const productPrice = document.querySelector(".price-value").textContent;
      const productImage = document
        .querySelector(".swiper-slide:first-child")
        .style.backgroundImage.replace(/url\(['"](.+)['"]\)/, "$1");
      const productSize = document.querySelector(".option-select select").value;

      // 상품 객체 생성
      const product = {
        id: Date.now(), // 고유 ID 생성
        title: productTitle,
        price: productPrice,
        image: productImage,
        option: productSize,
        quantity: 1,
      };

      // 결제 페이지에 전달할 상품 정보 저장
      localStorage.setItem("checkout-item", JSON.stringify(product));

      // 결제 페이지로 이동
      window.location.href = "payment.html";
    });
  }

  // 카카오페이 버튼
  const kakaoPayBtn = document.querySelector(".kakao-pay-btn");
  if (kakaoPayBtn) {
    kakaoPayBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // 사이즈 선택 여부 확인
      if (!checkSizeSelected()) {
        alert("필수옵션을 선택해주세요");
        return;
      }

      // 선택된 상품 정보 가져오기
      const productTitle = document.querySelector(".product-title").textContent;
      const productPrice = document.querySelector(".price-value").textContent;
      const productImage = document
        .querySelector(".swiper-slide:first-child")
        .style.backgroundImage.replace(/url\(['"](.+)['"]\)/, "$1");
      const productSize = document.querySelector(".option-select select").value;

      // 상품 객체 생성
      const product = {
        id: Date.now(), // 고유 ID 생성
        title: productTitle,
        price: productPrice,
        image: productImage,
        option: productSize,
        quantity: 1,
        payMethod: "kakao", // 결제 방식 추가
      };

      // 결제 페이지에 전달할 상품 정보 저장
      localStorage.setItem("checkout-item", JSON.stringify(product));

      // 결제 페이지로 이동 (카카오페이 옵션과 함께)
      window.location.href = "payment.html?method=kakao";
    });
  }
}

// 사이즈 선택 여부 확인 함수
function checkSizeSelected() {
  const sizeSelect = document.querySelector(".option-select select");
  if (sizeSelect && sizeSelect.selectedIndex === 0) {
    return false;
  }
  return true;
}

// 장바구니 아이템 렌더링 함수
function renderCartItems() {
  const cartItemsContainer = document.querySelector(".cart-items");
  if (!cartItemsContainer) return;

  // 로컬 스토리지에서 장바구니 가져오기
  let cart = localStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : [];

  // 장바구니가 비어있는 경우
  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-cart-message">Empty Cart <br/> So....? More shopping!</p>';

    // 장바구니 요약 초기화
    updateCartSummary(0, 0);
    return;
  }

  // 장바구니 아이템 표시
  let cartHTML = "";

  cart.forEach((item) => {
    cartHTML += `
      <div class="cart-item" data-id="${item.id}">
        <div class="checkbox-container">
          <input type="checkbox" id="outer-item${item.id}" checked />
          <label for="outer-item${item.id}"></label>
        </div>
        <div class="items">
          <input type="checkbox" id="item${item.id}" checked />
          <label for="item${item.id}"></label>
          <div class="item-image">
            <img src="${item.image}" alt="${item.title}" />
          </div>
          <div class="item-details">
            <div class="detail-top">
              <h3>${item.title}</h3>
              <p class="price">${item.price}</p>
            </div>
            <div class="detail-bottom">
              <p class="option">Option: ${item.option || "beige"}</p>
              <div class="quantity-price">
                <div class="quantity-selector">
                  <button class="quantity-btn minus">-</button>
                  <div class="num">${item.quantity}</div>
                  <button class="quantity-btn plus">+</button>
                </div>
              </div>
            </div>
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

// 수량 버튼 이벤트 설정
function setupQuantityButtons() {
  // 수량 증가 버튼
  const plusButtons = document.querySelectorAll(".quantity-btn.plus");
  plusButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const itemId = parseInt(this.closest(".cart-item").dataset.id);
      increaseQuantity(itemId);
    });
  });

  // 수량 감소 버튼
  const minusButtons = document.querySelectorAll(".quantity-btn.minus");
  minusButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const itemId = parseInt(this.closest(".cart-item").dataset.id);
      decreaseQuantity(itemId);
    });
  });
}

// 수량 증가 함수
function increaseQuantity(itemId) {
  // 로컬 스토리지에서 장바구니 가져오기
  let cart = localStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : [];

  // 해당 아이템 찾기
  const itemIndex = cart.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    // 수량 증가
    cart[itemIndex].quantity += 1;

    // 업데이트된 장바구니를 로컬 스토리지에 저장
    localStorage.setItem("cart", JSON.stringify(cart));

    // 화면 업데이트
    const quantityElement = document.querySelector(
      `.cart-item[data-id="${itemId}"] .num`
    );
    if (quantityElement) {
      quantityElement.textContent = cart[itemIndex].quantity;
    }

    // 장바구니 요약 정보 업데이트
    calculateCartSummary();

    // 장바구니 카운터 업데이트
    updateCartCounter();
  }
}

// 수량 감소 함수
function decreaseQuantity(itemId) {
  // 로컬 스토리지에서 장바구니 가져오기
  let cart = localStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : [];

  // 해당 아이템 찾기
  const itemIndex = cart.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1 && cart[itemIndex].quantity > 1) {
    // 수량 감소
    cart[itemIndex].quantity -= 1;

    // 업데이트된 장바구니를 로컬 스토리지에 저장
    localStorage.setItem("cart", JSON.stringify(cart));

    // 화면 업데이트
    const quantityElement = document.querySelector(
      `.cart-item[data-id="${itemId}"] .num`
    );
    if (quantityElement) {
      quantityElement.textContent = cart[itemIndex].quantity;
    }

    // 장바구니 요약 정보 업데이트
    calculateCartSummary();

    // 장바구니 카운터 업데이트
    updateCartCounter();
  }
}

// 장바구니에 상품 추가 함수
function addToCart(product) {
  // 로컬 스토리지에서 장바구니 가져오기
  let cart = localStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : [];

  // 동일한 상품이 있는지 확인 (제목과 옵션으로 구분)
  const existingProductIndex = cart.findIndex(
    (item) => item.title === product.title && item.option === product.option
  );

  if (existingProductIndex !== -1) {
    // 이미 있는 상품이면 수량만 증가
    cart[existingProductIndex].quantity += 1;
  } else {
    // 새 상품이면 추가
    cart.push(product);
  }

  // 업데이트된 장바구니를 로컬 스토리지에 저장
  localStorage.setItem("cart", JSON.stringify(cart));

  // 장바구니 카운터 업데이트
  updateCartCounter();
}

// 장바구니 총액 계산 함수 - 선택된 상품만 계산
function calculateCartSummary() {
  // 로컬 스토리지에서 장바구니 가져오기
  let cart = localStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : [];

  // 선택된 상품 아이디 가져오기
  const selectedIds = getSelectedItemIds();

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

// 장바구니 요약 업데이트 함수
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

// 장바구니 카운터 업데이트 함수
function updateCartCounter() {
  // 로컬 스토리지에서 장바구니 가져오기
  let cart = localStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : [];

  // 총 수량 계산
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // 헤더의 장바구니 카운터 업데이트
  const cartCounter = document.querySelector(
    "#rightGnb ul li:nth-child(2) a span:last-child"
  );
  if (cartCounter) {
    cartCounter.textContent = `(${totalItems})`;
  }
}
