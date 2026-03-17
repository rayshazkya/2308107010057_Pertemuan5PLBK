// ================================================================
// FILE: src/pages/Home.jsx
// TUGASNYA: Halaman utama aplikasi — menampilkan SEMUA PRODUK
//           dalam bentuk grid kartu, plus tombol filter per kategori
//
// ANALOGI: Ini seperti halaman depan katalog toko online.
//   - Saat kamu buka halaman → aplikasi langsung "telepon" ke gudang data
//     (fakestoreapi.com) untuk minta daftar produk
//   - Selagi menunggu jawaban → tampilkan spinner Loading
//   - Setelah data datang → tampilkan kartu-kartu produk
// ================================================================

// useState = alat untuk menyimpan data yang bisa berubah
//   Tiap kali data berubah → React otomatis gambar ulang tampilan
// useEffect = alat untuk menjalankan kode pada momen tertentu
//   Di sini dipakai untuk: "jalankan pengambilan data saat halaman pertama dibuka"
import { useState, useEffect } from 'react';

// Ambil fungsi-fungsi dari api.js (file pelayan yang mengurus komunikasi internet)
import { getProducts, getCategories } from '../services/api';

// Komponen-komponen yang akan kita pakai di halaman ini
import ProductCard from '../components/ProductCard'; // kartu satu produk
import Loading from '../components/Loading';         // spinner animasi

