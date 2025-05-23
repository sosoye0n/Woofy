// detail.js - 최종 완성본 (브랜드 필터링 문제 해결)

// 전역 변수로 선언하여 여러 함수에서 접근 가능하게 함
let selectedCategory = "";
let allProducts = []; // 모든 제품 데이터
let originalAllProducts = []; // 필터링 전 원본 데이터 보존
let selectedBrands = []; // 선택된 브랜드 배열
const PRODUCTS_PER_PAGE = 9; // 한 페이지에 보여줄 제품 수
const PAGES_PER_GROUP = 5; // 페이지 그룹당 페이지 수
let currentPage = 1;
let currentPageGroup = 1;

document.addEventListener("DOMContentLoaded", function () {
  const productGrid = document.querySelector(".product-grid");
  if (productGrid) {
    productGrid.classList.add("loading");
  }

  // URL에서 카테고리 파라미터 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  selectedCategory = urlParams.get("category");

  // 선택된 카테고리가 있으면 해당 카테고리의 헤더 메뉴 하이라이트
  if (selectedCategory) {
    highlightSelectedCategory(selectedCategory);
  }

  // 사이드바 아코디언 초기화
  initSidebarAccordion();

  // 태블릿 네비게이션 초기화
  initTabletNavigation();

  // 상품 그리드 및 장바구니 추가 기능 초기화
  initProductGrid();

  // 반응형 레이아웃 설정
  setupResponsiveLayout();

  // 장바구니 카운터 업데이트
  updateCartCounter();

  // 카테고리 링크에 이벤트 리스너 추가
  initCategoryLinks();
});

// 카테고리 링크 이벤트 리스너 초기화 함수
function initCategoryLinks() {
  const categoryLinks = document.querySelectorAll(".category-link");

  categoryLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const category = this.getAttribute("data-category");

      // URL 히스토리 업데이트 (페이지 새로고침 없이)
      const url = new URL(window.location);
      url.searchParams.set("category", category);
      window.history.pushState({}, "", url);

      // 카테고리 필터링 함수 호출
      filterByCategory(category);
    });
  });
}

// 선택된 카테고리의 헤더 메뉴 하이라이트 함수
function highlightSelectedCategory(category) {
  // 모든 카테고리 링크에서 'active' 클래스 제거
  document.querySelectorAll(".category-link").forEach((link) => {
    link.classList.remove("active");
  });

  // 선택된 카테고리에 'active' 클래스 추가
  document
    .querySelectorAll(`.category-link[data-category="${category}"]`)
    .forEach((link) => {
      link.classList.add("active");
    });
}

function filterByCategory(category) {
  // 선택된 카테고리 업데이트
  selectedCategory = category;

  // 필터 적용 함수 호출
  applyFilters();

  // 카테고리 하이라이트
  highlightSelectedCategory(category);
}

function addToCart(product) {
  // 현재 장바구니 가져오기
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // 이미 장바구니에 있는 상품인지 확인
  const existingItemIndex = cart.findIndex((item) => item.id === product.id);

  if (existingItemIndex > -1) {
    // 이미 있으면 수량만 증가
    cart[existingItemIndex].quantity += 1;
  } else {
    // 새 상품이면 추가
    cart.push(product);
  }

  // 장바구니 저장
  localStorage.setItem("cart", JSON.stringify(cart));

  // 장바구니 카운터 업데이트 (있다면)
  if (typeof updateCartCounter === "function") {
    updateCartCounter();
  }
}

