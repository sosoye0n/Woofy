// 본문내용 detail-product.js
document.addEventListener("DOMContentLoaded", function () {
  // 아코디언 기능 초기화
  setupAccordion();

  // 상품 옵션 및 버튼 기능 초기화
  setupProductOptions();

  // 장바구니 추가 버튼 이벤트 설정
  const addToCartBtn = document.querySelector(".add-to-cart-btn");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // 사이즈 선택 여부 확인 (공통 함수 사용)
      if (!checkOptionSelected()) {
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

      // 장바구니에 추가 (공통 함수 사용)
      addToCart(product);

      // 장바구니 추가 성공 알림
      alert("상품이 장바구니에 추가되었습니다.");
    });
  }

  // 바로 구매 버튼 이벤트 설정
  const buyNowBtn = document.querySelector(".buy-now-btn");
  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // 사이즈 선택 여부 확인 (공통 함수 사용)
      if (!checkOptionSelected()) {
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

  // 카카오페이 버튼 이벤트 설정
  const kakaoPayBtn = document.querySelector(".kakao-pay-btn");
  if (kakaoPayBtn) {
    kakaoPayBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // 사이즈 선택 여부 확인 (공통 함수 사용)
      if (!checkOptionSelected()) {
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
});

// 아코디언 기능 설정
function setupAccordion() {
  // 모든 아코디언 카테고리 요소 선택
  const categories = document.querySelectorAll(".category");

  // 초기 상태 설정 - 모든 서브카테고리 닫기
  categories.forEach((category) => {
    const subcategory = category.querySelector(".subcategory");
    subcategory.style.maxHeight = "0";
    subcategory.style.overflow = "hidden";
    subcategory.style.padding = "0";
    subcategory.style.transition = "max-height 0.3s ease, padding 0.3s ease";
  });

  // 각 카테고리 제목에 클릭 이벤트 추가
  categories.forEach((category) => {
    const titleTop = category.querySelector(".title-top");
    const icon = titleTop.querySelector("i");
    const subcategory = category.querySelector(".subcategory");

    titleTop.addEventListener("click", function () {
      // 현재 서브카테고리 토글
      if (
        subcategory.style.maxHeight === "0px" ||
        subcategory.style.maxHeight === ""
      ) {
        // 콘텐츠를 위한 충분한 공간 확보
        subcategory.style.maxHeight = subcategory.scrollHeight + "px";
        subcategory.style.padding = "0 0 15px";
        icon.style.transform = "rotate(90deg)";
      } else {
        subcategory.style.maxHeight = "0";
        subcategory.style.padding = "0";
        icon.style.transform = "rotate(0deg)";
      }
    });
  });
}

// 사이즈 선택 및 버튼 활성화 기능 설정
function setupProductOptions() {
  // 필요한 요소들 선택
  const sizeSelect = document.querySelector(".option-select select");
  const buyNowBtn = document.querySelector(".buy-now-btn");
  const addToCartBtn = document.querySelector(".add-to-cart-btn");
  const kakaoPayBtn = document.querySelector(".kakao-pay-btn");

  // 모든 버튼을 비활성화 상태로 초기화
  function disableButtons() {
    buyNowBtn.disabled = true;
    addToCartBtn.disabled = true;
    kakaoPayBtn.disabled = true;

    // 비활성화된 버튼 스타일 적용
    buyNowBtn.classList.add("disabled");
    addToCartBtn.classList.add("disabled");
    kakaoPayBtn.classList.add("disabled");

    // 버튼 스타일 변경
    buyNowBtn.style.opacity = "0.5";
    addToCartBtn.style.opacity = "0.5";
    kakaoPayBtn.style.opacity = "0.5";
    buyNowBtn.style.cursor = "not-allowed";
    addToCartBtn.style.cursor = "not-allowed";
    kakaoPayBtn.style.cursor = "not-allowed";
  }

  // 모든 버튼을 활성화 상태로 변경
  function enableButtons() {
    buyNowBtn.disabled = false;
    addToCartBtn.disabled = false;
    kakaoPayBtn.disabled = false;

    // 비활성화 클래스 제거
    buyNowBtn.classList.remove("disabled");
    addToCartBtn.classList.remove("disabled");
    kakaoPayBtn.classList.remove("disabled");

    // 버튼 스타일 복원
    buyNowBtn.style.opacity = "1";
    addToCartBtn.style.opacity = "1";
    kakaoPayBtn.style.opacity = "1";
    buyNowBtn.style.cursor = "pointer";
    addToCartBtn.style.cursor = "pointer";
    kakaoPayBtn.style.cursor = "pointer";
  }

  // 초기 상태: 버튼 비활성화
  disableButtons();

  // 사이즈 선택 시 이벤트
  if (sizeSelect) {
    sizeSelect.addEventListener("change", function () {
      const selectedIndex = this.selectedIndex;

      // 첫 번째 옵션(안내 메시지)이 아닌 실제 사이즈가 선택됐을 때만 버튼 활성화
      if (selectedIndex > 0) {
        enableButtons();
      } else {
        disableButtons();
      }
    });
  }
}
