const cap = document.querySelector(".cap");
const clothe = document.querySelector(".clothe");
cap.addEventListener("click", () => {
  window.location.href = `detail-product.html?id=500`;
});
clothe.addEventListener("click", () => {
  window.location.href = `detail-product.html?id=15`;
});

const mySwiper = new Swiper(".swiper", {
  // slidesPerView: 1,
  // loop: true,
  effect: "fade",
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    slideChange: function () {
      updateContent(this.activeIndex);
    },
    // autoplay: {
    //   delay: 5000,
    //   disableOnInteraction: false,
    // },
  },
});

// 컨텐츠 업데이트 함수
function updateContent(index) {
  const data = contentData[index];

  const list1 = document.querySelector(".contentList01");
  list1.querySelector("img").src = data[0].img;
  list1.querySelector(".brand").textContent = data[0].brand;
  list1.querySelector(".name").textContent = data[0].name;
  list1.querySelector(".sale").innerHTML = data[0].sale;
  list1.onclick = () => {
    window.location.href = data[0].link;
  };

  const list2 = document.querySelector(".contentList02");
  list2.querySelector("img").src = data[1].img;
  list2.querySelector(".brand").textContent = data[1].brand;
  list2.querySelector(".name").textContent = data[1].name;
  list2.querySelector(".sale").innerHTML = data[1].sale;
  list2.onclick = () => {
    window.location.href = data[1].link;
  };

  const list3 = document.querySelector(".contentList03");
  list3.querySelector("img").src = data[2].img;
  list3.querySelector(".brand").textContent = data[2].brand;
  list3.querySelector(".name").textContent = data[2].name;
  list3.querySelector(".sale").innerHTML = data[2].sale;
  list3.onclick = () => {
    window.location.href = data[2].link;
  };
}

// 페이지 로드시 첫 슬라이드 컨텐츠 표시
window.addEventListener("DOMContentLoaded", () => {
  updateContent(0);
});

const contentData = [
  // Slide 1
  [
    {
      img: "https://cafe24.poxo.com/ec01/phypsdepartment/vaj/l9mdww1dKU1SVXHgYkMfOrcYJTPjHyBdJf3F6wSbC/uoZ0Ml39C+ckVoFnEh+CaOOH7oe4QbArPP6sjzCQ==/_/web/product/extra/big/202407/e93c9ced82cc80e409334ae092e80a76.jpg",
      brand: "YALE",
      name: "SPORTY NYLON T-SHIRT IVORY",
      sale: "<b>10%</b>39,000 KRW",
      link: `detail-product.html?id=101`,
    },
    {
      img: "./images/event/YALE-01.png",
      brand: "YALE",
      name: "SPORTY NYLON DOGGY T-SHIRT NAVY",
      sale: "<b>10%</b>39,000 KRW",
      link: `detail-product.html?id=100`,
    },

    {
      img: "https://cafe24.poxo.com/ec01/phypsdepartment/vaj/l9mdww1dKU1SVXHgYkMfOrcYJTPjHyBdJf3F6wSbC/uoZ0Ml39C+ckVoFnEh+CaOOH7oe4QbArPP6sjzCQ==/_/web/product/extra/small/202407/fff92ae07f5cf6afd0bbbdec934ad8d5.jpg",
      brand: "YALE",
      name: "SPORTY NYLON T-SHIRT NAVY",
      sale: "<b>15%</b>88,000 KRW",
    },
  ],
  // Slide 2
  [
    {
      img: "https://phyps-department.co.kr/web/upload/NNEditor/20240814/c5388bcddc8fe34e08d09a762c0c6eee.jpg",
      brand: "YALE",
      name: "[PET] 투톤아치 베이스볼 도기 후드 NAVY",
      sale: "<b>30%</b>20,300 KRW",
      link: `detail-product.html?id=91`,
    },
    {
      img: "https://phyps-department.co.kr/web/upload/NNEditor/20240814/70936f182bd459a2e97b8931b56ae852.jpg",
      brand: "YALE",
      name: "[PET] 투톤아치 베이스볼 도기 후드 GRAY",
      sale: "<b>30%</b>20,300 KRW",
      link: `detail-product.html?id=92`,
    },

    {
      img: "https://phyps-department.co.kr/web/upload/NNEditor/20240814/b3012be42031d668c9ef553c26a78594.jpg",
      brand: "YALE",
      name: "투톤아치 베이스볼 후드 GRAY",
      sale: "<b>20%</b>59,000 KRW",
    },
  ],
  // Slide 3
  [
    {
      img: "https://cafe24img.poxo.com/kimutaku4/web/product/big/202502/af8fa763aaa526d4afa4d073b5835280.jpg",
      brand: "EMIS",
      name: "[PET] BACKPACK POOP BAG-TEAL GREEN",
      sale: "<b>10%</b>45,000 KRW",
      link: `detail-product.html?id=48`,
    },
    {
      img: "https://en.emis.kr/web/product/big/202410/b8b4368f9ba5de8a6415779274163456.jpg",
      brand: "EMIS",
      name: "[PET] MINI CARRY BAG-TEAL GREEN",
      sale: "<b>10%</b>89,000 KRW",
    },
    {
      img: "https://emis.kr/web/product/big/202502/af1ff01bdaee046ee510c08b1fbf1609.jpg",
      brand: "EMIS",
      name: "[PET] FOLDING BOWL-YELLOW",
      sale: "19,000 KRW",
      link: `detail-product.html?id=44`,
    },
  ],
  // Slide 4
  [
    {
      img: "https://emis.kr/web/product/medium/202502/7b995adc096c2a1dbb3a3067a9cf93b3.jpg",
      brand: "EMIS",
      name: "FOOT PRINT WAPPEN BALL CAP-BLACK",
      sale: "<b>10%</b>49,000 KRW",
    },
    {
      img: "https://emis.kr/web/product/big/202502/770f0486b6ef739f65347d00bfbe72c1.jpg",
      brand: "EMIS",
      name: "[PET] WAPPEN BALL CAP-BLACK",
      sale: "<b>10%</b>89,000 KRW",
      link: `detail-product.html?id=5`,
    },
    {
      img: "https://emis.kr/web/product/big/202502/bf35f31d76e5c6f5c9437e33ffe6d4bc.jpg",
      brand: "EMIS",
      name: "[PET] FOOT PRINTED SWEAT SHIRT-GRAY",
      sale: "<b>10%</b>68,000 KRW",
      link: `detail-product.html?id=15`,
    },
  ],
  // Slide 5
  [
    {
      img: "https://static-resource.mlb-korea.com/cdn-cgi/image/q=75,w=717,format=auto,fit=scale-down,onerror=redirect/images/goods/ec/I21S72PEC111150B/thnail/B30B7B3CBDF145E78368C054D7BE2FAB.png",
      brand: "MLB",
      name: "[PET] 베이직 로고 캡 뉴욕양키스",
      sale: "<b>10%</b>29,000 KRW",
      link: `detail-product.html?id=120`,
    },
    {
      img: "https://static-resource.mlb-korea.com/cdn-cgi/image/q=75,w=1668,format=auto,fit=scale-down,onerror=redirect/images/goods/ec/I21S72PEC111150L/thnail/5B36B33ACD464B77AF4947F3C4A514DF.png",
      brand: "MLB",
      name: "[PET] 베이직 로고 캡 뉴욕양키스-BLACK",
      sale: "<b>10%</b>29,000 KRW",
      link: `detail-product.html?id=119`,
    },
    {
      img: "https://static-resource.mlb-korea.com/cdn-cgi/image/q=75,w=717,format=auto,fit=scale-down,onerror=redirect/images/goods/ec/I21S72PET111150L/thnail/FC18F20D2231437E8ACB6CD81E662099.png",
      brand: "MLB",
      name: "[PET] 모노그램 티셔츠 뉴욕양키스",
      sale: "<b>10%</b>39,000 KRW",
      link: `detail-product.html?id=107`,
    },
  ],
  // Slide 6
  [
    {
      img: "https://glowny.co.kr/web/product/big/202412/180e6ff52315b4144dc20534f5aa43e9.jpg",
      brand: "GLOWNY",
      name: "BESTIE TERRY PK TEE (CREAM)",
      sale: "<b>10%</b>65,000 KRW",
      link: `detail-product.html?id=55`,
    },
    {
      img: "https://glowny.co.kr/web/product/extra/small/202412/45fe19568e8e32e746618249605bf9b2.jpg",
      brand: "GLOWNY",
      name: "BESTIE TERRY PK TEE (BLACK)",
      sale: "<b>10%</b>65,000 KRW",
      link: `detail-product.html?id=58`,
    },
    {
      img: "https://glowny.co.kr/web/product/extra/small/202409/dbc7a39dcf76621aa5bd9f645880e697.jpg",
      brand: "GLOWNY",
      name: "TERRY PK LONG SLEEVE (BLACK)",
      sale: "108,000 KRW",
      // link: `detail-product.html?id=15`,
    },
  ],
];