function initProductGrid() {
  const plusButtons = document.querySelectorAll(".fa-plus");
  const cartModal = document.getElementById("cart-modal");
  const moveToCartBtn = document.querySelector(".move-to-cart-btn");
  const continueShoppingBtn = document.querySelector(".continue-shopping-btn");

  if (plusButtons.length > 0) {
    plusButtons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const productItem = this.closest(".product-item");
        let productId = productItem.getAttribute("data-id");
        if (!productId) {
          const productLink = productItem.querySelector(".product-link");
          if (productLink) {
            try {
              const url = new URL(productLink.href, window.location.origin);
              productId = url.searchParams.get("id");
            } catch (err) {}
          }
        }

        if (!productId) {
          productId = Number(Date.now());
        } else {
          // 문자열 ID를 숫자로 변환 (JSON에서는 ID가 숫자)
          productId = Number(productId);
        }
        const productImage =
          productItem.querySelector(".second-img")?.src ||
          productItem.querySelector(".first-img").src;
        const productTitle = productItem
          .querySelector(".product-title")
          .textContent.trim();
        const productPrice = productItem
          .querySelector(".product-price")
          .textContent.trim();
        const productBrand = productItem
          .querySelector(".product-brand")
          .textContent.trim();

        const product = {
          id: productId,
          title: productTitle,
          price: productPrice,
          image: productImage,
          brand: productBrand,
          option: "default",
          quantity: 1,
        };

        // 공통 함수 사용하여 장바구니에 추가
        addToCart(product);

        // 모달의 상품 제목 업데이트
        if (cartModal) {
          const itemTitleElement = cartModal.querySelector(".item-title");
          if (itemTitleElement) {
            itemTitleElement.textContent = productTitle;
          }

          // 모달 표시
          showCartModal("cart-modal");
        }
      });
    });
  }

  if (moveToCartBtn) {
    moveToCartBtn.addEventListener("click", function () {
      window.location.href = "cart.html";
    });
  }

  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", function () {
      if (cartModal) {
        hideCartModal("cart-modal");
      }
    });
  }

  if (cartModal) {
    cartModal.addEventListener("click", function (e) {
      if (e.target === cartModal) {
        hideCartModal("cart-modal");
      }
    });
  }
}

// showCartModal 함수가 코드에 없는 경우를 대비해 정의
function showCartModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "flex";
    // 부드러운 페이드인 효과
    setTimeout(() => {
      modal.style.opacity = "1";
    }, 10);
  }
}

// hideCartModal 함수가 코드에 없는 경우를 대비해 정의
function hideCartModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.opacity = "0";
    // 페이드 아웃 후 display 속성 변경
    setTimeout(() => {
      modal.style.display = "none";
    }, 300); // 트랜지션 시간과 일치시키기
  }
}

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

function initTabletNavigation() {
  const tabletNav = document.querySelector(".tablet-navigation");

  if (!tabletNav) return;

  const navHeaders = tabletNav.querySelectorAll(".nav-header");
  const navColumns = tabletNav.querySelectorAll(".nav-column");

  if (navColumns.length > 0) {
    navColumns[0].classList.add("active");
  }

  if (navHeaders.length > 0) {
    navHeaders[0].classList.add("active");
  }

  navHeaders.forEach((header, index) => {
    header.addEventListener("click", () => {
      navColumns.forEach((column) => {
        column.classList.remove("active");
      });

      if (navColumns[index]) {
        navColumns[index].classList.add("active");
      }

      navHeaders.forEach((h) => h.classList.remove("active"));
      header.classList.add("active");
    });
  });
}

function setupResponsiveLayout() {
  function handleResize() {
    const sidebar = document.querySelector(".sidebar");
    const tabletNav = document.querySelector(".tablet-navigation");

    if (window.innerWidth <= 1024) {
      if (sidebar) sidebar.style.display = "none";
      if (tabletNav) tabletNav.style.display = "block";
    } else {
      if (sidebar) sidebar.style.display = "block";
      if (tabletNav) tabletNav.style.display = "none";
    }
  }

  window.addEventListener("resize", handleResize);

  handleResize();
}

// 장바구니 카운터 업데이트 함수 수정
function updateCartCounter() {
  // 모든 가능한 장바구니 카운터 선택자
  const cartCounters = [
    document.querySelector(".cart-count"),
    document.querySelector(".cart-counter"),
    document.querySelector("#rightGnb ul li a[title='cart'] span:last-child"),
  ];

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalItems = 0;

  cart.forEach((item) => {
    totalItems += item.quantity || 1;
  });

  // 모든 존재하는 카운터 업데이트
  cartCounters.forEach((counter) => {
    if (counter) {
      counter.textContent = `(${totalItems})`;
      counter.style.display = "inline-block";
    }
  });
}

