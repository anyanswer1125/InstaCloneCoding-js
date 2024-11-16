const btn = document.querySelector('.loginBtn');

const IdInput = document.querySelector('.id') 
const PwdInput = document.querySelector('.pwd') 

function BtnColorChange() {
  // 아이디, 비밀번호란에 입력한 값이 조건에 일치하면 버튼 색상 변경 및, 클릭 가능하게 만들어주는 함수
  const IdText = document.querySelector('.id').value;
  const PwdText = document.querySelector('.pwd').value;

  if (IdText.includes('@') && IdText.includes(".com") &&PwdText.length >= 4){
    btn.style.background = "rgb(0, 149, 246, 100)";
    btn.style.cursor = "pointer";
  }else{
    btn.style.background = "rgb( 103, 181, 250)";
  }
};

IdInput.addEventListener('input', BtnColorChange);
PwdInput.addEventListener('input', BtnColorChange);
