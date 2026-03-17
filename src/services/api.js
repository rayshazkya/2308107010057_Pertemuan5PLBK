// ================================================================
// FILE: src/services/api.js
// TUGASNYA: Mengurus semua komunikasi dengan internet (fakestoreapi.com)
//
// ANALOGI: File ini seperti PELAYAN di restoran.
//   - Kamu (komponen lain) minta sesuatu → pelayan pergi ke dapur (internet)
//   - Dapur masak (server proses) → pelayan bawa balik makanan (data)
//   - Kamu tidak perlu tahu cara masaknya, tinggal minta saja
// ================================================================

// "import" = meminjam alat dari tempat lain
// "axios" = alat khusus untuk mengirim permintaan ke internet
// Tanpa axios, kita harus nulis kode yang jauh lebih panjang dan rumit
import axios from 'axios';

// ----------------------------------------------------------------
// MEMBUAT "TELEPON KHUSUS" ke fakestoreapi.com
// ----------------------------------------------------------------
// axios.create() = membuat satu telepon yang sudah tersimpan nomornya
// Jadi setiap kali mau hubungi API, tidak perlu ketik alamat lengkap lagi
const apiClient = axios.create({

  // baseURL = alamat dasar tujuan kita
  // Jadi kalau kita minta '/products', yang dikirim adalah:
  // https://fakestoreapi.com/products (digabung otomatis)
  baseURL: 'https://fakestoreapi.com',

  // timeout = batas waktu tunggu
  // 10000 milidetik = 10 detik
  // Kalau 10 detik tidak ada jawaban dari internet → batalkan
  // Tanpa ini, aplikasi bisa "nunggu selamanya" kalau internet mati
  timeout: 10000,

  // headers = "label amplop" yang dikirim ke server
  // Memberitahu server: "saya kirim dan terima data dalam format JSON"
  // JSON = format data standar di internet, seperti tabel Excel tapi untuk kode
  headers: {
    'Content-Type': 'application/json',
  },
});

// ----------------------------------------------------------------
// INTERCEPTOR REQUEST = "Satpam pintu keluar"
// Setiap permintaan yang MAU DIKIRIM ke internet, dicegat dulu di sini
// ----------------------------------------------------------------
apiClient.interceptors.request.use(
  (config) => {
    // config = informasi tentang permintaan yang akan dikirim
    // Kita hanya catat (log) dulu: "apa yang sedang dikirim?"
    // Ini berguna untuk debugging - lihat di browser → klik kanan → Inspect → Console
    // Contoh output: [API] GET /products
    console.log(`[API] ${config.method.toUpperCase()} ${config.url}`);

    // WAJIB return config → teruskan permintaan, jangan ditahan di sini
    return config;
  },
  // Kalau ada error sebelum dikirim → teruskan errornya
  (error) => Promise.reject(error)
);

// ----------------------------------------------------------------
// INTERCEPTOR RESPONSE = "Satpam pintu masuk"
// Setiap jawaban yang DATANG DARI internet, dicegat dulu di sini
// ----------------------------------------------------------------
apiClient.interceptors.response.use(
  // Kalau berhasil → teruskan saja jawabannya normal
  (response) => response,

  // Kalau GAGAL (error) → tangkap dan catat pesannya
  (error) => {
    if (error.response) {
      // Server merespons, tapi dengan kode error (misal: 404 = tidak ditemukan)
      console.error(`[API Error] ${error.response.status}: ${error.response.statusText}`);
    } else if (error.request) {
      // Permintaan sudah dikirim, tapi tidak ada jawaban sama sekali (internet mati)
      console.error('[API Error] No response received');
    }
    // Teruskan error ini supaya bisa ditangkap oleh try/catch di komponen lain
    return Promise.reject(error);
  }
);

// ================================================================
// FUNGSI-FUNGSI "TOMBOL PEMESANAN"
// Ini seperti tombol mesin kopi: tekan → dapat kopi
// Komponen lain tinggal panggil fungsi ini, tidak perlu tahu cara kerjanya
// ================================================================

// FUNGSI 1: Ambil SEMUA produk
// "async" = fungsi ini mengurus hal yang butuh waktu (menunggu internet)
// "export" = fungsi ini boleh dipakai oleh file lain
export const getProducts = async () => {
  // "await" = tunggu sampai jawaban dari internet datang, baru lanjut ke baris berikutnya
  // Tanpa "await", kode lanjut padahal data belum ada → error
  const response = await apiClient.get('/products');
  // response = bungkusan besar dari server (ada status, header, data, dll)
  // response.data = isi datanya saja (daftar produk dalam format JSON)
  return response.data;
};

// FUNGSI 2: Ambil SATU produk berdasarkan ID-nya
// id = nomor unik produk, contoh: 1, 2, 3, dst
// Tanda backtick ` dan ${id} = cara menggabungkan teks dengan variabel
// Hasilnya: '/products/1' atau '/products/5' tergantung id yang dikirim
export const getProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

// FUNGSI 3: Ambil produk dari KATEGORI tertentu
// category = nama kategori, contoh: "electronics", "jewelery"
export const getProductsByCategory = async (category) => {
  const response = await apiClient.get(`/products/category/${category}`);
  return response.data;
};

// FUNGSI 4: Ambil daftar semua KATEGORI yang tersedia
export const getCategories = async () => {
  const response = await apiClient.get('/products/categories');
  return response.data;
};

// export default = kalau ada yang import file ini tanpa menyebut nama spesifik,
// mereka akan dapat apiClient ini
export default apiClient;