// 필터 적용 함수 - 브랜드 필터링 개선
function applyFilters() {
  // 카테고리와 브랜드 필터링 함께 적용
  let filteredProducts = originalAllProducts;

  // 카테고리 필터 적용 - luxury와 luxery 모두 처리
  if (selectedCategory) {
    // luxury/luxery 일치 문제 해결
    if (
      selectedCategory.toLowerCase() === "luxury" ||
      selectedCategory.toLowerCase() === "luxery"
    ) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.category &&
          (product.category.toLowerCase() === "luxury" ||
            product.category.toLowerCase() === "luxery")
      );
    } else {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
  }

  // 브랜드 필터 적용 - 대소문자 무시 및 부분 일치 처리로 개선
  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter((product) => {
      if (!product.brand) return false;

      // 선택된 브랜드 중 하나라도 일치하면 포함
      return selectedBrands.some((selectedBrand) => {
        return product.brand
          .toLowerCase()
          .includes(selectedBrand.toLowerCase());
      });
    });
  }

  // 필터링된 결과로 allProducts 업데이트
  allProducts = filteredProducts;

  // 총 페이지 수 재계산
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  // 첫 페이지 제품 로드
  const firstPageProducts = filteredProducts.slice(0, PRODUCTS_PER_PAGE);
  updateProductItems(firstPageProducts, true);

  // 페이지네이션 재설정
  initPagination(totalPages);

  // 제품 갯수 표시 업데이트
  updateProductCount(filteredProducts.length);

  // 현재 페이지 리셋
  currentPage = 1;
  currentPageGroup = 1;
}

// 브랜드 필터 함수 (색상 기능이 구현된 버전)
function initBrandFilters() {
  // 브랜드 필터 요소들 선택
  const brandItems = document.querySelectorAll(
    ".sidebar .category .subcategory .item, " +
      ".tablet-nav-container .nav-column .nav-item"
  );

  // 브랜드 필터 이벤트 리스너 추가
  brandItems.forEach((item) => {
    // 저장된 선택 상태 복원
    const brandName = item.textContent.trim();
    const brandValue = item.getAttribute("data-brand") || brandName;

    if (selectedBrands.includes(brandValue)) {
      item.classList.add("selected");
    }

    // 클릭 이벤트 처리
    item.addEventListener("click", function (e) {
      e.preventDefault();

      const brandName = this.textContent.trim();
      const brandValue = this.getAttribute("data-brand") || brandName;

      // 토글 선택
      if (selectedBrands.includes(brandValue)) {
        // 이미 선택된 경우 선택 해제
        selectedBrands = selectedBrands.filter((brand) => brand !== brandValue);
        this.classList.remove("selected");
      } else {
        // 선택되지 않은 경우 선택
        selectedBrands.push(brandValue);
        this.classList.add("selected");
      }

      // 동일한 브랜드를 가진 다른 요소들의 선택 상태 동기화
      syncBrandSelections(brandValue);

      // 필터 적용
      applyFilters();
    });
  });
}

// 브랜드 선택 상태 동기화 함수
function syncBrandSelections(brandValue) {
  const brandItems = document.querySelectorAll(
    ".sidebar .category .subcategory .item, " +
      ".tablet-nav-container .nav-column .nav-item"
  );

  brandItems.forEach((item) => {
    const itemBrand =
      item.getAttribute("data-brand") || item.textContent.trim();

    if (itemBrand === brandValue) {
      if (selectedBrands.includes(brandValue)) {
        item.classList.add("selected");
      } else {
        item.classList.remove("selected");
      }
    }
  });
}

