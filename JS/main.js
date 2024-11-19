const PostButton = document.querySelector('.Icon.Post');
const PostModal = document.querySelector('.PostModal');
const uploadPicture = document.querySelector('.uploadPicture');

const ProfileButton = document.querySelector('.Icon.User');
const ProfileModal = document.querySelector('.ProfileModal');

ProfileButton.addEventListener('click', () => {
  
  if (ProfileModal.style.display == 'block'){
    // alert("이미 표시중이다임마");
    ProfileModal.style.display = 'none';
    return;
  }

  // alert("버튼 누름!");
  ProfileModal.style.display = 'block';
});




PostButton.addEventListener('click', () => {
  // alert("버튼 누름!");
  PostModal.style.display = 'block';

  window.onclick = function(event) {
    if (event.target == PostModal) {
      PostModal.style.display = 'none';
    }
  }
})

uploadPicture.addEventListener('click',() => {
  
})


// {{로그인한 유저 불러오기}}

const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (currentUser) {
    // 사용자 이름 표시
    const LoginName = document.getElementById('LoginName');
    const LoginUsername = document.getElementById('LoginUsername')
    LoginName.textContent = `${currentUser.name}`;
    LoginName.style.fontSize = "18px";
    LoginName.style.fontWeight = "700";

    LoginUsername.textContent = `${currentUser.username}`;
    LoginUsername.style.fontSize ="20px";
    LoginUsername.style.fontWeight ="600";

} else {
    // 로그인 정보가 없으면 로그인 페이지로 이동
    alert('로그인 정보가 없습니다. 다시 로그인해주세요.');
    window.location.href = '../HTML/login.html';
}

// // 로그아웃 버튼
// const logoutBtn = document.getElementById('logoutBtn');
// logoutBtn.addEventListener('click', function () {
//     // 현재 사용자 정보 삭제
//     localStorage.removeItem('currentUser');
//     alert('로그아웃 되었습니다.');
//     window.location.href = '../HTML/login.html';
// });