// detail.js
document.addEventListener("DOMContentLoaded", function () {
  // 부드러운 스크롤링 초기화
  initSmoothScrolling();

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
});

function initSmoothScrolling() {
  if (window.Lenis) {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
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
        const productImage = productItem.querySelector(".second-img").src;
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
          id: Date.now(),
          title: productTitle,
          price: productPrice,
          image: productImage,
          brand: productBrand,
          option: "default",
          quantity: 1,
        };

        // 공통 함수 사용하여 장바구니에 추가
        addToCart(product);

        // 모달 표시 (공통 함수 사용 가능)
        if (cartModal) {
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
