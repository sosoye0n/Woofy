// cart.js (최종 버전)
document.addEventListener("DOMContentLoaded", async () => {
  initSidebarAccordion();

  // 장바구니 렌더링 전에 localStorage 확인
  const cartData = getCartItems();

  // 장바구니 렌더링
  await renderCartItems();

  // 버튼 핸들러 설정
  setupButtonHandlers();

  // 사이드바 브랜드 필터 내비게이션 설정
  setupBrandNavigation();

  // 수량 버튼 이벤트 리스너 설정
  setupQuantityButtons();
});

// ======================== 전역 변수 ========================
let productList = []; // 전역으로 productList 저장

// ======================== 공통 유틸 함수 ========================
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => context.querySelectorAll(selector);
const parseNumber = (str) => parseInt(str.replace(/[^0-9]/g, ""), 10);

// ======================== JSON 데이터 가져오기 ========================
async function fetchProductData() {
  try {
    // 경로 수정 (../API/detail.json -> ./API/detail.json)
    const res = await fetch("./API/detail.json");
    if (!res.ok) throw new Error("데이터를 불러오는 데 실패했습니다.");
    const data = await res.json();

    // 구조 수정 (data.products -> data.detail)
    return data.detail || [];
  } catch (err) {
    console.error("JSON Fetch Error:", err);
    return [];
  }
}

// ======================== 장바구니 가져오기 ========================
// scripts.js와 일치하도록 수정
function getCartItems() {
  // cart 저장소만 사용 (cart-items 사용 안함)
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function clearCart() {
  localStorage.removeItem("cart"); // 완전히 제거
  updateCartCounter(); // 카운터 업데이트
}

// ======================== 장바구니 렌더링 ========================
async function renderCartItems() {
  const container = $(".cart-items");
  const cart = getCartItems();
  productList = await fetchProductData();

  if (!container) {
    console.warn("장바구니 컨테이너를 찾을 수 없습니다.");
    return;
  }

  if (cart.length === 0) {
    container.innerHTML =
      '<p class="empty-cart-message">Empty Cart so...More shopping??</p>';
    updateCartSummary(0, 0);
    return;
  }

  container.innerHTML = cart
    .map((item) => {
      const product = productList.find((p) => p.id === item.id);
      if (!product) {
        console.warn(`ID ${item.id}에 해당하는 상품을 찾을 수 없습니다.`);
        return ""; // 상품 정보 없음
      }

      return `
    <div class="cart-item" data-id="${item.id}">
      <div class="select-column">
        <input type="checkbox" id="item${item.id}" checked />
        <label for="item${item.id}"></label>
      </div>
      <div class="product-column">
        <div class="product-image">
          <img src="${product.thumbnail}" alt="${product.name || ""}" />
        </div>
        <div class="product-info">
          <h3>${product.name || ""}</h3>
          <p class="option">옵션: ${item.option || "기본"}</p>
        </div>
      </div>
      <div class="price-column"><p>${product.price}</p></div>
      <div class="quantity-column">
        <div class="quantity-selector">
          <button class="quantity-btn" data-type="minus">-</button>
          <div class="num">${item.quantity}</div>
          <button class="quantity-btn" data-type="plus">+</button>
        </div>
      </div>
    </div>
    `;
    })
    .join("");

  setupSelectAllCheckbox();
  calculateCartSummary();
}

// ======================== 수량 버튼 핸들 ========================
function setupQuantityButtons() {
  document.addEventListener("click", (e) => {
    if (e.target.matches(".quantity-btn")) {
      const btn = e.target;
      const itemId = parseInt(btn.closest(".cart-item").dataset.id, 10);
      const type = btn.dataset.type;
      const quantityEl = $(`.cart-item[data-id="${itemId}"] .num`);
      const newQuantity =
        type === "plus" ? increaseQuantity(itemId) : decreaseQuantity(itemId);

      if (newQuantity !== null && quantityEl) {
        quantityEl.textContent = newQuantity;
        calculateCartSummary();
      }
    }
  });
}

// ======================== 수량 변경 로직 ========================
function increaseQuantity(id) {
  const cart = getCartItems();
  const item = cart.find((item) => item.id === id);
  if (!item) return null;
  item.quantity++;
  localStorage.setItem("cart", JSON.stringify(cart));
  return item.quantity;
}

function decreaseQuantity(id) {
  const cart = getCartItems();
  const item = cart.find((item) => item.id === id);
  if (!item || item.quantity <= 1) return null;
  item.quantity--;
  localStorage.setItem("cart", JSON.stringify(cart));
  return item.quantity;
}

// ======================== 체크박스 ========================
function setupSelectAllCheckbox() {
  const selectAll = $("#select-all-items");
  if (!selectAll) return;

  selectAll.addEventListener("change", () => {
    $$(".cart-item input[type='checkbox']").forEach((cb) => {
      cb.checked = selectAll.checked;
    });
    calculateCartSummary();
  });

  $$(".cart-item input[type='checkbox']").forEach((cb) => {
    cb.addEventListener("change", () => {
      updateGlobalCheckboxState();
      calculateCartSummary();
    });
  });
}

function updateGlobalCheckboxState() {
  const selectAll = $("#select-all-items");
  const itemCheckboxes = $$(".cart-item input[type='checkbox']");
  const allChecked = [...itemCheckboxes].every((cb) => cb.checked);
  selectAll.checked = allChecked && itemCheckboxes.length > 0;
}

function getSelectedItemIds() {
  return [...$$(".cart-item input[type='checkbox']:checked")].map((cb) =>
    parseInt(cb.closest(".cart-item").dataset.id, 10)
  );
}

// ======================== 버튼 기능 ========================
function setupButtonHandlers() {
  const emptyCartBtn = $(".empty-cart");
  const buyNowBtn = $(".buy-now");

  if (emptyCartBtn) {
    emptyCartBtn.addEventListener("click", () => {
      const selected = getSelectedItemIds();
      if (!selected.length) return alert("삭제할 상품을 선택해주세요.");
      if (!confirm("선택한 상품을 삭제하시겠습니까?")) return;
      removeSelectedItems(selected);
      renderCartItems();
    });
  }

  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
      const selected = getSelectedItemIds();
      if (!selected.length) return alert("구매할 상품을 선택해주세요.");
      localStorage.setItem("selected-items", JSON.stringify(selected));
      location.href = "payment.html";
    });
  }
}

