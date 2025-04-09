fetch("./API/main.json").then((response) =>
  response.json().then((data) => {
    const keys = Object.keys(data);
    let products = null;
    const params = new URLSearchParams(window.location.search);
    const brand = params.get("brand");
    const title = document.querySelector("title");
    title.innerText = brand;
    const fetchData = async () => {
      const response = await fetch("./API/detail.json");
      const product = await response.json();
      console.log(product.detail.find((i) => console.log(i.brand)));
      const matched = await product.detail.filter(
        (it) => it.brand.toLowerCase() === brand.toLowerCase()
      );
      const main = document.querySelector("main");
      const section = document.createElement("section");
      const ul = document.createElement("ul");
      if (matched) {
        console.log("gd");
      }
      for (let i = 0; i < matched.length; i++) {
        const li = document.createElement("li");
        li.classList.add("itemBox");
        li.innerHTML = `
          <a href="#">
              <div class="itemImg">
                <img
                  src="${matched[i].thumbnail}"
                  alt=""
                />
              </div>
              <div class="itemText">
                <p>${matched[i].brand}</p>
                <p>${matched[i].name}</p>
                <p>${matched[i].price} <span>KRW</span></p>
              </div>
            </a>
            `;
        ul.append(li);
      }
      section.append(ul);
      main.append(section);
    };
    fetchData();

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      products = data[key].find((item) => item.brand === brand);

      if (products) break; // 찾았으면 더 이상 루프 돌지 않음
    }

    if (products) {
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
    } else {
      console.warn("해당 브랜드 데이터를 찾을 수 없습니다.");
    }
  })
);
