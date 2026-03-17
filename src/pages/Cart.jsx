// ================================================================
// FILE: src/pages/Cart.jsx
// TUGASNYA: Menampilkan ISI KERANJANG BELANJA
//           Menghitung total harga, dan ada tombol Checkout
//
// ANALOGI: Seperti halaman "ringkasan pesanan" sebelum bayar di online shop.
//   - Tampilkan semua produk yang sudah ditambahkan
//   - Tampilkan harga per produk × jumlahnya
//   - Tampilkan total keseluruhan
//   - Ada tombol Hapus per produk
//   - Ada tombol Checkout untuk "beli" (kosongkan keranjang)
// ================================================================

// Ambil data dan fungsi keranjang dari CartContext
// Ini seperti membuka "laci gudang" dan mengambil apa yang kita butuhkan
import { useCart } from '../context/CartContext';

export default function Cart() {

  // Ambil 4 hal dari keranjang:
  //   items = daftar produk yang ada di keranjang
  //   totalPrice = total harga semua item
  //   removeItem = fungsi untuk hapus satu produk dari keranjang
  //   clearCart = fungsi untuk kosongkan seluruh keranjang
  const { items, totalPrice, removeItem, clearCart } = useCart();

  // ================================================================
  // KONDISI KHUSUS: Kalau keranjang kosong
  // items.length = jumlah item di array
  // items.length === 0 → tidak ada item sama sekali
  // ================================================================
  if (items.length === 0) {
    // Langsung return tampilan "kosong" ini → kode di bawah tidak dijalankan
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Keranjang Kosong</h2>
        <p>Belum ada produk di keranjang Anda.</p>
      </div>
    );
  }

  // Kalau sampai di sini → berarti items.length > 0 (ada isinya)
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Keranjang Belanja</h2>

      {/*
        ============================================================
        DAFTAR ITEM DI KERANJANG
        items.map() = untuk setiap item di keranjang, tampilkan satu baris
        key={item.id} = penanda unik React untuk setiap baris
        ============================================================
      */}
      {items.map((item) => (
        <div key={item.id} style={{
          display: 'flex',         // susun isi baris secara horizontal
          alignItems: 'center',   // sejajarkan vertikal di tengah
          gap: '1rem',             // jarak antar elemen dalam satu baris
          padding: '1rem',
          borderBottom: '1px solid #eee', // garis pemisah antar baris
        }}>

          {/* Gambar kecil produk (60x60 piksel) */}
          <img
            src={item.image}
            alt={item.title}
            style={{ width: '60px', height: '60px', objectFit: 'contain' }}
          />

          {/* Info produk: nama dan harga × jumlah */}
          {/* flex: 1 = area ini mengambil semua sisa ruang (dorong tombol ke kanan) */}
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 0.25rem' }}>{item.title}</h4>
            <p style={{ margin: 0, color: '#666' }}>
              {/* Tampilkan: $22.30 x 2 */}
              ${item.price.toFixed(2)} x {item.quantity}
            </p>
          </div>

          {/* Subtotal item ini: harga × jumlah */}
          {/* Contoh: $22.30 × 2 = $44.60 */}
          <p style={{ fontWeight: 'bold' }}>
            ${(item.price * item.quantity).toFixed(2)}
          </p>

          {/*
            TOMBOL HAPUS
            onClick={() => removeItem(item.id) =
              saat diklik, kirim id item ini ke fungsi removeItem
              removeItem akan dispatch ke CartContext → reducer hapus item
              → state berubah → halaman render ulang → item hilang dari daftar
          */}
          <button
            onClick={() => removeItem(item.id)}
            style={{
              background: '#e74c3c',  // merah
              color: 'white',
              border: 'none',
              padding: '0.5rem',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Hapus
          </button>

        </div>
      ))}

      {/*
        ============================================================
        RINGKASAN TOTAL DAN TOMBOL CHECKOUT
        ============================================================
      */}
      <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>

        {/* Total harga semua item (sudah dihitung di CartContext) */}
        <h3>Total: ${totalPrice.toFixed(2)}</h3>

        {/*
          TOMBOL CHECKOUT
          onClick={clearCart} = saat diklik, panggil fungsi clearCart
          clearCart akan dispatch 'CLEAR_CART' ke reducer → state kembali ke initialState
          → items = [] → kondisi "keranjang kosong" di atas akan terpenuhi
          → tampilan berubah ke "Keranjang Kosong"
          (Di dunia nyata, checkout juga akan proses pembayaran, tapi di sini
          kita hanya simulasi dengan mengosongkan keranjang)
        */}
        <button
          onClick={clearCart}
          style={{
            padding: '0.75rem 2rem',
            background: '#ac2c68',  // pink
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Checkout
        </button>

      </div>
    </div>
  );
}
