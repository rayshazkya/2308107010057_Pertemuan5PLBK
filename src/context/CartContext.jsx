// ================================================================
// FILE: src/context/CartContext.jsx
// TUGASNYA: Menyimpan dan mengelola data KERANJANG BELANJA
//           yang bisa diakses dari komponen mana saja
//
// ANALOGI: File ini seperti GUDANG TITIPAN di mal.
//   - Siapapun bisa titip barang (tambah ke keranjang)
//   - Siapapun bisa ambil/lihat daftar barang (baca isi keranjang)
//   - Header, ProductCard, Cart - semua bisa akses gudang ini
//     tanpa harus saling mengoper data satu sama lain
// ================================================================

// "import" berikut mengambil 3 fitur bawaan React yang kita butuhkan:
//   - createContext: membuat "gudang data" baru
//   - useContext: cara untuk mengakses isi gudang
//   - useReducer: cara mengelola perubahan data yang kompleks
import { createContext, useContext, useReducer } from 'react';

// ----------------------------------------------------------------
// NILAI AWAL KERANJANG (saat aplikasi baru dibuka)
// ----------------------------------------------------------------
// Ini seperti kondisi gudang saat baru buka:
//   - items: [] = isi keranjang kosong (array kosong = daftar kosong)
//   - totalItems: 0 = belum ada item sama sekali
//   - totalPrice: 0 = total harga nol
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// ================================================================
// REDUCER = "MESIN KASIR" yang memproses setiap perubahan keranjang
//
// ANALOGI: Mesin kasir di supermarket.
//   Kamu bilang "tambah produk A" → mesin proses → kasbon berubah
//   Kamu bilang "hapus produk B" → mesin proses → kasbon berubah
//
// Reducer selalu menerima DUA hal:
//   1. state = kondisi keranjang SAAT INI (sebelum diubah)
//   2. action = "perintah" apa yang mau dilakukan
//              action punya: { type: 'nama perintah', payload: data }
// ================================================================
function cartReducer(state, action) {
  // switch = penyeleksi perintah, seperti tombol-tombol di kasir
  switch (action.type) {

    // -----------------------------------------------------------
    // PERINTAH: 'ADD_ITEM' = tambahkan produk ke keranjang
    // action.payload = data produk yang mau ditambahkan
    // -----------------------------------------------------------
    case 'ADD_ITEM': {

      // Cek dulu: apakah produk ini sudah ada di keranjang?
      // findIndex = cari posisi item di daftar, kalau tidak ada → hasilnya -1
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
        // Artinya: cari item yang punya id sama dengan produk yang mau ditambahkan
      );

      let newItems; // variabel untuk menyimpan daftar item yang sudah diupdate

      if (existingIndex >= 0) {
        // ----------------------------------------------------------
        // KONDISI: Produk SUDAH ADA di keranjang → tambah quantitynya saja
        // ----------------------------------------------------------
        // map() = "proses setiap item satu per satu"
        // Untuk item yang cocok → buat salinan baru dengan quantity +1
        // Untuk item yang tidak cocok → biarkan apa adanya
        newItems = state.items.map((item, index) =>
          index === existingIndex
            // { ...item } = salin SEMUA properti item (id, title, price, image, dll)
            // quantity: item.quantity + 1 = TIMPA khusus quantity dengan nilai +1
            // Kenapa tidak langsung item.quantity++ ? Karena di React,
            // data TIDAK BOLEH diubah langsung → harus buat salinan baru
            ? { ...item, quantity: item.quantity + 1 }
            : item // item lain tidak diubah, kembalikan apa adanya
        );

      } else {
        // ----------------------------------------------------------
        // KONDISI: Produk BELUM ADA di keranjang → tambahkan sebagai item baru
        // ----------------------------------------------------------
        // [...state.items] = salin semua item lama ke dalam array baru
        // { ...action.payload, quantity: 1 } = produk baru dengan quantity awal = 1
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      // Kembalikan STATE BARU (objek baru, bukan modifikasi state lama)
      return {
        items: newItems,

        // reduce() = "jumlahkan semua" → hitung total quantity seluruh item
        // Mulai dari 0, tambah quantity setiap item satu per satu
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),

        // Hitung total harga: jumlahkan (harga × quantity) setiap item
        totalPrice: newItems.reduce(
          (sum, item) => sum + item.price * item.quantity, 0
        ),
      };
    }

    // -----------------------------------------------------------
    // PERINTAH: 'REMOVE_ITEM' = hapus produk dari keranjang
    // action.payload = id produk yang mau dihapus
    // -----------------------------------------------------------
    case 'REMOVE_ITEM': {
      // filter() = "saring daftar, buang yang tidak lolos syarat"
      // Syarat: ambil item yang id-nya BERBEDA dengan yang mau dihapus
      // → artinya: yang id-nya sama (yang mau dihapus) tidak diambil
      const newItems = state.items.filter(
        (item) => item.id !== action.payload
      );

      return {
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: newItems.reduce(
          (sum, item) => sum + item.price * item.quantity, 0
        ),
      };
    }

    // -----------------------------------------------------------
    // PERINTAH: 'CLEAR_CART' = kosongkan seluruh keranjang
    // -----------------------------------------------------------
    case 'CLEAR_CART':
      // Kembalikan ke kondisi awal (kosong) yang sudah kita definisikan di atas
      return initialState;

    // -----------------------------------------------------------
    // DEFAULT: kalau ada perintah yang tidak dikenal → jangan ubah apapun
    // -----------------------------------------------------------
    default:
      return state;
  }
}

