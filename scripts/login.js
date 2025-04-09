// 카카오 버튼
const kakaoLogin = document.querySelector("#kakaoBtn");
// 아이디 & 비번 찾기
const findUserInfo = document.querySelector("#searchInfo");
// 로그인 -> 마이페이지 변경
// const loginSuccesChange = document.querySelector(".mypageSucces");
const loginSuccesChange = document.querySelector(".loginSucces");
// const headerBtn = document.querySelector("header");

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

const errorId = document.querySelector("#errorId");
const errorPw = document.querySelector("#errorPw");

// 로그인
login.addEventListener("click", () => {
  if (id.value == "woofy") {
    if (password.value == "1234") {
      alert("안녕하세요 소연님🐶");
      // 로그인 성공 시에만 저장
      localStorage.setItem("userId", id.value);
      updateHeaderLoginState();
      loginSuccesChange.innerHTML = `<span>MYPAGE</span><i class="fa-solid fa-user"></i>`;
      location.href = "/mypage.html"; // mypage 들어가면 -> 헤더 login으로 다시 바뀜ㅜㅜ
    } else {
      alert("아이디, 비밀번호를 다시 확인해주세요✋🏻");
      location.href = "/login.html";
    }
  } else if (id.value === "") {
    errorId.innerHTML = `<i class="fas fa-circle-check"></i> 아이디를 입력해주세요.`;
  } else if (password.value === "") {
    errorPw.innerHTML = `<i class="fas fa-circle-check"></i> 비밀번호를 입력해주세요.`;
  }
});

// 로그인 성공사 헤더 변경
function updateHeaderLoginState() {
  const userId = localStorage.getItem("userId");

  if (userId) {
    loginSuccesChange.innerText = "mypage";
    loginSuccesChange.setAttribute("href", "/mypage.html");
  } else {
    loginSuccesChange.innerText = "login";
  }
}

// 회원가입
const joinBtn = document.querySelector("#joinBtn");
joinBtn.addEventListener("click", () => {
  location.href = "/join.html";
});
