const mySwiper = new Swiper(".swiper", {
  effect: "fade",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".pagination-progressbar",
    type: "progressbar",
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});
const pagingSwiper = new Swiper(".swiper", {
  // loop: true,
  effect: "fade",
  pagination: {
    el: ".pagination-fraction",
    type: "fraction",
  },
});
mySwiper.controller.control = pagingSwiper;

fetch("./API/main.json").then((response) =>
  response.json().then((data) => {
    const keys = Object.keys(data);
    const dataFunc = (item) => {
      const flexBox = document.createElement("div");
      flexBox.classList.add("flexBox");

      const brandWrap = document.createElement("a");
      brandWrap.href = `./brand.html?brand=${encodeURIComponent(item.brand)}`;
      const imgBox = document.createElement("div");
      imgBox.classList.add("imgBox");

      const img = document.createElement("img");
      img.src = item.mainImg;
      img.classList.add(`${item.imgClass}`);
      const textBox = document.createElement("div");
      textBox.classList.add("textBox");
      textBox.innerHTML = `
      <p>${item.mainTitle}</p>
      <p>${item.subTitle}</p>
      `;
      const itemWrap = document.createElement("div");

      itemWrap.classList.add("itemWrap");

      const url = "./API/detail.json";
      const fetchData02 = async () => {
        const response = await fetch(url);
        const data = await response.json();
        const addItem = (e) => {
          const itemBox = document.createElement("div");
          itemBox.classList.add("itemBox");

          const itemContainer = document.createElement("a");
          itemContainer.href = "#";

          const itemImg = document.createElement("div");
          itemImg.classList.add("itemImg");

          const brandItemImg = document.createElement("img");
          brandItemImg.src = e.thumbnail;
          const itemText = document.createElement("div");
          itemText.classList.add("itemText");
          itemText.innerHTML = `
          <p>${e.brand}</p>
          <p>${e.name}</p>
          <p>
            <span>${e.price}</span> KRW
          </p>
          `;

          itemImg.appendChild(brandItemImg);
          itemContainer.append(itemImg, itemText);
          itemBox.append(itemContainer);
          itemWrap.append(itemBox);
          imgBox.appendChild(img);
          brandWrap.append(imgBox, textBox);
          flexBox.append(brandWrap, itemWrap);
        };
        const emisItem = await data.detail.filter(
          (i) => i.brand.toLowerCase() === item.nameEng.toLowerCase()
        );
        const emisItemList = emisItem.slice(0, 2);
        emisItemList.forEach((e) => {
          addItem(e);
        });
        var image = document.getElementsByClassName("thumbnail");
        new simpleParallax(image, {
          scale: 1.2,
          orientation: "up",
          delay: 1,
        });
        var image = document.getElementsByClassName("thumbnail2");
        new simpleParallax(image, {
          scale: 1.2,
          orientation: "down",
          delay: 1,
        });
      };

      fetchData02();
      return flexBox;
    };
    const con = document.querySelectorAll(".con");
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const conBox = con[i];

      data[key].forEach((item) => {
        const flexBox = dataFunc(item);
        conBox.append(flexBox);
      });
    }
    const fetchData = async () => {
      const response = await fetch("./API/detail.json");
      const subData = await response.json();
      const itemBoxClick = document.querySelectorAll(".itemBox");
      itemBoxClick.forEach((item) => {
        item.addEventListener("click", function () {
          const itemTitle = this.querySelector(
            ".itemBox p:nth-child(2)"
          ).innerText;
          const itemObj = subData.detail.filter((i) => i.name === itemTitle);
          const link = itemObj[0].id;
          window.location = `./detail-product.html?id=${link}`;
        });
      });

      // 핀 슬라이더
      const ss01 = document.querySelector(".ss01");
      const ss02 = document.querySelector(".ss02");
      const ss03 = document.querySelector(".ss03");
      const ss04 = document.querySelector(".ss04");
      const ss05 = document.querySelector(".ss05");
      ss01.addEventListener("click", () => {
        window.location = "./brand.html?brand=GUCCI";
      });
      ss02.addEventListener("click", () => {
        window.location = "./brand.html?brand=Àvie muah";
      });
      ss03.addEventListener("click", () => {
        window.location = "./brand.html?brand=merlot";
      });
      ss04.addEventListener("click", () => {
        window.location = "./brand.html?brand=emis";
      });
      ss05.addEventListener("click", () => {
        window.location = "./brand.html?brand=GLOWNY";
      });
      const ToplikeCnt = [];
      const latestRelease = [];
      let FinalNum = [];
      let FinalNum02 = [];
      let mostPopular = [];
      let last = [];
      const keys = Object.keys(subData.detail);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const likeNum = subData.detail[key].LikeCnt;
        const time = subData.detail[key].time;
        const title = subData.detail[key].title;
        ToplikeCnt.push(likeNum);
        const popularNum = ToplikeCnt.sort((a, b) => b - a);
        latestRelease.push(time);
        const timeNum = latestRelease.sort((a, b) => a - b);
        FinalNum = popularNum.slice(0, 10);
        FinalNum02 = timeNum.slice(0, 10);
      }
      FinalNum.forEach((num) => {
        const matches = subData.detail.filter((i) => i.LikeCnt === num);
        mostPopular.push(matches);
      });
      FinalNum02.forEach((num) => {
        const matches = subData.detail.filter((i) => i.time === num);
        last.push(matches);
      });
      const mostPopularWrap = document.querySelector(".mostPopular");
      const latestReleaseWrap = document.querySelector(".latestRelease");
      const swiper02 = document.createElement("div");
      const swiper03 = document.createElement("div");
      swiper02.classList.add("swiper02");
      swiper03.classList.add("swiper02");
      const swiperTitle = document.createElement("h2");
      swiperTitle.innerText = "Most Popular";
      const swiperTitle02 = document.createElement("h2");
      swiperTitle02.innerText = "Lastest Release";
      const swiperWrapper = document.createElement("div");
      swiperWrapper.classList.add("swiper-wrapper");
      const swiperWrapper02 = document.createElement("div");
      swiperWrapper02.classList.add("swiper-wrapper");
      const swiperBtnNext = document.createElement("div");
      swiperBtnNext.classList.add("swiper-button-next");
      const swiperBtnPrev = document.createElement("div");
      swiperBtnPrev.classList.add("swiper-button-prev");
      const swiperBtnNext02 = document.createElement("div");
      swiperBtnNext02.classList.add("swiper-button-next");
      const swiperBtnPrev02 = document.createElement("div");
      swiperBtnPrev02.classList.add("swiper-button-prev");
      for (let i = 0; i < mostPopular.length; i++) {
        const swiperSlide = document.createElement("div");
        swiperSlide.classList.add("swiper-slide");
        swiperSlide.innerHTML = `
          <a href="#">
          <div class="productImg">
                  <img
                    src="${mostPopular[i][0].thumbnail}"
                    alt=""
                  />
                </div>
                <div class="itemText">
                  <p>${mostPopular[i][0].brand}</p>
                  <p>${mostPopular[i][0].name}</p>
                  <p>
                    <span>${mostPopular[i][0].price}</span> KRW
                  </p>
                </div>
          </a>
        `;
        swiperWrapper.append(swiperSlide);
      }
      for (let i = 0; i < last.length; i++) {
        const swiperSlide02 = document.createElement("div");
        swiperSlide02.classList.add("swiper-slide");
        swiperSlide02.innerHTML = `
          <a href="#">
          <div class="productImg">
                  <img
                    src="${last[i][0].thumbnail}"
                    alt=""
                  />
                </div>
                <div class="itemText">
                  <p>${last[i][0].brand}</p>
                  <p>${last[i][0].name}</p>
                  <p>
                    <span>${last[i][0].price}</span> KRW
                  </p>
                </div>
          </a>
        `;
        swiperWrapper02.append(swiperSlide02);
      }

      swiper02.append(swiperTitle, swiperWrapper, swiperBtnNext, swiperBtnPrev);
      swiper03.append(
        swiperTitle02,
        swiperWrapper02,
        swiperBtnNext02,
        swiperBtnPrev02
      );
      mostPopularWrap.append(swiper02);
      latestReleaseWrap.append(swiper03);
      const popularLatest = document.querySelectorAll(
        ".flexCon02 .swiper-slide "
      );
      popularLatest.forEach((item) => {
        item.addEventListener("click", function () {
          const itemTitle = this.querySelector(
            ".itemText p:nth-child(2)"
          ).innerText;
          const itemObj = subData.detail.filter((i) => i.name === itemTitle);
          const link = itemObj[0].id;
          window.location = `./detail-product.html?id=${link}`;
        });
      });
      const mySwiper02 = new Swiper(".swiper02", {
        slidesPerView: 4,
        spaceBetween: 20,
        // loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          340: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          500: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        },
        // autoplay: {
        //   delay: 5000,
        //   disableOnInteraction: false,
        // },
      });
    };
    fetchData();
  })
);