// ================================================================
// MEMBUAT "GUDANG" KOSONG
// createContext() = buat wadah/gudang baru yang masih kosong
// Nanti akan diisi oleh CartProvider di bawah
// ================================================================
const CartContext = createContext();

// ================================================================
// CART PROVIDER = "Pengelola Gudang"
//
// ANALOGI: Ini seperti penjaga gudang.
//   - Dia yang menyimpan semua barang (data keranjang)
//   - Dia yang memproses perintah (tambah, hapus, kosongkan)
//   - Semua komponen yang "dibungkus" olehnya bisa minta data ke dia
//
// { children } = semua komponen yang ada di dalam <CartProvider>...</CartProvider>
// ================================================================
export function CartProvider({ children }) {

  // useReducer = cara React untuk mengelola state yang kompleks
  // Parameter 1: cartReducer = fungsi mesin kasir yang kita buat di atas
  // Parameter 2: initialState = kondisi awal (keranjang kosong)
  // Hasilnya:
  //   state = kondisi keranjang saat ini
  //   dispatch = "walkie talkie" untuk kirim perintah ke mesin kasir
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // ----------------------------------------------------------------
  // FUNGSI-FUNGSI yang bisa dipakai komponen lain
  // ----------------------------------------------------------------

  // addItem = tambahkan produk ke keranjang
  // product = data produk yang dikirim dari ProductCard
  const addItem = (product) => {
    // dispatch = kirim "perintah" ke cartReducer
    // type: 'ADD_ITEM' = jenis perintahnya
    // payload: product = data yang dibawa perintah ini
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  // removeItem = hapus produk dari keranjang berdasarkan id-nya
  const removeItem = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  // clearCart = kosongkan seluruh keranjang (saat checkout)
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // ----------------------------------------------------------------
  // "BUKA AKSES GUDANG" untuk semua komponen di dalam CartProvider
  // ----------------------------------------------------------------
  // CartContext.Provider = pintu masuk gudang
  // value = barang-barang yang tersedia di gudang (bisa diambil komponen mana saja)
  //   ...state = semua isi state: items, totalItems, totalPrice
  //   addItem, removeItem, clearCart = fungsi-fungsi yang bisa dipanggil
  // {children} = render semua komponen anak di dalam pembungkus ini
  return (
    <CartContext.Provider value={{ ...state, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// ================================================================
// useCart = "KARTU AKSES GUDANG"
//
// Komponen manapun yang mau ambil data keranjang cukup tulis:
//   const { items, totalItems, addItem } = useCart();
//
// Tanpa useCart(), mereka harus tulis:
//   const context = useContext(CartContext); → lebih panjang
// ================================================================
export function useCart() {
  const context = useContext(CartContext);

  // Perlindungan: kalau useCart() dipakai di luar CartProvider → error yang jelas
  // Misal: ada yang lupa membungkus komponen dengan CartProvider
  if (!context) {
    throw new Error('useCart harus dipakai di dalam CartProvider!');
  }

  return context;
}
