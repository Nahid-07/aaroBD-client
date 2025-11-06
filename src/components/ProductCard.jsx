

const ProductCard = ({ product }) => {
  return (
    <div className="product-card" style={styles.card}>
      <img src={product.image} alt={product.name} style={styles.image} />
      <h3>{product.name}</h3>
      <p>৳ {product.price}</p>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #eee",
    borderRadius: "10px",
    padding: "10px",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
  },
};

export default ProductCard;
