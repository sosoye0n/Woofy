fetch("./API/main.json").then((response) =>
  response.json().then((data) => {
    const keys = Object.keys(data);
    let products = null;
    const params = new URLSearchParams(window.location.search);
    const brand = params.get("brand");
    const title = document.querySelector("title");
    const brandTitle = document.createElement("h2");
    brandTitle.innerHTML = `${brand.toUpperCase()} <span>PRODUCTS</span>`;
    title.innerText = brand;

    const fetchData = async () => {
      const response = await fetch("./API/detail.json");
      const product = await response.json();
      let matched = await product.detail.filter(
        (it) => it.brand.toLowerCase() === brand.toLowerCase()
      );
      const main = document.querySelector("main");
      const section = document.createElement("section");
      const ul = document.createElement("ul");
      const filterWrap = document.createElement("div");
      filterWrap.classList.add("filterWrap");

      const addData = () => {
        for (let i = 0; i < matched.length; i++) {
          const li = document.createElement("li");
          li.classList.add("itemBox");
          li.innerHTML = `
            <a href="#">
                <div class="itemImg">
                  <img class="firstImg"
                    src="${matched[i].thumbnail}"
                    alt="${matched[i].brand}"
                  />
                  <img class="secImg"
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
      filterWrap.innerHTML = `
        <p><span>${matched.length}</span>개의 상품</p>
        <select>
          <option>신상품순</option>
          <option>판매많은순</option>
          <option>가격높은순</option>
          <option>가격낮은순</option>
        </select>
      `;
      section.append(brandTitle, filterWrap, ul);
      main.append(section);
      let select = document.querySelector("select");
      newData();
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
          const itemObj = product.detail.filter((i) => i.name === itemTitle);
          const link = itemObj[0].id;
          window.location = `./detail-product.html?id=${link}`;
        });
      });
    };
    fetchData();

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      products = data[key].find((item) => item.brand === brand);

      if (products) break; // 찾았으면 더 이상 루프 돌지 않음
    }

    const main = document.querySelector("main");
    main.innerHTML = `
        <div class="brandBanner">
          <div class="brandText">
            <p>${products.nameEng}</p>
            <p>${products.name}</p>
            <p>${products.desc}</p>
          </div>
        </div>
      `;

    const brandBanner = document.querySelector(".brandBanner");
    brandBanner.style.backgroundImage = `url("${products.brandBanner}")`;
  })
);
