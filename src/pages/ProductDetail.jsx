import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import Loading from "../components/Loading";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const data = await getProducts();
      const found = data.find((item) => item.id === parseInt(id));
      setProduct(found);
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (!product) return <p>Produk tidak ditemukan</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          background: "#fff",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* LEFT: IMAGE */}
        <div style={{ textAlign: "center" }}>
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* RIGHT: INFO */}
        <div>
          <h2 style={{ marginBottom: "10px" }}>{product.title}</h2>

          <p style={{ color: "#888", marginBottom: "10px" }}>
            Kategori: {product.category}
          </p>

          <h1 style={{ color: "#ac2c68", margin: "15px 0" }}>
            ${product.price.toFixed(2)}
          </h1>

          <p style={{ lineHeight: "1.6", color: "#555" }}>
            {product.description}
          </p>

          {/* BUTTON */}
          <button
            onClick={() => addItem(product)}
            style={{
              marginTop: "20px",
              padding: "12px 24px",
              background: "#ac2c68",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            + Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}