let currentUser = null;

// Header를 불러와 삽입하는 함수
function loadHeader(targetId = "header") {
  fetch("header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById(targetId).innerHTML = data;
      checkAuthStatus(); // 헤더 삽입 후 인증 상태 확인 실행
    });
}

// 로그인 상태 확인 및 UI 업데이트
function updateAuthUI() {
  const authSection = document.getElementById("auth-section");

  if (!authSection) return; // header가 아직 로드 안된 경우 방지

  if (currentUser) {
    // 로그인 상태
    authSection.innerHTML = `
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle user-profile" href="#" id="userDropdown" role="button"
          data-bs-toggle="dropdown" aria-expanded="false">
          <img src="${currentUser.profileImage}" alt="Profile" class="profile-img">
          <span>${currentUser.name}</span>
        </a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
          <li><a class="dropdown-item" href="profile.html">마이 페이지</a></li>
          <li><a class="dropdown-item" href="train_log.html">운동 기록</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#" id="logout-link">로그아웃</a></li>
        </ul>
      </li>
    `;

    // 로그아웃 이벤트
    document.getElementById("logout-link").addEventListener("click", function (e) {
      e.preventDefault();
      logout();
    });
  } else {
    // 로그아웃 상태
    authSection.innerHTML = `
      <a id="login-button" class="nav-link active d-flex" aria-current="page" href="login.html"
        style="color: white;">로그인</a>
    `;
  }
}

// 로그아웃 함수
function logout() {
  currentUser = null;
  sessionStorage.removeItem("loggedInUser");
  updateAuthUI();
  console.log("로그아웃 완료");
}

// 인증 상태 확인
function checkAuthStatus() {
  const loggedInUserEmail = sessionStorage.getItem("loggedInUser");

  if (loggedInUserEmail) {
    const storedUserData = localStorage.getItem(loggedInUserEmail);
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      currentUser = {
        email: loggedInUserEmail,
        name: userData.name,
        profileImage: userData.profileImage || "SSAFIT/assets/img/16e87a77f81454959.png"
      };
    }
  }
  updateAuthUI();
}