// 썸네일 이미지 업데이트 + 페이지네이션
document.addEventListener("DOMContentLoaded", async function () {
  try {
    // JSON 데이터 로드
    const productGrid = document.querySelector(".product-grid");
    if (productGrid) {
      productGrid.classList.add("loading");
    }

    const response = await fetch("./API/detail.json");

    if (!response.ok) {
      throw new Error("JSON 파일을 가져오지 못했습니다.");
    }

    const data = await response.json();

    // 모든 제품 데이터 저장
    originalAllProducts = data.detail;

    // URL에서 선택된 카테고리가 있는 경우, 해당 카테고리의 제품만 필터링
    if (selectedCategory) {
      // luxury/luxery 일치 문제 해결
      if (
        selectedCategory.toLowerCase() === "luxury" ||
        selectedCategory.toLowerCase() === "luxery"
      ) {
        allProducts = originalAllProducts.filter(
          (product) =>
            product.category &&
            (product.category.toLowerCase() === "luxury" ||
              product.category.toLowerCase() === "luxery")
        );
      } else {
        allProducts = originalAllProducts.filter(
          (product) =>
            product.category &&
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      }
    } else {
      allProducts = [...originalAllProducts];
    }

    // 첫 로드 시 제품 페이지네이션
    initializeProductDisplay();

    setTimeout(() => {
      if (productGrid) {
        productGrid.classList.remove("loading");
      }
    }, 100);

    // 브랜드 필터 초기화 - DOM 완전 로드 후
    initBrandFilters();
  } catch (error) {
    const productGrid = document.querySelector(".product-grid");
    if (productGrid) {
      productGrid.classList.remove("loading");
    }
  }

  // 초기 제품 디스플레이 초기화 함수
  function initializeProductDisplay() {
    // 총 페이지 수 계산
    const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);

    // 첫 페이지 제품 로드 (페이지네이션 초기화 전에 기존 DOM 구조 보존)
    const firstPageProducts = allProducts.slice(0, PRODUCTS_PER_PAGE);
    updateProductItems(firstPageProducts, true); // 기존 DOM 구조 보존

    // 페이지네이션 초기화 (제품이 로드된 후)
    initPagination(totalPages);

    // 제품 갯수 표시 업데이트
    updateProductCount(allProducts.length);
  }

  // 제품 갯수 표시 업데이트 함수
  function updateProductCount(count) {
    const productCountElement = document.querySelector(".product-count");
    if (productCountElement) {
      productCountElement.textContent = `총 ${count}개의 상품`;
    }
  }

  // 페이지네이션 초기화 함수
  function initPagination(totalPages) {
    const pagination = document.querySelector(".pagination");
    if (!pagination) {
      return;
    }

    const prevPageBtn = pagination.querySelector(".prev-page");
    const nextPageBtn = pagination.querySelector(".next-page");
    const pageNumbers = pagination.querySelector(".page-numbers");

    // 기존 페이지 번호 초기화
    pageNumbers.innerHTML = "";

    // 현재 페이지 그룹의 시작 페이지와 끝 페이지 계산
    const startPage = (currentPageGroup - 1) * PAGES_PER_GROUP + 1;
    let endPage = currentPageGroup * PAGES_PER_GROUP;
    endPage = Math.min(endPage, totalPages);

    // 페이지 번호 생성
    for (let i = startPage; i <= endPage; i++) {
      const li = document.createElement("li");
      if (i === currentPage) {
        li.classList.add("active");
      }

      const a = document.createElement("a");
      a.href = "#";
      a.textContent = i;

      // 페이지 번호 클릭 이벤트
      a.addEventListener("click", function (e) {
        e.preventDefault();
        goToPage(i, totalPages);
      });

      li.appendChild(a);
      pageNumbers.appendChild(li);
    }

    // 이전/다음 페이지 버튼 이벤트 리스너 설정
    prevPageBtn.onclick = function (e) {
      e.preventDefault();
      if (currentPageGroup > 1) {
        currentPageGroup--;
        const newPage = (currentPageGroup - 1) * PAGES_PER_GROUP + 1;
        goToPage(newPage, totalPages);
      }
    };

    nextPageBtn.onclick = function (e) {
      e.preventDefault();
      const maxPageGroup = Math.ceil(totalPages / PAGES_PER_GROUP);
      if (currentPageGroup < maxPageGroup) {
        currentPageGroup++;
        const newPage = (currentPageGroup - 1) * PAGES_PER_GROUP + 1;
        goToPage(newPage, totalPages);
      }
    };
  }

  // 특정 페이지로 이동하는 함수
  function goToPage(pageNumber, totalPages) {
    currentPage = pageNumber;

    // 현재 페이지 그룹 계산
    currentPageGroup = Math.ceil(currentPage / PAGES_PER_GROUP);

    // 현재 필터링된 제품 데이터 사용
    const filteredProducts = allProducts;

    // 현재 페이지에 해당하는 제품 데이터 추출
    const startIndex = (pageNumber - 1) * PRODUCTS_PER_PAGE;
    const endIndex = Math.min(
      startIndex + PRODUCTS_PER_PAGE,
      filteredProducts.length
    );
    const pageProducts = filteredProducts.slice(startIndex, endIndex);

    // 제품 업데이트
    updateProductItems(pageProducts, true);

    // 페이지네이션 번호 업데이트
    initPagination(totalPages);
  }
});

