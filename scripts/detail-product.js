// 스와이프 슬라이더 형식
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: false,

  pagination: {
    el: ".swiper-pagination",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// 본문내용
document.addEventListener("DOMContentLoaded", async function () {
  // URL에서 상품 ID 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  // 상품 데이터 로드 및 페이지 업데이트
  if (productId !== null && productId !== undefined) {
    try {
      // 모든 상품 데이터 가져오기
      const allProductsData = await fetchAllProducts();

      // 현재 상품 찾기
      const productData = allProductsData.detail.find(
        (item) => item.id === parseInt(productId, 10)
      );

      if (productData) {
        // 현재 상품 정보로 UI 업데이트
        updateProductUI(productData);

        // 관련 상품 표시 (같은 브랜드 & 카테고리)
        updateRelatedProducts(allProductsData.detail, productData);
      } else {
        console.error(`ID ${productId}에 해당하는 상품을 찾을 수 없습니다.`);
      }
    } catch (error) {
      console.error("상품 정보 로드 중 오류 발생:", error);
    }
  }

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

      // URL에서 가져온 ID를 사용하거나 없으면 Date.now() 사용
      const id = productId ? parseInt(productId, 10) : Date.now();

      // 상품 객체 생성
      const product = {
        id: id, // URL에서 가져온 ID를 사용
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

      // URL에서 가져온 ID를 사용하거나 없으면 Date.now() 사용
      const id = productId ? parseInt(productId, 10) : Date.now();

      // 상품 객체 생성
      const product = {
        id: id,
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

      // URL에서 가져온 ID를 사용하거나 없으면 Date.now() 사용
      const id = productId ? parseInt(productId, 10) : Date.now();

      // 상품 객체 생성
      const product = {
        id: id,
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

// 모든 상품 정보 가져오기
async function fetchAllProducts() {
  try {
    const response = await fetch("./API/detail.json");
    if (!response.ok) {
      throw new Error("JSON 파일을 가져오지 못했습니다.");
    }

    const data = await response.json();
    console.log("전체 JSON 데이터 로드됨:", data);
    return data;
  } catch (error) {
    console.error("데이터를 가져오는 중 오류 발생:", error);
    return { detail: [] };
  }
}

// 기존의 특정 상품 정보 가져오기 함수 (사용하지 않지만 유지)
async function fetchProductDetails(id) {
  try {
    const response = await fetch("./API/detail.json");
    if (!response.ok) {
      throw new Error("JSON 파일을 가져오지 못했습니다.");
    }

    const data = await response.json();
    console.log("JSON 데이터 로드됨:", data);

    // ID로 상품 찾기
    const product = data.detail.find((item) => item.id === parseInt(id, 10));

    if (!product) {
      console.warn(`ID ${id}에 해당하는 상품을 찾을 수 없습니다.`);
    }

    return product;
  } catch (error) {
    console.error("데이터를 가져오는 중 오류 발생:", error);
    return null;
  }
}

// 관련 상품 업데이트 (같은 브랜드와 카테고리)
function updateRelatedProducts(allProducts, currentProduct) {
  // 같은 브랜드와 카테고리의 상품 필터링
  let relatedProducts = allProducts.filter(
    (product) =>
      product.id !== currentProduct.id && // 현재 상품 제외
      product.brand === currentProduct.brand && // 같은 브랜드
      product.category === currentProduct.category // 같은 카테고리
  );

  // 같은 카테고리와 브랜드가 없으면 같은 브랜드만 필터링
  if (relatedProducts.length < 4) {
    relatedProducts = allProducts
      .filter(
        (product) =>
          product.id !== currentProduct.id && // 현재 상품 제외
          product.brand === currentProduct.brand // 같은 브랜드
      )
      .slice(0, 4); // 최대 4개
  }

  // 그래도 없으면 같은 카테고리만 필터링
  if (relatedProducts.length < 4) {
    relatedProducts = allProducts
      .filter(
        (product) =>
          product.id !== currentProduct.id && // 현재 상품 제외
          product.category === currentProduct.category // 같은 카테고리
      )
      .slice(0, 4); // 최대 4개
  }

  // 그래도 부족하면 다른 랜덤 상품으로 채우기
  if (relatedProducts.length < 4) {
    const remainingProducts = allProducts.filter(
      (product) =>
        product.id !== currentProduct.id && // 현재 상품 제외
        !relatedProducts.some((relProd) => relProd.id === product.id) // 이미 추가된 상품 제외
    );

    // 랜덤으로 섞고 필요한 만큼 가져오기
    const shuffled = remainingProducts.sort(() => 0.5 - Math.random());
    const additional = shuffled.slice(0, 4 - relatedProducts.length);

    relatedProducts = [...relatedProducts, ...additional];
  }

  // 최대 4개로 제한
  relatedProducts = relatedProducts.slice(0, 4);

  // "More Products" 섹션 업데이트
  const productGrid = document.querySelector(".product-grid");

  // 섹션 제목 업데이트 - 브랜드와 카테고리 표시
  const sectionTitle = document.querySelector(".section-title");
  if (sectionTitle) {
    if (
      relatedProducts[0]?.category === currentProduct.category &&
      relatedProducts[0]?.brand === currentProduct.brand
    ) {
      sectionTitle.textContent = `More ${
        currentProduct.brand
      } ${currentProduct.category.toUpperCase()} Products`;
    } else if (relatedProducts[0]?.brand === currentProduct.brand) {
      sectionTitle.textContent = `More ${currentProduct.brand} Products`;
    } else if (relatedProducts[0]?.category === currentProduct.category) {
      sectionTitle.textContent = `More ${currentProduct.category.toUpperCase()} Products`;
    } else {
      sectionTitle.textContent = "More Products";
    }
  }

  // 기존 상품 항목 비우기
  if (productGrid) {
    productGrid.innerHTML = "";

    // 관련 상품 추가
    relatedProducts.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.className = "product-item";

      productItem.innerHTML = `
        <a href="./detail-product.html?id=${product.id}" class="product-link">
          <div class="product-image">
            <img src="${product.thumbnail}" alt="${product.name}" />
          </div>
          <div class="product-info">
            <div class="product-inner">
              <div class="product-brand">${product.brand}</div>
              <div class="product-title">${product.name}</div>
              <p class="product-price">${product.price} KRW</p>
            </div>
          </div>
        </a>
      `;

      productGrid.appendChild(productItem);
    });
  }
}

// DOM에 상품 정보 표시하기
function updateProductUI(product) {
  if (!product) {
    console.error("상품 정보가 없습니다.");
    return;
  }

  // 1. 상품명 업데이트
  const titleElement = document.querySelector(".product-title");
  if (titleElement) {
    titleElement.textContent = product.name || "상품명 없음";
  }

  // 2. 가격 업데이트
  const priceElement = document.querySelector(".price-value");
  if (priceElement) {
    priceElement.textContent = product.price + " KRW";
  }

  // 3. 설명 업데이트
  const descElement = document.querySelector(".description-content p");
  if (
    descElement &&
    product["detail-product"] &&
    product["detail-product"].desc
  ) {
    descElement.textContent = product["detail-product"].desc;
  }

  // 4. 스와이퍼 슬라이드 이미지 업데이트
  const slides = document.querySelectorAll(".swiper-slide");
  const swiperContainer = document.querySelector(".swiper");
  const swiperNavButtons = document.querySelectorAll(
    ".swiper-button-prev, .swiper-button-next"
  );

  // 추가 이미지가 있는지 확인
  const hasAdditionalImages =
    product["detail-product"] &&
    (product["detail-product"].subImg01 ||
      product["detail-product"].subImg02 ||
      product["detail-product"].postImg01);

  // 첫 번째 슬라이드는 항상 thumbnail로 설정
  if (slides.length > 0) {
    // 모든 슬라이드에 페이드아웃 클래스 추가 (페이드 효과를 위해)
    slides.forEach((slide) => slide.classList.add("fade-out"));

    setTimeout(() => {
      // 썸네일 이미지 설정
      slides[0].style.backgroundImage = `url(${product.thumbnail})`;

      if (hasAdditionalImages) {
        // 추가 이미지가 있으면 슬라이더 활성화
        if (product["detail-product"].subImg01) {
          slides[1].style.backgroundImage = `url(${product["detail-product"].subImg01})`;
        }
        if (product["detail-product"].subImg02) {
          slides[2].style.backgroundImage = `url(${product["detail-product"].subImg02})`;
        }
        if (product["detail-product"].postImg01) {
          slides[3].style.backgroundImage = `url(${product["detail-product"].postImg01})`;
        }

        // 슬라이더 네비게이션 버튼 표시
        swiperNavButtons.forEach((button) => {
          button.style.display = "flex";
        });

        // 슬라이더 활성화 (이미 초기화되어 있으므로 update 호출)
        if (swiper) {
          swiper.update();
          swiper.slideTo(0, 0); // 첫 번째 슬라이드로 이동
        }
      } else {
        // 추가 이미지가 없으면 슬라이더 비활성화
        // 첫 번째 슬라이드 외의 모든 슬라이드 숨기기
        for (let i = 1; i < slides.length; i++) {
          slides[i].style.display = "none";
        }

        // 네비게이션 버튼 숨기기
        swiperNavButtons.forEach((button) => {
          button.style.display = "none";
        });
      }

      // 이미지 설정 후 페이드인 (투명도 효과 제거)
      setTimeout(() => {
        slides.forEach((slide) => {
          // 보이는 슬라이드만 페이드인
          if (slide.style.display !== "none") {
            slide.classList.remove("fade-out");
          }
        });
      }, 100);
    }, 50);
  }

  // 디버깅용 로그
  console.log("상품 정보 업데이트 완료:", product.name);
  console.log("상품 브랜드:", product.brand);
  console.log("상품 카테고리:", product.category);
  console.log("추가 이미지 있음:", hasAdditionalImages);
}

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

// 사이즈 선택 여부 확인
function checkOptionSelected(selector = ".option-select select") {
  const el = document.querySelector(selector);
  return el && el.selectedIndex !== 0;
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

// 장바구니에 추가하는 함수 (아직 구현하지 않았거나 다른 파일에 있는 경우를 대비한 더미 함수)
function addToCart(product) {
  // 로컬 스토리지에서 장바구니 가져오기
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // 이미 장바구니에 있는지 확인
  const existingProductIndex = cart.findIndex(
    (item) => item.id === product.id && item.option === product.option
  );

  if (existingProductIndex !== -1) {
    // 이미 있으면 수량만 증가
    cart[existingProductIndex].quantity += product.quantity;
  } else {
    // 없으면 새로 추가
    cart.push(product);
  }

  // 장바구니 저장
  localStorage.setItem("cart", JSON.stringify(cart));

  console.log("장바구니에 추가됨:", product);
}
