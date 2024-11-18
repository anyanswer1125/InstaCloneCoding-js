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
  }else{
    btn.style.background = "rgb( 103, 181, 250)";
    btn.style.cursor = "default";
  }
};

IdInput.addEventListener('input', BtnColorChange);
PwdInput.addEventListener('input', BtnColorChange);
nameInput.addEventListener('input', BtnColorChange)
usernameInput.addEventListener('input', BtnColorChange)