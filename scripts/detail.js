// detail.js - 장바구니 기능을 위한 스크립트

document.addEventListener("DOMContentLoaded", function () {
  // 장바구니 관련 요소 선택
  const plusButtons = document.querySelectorAll(".fa-plus");
  const cartModal = document.getElementById("cart-modal");
  const moveToCartBtn = document.querySelector(".move-to-cart-btn");
  const continueShoppingBtn = document.querySelector(".continue-shopping-btn");

  // 페이지 로드 시 장바구니 카운터 업데이트
  updateCartCounter();

  // 장바구니에 상품 추가 기능 설정
  if (plusButtons.length > 0) {
    plusButtons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        // 상품 정보 가져오기
        const productItem = this.closest(".product-item");
        const productImage = productItem.querySelector(".second-img").src;
        const productTitle =
          productItem.querySelector(".product-title").textContent;
        const productPrice =
          productItem.querySelector(".product-price").textContent;
        const productBrand =
          productItem.querySelector(".product-brand").textContent;

        // 상품 객체 생성
        const product = {
          id: Date.now(),
          title: productTitle,
          price: productPrice,
          image: productImage,
          brand: productBrand,
          option: "beige", // 기본 옵션 설정
          quantity: 1,
        };

        // 장바구니에 추가
        addToCart(product);

        // 모달 표시
        if (cartModal) {
          cartModal.style.display = "flex";
        }
      });
    });
  }

  // 모달 버튼 이벤트 설정
  if (moveToCartBtn) {
    moveToCartBtn.addEventListener("click", function () {
      window.location.href = "cart.html";
    });
  }

  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", function () {
      if (cartModal) {
        cartModal.style.display = "none";
      }
    });
  }

  // 모달 외부 클릭 시 닫기
  if (cartModal) {
    cartModal.addEventListener("click", function (e) {
      if (e.target === cartModal) {
        cartModal.style.display = "none";
      }
    });
  }
});

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
