const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const query = urlParams.get("search");
const url = "./API/detail.json";
const searchText = document.querySelector("h2");
const filterWrap = document.querySelector(".filterWrap");
const length = document.querySelector(".filterWrap span");
searchText.innerHTML = `"${query}"<span>에 대한 검색 결과입니다.</span>`;

const fetchData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  const searchResult = document.querySelector("#searchResult");

  let matched = data.detail.filter(
    (i) =>
      i.name.toLowerCase().includes(query.toLowerCase()) ||
      i.brand.toLowerCase().includes(query.toLowerCase())
  );
  length.innerText = matched.length;
  if (query === "" || matched.length === 0) {
    filterWrap.innerText = "";
    matched = [];
    searchResult.innerHTML = `
      <div class="nothingSearch">
        <i class="fa-solid fa-circle-xmark"></i>
        <p>죄송합니다, 검색 결과가 없습니다.</p>
        <p>다른 검색어로 다시 시도해보세요.</p>
      </div>
    `;
  }
  const section = document.createElement("section");
  const ul = document.createElement("ul");
  const addData = () => {
    for (let i = 0; i < matched.length; i++) {
      const li = document.createElement("li");
      li.classList.add("itemBox");
      li.innerHTML = `
        <a href="#">
            <div class="itemImg">
              <img
                src="${matched[i].thumbnail}"
                alt="${matched[i].brand}"
              />
              <img
                src="${matched[i]["detail-product"].subImg01}"
                alt="${matched[i].brand}"
              />
            </div>
            <div class="itemText">
              <p>${matched[i].brand}</p>
              <p>${matched[i].name}</p>
              <p><span>${matched[i].price}</span> KRW</p>
            </div>
          </a>
          `;
      ul.append(li);
      section.append(ul);
      searchResult.append(section);
    }
  };
  const removeData = () => {
    ul.innerText = "";
  };
  const newData = () => {
    matched.sort((a, b) => b.time - a.time);
    addData();
  };
  const likeData = () => {
    matched.sort((a, b) => b.LikeCnt - a.LikeCnt);
    addData();
  };
  const priceData = () => {
    matched.sort((a, b) => {
      const priceA = Number(a.price.replace(/,/g, ""));
      const priceB = Number(b.price.replace(/,/g, ""));
      return priceB - priceA;
    });
    addData();
  };
  const priceDataRe = () => {
    matched.sort((a, b) => {
      const priceA = Number(a.price.replace(/,/g, ""));
      const priceB = Number(b.price.replace(/,/g, ""));
      return priceA - priceB; // 오름차순
    });
    addData();
  };
  newData();
  let select = document.querySelector("select");
  select.addEventListener("change", () => {
    if (select.value === "신상품순") {
      removeData();
      newData();
    } else if (select.value === "판매많은순") {
      removeData();
      likeData();
    } else if (select.value === "가격높은순") {
      removeData();
      priceData();
    } else {
      removeData();
      priceDataRe();
    }
  });
  const itemBox = document.querySelectorAll(".itemBox");
  itemBox.forEach((item) => {
    item.addEventListener("click", function () {
      const itemTitle = this.querySelector(
        ".itemText p:nth-child(2)"
      ).innerText;
      const itemObj = data.detail.filter((i) => i.name === itemTitle);
      const link = itemObj[0].id;
      window.location = `./detail-product.html?id=${link}`;
    });
  });
};
fetchData();
