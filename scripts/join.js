const finalBtn = document.querySelector("#finalBtn");
const joinCancel = document.querySelector("#joinCancel");

finalBtn.addEventListener("click", () => {
  let isValid = true;

  const name = document.querySelector("#joinName");
  const phone = document.querySelector("#joinPhone");
  const id = document.querySelector("#joinId");
  const pw = document.querySelector("#joinPw");
  const pwCheck = document.querySelector("#joinPwCheck");

  const errorName = document.querySelector("#errorName");
  const errorPhone = document.querySelector("#errorPhone");
  const errorId = document.querySelector("#errorId");
  const errorPw01 = document.querySelector("#errorPw01");
  const errorPw02 = document.querySelector("#errorPw02");

  // 빈문자열일 때 유효성검사
  if (name.value === "") {
    errorName.innerHTML = `<i class="fas fa-circle-check"></i> 이름은 필수항목입니다.`; // 이름
    isValid = false;
  }
  if (phone.value === "") {
    errorPhone.innerHTML = `<i class="fas fa-circle-check"></i> 전화번호는 필수항목입니다..`; // 휴대폰번호
    isValid = false;
  }
  if (id.value === "") {
    errorId.innerHTML = `<i class="fas fa-circle-check"></i> 아이디는 필수항목입니다.`; // 아이디
    isValid = false;
  }
  if (pw.value.length < 4 || pw.value.length > 16) {
    errorPw01.innerHTML = `<i class="fas fa-circle-check"></i> 비밀번호는 4~16자 사이로 설정해주세요`; // 비밀번호
    isValid = false;
  }
  if (pw.value !== pwCheck.value) {
    errorPw02.innerHTML = `<i class="fas fa-circle-check"></i> 비밀번호가 일치하지 않습니다.`; // 비밀번호 일치
    isValid = false;
  }

  // 회원가입 완료
  if (isValid) {
    alert("회원가입을 축하드립니다🐶");
    location.href = "/welcome.html";
  }
});
