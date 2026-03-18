import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div
      style={{
        border: '1px solid #eee',
        borderRadius: '16px',
        padding: '16px',
        background: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: '0.3s',
      }}

      // 🔥 hover effect biar interaktif
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.03)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
      }}
    >

      {/* GAMBAR */}
      <img
        src={product.image}
        alt={product.title}
        style={{
          width: '100%',
          height: '180px',
          objectFit: 'contain',
          marginBottom: '10px',
        }}
      />

      {/* JUDUL */}
      <h3
        style={{
          fontSize: '14px',
          margin: '8px 0',
          flex: 1,
          color: '#333',
        }}
      >
        {product.title.substring(0, 50)}...
      </h3>

      {/* HARGA */}
      <p
        style={{
          fontWeight: 'bold',
          color: '#ff4d8d',
          fontSize: '16px',
        }}
      >
        ${product.price.toFixed(2)}
      </p>

      {/* TOMBOL */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '8px',
          marginTop: '10px',
        }}
      >
        {/* DETAIL */}
        <Link
          to={`/product/${product.id}`}
          style={{
            flex: 1,
            padding: '8px',
            textAlign: 'center',
            borderRadius: '8px',
            border: '1px solid #ddd',
            background: '#fff',
            color: '#333',
            textDecoration: 'none',
            fontSize: '14px',
          }}
        >
          Detail
        </Link>

        {/* KERANJANG */}
        <button
          onClick={() => addItem(product)}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '8px',
            border: 'none',
            background: '#ff4d8d',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          + Keranjang
        </button>
      </div>
    </div>
  );
}