async function updateProductItems(products, recreateDOM = false) {
  if (!products || products.length === 0) {
    // 제품이 없을 때 "제품이 없습니다" 메시지 표시
    const productGrid = document.querySelector(".product-grid");
    if (productGrid) {
      productGrid.classList.add("loading");
      setTimeout(() => {
        productGrid.innerHTML =
          '<div class="no-product-message"><p>해당 조건에 맞는 제품이 없습니다.</p></div>';
        productGrid.classList.remove("loading");
      }, 300);
    }
    return;
  }

  // 업데이트 시작할 때 loading 클래스 추가
  const productGrid = document.querySelector(".product-grid");
  if (productGrid) {
    productGrid.classList.add("loading");
  }

  // 타이머를 사용하여 화면 전환
  setTimeout(() => {
    if (recreateDOM) {
      // DOM 요소 새로 생성 방식 (페이지 변경 시)
      if (!productGrid) {
        return;
      }

      // 기존 제품 항목들 모두 제거
      productGrid.innerHTML = "";

      // 제품을 3개씩 묶어서 row로 만들기
      for (let i = 0; i < products.length; i += 3) {
        // product-row 요소 생성
        const productRow = document.createElement("div");
        productRow.className = "product-row";

        // 현재 행에 최대 3개의 제품 추가
        for (let j = 0; j < 3 && i + j < products.length; j++) {
          try {
            const productData = products[i + j];
            const productItem =
              createProductItemWithExistingStructure(productData);
            productRow.appendChild(productItem);
          } catch (error) {}
        }

        productGrid.appendChild(productRow);
      }

      // 중요: 제품 그리드가 생성된 후에 플러스 버튼에 이벤트 리스너 재등록
      const newPlusButtons = productGrid.querySelectorAll(".fa-plus");
      if (newPlusButtons.length > 0) {
        newPlusButtons.forEach(function (button) {
          button.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            const productItem = this.closest(".product-item");
            let productId = productItem.getAttribute("data-id");

            if (!productId) {
              const productLink = productItem.querySelector(".product-link");
              if (productLink) {
                try {
                  const url = new URL(productLink.href, window.location.origin);
                  productId = url.searchParams.get("id");
                } catch (err) {}
              }
            }

            if (!productId) {
              productId = Number(Date.now());
            } else {
              productId = Number(productId);
            }

            const productImage =
              productItem.querySelector(".second-img")?.src ||
              productItem.querySelector(".first-img").src;
            const productTitle = productItem
              .querySelector(".product-title")
              .textContent.trim();
            const productPrice = productItem
              .querySelector(".product-price")
              .textContent.trim();
            const productBrand = productItem
              .querySelector(".product-brand")
              .textContent.trim();

            const product = {
              id: productId,
              title: productTitle,
              price: productPrice,
              image: productImage,
              brand: productBrand,
              option: "default",
              quantity: 1,
            };

            // 공통 함수 사용하여 장바구니에 추가
            addToCart(product);

            // 모달의 상품 제목 업데이트
            const cartModal = document.getElementById("cart-modal");
            if (cartModal) {
              const itemTitleElement = cartModal.querySelector(".item-title");
              if (itemTitleElement) {
                itemTitleElement.textContent = productTitle;
              }

              // 모달 표시
              showCartModal("cart-modal");
            }
          });
        });
      }
    } else {
      // 기존 DOM 요소 업데이트 방식 (첫 로드 시)
      const productItems = document.querySelectorAll(".product-item");
      if (productItems.length === 0) {
        return;
      }

      const itemCount = Math.min(productItems.length, products.length);

      for (let i = 0; i < itemCount; i++) {
        try {
          const productItem = productItems[i];
          const productData = products[i];

          // 이미지 업데이트
          updateProductImages(productItem, productData);

          // 텍스트 정보 업데이트
          updateProductInfo(productItem, productData);
        } catch (error) {}
      }
    }

    // 업데이트 후 로딩 상태 제거
    setTimeout(() => {
      if (productGrid) {
        productGrid.classList.remove("loading");
      }
    }, 100);
  }, 300);
}

