// ================================================================
// FILE: src/components/Header.jsx
// TUGASNYA: Menampilkan bar navigasi di bagian PALING ATAS halaman
//           yang selalu terlihat di semua halaman (Home maupun Cart)
//
// ANALOGI: Seperti papan nama dan menu navigasi di bagian atas toko.
//   - Logo toko di kiri (CBSE Store)
//   - Menu Home dan Keranjang di kanan
//   - Angka di Keranjang berubah otomatis kalau ada produk yang ditambahkan
// ================================================================

// Link = alat untuk berpindah halaman TANPA me-refresh browser
// Kenapa tidak pakai <a> HTML biasa?
//   Karena <a> biasa akan REFRESH seluruh halaman → semua data keranjang hilang!
//   Link dari react-router-dom hanya mengganti "isi tengah" halaman, keranjang tetap ada
import { Link } from 'react-router-dom';

// useCart = "kartu akses" ke data keranjang yang tersimpan di CartContext
// Header butuh ini untuk menampilkan angka: "Cart (3)" - angka 3 dari sini
import { useCart } from '../context/CartContext';
// '../context/CartContext' artinya:
//   .. = naik satu folder (dari components ke src)
//   /context/CartContext = masuk ke folder context, ambil file CartContext

export default function Header() {

  // Ambil 'totalItems' dari keranjang (data dikelola CartContext)
  // totalItems = jumlah TOTAL item di keranjang (bukan jumlah jenis produk)
  // Contoh: kalau ada 2 baju + 1 sepatu → totalItems = 3
  // Kalau user tambah produk di ProductCard, totalItems ini OTOMATIS berubah
  // dan Header akan OTOMATIS render ulang menampilkan angka baru
  const { totalItems } = useCart();

  return (
    // <header> = elemen HTML untuk bagian kepala/navigasi halaman
    // style = CSS yang ditulis langsung di dalam komponen React (inline style)
    <header style={{
      background: 'pink',        // warna latar belakang: biru gelap
      color: 'white',               // warna teks: putih
      padding: '1rem 2rem',         // jarak dalam: atas-bawah 1rem, kiri-kanan 2rem
      display: 'flex',              // susun anak-anaknya dalam satu baris
      justifyContent: 'space-between', // logo di kiri, nav di kanan
      alignItems: 'center',         // sejajarkan secara vertikal di tengah
    }}>

      {/*
        LOGO / NAMA TOKO
        Link to='/' = kalau diklik, pergi ke halaman utama (/)
        style: warna putih, hapus garis bawah bawaan link
      */}
      <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Kiya's Store</h1>
      </Link>

      {/*
        MENU NAVIGASI (Home dan Cart)
        <nav> = elemen HTML untuk area navigasi
        display: flex + gap = susun link-link berjajar dengan jarak antar link
      */}
      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>

        {/* Link ke halaman Home */}
        <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>
          Home
        </Link>

        {/*
          Link ke halaman Cart
          {totalItems} = tampilkan angka dari CartContext
          Tanda {} di JSX artinya "ini JavaScript, bukan teks biasa"
          Kalau totalItems = 3, maka tampil: "Cart (3)"
          Angka ini berubah OTOMATIS karena tersambung ke CartContext
        */}
        <Link to='/cart' style={{ color: 'white', textDecoration: 'none' }}>
          Cart ({totalItems})
        </Link>

      </nav>
    </header>
  );
}
