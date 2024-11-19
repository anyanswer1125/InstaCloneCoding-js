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

      // 네비게이션 바의 프로필 아이콘도 업데이트
      const userProfileIcon = document.getElementById('userProfileIcon');
      userProfileIcon.src = e.target.result;

      // 로컬스토리지에 유저별로 이미지 저장
      if (userKey) {
        localStorage.setItem(userKey, e.target.result);
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
      const userProfileIcon = document.getElementById('userProfileIcon');
      userProfileIcon.src = savedProfilePicture;
    }
  }
});

// 부모 요소
const mainContainer = document.querySelector('.Main');

// 업로드 버튼
const submitPostButton = document.getElementById('submitPost');

// 좋아요 상태를 저장할 객체
const likeData = JSON.parse(localStorage.getItem('likes')) || {};

// 게시물 삭제 함수
function deletePost(postId) {
  // 로컬스토리지에서 게시물 삭제
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  const updatedPosts = posts.filter(post => post.id !== postId);
  localStorage.setItem('posts', JSON.stringify(updatedPosts));

  // DOM에서 게시물 삭제
  const postElement = document.querySelector(`[data-post-id="${postId}"]`).closest('.POST');
  postElement.remove();
}

// 게시물을 DOM에 추가하는 함수
function addPostToDOM(postData) {
  const newPost = document.createElement('div');
  newPost.className = 'POST';

  // 생성할 게시물의 HTML
  newPost.innerHTML = `
    <div class="PostProfile">
      <img class="PostProfileImg" src="${postData.profilePicture}" alt="Profile Image">
      <p class="ProfileName">${postData.username}</p>
      <p class="uploadDate">${postData.uploadDate}</p>
      ${
        postData.username === currentUser.username
          ? `<button class="delete-btn" data-post-id="${postData.id}">삭제</button>`
          : ''
      }
    </div>
    <img class="PostIMG" src="${postData.postImage}" alt="Post Image">
    <div class="SnsBtn">
      <i class="fa-heart ${
        likeData[postData.id]?.includes(currentUser.username) ? 'fa-solid' : 'fa-regular'
      }" data-post-id="${postData.id}"></i> <!-- 좋아요 버튼 -->
      <i class="fa-regular fa-comment"></i>
      <i class="fa-regular fa-paper-plane"></i>
    </div>
    <div class="HwoLikes">
      <p class="like-info">${postData.likes.length > 0 ? postData.likes.join(', ') : '좋아요 없음'}</p>
    </div>
    <div class="PostInfo">
      <p class="ProfileName">${postData.username}</p>
      <p class="PostText">${postData.postText}</p>
    </div>
    <div class="CommentLine"></div>
    <hr class="BtwPost">
  `;

  // 좋아요 버튼에 클릭 이벤트 추가
  const likeButton = newPost.querySelector('.fa-heart');
  likeButton.addEventListener('click', () => toggleLike(postData.id, likeButton));

  // 삭제 버튼에 클릭 이벤트 추가
  const deleteButton = newPost.querySelector('.delete-btn');
  if (deleteButton) {
    deleteButton.addEventListener('click', () => {
      if (confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
        deletePost(postData.id);
      }
    });
  }

  // 게시글을 화면에 추가
  mainContainer.prepend(newPost);
}

// 좋아요 토글 함수
function toggleLike(postId, button) {
  const userNickname = currentUser ? currentUser.username : 'guest';
  if (!likeData[postId]) {
    likeData[postId] = [];
  }

  // 현재 유저가 좋아요를 누른 상태인지 확인
  const userIndex = likeData[postId].indexOf(userNickname);
  if (userIndex === -1) {
    // 좋아요 추가
    likeData[postId].push(userNickname);
    button.classList.remove('fa-regular');
    button.classList.add('fa-solid');
    button.style.color = 'red'; // 좋아요 눌렀을 때 빨간색
  } else {
    // 좋아요 제거
    likeData[postId].splice(userIndex, 1);
    button.classList.remove('fa-solid');
    button.classList.add('fa-regular');
    button.style.color = ''; // 기본 색상으로 복원
  }

  // 로컬스토리지에 저장
  localStorage.setItem('likes', JSON.stringify(likeData));

  // UI 업데이트
  updateLikeInfo(postId);
}

// 좋아요 정보 업데이트
function updateLikeInfo(postId) {
  const postElement = document.querySelector(`[data-post-id="${postId}"]`).closest('.POST');
  const likeInfo = postElement.querySelector('.like-info');
  const likes = likeData[postId] || [];
  likeInfo.textContent = likes.length > 0 ? likes.join(', ') : '좋아요 없음';
}

// 이벤트 리스너: 게시물 업로드
submitPostButton.addEventListener('click', () => {
  const imageUpload = document.getElementById('imageUpload');
  const postContent = document.getElementById('postContent');

  // 유효성 검사
  if (!imageUpload.files[0]) {
    alert('이미지를 업로드해주세요.');
    return;
  }
  if (!postContent.value.trim()) {
    alert('내용을 입력해주세요.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const newPostData = {
      id: `post_${Date.now()}`, // 고유 ID 생성
      username: currentUser ? currentUser.username : 'guest',
      profilePicture: currentUser
        ? localStorage.getItem(`profilePicture_${currentUser.username}`) || '../Source/POST/Default_pfp.jpg'
        : '../Source/POST/Default_pfp.jpg',
      postImage: e.target.result,
      postText: postContent.value,
      uploadDate: new Date().toLocaleString(),
      likes: [], // 초기 좋아요 배열
    };

    // 로컬스토리지에 저장된 게시물 가져오기
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.unshift(newPostData);

    // 로컬스토리지에 업데이트
    localStorage.setItem('posts', JSON.stringify(posts));

    // 새 게시글 화면에 추가
    addPostToDOM(newPostData);

    // 폼 초기화
    imageUpload.value = '';
    postContent.value = '';
    alert('게시글이 업로드되었습니다.');
    PostModal.style.display = 'none';
  };

  reader.readAsDataURL(imageUpload.files[0]);
});

// 페이지 로드 시 게시글 및 좋아요 상태 복원
window.addEventListener('DOMContentLoaded', () => {
  const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
  const savedLikes = JSON.parse(localStorage.getItem('likes')) || {};

  // 최신 게시물이 위로 오도록 역순 정렬
  savedPosts.reverse();

  savedPosts.forEach((postData) => {
    postData.likes = savedLikes[postData.id] || [];
    addPostToDOM(postData);
  });
});
