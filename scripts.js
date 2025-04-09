// 헤더
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const searchWrap = document.querySelector("#searchWrap");
const headerInner = `
        <h1 id="logo">
          <a href="index.html" title="Home">WOOFY©</a>
        </h1>
        <nav id="leftGnb">
            <ul>
              <li>
                <a href="./detail.html" title="clothes">CLOTHES</a>
              </li>
              <li>
                <a href="./detail.html" title="acc">ACC</a>
              </li>
              <li>
                <a href="./detail.html" title="life">LIFE</a>
              </li>
              <li>
              <a href="mypage.html" title="event">MYPAGE</a>
              </li>
              <li class="promotionTitle">
                <a href="event.html" title="event">스프링시즌세일</a>
              </li>
            </ul>
          </nav>
          <nav id="rightGnb">
            <ul>
              <li>
                <a href="#" title="search"><span>SEARCH</span>
                <i class="fa-solid fa-magnifying-glass"></i></a>
              </li>
              <li>
                <a href="./cart.html" title="cart"><span>CART</span><i class="fa-solid fa-bag-shopping"></i><span class="cart-count"></span>
                </a>
              </li>
              <li>
                <a href="login.html" title="login"><span>LOGIN</span>
                <i class="fa-solid fa-user"></i></a>
              </li>
              <li>
                <a href="mypage.html" title="mypage">mypage</a>
              </li>
              <li>
                <button id="toggleBtn">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </li>
            </ul>
        </nav>
`;
const searchInner = `
        <div id="searchBg"></div>
        <form name="shopping-form" action="#" method="get">
          <div class="search">
            <input
              id="search"
              class="searchBar"
              type="text"
              name="search"
              placeholder="검색"
            />
            <button type="submit">
              <i class="fas fa-search"></i>
            </button>
          </div>
          <div>
            <ul>
              <li>POPULAR KEYWORDS</li>
              <li>
                <a href="#" title="임시">PAPERBACK</a>
              </li>
              <li>
                <a href="#" title="임시">MI-2</a>
              </li>
              <li>
                <a href="#" title="임시">BR소파</a>
              </li>
              <li>
                <a href="#" title="임시">프레스룸체어</a>
              </li>
              <li>
                <a href="#" title="임시">다이닝체어</a>
              </li>
            </ul>
          </div>
          <button id="closeBtn">
              <span></span>
              <span></span>
          </button>
        </form>
`;
const footerInner = `
<nav id="footerCategory">
        <ul>
          <li>
            <a href="#" title="clothes">CLOTHES</a>
          </li>
          <li>
            <a href="#" title="acc">ACC</a>
          </li>
          <li>
            <a href="#" title="life">LIFE</a>
          </li>
          <li class="promotionTitle">
            <a href="event.html" title="event">promotion</a>
          </li>
        </ul>
      </nav>
      <nav id="footerInfo">
        <ul>
          <li>
            <a href="#">개인정보처리방침</a>
          </li>
          <li class="border">|</li>
          <li>
            <a href="#">이용약관</a>
          </li>
          <li class="border">|</li>
          <li>
            <a href="#">회사소개</a>
          </li>
        </ul>
      </nav>
      <h1 id="footerLogo">
        <a href="index.html">WOOFY</a>
      </h1>
      <p>WOOFY© ALL RIGHT RESERVED</p>
`;

header.innerHTML = headerInner;
footer.innerHTML = footerInner;
searchWrap.innerHTML = searchInner;

// 카트 카운터 업데이트 함수
updateCartCounter();

// updateCartCounter 함수 업데이트
function updateCartCounter() {
  let cart = getCartItems();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // 클래스 선택자로 변경
  const cartCounter = document.querySelector(".cart-count");

  if (cartCounter) {
    cartCounter.textContent = `(${totalItems})`;
  } else {
    // 백업 선택자 (기존 코드의 선택자)
    const alternativeCounter = document.querySelector(
      "#rightGnb ul li a[title='cart'] span:last-child"
    );
    if (alternativeCounter) {
      alternativeCounter.textContent = `(${totalItems})`;
    } else {
      console.log("장바구니 카운터를 찾을 수 없습니다.");
    }
  }
}

