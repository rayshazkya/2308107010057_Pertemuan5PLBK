import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../services/api';

import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import SearchBar from '../components/SearchBar';

export default function Home() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        setProducts(productsData);
        setCategories(categoriesData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredProducts = products
    .filter((p) =>
      selectedCategory === 'all' ? true : p.category === selectedCategory
    )
    .filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );

  if (loading) return <Loading />;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>

      {/* 🔥 HEADER */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: '700',
          marginBottom: '10px'
        }}>
          Katalog Produk
        </h2>

        <p style={{
          color: '#777',
          fontSize: '14px'
        }}>
          Temukan produk terbaik pilihan kamu ✨
        </p>
      </div>

      {/* 🔍 SEARCH */}
      <div style={{ marginBottom: '1.5rem' }}>
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      {/* 🔥 CATEGORY FILTER */}
      <div style={{
        marginBottom: '2rem',
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setSelectedCategory('all')}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '500',
            transition: '0.2s',
            background: selectedCategory === 'all' ? '#e91e63' : '#f1f1f1',
            color: selectedCategory === 'all' ? '#fff' : '#555',
          }}
        >
          Semua
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              transition: '0.2s',
              textTransform: 'capitalize',
              background: selectedCategory === cat ? '#e91e63' : '#f1f1f1',
              color: selectedCategory === cat ? '#fff' : '#555',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🔥 PRODUCT GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
        gap: '20px'
      }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                transition: '0.2s'
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'translateY(-5px)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'translateY(0)')
              }
            >
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div style={{
            gridColumn: '1/-1',
            textAlign: 'center',
            padding: '40px'
          }}>
            <p style={{ color: '#888' }}>
              😢 Produk tidak ditemukan
            </p>
          </div>
        )}
      </div>

    </div>
  );
}