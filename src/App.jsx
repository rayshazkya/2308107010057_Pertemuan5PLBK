// ================================================================
// FILE: src/App.jsx
// TUGASNYA: File UTAMA yang menyatukan semua bagian aplikasi
//           Seperti "tulang punggung" atau "rangka" aplikasi kita
//
// ANALOGI: Seperti denah gedung mal.
//   - Gedung punya satu pintu masuk utama (CartProvider)
//   - Di dalam ada sistem penunjuk arah (BrowserRouter)
//   - Ada papan nama di setiap lantai yang selalu terlihat (Header)
//   - Setiap lantai menampilkan toko yang berbeda (Routes/halaman)
// ================================================================

// Ambil komponen-komponen navigasi dari library react-router-dom
//   BrowserRouter = aktifkan sistem navigasi URL di seluruh aplikasi
//   Routes = wadah pengatur: "kalau URL ini → tampilkan ini"
//   Route = satu aturan rute: "URL /cart → tampilkan <Cart />"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Ambil CartProvider dari file context kita
// CartProvider = "pengelola gudang keranjang" yang membungkus semua komponen
// agar semua komponen bisa akses data keranjang
import { CartProvider } from './context/CartContext';

// Komponen-komponen yang akan dipakai
import Header from './components/Header'; // navigasi atas (selalu tampil)
import Home from './pages/Home';          // halaman utama (katalog produk)
import Cart from './pages/Cart';          // halaman keranjang belanja

function App() {
  return (
    /*
      SUSUNAN PEMBUNGKUS (dari luar ke dalam):

      1. <CartProvider> — PALING LUAR
         Semua komponen di dalamnya BISA mengakses data keranjang
         (Header butuh totalItems, ProductCard butuh addItem, Cart butuh items)
         Kalau ini tidak membungkus semuanya → useCart() akan error di komponen anak

      2. <BrowserRouter> — DI DALAM CartProvider
         Mengaktifkan sistem navigasi URL
         Semua komponen di dalamnya BISA menggunakan Link dan useNavigate
         Kalau ini tidak ada → komponen Link di Header akan error

      3. <Header /> — SELALU TAMPIL
         Karena Header berada di LUAR <Routes>, dia tampil di SEMUA halaman
         Baik di halaman '/' maupun '/cart', Header selalu ada di atas

      4. <Routes> — PENGATUR HALAMAN
         Hanya SATU route yang aktif sesuai URL saat ini
    */
    <CartProvider>
      <BrowserRouter>

        {/* Header selalu tampil di semua halaman */}
        <Header />

        {/*
          Routes = "pemilih halaman" berdasarkan URL
          Cara kerjanya:
            - User buka http://localhost:5173/      → tampilkan <Home />
            - User klik Cart → pindah ke /cart     → tampilkan <Cart />
            - Home disembunyikan saat Cart aktif, dan sebaliknya
        */}
        <Routes>

          {/* path='/' = alamat URL halaman utama */}
          {/* element={<Home />} = komponen yang ditampilkan untuk URL ini */}
          <Route path='/' element={<Home />} />

          {/* path='/cart' = alamat URL halaman keranjang */}
          <Route path='/cart' element={<Cart />} />

        </Routes>

      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
