// 카카오로 시작하기
const kakaoLogin = document.querySelector("#kakao");
// 아이디 & 비번 찾기
const findUserInfo = document.querySelector("#searchInfo");

// 카카오 시작하기 클릭이벤트
kakaoLogin.addEventListener("click", () => {
  alert("서비스 준비 중입니다. 조금만 기다려 주세요🙏🏻");
});

// 아이디 & 비번 클릭이벤트
findUserInfo.addEventListener("click", () => {
  alert("서비스 준비 중입니다. 조금만 기다려 주세요🙏🏻");
});

// 아이디 비번
const id = document.getElementById("id");
const password = document.getElementById("password");
const login = document.getElementById("loginBtn");
let errStack = 0;

// console.log(id, password, login);

// 로그인 이벤트
login.addEventListener("click", () => {
  // location.href = "../index.html";
  if (id.value == "woofy") {
    if (password.value == "0000") {
      alert("안녕하세요 소연님🐶");
      // location.href = "../index.html";
    } else {
      alert("아이디, 비밀번호를 다시 확인해주세요✋🏻");
      errStack++;
    }
  } else {
    alert("계정이 존재하지 않습니다");
  }
  if (errStack >= 3) {
    alert("비밀번호 입력 3회 오류입니다. 비밀번호 찾기를 시도하세요!");
  }
});