export default function Home() {

  // ================================================================
  // STATE = "PAPAN DATA" yang bisa berubah dan mempengaruhi tampilan
  // Format: const [nilaiSaatIni, fungsiUntukGanti] = useState(nilaiAwal)
  // ================================================================

  // Menyimpan daftar SEMUA produk yang datang dari API
  // Awalnya kosong [] karena data belum diambil
  const [products, setProducts] = useState([]);

  // Menyimpan daftar kategori: ["electronics", "jewelery", "men's clothing", ...]
  // Awalnya kosong [] karena data belum diambil
  const [categories, setCategories] = useState([]);

  // Menyimpan kategori yang SEDANG DIPILIH user untuk filter
  // Awalnya 'all' = tampilkan semua produk
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Menyimpan status "apakah sedang memuat data?"
  // true = sedang loading, false = sudah selesai
  // Awalnya true karena saat pertama buka, data memang belum ada
  const [loading, setLoading] = useState(true);

  // Menyimpan pesan error kalau pengambilan data gagal
  // null = tidak ada error
  const [error, setError] = useState(null);

  // ================================================================
  // useEffect = "LAKUKAN INI SAAT HALAMAN PERTAMA DIBUKA"
  // Parameter kedua [] (array kosong) = jangan ulangi, cukup sekali saat mount
  //
  // Kenapa tidak langsung tulis di dalam fungsi komponen?
  // Karena kalau ditulis langsung, setiap kali state berubah (misal user klik
  // filter), komponen render ulang → request ke API dikirim lagi → berulang terus!
  // useEffect [] memastikan request hanya dikirim SEKALI
  // ================================================================
  useEffect(() => {

    // Kita buat fungsi async di dalam useEffect
    // Kenapa tidak langsung async di useEffect? Aturan React tidak membolehkan
    async function fetchData() {
      try {
        // "coba lakukan ini:"

        // Aktifkan loading (spinner akan muncul)
        setLoading(true);

        // Promise.all = kirim DUA permintaan ke API BERSAMAAN (paralel)
        // Lebih efisien dari kirim satu per satu:
        //   Satu per satu: tunggu produk (1 detik) + tunggu kategori (1 detik) = 2 detik
        //   Bersamaan: keduanya jalan 1 detik = total 1 detik saja
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),    // minta data semua produk dari api.js
          getCategories(),  // minta daftar kategori dari api.js
        ]);
        // await di atas = tunggu SAMPAI KEDUANYA selesai, baru lanjut baris berikutnya

        // Simpan data yang datang ke dalam state
        // Setelah setProducts & setCategories dipanggil → React render ulang tampilan
        setProducts(productsData);
        setCategories(categoriesData);

      } catch (err) {
        // "kalau ada yang gagal (internet mati, URL salah, dll):"
        // Simpan pesan errornya → akan ditampilkan di layar
        setError(err.message);

      } finally {
        // "apapun yang terjadi (berhasil ATAU gagal), lakukan ini:"
        // Matikan loading → sembunyikan spinner
        setLoading(false);
      }
    }

    // Setelah fungsi fetchData didefinisikan, langsung panggil/jalankan
    fetchData();

  }, []); // [] = jalankan useEffect ini hanya sekali, saat komponen pertama muncul

  // ================================================================
  // FILTER PRODUK BERDASARKAN KATEGORI
  // Ini dihitung setiap kali selectedCategory atau products berubah
  // Ini BUKAN state, tapi computed value (nilai yang dihitung dari state)
  // ================================================================
  const filteredProducts = selectedCategory === 'all'
    // Kalau pilihan = 'all' → tampilkan semua produk tanpa filter
    ? products
    // Kalau pilihan = kategori tertentu → saring, ambil yang cocok saja
    // filter() = periksa setiap produk, ambil hanya yang lolos syarat
    // p.category === selectedCategory = kategori produk harus sama dengan pilihan
    : products.filter((p) => p.category === selectedCategory);

  // ================================================================
  // KONDISI RENDER (apa yang ditampilkan tergantung kondisi)
  // React membaca dari atas ke bawah, langsung "return" kalau cocok
  // ================================================================

  // Kalau masih loading → tampilkan spinner, berhenti di sini
  // Kode di bawah ini tidak akan dieksekusi
  if (loading) return <Loading />;

  // Kalau ada error → tampilkan pesan error, berhenti di sini
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  // Kalau tidak loading dan tidak error → tampilkan halaman normal
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Katalog Produk</h2>

      {/*
        ============================================================
        TOMBOL FILTER KATEGORI
        flexWrap: 'wrap' = kalau tombol terlalu banyak → pindah ke baris baru
        ============================================================
      */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>

        {/*
          TOMBOL "SEMUA"
          onClick={() => setSelectedCategory('all')} =
            saat diklik, ganti selectedCategory menjadi 'all'
            → filteredProducts akan menampilkan semua produk
            → React render ulang karena state berubah

          Warna tombol berubah tergantung apakah dia sedang dipilih:
            selectedCategory === 'all' ? biru gelap : biru muda
            Ini disebut "conditional styling"
        */}
        <button
          onClick={() => setSelectedCategory('all')}
          style={{
            padding: '0.5rem 1rem',
            background: selectedCategory === 'all' ? '#721b48' : '#EBF5FB',
            color: selectedCategory === 'all' ? 'white' : '#721b55',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
          }}
        >
          Semua
        </button>

        {/*
          TOMBOL KATEGORI LAINNYA (dibuat otomatis dari daftar kategori)
          categories.map() = untuk setiap kategori di daftar, buat satu tombol
          Ini adalah "loop" di React — tidak perlu tulis tombol satu per satu
          key={cat} = React butuh penanda unik untuk setiap item yang dibuat pakai map
        */}
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '0.5rem 1rem',
              background: selectedCategory === cat ? '#721b58' : '#EBF5FB',
              color: selectedCategory === cat ? 'white' : '#721b4e',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              textTransform: 'capitalize', // huruf pertama jadi kapital otomatis via CSS
            }}
          >
            {cat} {/* tampilkan nama kategorinya */}
          </button>
        ))}
      </div>

      {/*
        ============================================================
        GRID KARTU PRODUK
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'
          = isi baris dengan kartu selebar minimum 250px
          = kalau layar lebar → bisa muat banyak kolom
          = kalau layar sempit → kolom otomatis berkurang
          = ini teknik CSS Grid yang membuat layout RESPONSIF
        ============================================================
      */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem', // jarak antar kartu
      }}>

        {/*
          Untuk setiap produk yang lolos filter → buat satu <ProductCard>
          key={product.id} = React butuh penanda unik → pakai id produk
          product={product} = kirim data produk ke komponen ProductCard lewat props
        */}
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>
    </div>
  );
}
