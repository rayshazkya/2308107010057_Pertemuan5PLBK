// ================================================================
// FILE: src/components/ProductCard.jsx
// TUGASNYA: Menampilkan SATU kartu produk (gambar, nama, harga, tombol)
//           Komponen ini dipakai BERULANG-ULANG di Home.jsx
//           Kalau ada 20 produk → komponen ini dirender 20 kali
//
// ANALOGI: Seperti cetakan kartu nama.
//   - Cetakannya (komponen) sama untuk semua
//   - Isinya (data produk) berbeda tiap kartu
//   - Cetakan menerima data dari luar lewat "props"
// ================================================================
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// { product } = props yang diterima dari luar (dari Home.jsx)
// product berisi: { id, title, price, image, category }
// Data ini berasal dari API fakestoreapi.com
// Home.jsx yang mengirimkan data ini waktu menulis: <ProductCard product={...} />
export default function ProductCard({ product }) {

  // Ambil fungsi addItem dari CartContext
  // addItem = fungsi untuk menambahkan produk ke keranjang belanja
  // Fungsi ini didefinisikan di CartContext.jsx dan bisa diakses dari mana saja
  const { addItem } = useCart();

  return (
    // Kotak pembungkus satu kartu produk
    // display: flex + flexDirection: column = susun isi secara vertikal (atas ke bawah)
    // height: 100% = tinggi kotak mengikuti baris grid (agar semua kartu sama tinggi)
    <div style={{
      border: '1px solid #ddd',     // garis tepi abu-abu tipis
      borderRadius: '8px',          // sudut kartu dibuat sedikit melengkung
      padding: '1rem',              // jarak antara isi dan tepi kartu
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>

      {/*
        GAMBAR PRODUK
        src = alamat URL gambar (dari data API)
        alt = teks alternatif kalau gambar gagal dimuat (untuk aksesibilitas)
        objectFit: 'contain' = gambar menyesuaikan kotak tanpa dipotong/distorsi
      */}
      <img
        src={product.image}
        alt={product.title}
        style={{ width: '100%', height: '200px', objectFit: 'contain' }}
      />

      {/*
        JUDUL PRODUK
        product.title = teks judul dari data API
        .substring(0, 50) = potong teks, ambil hanya 50 karakter pertama
        Kenapa dipotong? Judul dari API bisa sangat panjang.
        Tanpa ini, kartu-kartu akan punya tinggi yang tidak sama karena judul
        yang panjang akan "mendorong" konten ke bawah
        "..." di belakang = tanda bahwa judulnya masih ada yang terpotong
        flex: 1 = biarkan area judul mengisi ruang yang tersisa di tengah
                  agar tombol selalu di bawah terlepas panjang-pendeknya judul
      */}
      <h3 style={{ fontSize: '0.9rem', margin: '0.5rem 0', flex: 1 }}>
        {product.title.substring(0, 50)}...
      </h3>

      {/*
        HARGA PRODUK
        product.price = angka harga dari data API (bisa desimal: 109.95, 22.3)
        .toFixed(2) = format angka selalu 2 desimal → 22.3 jadi 22.30
        $ di depan = simbol dolar (harga dari API dalam dolar)
        Warna oranye (#E67E22) agar harga mencolok
      */}
      <p style={{ fontWeight: 'bold', color: '#E67E22', fontSize: '1.1rem' }}>
        ${product.price.toFixed(2)}
      </p>

      {/*
        AREA TOMBOL: Detail dan Tambah ke Keranjang
        display: flex = susun dua tombol berjajar (kiri-kanan)
        gap: 0.5rem = jarak antar tombol
      */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>

        {/*
          TOMBOL DETAIL → navigasi ke halaman detail produk
          Link to={`/product/${product.id}`} = pergi ke URL /product/1 atau /product/5
            (tergantung id produknya)
          Tanda backtick ` dan ${...} = cara menggabungkan teks dengan variabel JavaScript
          flex: 1 = tombol ini mengisi setengah lebar area
        */}
        <Link
          to={`/product/${product.id}`}
          style={{
            flex: 1,
            padding: '0.5rem',
            textAlign: 'center',
            background: '#EBF5FB',   // biru sangat muda
            color: '#aa3d75',        // teks biru gelap
            borderRadius: '4px',
            textDecoration: 'none',  // hapus garis bawah bawaan link
          }}
        >
          Detail
        </Link>

        {/*
          TOMBOL TAMBAH KE KERANJANG
          onClick={() => addItem(product)} = saat diklik, panggil fungsi addItem
            dan kirimkan data produk ini ke dalamnya
          addItem akan diteruskan ke CartContext → reducer → state keranjang berubah
          → Header otomatis update angka keranjangnya
        */}
        <button
          onClick={() => addItem(product)}
          style={{
            flex: 1,
            padding: '0.5rem',
            background: '#f2007d',  // hijau
            color: 'white',
            border: 'none',         // hapus garis tepi bawaan tombol HTML
            borderRadius: '4px',
            cursor: 'pointer',      // ganti kursor jadi tangan saat hover
          }}
        >
          + Keranjang
        </button>

      </div>
    </div>
  );
}
