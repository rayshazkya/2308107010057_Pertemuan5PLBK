import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)', // 🔥 glass effect
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid #eee',
        padding: '16px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* LOGO */}
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '22px',
          color: '#111',
          letterSpacing: '1px',
        }}
      >
        Kiya<span style={{ color: '#ff4d8d' }}>'s</span> Store
      </Link>

      {/* NAV */}
      <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: '#333',
            fontSize: '14px',
            position: 'relative',
          }}
        >
          Home
        </Link>

        <Link
          to="/cart"
          style={{
            textDecoration: 'none',
            color: '#333',
            fontSize: '14px',
            position: 'relative',
          }}
        >
          🛒 Cart

          {/* badge */}
          {totalItems > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-14px',
                background: '#ff4d8d',
                color: '#fff',
                borderRadius: '999px',
                padding: '2px 7px',
                fontSize: '11px',
                fontWeight: 'bold',
              }}
            >
              {totalItems}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}