// event1 modal
const modal = document.querySelector("#modalBg");
const openModal = document.querySelector(".coupon");
const closeModal = document.querySelector(".closeModal");
const modalBtn = document.querySelector(".modalBtn");

// open
openModal.addEventListener("click", () => {
  modal.classList.add("on");
});

// close
closeModal.addEventListener("click", closeModalHandler);
modalBtn.addEventListener("click", closeModalHandler);

// bg click close
modal.addEventListener("click", closeModalHandler);

// class remove
function closeModalHandler() {
  modal.classList.remove("on");
}

// event2 modal
const drawModal = document.querySelector("#modalDrawBg");
const openDrawModal = document.querySelector(".drawBtn");
const closeDrawModal = document.querySelector(".closeDrawModal");
const confirmBtn = document.querySelector(".modalDrawBtn");

// open
openDrawModal.addEventListener("click", () => {
  drawModal.classList.add("open");
});

[closeDrawModal, confirmBtn, drawModal].forEach((e) => {
  e.addEventListener("click", closeDrawModalHandler);
});

function closeDrawModalHandler() {
  drawModal.classList.remove("open");
}

// eventBtn scroll
const event1Btn = document.querySelectorAll(".btn");
event1Btn.forEach((item) => {
  item.addEventListener("click", () => {
    // console.log(this);
    // e.preventDefault();
    const targetId = item.getAttribute("data-target"); // 이동할 대상 ID 가져오기
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start", // 화면의 맨 위로 이동
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  function startCountdown(targetDate) {
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        document.getElementById("countdown").innerHTML = "이벤트 종료 ☻";
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hrs = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const sec = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("countdown").innerHTML =
        `${days}<span>days</span> ` +
        `${String(hrs).padStart(2, "0")} : ` +
        `${String(min).padStart(2, "0")} : ` +
        `${String(sec).padStart(2, "0")}`;
    }

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
  }

  const targetDate = new Date("2025-04-11T18:20:00").getTime();
  startCountdown(targetDate);
});
