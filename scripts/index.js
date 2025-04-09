const mySwiper = new Swiper(".swiper", {
  // slidesPerView: 1,
  // loop: true,
  effect: "fade",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".pagination-progressbar",
    type: "progressbar",
  },
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },
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
      const subItems = item.brandItem.subItems;
      subItems.forEach((item) => {
        itemWrap.classList.add("itemWrap");
        const itemBox = document.createElement("div");
        itemBox.classList.add("itemBox");

        const itemContainer = document.createElement("a");
        itemContainer.href = "#";

        const itemImg = document.createElement("div");
        itemImg.classList.add("itemImg");

        const brandItemImg = document.createElement("img");
        brandItemImg.src = item.itemImg;
        const itemText = document.createElement("div");
        itemText.classList.add("itemText");
        itemText.innerHTML = `
          <p>${item.itemBrand}</p>
          <p>${item.itemTitle}</p>
          <p>
            <span>${item.itemDc}%</span>
            <span>${item.itemPrice}원</span>
          </p>
          `;
        // const itemLike = document.createElement("div");
        // itemLike.classList.add("itemLike");
        // itemLike.innerHTML = `
        //     <i class="fa-regular fa-heart"></i>
        //     <span>${item.like}</span>
        //   `;
        itemImg.appendChild(brandItemImg);
        itemContainer.append(itemImg, itemText);
        itemBox.append(itemContainer);
        itemWrap.append(itemBox);
      });
      imgBox.appendChild(img);
      brandWrap.append(imgBox, textBox);
      flexBox.append(brandWrap, itemWrap);
      return flexBox;
    };
    const con = document.querySelectorAll(".con");
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]; // "data01", "data02" 등
      const conBox = con[i]; // .con01, .con02 등

      data[key].forEach((item) => {
        const flexBox = dataFunc(item); // DOM 요소 생성
        conBox.append(flexBox); // 해당 영역에 append
      });
    }
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
    const fetchData = async () => {
      const response = await fetch("./API/detail.json");
      const subData = await response.json();
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
                    <span>${mostPopular[i][0].price} KRW</span>
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
                    <span>${last[i][0].price} KRW</span>
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
    // fetch("./API/detail.json").then((response) =>
    //   response.json().then((subData) => {
    //     // const keys = Object.keys(subData.detail);
    //     const likeCntAll = [];
    //     // const key = keys[i];
    //     const likeCnt = subData.detail.LikeCnt;
    //     likeCntAll.push(likeCnt);
    //     likeCntAll.sort((a, b) => b - a);
    //     const popularNum = likeCntAll.slice(0, 10);
    //     const popularProduct = subData.detail.filter(
    //       (i) => i.LikeCnt === popularNum
    //     );
    //     console.log(popularProduct);
    //   })
    // );
  })
);
