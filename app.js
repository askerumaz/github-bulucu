import Github from './github.js';
import UI from './ui.js';
// github ve ui claslarının bir örneğini oluşturma
const github = new Github();
const ui = new UI();


// html den alınanlar
const searchUser = document.getElementById('search-user');
const searchButton = document.getElementById('search-button');


searchButton.addEventListener('click', getInput);
searchUser.addEventListener('keypress', (e) => {
    if (e.code === 'Enter') {
      getInput();
    }
});

function getInput() {
    // eğer inputun içi doluysa api isteği at
    if (searchUser.value !== ''){
        github.getUser(searchUser.value).then((data) => {
            // eğer gelen verideki mesaj Not Found ise
                if (data.profile.message === 'Not Found') {
                    // hata mesajı göster
                    ui.showAlert("Aradığınız Kullanıcı Bulunamadı", "alert alert-danger");
                } else {
                    ui.showAlert("Kullanıcı Başarıyla Bulundu", "alert alert-success");
                    //   kullanıcıyı göster  
                    ui.showProfile(data.profile);
                    // projelerini göster
                    ui.showRepos(data.repos);
                }
            });
        
    } else {
        // eğer input boşsa uyarı ver
        ui.showAlert("Form Alanı Boş Olamaz", "alert alert-warning");
        ui.clearProfile();
    }
    searchUser.value = '';
}
// tema
const themeBtn = document.getElementById('theme');

themeBtn.addEventListener('click', changeTheme);

function changeTheme() {
  const body = document.querySelector('body');
  body.classList.toggle('bg-dark');
  body.classList.toggle('text-bg-dark');

  if (body.classList.contains('bg-dark')) {
    themeBtn.innerText = 'Açık Mod';
  } else {
    themeBtn.innerText = 'Koyu Mod';
  }
}
