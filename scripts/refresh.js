window.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('reloading')) {
    document.body.classList.add('slide-in');
    sessionStorage.removeItem('reloading');
  } else {
    document.body.classList.add('slide-in'); 
  }
});

function fakeRefresh() {
  document.body.classList.remove('slide-in'); 
  document.body.classList.add('slide-out');

  sessionStorage.setItem('reloading', 'true');

  setTimeout(() => {
    location.reload();
  }, 1000); // match your animation duration
}
