// 헤더
const header = document.querySelector("header");
const headerInner = `
<<<<<<< HEAD
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
              <li class="promotionTitle">
                <a href="event.html" title="event">스프링시즌세일</a>
              </li>
            </ul>
          </nav>
          <nav id="rightGnb">
            <ul>
              <li>
                <a href="#" title="search">SEACH</a>
              </li>
              <li>
                <a href="#" title="cart">CART(<span>0</span>)</a>
              </li>
              <li>
                <a href="login.html" title="login">LOGIN</a>
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
=======
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
          <li class="promotionTitle">
            <a href="event.html" title="event">스프링시즌세일</a>
          </li>
        </ul>
      </nav>
      <h1 id="logo">
        <a href="index.html" title="Home">WOOFY©</a>
      </h1>
      <button id="toggleBtn">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav id="rightGnb">
        <ul>
          <li>
            <a href="#" title="search">SEACH</a>
          </li>
          <li>
            <a href="#" title="cart">CART(<span>0</span>)</a>
          </li>
          <li>
            <a href="login.html" title="login">LOGIN</a>
          </li>
          <li>
            <a href="mypage.html" title="mypage">mypage</a>
          </li>
        </ul>
      </nav>
>>>>>>> 613cdede0f0b28b794c3f5f83decf56692bd7e7f
`;
header.innerHTML = headerInner;

const toggleBtn = document.querySelector("#toggleBtn");
const leftGnb = document.querySelector("#leftGnb");
toggleBtn.addEventListener("click", function () {
  this.classList.toggle("active");
  leftGnb.classList.toggle("active");
  header.classList.toggle("blendMode");
  document.body.classList.toggle("active");
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
