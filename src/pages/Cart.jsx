import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, totalPrice, removeItem, clearCart, addItem, decreaseItem } = useCart();

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Keranjang Kosong</h2>
        <p>Belum ada produk di keranjang Anda.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>Keranjang Belanja</h2>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '16px',
            background: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          {/* IMAGE */}
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'contain',
            }}
          />

          {/* INFO */}
          <div style={{ flex: 1, marginLeft: '16px' }}>
            <h4 style={{ margin: '0 0 6px' }}>
              {item.title.substring(0, 50)}...
            </h4>

            <p style={{ margin: 0, color: '#777' }}>
              ${item.price.toFixed(2)} x {item.quantity}
            </p>

            {/* 🔥 QUANTITY CONTROL */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px', alignItems: 'center' }}>
              <button
                onClick={() => decreaseItem(item.id)}
                style={qtyBtn}
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => addItem(item)}
                style={qtyBtn}
              >
                +
              </button>
            </div>
          </div>

          {/* PRICE + DELETE */}
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => removeItem(item.id)}
              style={{
                background: '#ff4d4f',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Hapus
            </button>
          </div>
        </div>
      ))}

      {/* TOTAL */}
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <h3>Total: ${totalPrice.toFixed(2)}</h3>

        <button
          onClick={clearCart}
          style={{
            padding: '10px 24px',
            background: '#ac2c68',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

// 🔥 tombol + -
const qtyBtn = {
  width: '30px',
  height: '30px',
  border: '1px solid #ddd',
  borderRadius: '6px',
  background: '#fff',
  cursor: 'pointer',
};