const toggleBtn = document.querySelector("#toggleBtn");
const leftGnb = document.querySelector("#leftGnb");
toggleBtn.addEventListener("click", function () {
  this.classList.toggle("active");
  leftGnb.classList.toggle("active");
  header.classList.toggle("blendMode");
  document.body.classList.toggle("active");
});

const searchBtn = document.querySelector("#rightGnb ul li:first-child");
searchBtn.addEventListener("click", () => {
  const closeBtn = document.querySelector("#closeBtn");
  const searchBg = document.querySelector("#searchBg");
  searchWrap.classList.add("active");
  closeBtn.addEventListener("click", () => {
    searchWrap.classList.remove("active");
  });
  searchBg.addEventListener("click", () => {
    searchWrap.classList.remove("active");
  });
});

// 스크롤 이벤트
let prevscroll = 0;
window.addEventListener("scroll", function () {
  let scrollTop = this.scrollY;
  if (scrollTop > prevscroll) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
  prevscroll = scrollTop;
});

// lenis 라이브러리
const lenis = new Lenis();

lenis.on("scroll", (e) => {});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

window.addEventListener("resize", () => {
  document.body.classList.remove("active");
  if (window.innerWidth > 1024) {
    toggleBtn.classList.remove("active");
    leftGnb.classList.remove("active");
    header.classList.remove("blendMode");
    document.body.classList.remove("active");
  }
});

const closeBtn = document.querySelector("#closeBtn");
closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
});

// ================= 장바구니 관련 코드 추가 =================

/**
 * 장바구니 관련 기능을 위한 최적화된, 통합 코드
 */

// 페이지 로드 시 장바구니 카운터 업데이트
document.addEventListener("DOMContentLoaded", function () {
  // 장바구니 카운터 업데이트
  updateCartCounter();

  // 페이지가 장바구니 페이지인 경우에만 장바구니 렌더링
  if (document.querySelector(".cart-items")) {
    renderCartItems();
  }

  // 장바구니 관련 버튼 이벤트 설정
  if (document.querySelector(".empty-cart")) {
    setupEmptyCartButton();
  }

  if (document.querySelector(".buy-now")) {
    setupBuyNowButton();
  }
});

/**
 * 로컬 스토리지에서 장바구니 데이터 가져오기
 * @returns {Array} 장바구니 상품 배열
 */
function getCartItems() {
  // 두 가지 가능한 키로 시도 (cart-items, cart)
  let cart = localStorage.getItem("cart");
  if (!cart) {
    // "cart-items"로도 확인
    cart = localStorage.getItem("cart-items");

    // "cart-items"에 데이터가 있으면 "cart"로 복사
    if (cart) {
      localStorage.setItem("cart", cart);
    } else {
      // 둘 다 없으면 빈 배열
      return [];
    }
  }

  return JSON.parse(cart);
}

/**
 * 장바구니 데이터를 로컬 스토리지에 저장
 * @param {Array} cartData - 저장할 장바구니 데이터
 */
function saveCart(cartData) {
  localStorage.setItem("cart", JSON.stringify(cartData));
  // cart-items 키도 업데이트하여 호환성 유지
  localStorage.setItem("cart-items", JSON.stringify(cartData));
}

/**
 * 장바구니 카운터 업데이트 함수
 */
function updateCartCounter() {
  let cart = getCartItems();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // 헤더의 장바구니 카운터 업데이트
  // 더 정확한 선택자 사용 (title 속성으로 찾기)
  const cartCounter = document.querySelector(
    "#rightGnb ul li a[title='cart'] span:last-child"
  );

  // 선택자가 작동하지 않는 경우를 대비한 대체 선택자
  if (cartCounter) {
    cartCounter.textContent = `(${totalItems})`;
  } else {
    // 백업 선택자로 재시도
    const alternativeCounter = document.querySelector(
      "#rightGnb ul li:nth-child(2) a span:last-child"
    );
    if (alternativeCounter) {
      alternativeCounter.textContent = `(${totalItems})`;
    } else {
      console.log("장바구니 카운터 엘리먼트를 찾을 수 없습니다.");
    }
  }
}

/**
 * 장바구니에 상품 추가 함수
 * @param {Object} product - 추가할 상품 객체
 */
