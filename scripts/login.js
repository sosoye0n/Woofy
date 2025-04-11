const kakaoBtn = document.querySelector("#kakaoBtn"); // 카카오 로그인
const findUserInfo = document.querySelector("#searchInfo"); // 아이디 & 비번 찾기
const loginSuccesChange = document.querySelector(".loginSucces"); // 로그인 성공시 헤더 내 Login Btn
// 아이디 비번
const id = document.getElementById("id");
const password = document.getElementById("password");
const login = document.getElementById("loginBtn");
const errorId = document.querySelector("#errorId");
const errorPw = document.querySelector("#errorPw");

// 아이디 & 비번 찾기
findUserInfo.addEventListener("click", () => {
  alert("서비스 준비 중입니다. 조금만 기다려 주세요🙏🏻");
});

// 로그인
login.addEventListener("click", () => {
  if (id.value == "woofy") {
    if (password.value == "1234") {
      alert("안녕하세요 소연님, 마이페이지로 이동합니다🐶"); // 로그인 성공 시
      localStorage.setItem("userId", id.value);
      updateHeaderLoginState();
      loginSuccesChange.innerHTML = `<span>MYPAGE</span><i class="fa-solid fa-user"></i>`;
      location.href = "/mypage.html";
    } else {
      alert("아이디, 비밀번호를 다시 확인해주세요"); //실패시
      location.href = "/login.html";
    }
  } else if (id.value === "") {
    errorId.innerHTML = `<i class="fas fa-circle-check"></i> 아이디를 입력해주세요`;
  } else if (password.value === "") {
    errorPw.innerHTML = `<i class="fas fa-circle-check"></i> 비밀번호를 입력해주세요`;
  }
});

// 카카오 로그인
if (!window.Kakao.isInitialized()) {
  Kakao.init("47189641b4611f32a2f104d62bdbf0a5");
}
function handleKakaoLogin() {
  Kakao.Auth.login({
    success: function (authObj) {
      Kakao.API.request({
        url: "/v2/user/me",
        success: function (res) {
          const username = res.kakao_account.profile.username;
          alert(`환영합니다, ${username}님!`);
        },
      });
    },
    fail: function (err) {
      console.error("로그인 실패", err);
    },
  });
}
kakaoBtn.addEventListener("click", handleKakaoLogin);

// 로그인 성공시 헤더 변경
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
