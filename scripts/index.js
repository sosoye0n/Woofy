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
      slidesPerView: 2, //브라우저가 768보다 클 때
      spaceBetween: 20,
    },
    500: {
      slidesPerView: 2, //브라우저가 768보다 클 때
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4, //브라우저가 1024보다 클 때
      spaceBetween: 20,
    },
  },
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },
});

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
        const itemLike = document.createElement("div");
        itemLike.classList.add("itemLike");
        itemLike.innerHTML = `
            <i class="fa-regular fa-heart"></i>
            <span>${item.like}</span>
          `;
        itemImg.appendChild(brandItemImg);
        itemContainer.append(itemImg, itemText);
        itemBox.append(itemContainer, itemLike);
        itemWrap.append(itemBox);
      });
      imgBox.appendChild(img);
      brandWrap.append(imgBox, textBox);
      flexBox.append(brandWrap, itemWrap);
      return flexBox;
      // const con = document.querySelector(`.con0${i}`)
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

    const itemLike = document.querySelectorAll(".itemLike i");
    itemLike.forEach((item) => {
      item.addEventListener("click", function () {
        const likeVal = this.parentElement.querySelector(".itemLike span");
        this.classList.toggle("fa-regular");
        this.classList.toggle("fa-solid");
        let likeNum = Number(likeVal.innerText);
        if (this.classList.contains("fa-solid")) {
          likeNum += 1;
          likeVal.innerText = likeNum;
          likeVal.style.color = "#99bdff";
        } else {
          likeNum -= 1;
          likeVal.innerText = likeNum;
          likeVal.style.color = "#a9a9a9";
        }
      });
    });
  })
);
