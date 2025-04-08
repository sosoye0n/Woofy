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
                <a href="#" title="clothes">CLOTHES</a>
              </li>
              <li>
                <a href="#" title="acc">ACC</a>
              </li>
              <li>
                <a href="#" title="life">LIFE</a>
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
                <a href="#" title="cart"><span>CART</span><i class="fa-solid fa-bag-shopping"></i><span>(0)</span>
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
