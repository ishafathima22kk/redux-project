import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProduct,
  editProduct,
  deleteProduct,
} from "./features/product/productsSlice";
function App() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.products
  );
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const handleAdd = (e) => {
    e.preventDefault();
    if (!title || !price) return;
    dispatch(
      addProduct({
        title,
        price: Number(price),
      })
    );
    setTitle("");
    setPrice("");
  };
  const handleEdit = (product) => {
    const newTitle = prompt("Enter new product name", product.title);
    if (newTitle === null || !newTitle.trim()) return;
    const newPrice = prompt("Enter new price", product.price);
    if (newPrice === null || newPrice.trim() === "") return;
    if (!Number.isFinite(Number(newPrice))) {
      alert("Enter a valid price");
      return;
    }
    dispatch(
      editProduct({
        id: product.id,
        title: newTitle.trim(),
        price: Number(newPrice),
      })
    );
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteProduct(id));
    }
  };
  return (
    <div style={{ padding: "30px" }}>
      <h1>Product Management</h1>

      {}
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Product Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Product</button>
      </form>
      <hr />
      {}
      {loading && <h3>Loading products...</h3>}
      {}
      {error && <p>{error}</p>}
      {}
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            margin: "10px",
          }}
        >
          <h3>{product.title}</h3>
          <p>Price: ${product.price}</p>
          <button onClick={() => handleEdit(product)}>
            Edit
          </button>
          <button onClick={() => handleDelete(product.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
export default App;