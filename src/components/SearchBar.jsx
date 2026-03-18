export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="🔍 Cari produk..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        padding: "12px 16px",
        width: "100%",
        marginBottom: "20px",
        borderRadius: "12px",
        border: "1px solid #ddd",
        outline: "none",
        fontSize: "14px",
      }}
    />
  );
}