// 이미지 업데이트 함수
function updateProductImages(productItem, productData) {
  const firstImg = productItem.querySelector(".first-img");
  const productImageDiv = productItem.querySelector(".product-image");
  let secondImg = productItem.querySelector(".second-img");

  // 첫 번째 이미지(썸네일) 업데이트
  if (firstImg) {
    firstImg.src = productData.thumbnail || "";
  }

  // 두 번째 이미지 처리 (subImg01이 있고 빈 문자열이 아닌 경우에만 표시)
  const hasValidSecondImg =
    productData["detail-product"] &&
    productData["detail-product"].subImg01 &&
    productData["detail-product"].subImg01.trim() !== "";

  // 기존 second-img 제거 (트랜지션 문제 방지)
  if (secondImg) {
    secondImg.remove();
  }

  if (hasValidSecondImg) {
    secondImg = document.createElement("img");
    secondImg.className = "second-img";
    secondImg.src = productData["detail-product"].subImg01;
    secondImg.alt = productData.name || "";
    productImageDiv.appendChild(secondImg);
  }
}

// 텍스트 정보 업데이트 함수
function updateProductInfo(productItem, productData) {
  const productLink = productItem.querySelector(".product-link");
  const brandElement = productItem.querySelector(".product-brand");
  const nameElement = productItem.querySelector(".product-title");
  const priceElement = productItem.querySelector(".product-price");

  if (productLink) {
    productLink.href = `./detail-product.html?id=${productData.id}`;
  }

  if (brandElement) {
    brandElement.textContent = productData.brand || "";
  }

  if (nameElement) {
    nameElement.textContent = productData.name || "";
  }

  if (priceElement) {
    priceElement.textContent = (productData.price || "0") + " KRW";
  }

  if (productData.category) {
    productItem.setAttribute("data-category", productData.category);
  }

  // data-id 속성 추가/업데이트
  if (productData.id !== undefined) {
    productItem.setAttribute("data-id", productData.id);
  }
}

function createProductItemWithExistingStructure(productData) {
  // subImg01 존재 여부와 빈 문자열이 아닌지 확인
  const hasValidSecondImg =
    productData["detail-product"] &&
    productData["detail-product"].subImg01 &&
    productData["detail-product"].subImg01.trim() !== "";

  // 두 번째 이미지 HTML은 유효한 이미지가 있는 경우에만 생성
  const secondImgHtml = hasValidSecondImg
    ? `<img class="second-img" src="${
        productData["detail-product"].subImg01
      }" alt="${productData.name || ""}">`
    : ""; // 아예 요소 자체를 생성하지 않음

  // 기본 템플릿 HTML 구조
  const productItemHTML = `
    <div class="product-item" data-id="${productData.id}" ${
    productData.category ? `data-category="${productData.category}"` : ""
  }>
      <a href="./detail-product.html?id=${
        productData.id || ""
      }" class="product-link">
        <div class="product-image">
          <img class="first-img" src="${productData.thumbnail || ""}" alt="${
    productData.name || ""
  }">
          ${secondImgHtml}
        </div>
        <div class="product-info">
          <div class="product-inner">
            <div class="product-brand">${productData.brand || ""}</div>
            <h3 class="product-title">${productData.name || ""}</h3>
            <p class="product-price"><span>${
              productData.price || "0"
            }</span> KRW</p>
          </div>
          <i class="fas fa-plus"></i>
        </div>
      </a>
    </div>
  `;

  // HTML 문자열을 DOM 요소로 변환
  const tempContainer = document.createElement("div");
  tempContainer.innerHTML = productItemHTML.trim();

  // 첫 번째 자식 요소 반환
  return tempContainer.firstChild;
}
