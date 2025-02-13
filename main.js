// ui class yapısını import et
import { UI } from "./scripts/ui.js";
// api class ımport et
import { API } from "./scripts/api.js"; 

// ui clasının örneğini al
const ui = new UI();

// api clasının örneğini al
const api = new API();

// sayfanın yüklendiği anı izle
document.addEventListener("DOMContentLoaded", async () => {

  // loader ı render et
  ui.renderLoader();

  try {
    const songs = await api.getPopular();
    console.log("Popüler Şarkılar:", songs);
    ui.renderCards(songs);
  } catch (err) {
    console.error("Popüler şarkılar yüklenirken hata:", err);
  }
});

//form gönderildiğinde bunu izle ve bir fonksiyon çalıştır
ui.form.addEventListener("submit", async (e) => {
  // sayfa yenilemeyi engelle
  e.preventDefault();
  
  // form gönderildiğinde input içerisindeki değere eriş
  const query = e.target[0].value.trim();
  
  // aratılan kelimenin başında ve sonunda bulunan boşlukları kaldır
  // ve eğer query değeri yok ise uyarı ver
  if(!query) {
    return alert("Lütfen geçerli bir arama işlemi gerçekleştiriniz.");
  }
  
  // laoder render et
  ui.renderLoader();
  
  // title'ı güncelle
  ui.updateTitle(`${query} için sonuçlar`);
  
  // aratılan kelimiyle birlikte apı istek at sonrasından gelen veriyle ekrana cartları renderla
  try {
    const songs = await api.searchMusic(query);
    console.log("Arama sonuçları:", songs);
    ui.renderCards(songs);
  } catch (err) {
    alert("Şarkı ararken hata oluştu: " + err);
  }
});

// liste kısmındaki play iconuna tıklayınca arayüzü bu şarkı verisine göre renderlayan fonksiyon
ui.list.addEventListener("click", (e) => {
  // list içerisinde tıklanan elemanın play butonu olup olmadıgını kontrol et
  if (e.target.className == "play") {
    // play butonunun kapsayıcısına eriş
    const card = e.target.closest(".card");
    // kapsayıcıya verilen dataset özelliklerini al (title,image,mp3)
    const data = card.dataset;

    // player ksımını render et
    ui.renderPlayer(data);
  }
});