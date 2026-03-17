// ================================================================
// FILE: src/components/Loading.jsx
// TUGASNYA: Menampilkan animasi "sedang memuat" selagi data diambil dari internet
//
// ANALOGI: Seperti tanda "Mohon Tunggu" di kasir.
//   Saat kasir sedang proses, ada tanda yang berputar.
//   Kalau tidak ada tanda ini, pengguna tidak tahu apakah aplikasinya
//   hang (macet) atau memang sedang memproses.
//
// Komponen ini dipakai oleh Home.jsx:
//   kalau loading=true → tampilkan <Loading />
//   kalau loading=false → tampilkan produk
// ================================================================
export default function Loading() {
  return (
    // Div pembungkus: tengahkan semua isi, beri jarak atas-bawah
    <div style={{ textAlign: 'center', padding: '3rem' }}>

      {/*
        INI ADALAH SPINNER (lingkaran berputar)
        Cara kerjanya:
        - width & height = ukuran 40x40 piksel
        - margin: '0 auto' = taruh di tengah secara horizontal
        - border: '4px solid #f3f3f3' = garis tepi abu-abu di SEMUA sisi
        - borderTop: '4px solid #1B4F72' = garis tepi biru HANYA di atas
        - borderRadius: '50%' = ubah kotak persegi menjadi LINGKARAN
        - animation: 'spin 1s linear infinite' = putar terus-menerus
            spin = nama animasinya (didefinisikan di index.css)
            1s = satu putaran per detik
            linear = kecepatan konstan, tidak ada percepatan/perlambatan
            infinite = berputar tanpa henti
        Hasilnya: lingkaran abu-abu dengan satu titik biru yang berputar
      */}
      <div style={{
        width: '40px',
        height: '40px',
        margin: '0 auto',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #cd6c7c',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }} />

      {/* Teks di bawah spinner */}
      <p style={{ marginTop: '1rem', color: '#666' }}>Memuat data...</p>
    </div>
  );
}
