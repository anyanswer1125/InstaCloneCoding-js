const btn = document.querySelector('.RegisterBtn');

    const IdInput = document.querySelector('.id') 
    const PwdInput = document.querySelector('.pwd') 
    const nameInput = document.querySelector('.name');
    const usernameInput = document.querySelector('.username');
    
    function BtnColorChange() {
      // 아이디, 비밀번호란에 입력한 값이 조건에 일치하면 버튼 색상 변경 및, 클릭 가능하게 만들어주는 함수
      const IdText = document.querySelector('.id').value;
      const PwdText = document.querySelector('.pwd').value;
      const nameText = document.querySelector('.name').value;
      const usernameText = document.querySelector('.username').value;
    
      if (IdText.includes('@') && 
      IdText.includes(".com") &&
      nameText.length >= 1 &&
      usernameText.length >= 1 &&
      PwdText.length >= 4){
        btn.style.background = "rgb(0, 149, 246, 100)";
        btn.style.cursor = "pointer";
        btn.disabled = false;
      }else{
        btn.style.background = "rgb( 103, 181, 250)";
        btn.style.cursor = "default";
        btn.disabled = true;
      }
    };
    
    IdInput.addEventListener('input', BtnColorChange);
    PwdInput.addEventListener('input', BtnColorChange);
    nameInput.addEventListener('input', BtnColorChange)
    usernameInput.addEventListener('input', BtnColorChange)

    btn.addEventListener('click', function (event) {
      event.preventDefault(); // 폼 기본 동작 막기
  
      const email = document.querySelector('.id').value;
      const password = document.querySelector('.pwd').value;
      const name = document.querySelector('.name').value;
      const username = document.querySelector('.username').value;
  
      // 유효성 검사
      if (!email.includes('@') || !email.includes('.com') || password.length < 4 || name.length < 1 || username.length < 1) {
          alert('모든 필드를 올바르게 입력해주세요.');
          return;
      }
  
      // 로컬 스토리지에서 사용자 데이터 가져오기
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const isExistingUser = users.some((u) => u.email === email);
      const isUsernameSame = users.some((u) => u.username === username);
  
      // 이메일 중복 확인
      if (isExistingUser) {
          alert('이미 가입된 이메일입니다.');
          return; // 조건 충족 시 종료
      }
  
      // 사용자명 중복 확인
      if (isUsernameSame) {
          alert('이미 존재하는 사용자명입니다. 다른 사용자명을 사용해주십시오.');
          return; // 조건 충족 시 종료
      }
  
      // 사용자 데이터 객체 생성
      const user = {
          email,
          password,
          name,
          username,
      };
  
      // 로컬 스토리지에 저장
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      alert('회원가입 성공! 이제 로그인하세요.');
      window.location.href = '../HTML/login.html'; // 로그인 페이지로 이동
  });  