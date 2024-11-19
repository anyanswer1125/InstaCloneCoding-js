const PostButton = document.querySelector('.Icon.Post');
const PostModal = document.querySelector('.PostModal');
const uploadPicture = document.querySelector('.uploadPicture');

const ProfileButton = document.querySelector('.Icon.User');
const ProfileModal = document.querySelector('.ProfileModal');

const MenuButton = document.querySelector('.Icon.Menu');
const MenuModal = document.querySelector('.MenuModal');

ProfileButton.addEventListener('click', () => {
  if (ProfileModal.style.display == 'block') {
    ProfileModal.style.display = 'none';
    return;
  }
  ProfileModal.style.display = 'block';
});

PostButton.addEventListener('click', () => {
  PostModal.style.display = 'block';
  window.onclick = function (event) {
    if (event.target == PostModal) {
      PostModal.style.display = 'none';
    }
  };
});

MenuButton.addEventListener('click', () => {
  if (MenuModal.style.display == 'block') {
    MenuModal.style.display = 'none';
    return;
  }
  MenuModal.style.display = 'block';
});

uploadPicture.addEventListener('click', () => {
  // 업로드 버튼에 대한 추가 동작 필요 시 여기에 작성
});

// {{로그인한 유저 불러오기}}
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (currentUser) {
  // 사용자 이름 표시
  const LoginName = document.getElementById('LoginName');
  const LoginUsername = document.getElementById('LoginUsername');
  LoginName.textContent = `${currentUser.name}`;
  LoginName.style.fontSize = '18px';
  LoginName.style.fontWeight = '700';

  LoginUsername.textContent = `${currentUser.username}`;
  LoginUsername.style.fontSize = '20px';
  LoginUsername.style.fontWeight = '600';
} else {
  // 로그인 정보가 없으면 로그인 페이지로 이동
  alert('로그인 정보가 없습니다. 다시 로그인해주세요.');
  window.location.href = '../HTML/login.html';
}

// 로그아웃 버튼
const LogoutButton = document.getElementById('LogoutButton');
LogoutButton.addEventListener('click', function () {
  // 현재 사용자 정보 삭제
  localStorage.removeItem('currentUser');
  alert('로그아웃 되었습니다.');
  window.location.href = '../HTML/login.html';
});

// 유저별 프로필 사진 저장 및 불러오기
const profileImg = document.getElementById('profilePicture');
const profileInput = document.getElementById('profileInput');
const changeProfile = document.getElementById('changeProfile');

// 유저별 키 생성 (예: "profilePicture_username")
let userKey = null;

if (currentUser) {
  userKey = `profilePicture_${currentUser.username}`; // 유저별 고유 키 생성
}

// [변경] 버튼 클릭 시 파일 선택 트리거
changeProfile.addEventListener('click', () => {
  profileInput.click();
});

// 파일 선택 시 이벤트
profileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      // 선택한 이미지를 프로필 사진에 적용
      profileImg.src = e.target.result;

      // 로컬스토리지에 유저별로 이미지 저장
      if (userKey) {
        localStorage.setItem(userKey, e.target.result);
        alert('프로필 사진이 변경되었습니다!');
      }
    };
    reader.readAsDataURL(file); // 이미지를 Base64로 변환
  }
});

// 페이지 로드 시 로컬스토리지에서 저장된 이미지 불러오기
window.addEventListener('DOMContentLoaded', () => {
  if (userKey) {
    const savedProfilePicture = localStorage.getItem(userKey);
    if (savedProfilePicture) {
      profileImg.src = savedProfilePicture;
    }
  }
});
