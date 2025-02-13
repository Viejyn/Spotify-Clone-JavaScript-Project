export class UI {
  // kurucu metot
  constructor() {
      this.form =document.querySelector("form");
      this.list =document.querySelector(".list");
      this.title =document.querySelector("#title");
      this.player =document.querySelector(".player");
  }

  // yazıları düzenleyen fonksiyon

  sliceText(text) {

    // Eğer text'in uzunluğu 15'den büyükse, 15 karakteri alarak sonuna '...' ekleyin. Bu, yazının kısa olmasını sağlar. 15 karakterin altında kalan kısmı göstermeyecek ve okunabilir hale getirecektir.
    if(text.length > 15) {
        
        return text.slice(0, 15) + "...";
    }
    return text;
  }
  // şarkı verilerini render eden fonksiyon
  renderCards(songs) {
    if (!songs || !Array.isArray(songs)) {
      console.error("Şarkı listesi eksik veya yanlış formatta:", songs);
      return;
    }
    // listeye bir şarkı elemanı eklemeden önceki verileri sıfırla
    this.list.innerHTML = "";

    songs.forEach((song) => {
      console.log("Şarkı Verisi:", song);
        
      // API'den gelen veriyi doğru al
      const title = song.title || song.attributes?.name || "Bilinmeyen Şarkı";
      const artist = song.artist || song.attributes?.artistName || "Bilinmeyen Sanatçı";
      
      const img = song.img 
            || (song.attributes?.artwork?.url 
                ? song.attributes.artwork.url.replace("{w}", "200").replace("{h}", "200")
                : "default.jpg");

      const mp3 = song.mp3 || song.attributes?.previews?.[0]?.url || "";

      // Kart oluştur
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.title = title;
      card.dataset.subtitle = artist;
      card.dataset.img = img;
      card.dataset.mp3 = mp3;

      // Kartın içeriğini belirle
      card.innerHTML = `  
          <figure>
            <img src="${img}" alt="">
            <div class="play">
              <i class="bi bi-play-fill"></i>
            </div>
          </figure>
          <div class="card-info">
            <h4>${this.sliceText(title)}</h4>
            <h4>${artist}</h4>
          </div> `;

      // Oluşturulan kartı listeye ekle
      this.list.appendChild(card);
      // class ve obje yapıları içerisindeki bir değişkenebu yapılar içerisindeki bit mototla erişmek istersek bunların başına this. keywordunu koymak gerekir.bunun sebebi class ve obje yapılarının bu değerin kendi içersiinde oldugunu anlamasıdır.
    }); 
    console.log("Kartlar başarıyla renderlandı:", songs);   
  }

  // LOADER RENDER EDEN FONKSİYON
  renderLoader() {
    this.list.innerHTML = `<div class="loader">
      <div class="cell d-0"></div>
      <div class="cell d-1"></div>
      <div class="cell d-2"></div>

      <div class="cell d-1"></div>
      <div class="cell d-2"></div>
  
  
      <div class="cell d-2"></div>
      <div class="cell d-3"></div>
  
  
      <div class="cell d-3"></div>
      <div class="cell d-4"></div>
    </div> `;
  }

  // title'ı günceleyen fonksiyon
  updateTitle(text) {
    this.title.textContent = text;
  }

  // animasyon ayarlaması yapan fonksiyon
  toggleAnimation() {
    // player içerisindeki resime eriş
    const image = document.querySelector(".info img");
    // resme class ekle çıkar
    image.classList.toggle("animate");
  }
    
  // player kısmına dinamik renderleme yapacak fonskiyon
  renderPlayer(song) {
    console.log("Player'a gelen şarkı verisi:", song); // Hata kaynağını görmek için

    this.player.innerHTML = `
      <div class="info">
        <img src="${song.img}" alt="">         
        <div>
          <h5>${song.title}</h5>
          <p>${song.subtitle}</p>
        </div>
      </div>

      <audio controls autoplay>
        <source src="${song.mp3}" type="audio/mpeg">
        Tarayıcınız ses oynatmayı desteklemiyor.
      </audio>
      <div class="icons">
        <i class="bi bi-music-note-list"></i>
        <i class="bi bi-boombox"></i>
        <i class="bi bi-pc-display"></i>
      </div>`;

  // şarkı oynatılıyorsa image bir anımasyon ekle durdurulursa bunu kaldır
      
  // audio elemanına eriş
  const audio = this.player.querySelector("audio");
      
  // audio eleamnın oynama ve durma olayını izle
  audio.addEventListener("play", this.toggleAnimation);
  audio.addEventListener("pause", this.toggleAnimation);    
  }
}