function addToCart(product) {
  let cart = getCartItems();

  // 동일한 상품이 있는지 확인 (제목과 옵션으로 구분)
  const existingProductIndex = cart.findIndex(
    (item) => item.title === product.title && item.option === product.option
  );

  if (existingProductIndex !== -1) {
    // 이미 있는 상품이면 수량만 증가
    cart[existingProductIndex].quantity += 1;
  } else {
    // 새 상품이면 추가
    // ID가 없는 경우 현재 시간으로 ID 생성
    if (!product.id) {
      product.id = Date.now();
    }

    // 기본 수량 설정
    if (!product.quantity) {
      product.quantity = 1;
    }

    // 기본 옵션 설정
    if (!product.option) {
      product.option = "기본";
    }

    cart.push(product);
  }

  // 통일된 저장 함수 사용
  saveCart(cart);

  // 장바구니 카운터 업데이트
  updateCartCounter();

  return cart;
}

/**
 * 장바구니에서 특정 상품 제거
 * @param {number} itemId - 제거할 상품 ID
 */
function removeCartItem(itemId) {
  let cart = getCartItems();
  cart = cart.filter((item) => item.id !== itemId);
  saveCart(cart);
  updateCartCounter();
  return cart;
}

/**
 * 선택된 상품들 제거
 * @param {Array} itemIds - 제거할 상품 ID 배열
 */
function removeSelectedItems(itemIds) {
  let cart = getCartItems();

  // 선택되지 않은 상품만 필터링하여 저장
  const remainingItems = cart.filter((item) => !itemIds.includes(item.id));
  saveCart(remainingItems);

  // 선택된 상품이 모두 삭제된 경우
  if (remainingItems.length === 0) {
    alert("장바구니가 비었습니다.");
  } else {
    alert("선택한 상품이 삭제되었습니다.");
  }

  // 장바구니 카운터 업데이트
  updateCartCounter();

  return remainingItems;
}

/**
 * 상품 수량 증가
 * @param {number} itemId - 수량을 증가시킬 상품 ID
 */
function increaseQuantity(itemId) {
  let cart = getCartItems();
  const itemIndex = cart.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    // 수량 증가
    cart[itemIndex].quantity += 1;
    saveCart(cart);
    updateCartCounter();
    return cart[itemIndex].quantity;
  }

  return null;
}

/**
 * 상품 수량 감소
 * @param {number} itemId - 수량을 감소시킬 상품 ID
 */
function decreaseQuantity(itemId) {
  let cart = getCartItems();
  const itemIndex = cart.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1 && cart[itemIndex].quantity > 1) {
    // 수량 감소
    cart[itemIndex].quantity -= 1;
    saveCart(cart);
    updateCartCounter();
    return cart[itemIndex].quantity;
  }

  return null;
}

/**
 * 장바구니 비우기
 */
function clearCart() {
  saveCart([]);
  updateCartCounter();
}

/**
 * 장바구니 아이템 렌더링 함수
 */
function renderCartItems() {
  const cartItemsContainer = document.querySelector(".cart-items");
  if (!cartItemsContainer) return;

  // 로컬 스토리지에서 장바구니 가져오기
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

  // 장바구니 카운터 업데이트
  updateCartCounter();
}

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

        // 장바구니 카운터 업데이트
        updateCartCounter();
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

/**
 * 전체 선택 체크박스 상태 업데이트
 */
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

/**
 * 선택된 상품 ID 배열 가져오기
 */
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

/**
 * 개별 상품 총액 업데이트
 */
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
 * 사이즈/옵션 선택 여부 확인
 * @param {string} selectId - 선택 요소의 ID 또는 선택자
 * @returns {boolean} 선택 여부
 */
function checkOptionSelected(selectId = ".option-select select") {
  const selectElement = document.querySelector(selectId);
  if (selectElement && selectElement.selectedIndex === 0) {
    return false;
  }
  return true;
}

/**
 * 장바구니 모달 관련 기능
 * @param {string} modalId - 모달 요소의 ID
 */
function showCartModal(modalId = "cart-modal") {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("show");
    modal.style.display = "flex";
  }
}

function hideCartModal(modalId = "cart-modal") {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("show");
    modal.style.display = "none";
  }
}
