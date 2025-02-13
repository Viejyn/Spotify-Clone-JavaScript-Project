import CONFIG from "../../config.js";

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': CONFIG.RAPID_API_KEY,
		'x-rapidapi-host': 'shazam.p.rapidapi.com'
  },
};

// api'isteklerinin yönettiğimiz class
export class API {
  // kurucu metod
  constructor() {
    this.songs = [];
  }

  async getPopular() {
    // api isteği at
    const res = await fetch(
      `${CONFIG.RAPID_API_URL}/artists/get-top-songs?id=${CONFIG.RAPID_API_ID}&l=en-US`,
      options
    );
    
    // api'den gelen veriyi js nesnesine çevir
    const data = await res.json();

    console.log("Popüler şarkılar API yanıtı:", data);
    
    //class'ta tanımlanan songs değişkenine aktar
    this.songs = data.data || []; // tracks yoksa boş dizi döndür
    return this.songs;
  }

  // aratılan şarkıyı alan fonksiyon
  async searchMusic(query) {
    try {
      // api isteği at
      const res = await fetch(
        `${CONFIG.RAPID_API_URL}/search?term=${query}`,
        options
      );

      // gelen veriyi js nesnesine çevir
      const data = await res.json();

      // API'den dönen verinin formatını kontrol et
      console.log("Arama sonucu:", data);

      // Eğer `tracks.hits` yoksa hata döndür
      if (!data.tracks?.hits) {
        throw new Error("API yanıtı beklenen formatta değil.");
      }

      // tracks.hits içindeki track nesnelerini al
      const formattedData = data.tracks.hits.map((hit) => {
        const track = hit.track;

        return {
          title: track.title || "Bilinmeyen Şarkı",
          artist: track.subtitle || "Bilinmeyen Sanatçı",
          img: track.images?.coverart || "default-image.jpg", // Eğer görsel yoksa varsayılan bir görsel kullan
          mp3: track.hub?.actions?.[1]?.uri || "",
        };
      });

      // Sonuçları kontrol et
      console.log("Şarkı Verisi:", formattedData);

      // Eğer sonuç boşsa hata fırlat
      if (formattedData.length === 0) {
        throw new Error("Aradığınız kriterlere uygun şarkı bulunamadı.");
      }
 
      // gelen veriyi değişkene aktar
      this.songs = formattedData;
      return this.songs;

    } catch (error) {
      console.error("Şarkı ararken hata oluştu:", error);
      throw error;
    }
  }
}
