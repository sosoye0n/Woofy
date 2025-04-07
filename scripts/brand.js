fetch("./API/main.json").then((response) =>
  response.json().then((data) => {
    const keys = Object.keys(data);
    let products = null;
    const params = new URLSearchParams(window.location.search);
    const brand = params.get("brand");
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