function removeSelectedItems(ids) {
  let cart = getCartItems();
  cart = cart.filter((item) => !ids.includes(item.id));
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCounter();
}

// ======================== 요약 계산 ========================
function calculateCartSummary() {
  const cart = getCartItems();
  const selectedIds = getSelectedItemIds();
  let total = 0;

  cart.forEach((item) => {
    if (selectedIds.includes(item.id)) {
      const product = productList.find((p) => p.id === item.id);
      if (product) {
        total += parseNumber(product.price) * item.quantity;
      }
    }
  });

  updateCartSummary(total, 0); // 배송비는 0원 고정
}

function updateCartSummary(total, shipping = 0) {
  const summaryValues = $$(".summary-value");
  if (summaryValues.length < 3) {
    console.warn("요약 값 요소를 찾을 수 없습니다.");
    return;
  }

  const [productEl, shippingEl, totalEl] = summaryValues;
  productEl.textContent = `${total.toLocaleString()} KRW`;
  shippingEl.textContent = `+ ${shipping.toLocaleString()} KRW`;
  totalEl.textContent = `${(total + shipping).toLocaleString()} KRW`;
}

// ======================== 사이드바 아코디언 ========================
function initSidebarAccordion() {
  $$(".sidebar .category .title-top").forEach((title) => {
    const sub = title.nextElementSibling;
    const icon = $("i", title);

    if (sub && icon) {
      sub.style.transition = "height 0.3s ease, opacity 0.3s ease";
      sub.style.overflow = "hidden";
      sub.style.display = "flex";
      sub.style.flexWrap = "wrap";

      title.addEventListener("click", () => {
        const isOpen = sub.style.height !== "0px";
        sub.style.height = isOpen ? "0px" : "auto";
        sub.style.opacity = isOpen ? "0" : "1";
        icon.style.transform = isOpen ? "rotate(90deg)" : "rotate(0deg)";
      });
    }
  });
}

// ======================== 브랜드 필터 내비게이션 ========================
function setupBrandNavigation() {
  // 사이드바의 브랜드 항목에 이벤트 리스너 추가
  $$(".sidebar .item[data-brand]").forEach((item) => {
    const brand = item.getAttribute("data-brand");
    item.addEventListener("click", () => {
      navigateToBrandDetail(brand);
    });
  });

  // 태블릿 내비게이션의 브랜드 항목에 이벤트 리스너 추가
  $$(".tablet-navigation .nav-item").forEach((item) => {
    const brand = item.textContent.trim();
    item.addEventListener("click", () => {
      navigateToBrandDetail(brand);
    });
  });
}

// 브랜드 상세 페이지로 이동하는 함수
function navigateToBrandDetail(brand) {
  if (!brand) return;

  // 브랜드 이름을 URL 파라미터로 인코딩
  const encodedBrand = encodeURIComponent(brand);

  // 필터링된 상세 페이지로 이동
  window.location.href = `detail.html?brand=${encodedBrand}`;

  // 선택된 브랜드를 로컬 스토리지에 저장 (선택 사항)
  localStorage.setItem("selectedBrand", brand);
}
