const openButton = document.querySelector('.Icon.Post');
const modal = document.querySelector('.modal');
const uploadPicture = document.querySelector('.uploadPicture');


openButton.addEventListener('click', () => {
  // alert("버튼 누름!");
  modal.style.display = 'block';

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
})

uploadPicture.addEventListener('click',() => {
  
})