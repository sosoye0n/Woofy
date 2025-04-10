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
                <a href="./detail.html?category=clothes" title="clothes" class="category-link" data-category="clothes">CLOTHES</a>
              </li>
              <li>
                <a href="./detail.html?category=acc" title="acc" class="category-link" data-category="acc">ACC</a>
              </li>
              <li>
                <a href="./detail.html?category=life" title="life" class="category-link" data-category="life">LIFE</a>
              </li>
              <li>
              <a href="mypage.html" title="mypage" >MYPAGE</a>
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
                <a href="login.html" title="login" class="loginSucces"><span>LOGIN</span>
                <i class="fa-solid fa-user"></i></a>
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
            <a href="./detail.html?category=clothes" title="clothes" class="category-link" data-category="clothes">CLOTHES</a>
          </li>
          <li>
            <a href="./detail.html?category=acc" title="acc" class="category-link" data-category="acc">ACC</a>
          </li>
          <li>
            <a href="./detail.html?category=life" title="life" class="category-link" data-category="life">LIFE</a>
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

// 카테고리 필터링 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("detail.html")) {
    const categoryLinks = document.querySelectorAll(".category-link");

    categoryLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const category = this.getAttribute("data-category");

        // URL 히스토리 업데이트 (페이지 새로고침 없이)
        const url = new URL(window.location);
        url.searchParams.set("category", category);
        window.history.pushState({}, "", url);

        if (typeof filterByCategory === "function") {
          filterByCategory(category);
        }

        // 선택된 카테고리 하이라이트
        highlightSelectedCategory(category);
      });
    });
  } else {
    // 다른 페이지에서는 기존 방식 유지
    const categoryLinks = document.querySelectorAll(".category-link");
    categoryLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const category = this.getAttribute("data-category");
        window.location.href = `detail.html?category=${category}`;
      });
    });
  }
});

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
  header.style.transform = "none";
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

// 장바구니 관련 함수들
function getCartItems() {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
}

function saveCart(data) {
  const str = JSON.stringify(data);
  localStorage.setItem("cart", str);
}

function addToCart(product) {
  const cart = getCartItems();
  const i = cart.findIndex((p) => p.id === product.id);
  if (i !== -1) {
    cart[i].quantity += 1;
  } else {
    cart.push({
      ...product,
      id: product.id,
      quantity: product.quantity || 1,
      option: product.option || "기본",
    });
  }
  saveCart(cart);
  updateCartCounter();
  return cart;
}

function removeCartItem(id) {
  const newCart = getCartItems().filter((item) => item.id !== id);
  saveCart(newCart);
  updateCartCounter();
  return newCart;
}

function clearCart() {
  saveCart([]);
  updateCartCounter();
}

function showCartModal(id = "cart-modal") {
  const m = document.getElementById(id);
  if (m) {
    m.classList.add("show");
    m.style.display = "flex";
  }
}

function hideCartModal(id = "cart-modal") {
  const m = document.getElementById(id);
  if (m) {
    m.classList.remove("show");
    m.style.display = "none";
  }
}
