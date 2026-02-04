"use client";

import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [tab, setTab] = useState("orders");
  const [adminKey, setAdminKey] = useState("");
  const [authorized, setAuthorized] = useState(false);

  function handleLogin() {
    if (!adminKey) {
      alert("Enter admin key");
      return;
    }
    setAuthorized(true);
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow w-96">
          <h2 className="text-xl font-semibold mb-4">Admin Login</h2>

          <input
            type="password"
            placeholder="Enter Admin Key"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          />

          <button
            onClick={handleLogin}
            className="bg-black text-white px-4 py-2 rounded w-full"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* TABS */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTab("orders")}
          className={`px-4 py-2 rounded ${
            tab === "orders" ? "bg-black text-white" : "bg-white"
          }`}
        >
          Orders
        </button>

        <button
          onClick={() => setTab("products")}
          className={`px-4 py-2 rounded ${
            tab === "products" ? "bg-black text-white" : "bg-white"
          }`}
        >
          Add Product
        </button>

        <button
          onClick={() => setTab("view-products")}
          className={`px-4 py-2 rounded ${
            tab === "view-products" ? "bg-black text-white" : "bg-white"
          }`}
        >
          View Products
        </button>
      </div>

      {/* RENDER DASHBOARDS */}
      {tab === "orders" && <OrdersDashboard adminKey={adminKey} />}
      {tab === "products" && <ProductsDashboard adminKey={adminKey} />}
      {tab === "view-products" && <ViewProducts adminKey={adminKey} />}
    </div>
  );
}

/* ================= ORDERS ================= */

function OrdersDashboard({ adminKey }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    if (!adminKey) return;

    try {
      const res = await fetch("/api/admin/orders", {
        headers: {
          "x-admin-key": adminKey,
        },
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.error("Orders API error:", data);
        setOrders([]);
      }
    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  async function markCompleted(rowIndex) {
    await fetch("/api/admin/orders/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
      },
      body: JSON.stringify({ rowIndex }),
    });

    loadOrders();
  }

  useEffect(() => {
    loadOrders();
  }, [adminKey]); //important

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Orders</h2>

      {orders.length === 0 && <p className="text-gray-500">No orders found</p>}

      {orders.map((order) => (
        <div
          key={order.rowIndex}
          className="border rounded p-4 flex justify-between mb-3"
        >
          <div>
            <p className="font-medium">{order.name}</p>
            <p className="text-sm text-gray-500">₹{order.total}</p>
          </div>

          <button
            onClick={() => markCompleted(order.rowIndex)}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Completed
          </button>
        </div>
      ))}
    </div>
  );
}

/* ================= PRODUCTS ================= */

function ProductsDashboard({ adminKey }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    actualPrice: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  async function uploadImages(files) {
    setUploading(true);
    const uploadedUrls = [];

    for (const file of files) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "products");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dpsfw0apo/image/upload",
        { method: "POST", body: data },
      );

      const json = await res.json();

      if (!res.ok) {
        console.error("❌ Cloudinary error:", json);
        alert(json.error?.message || "Image upload failed");
        continue;
      }

      uploadedUrls.push(json.secure_url);
    }

    setUploading(false);
    return uploadedUrls;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert("❌ Failed: " + data.error);
      return;
    }

    alert("✅ Product added");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded flex flex-col justify-center items-center shadow w-auto m-auto"
    >
      <input
        placeholder="Title"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Price"
        type="number"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
      />

      <input
        placeholder="Actual Price"
        type="number"
        className="border p-2 w-full mb-2"
        onChange={(e) =>
          setForm({ ...form, actualPrice: Number(e.target.value) })
        }
      />

      <textarea
        placeholder="Description"
        className="border p-2 w-full mb-4"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        type="file"
        multiple
        accept="image/*"
        className="mb-4"
        onChange={async (e) => {
          const urls = await uploadImages(e.target.files);
          setForm({ ...form, images: urls });
        }}
      />

      <button
        disabled={uploading}
        className="bg-black text-white px-4 py-2 rounded w-full"
      >
        {uploading ? "Uploading images..." : "Add Product"}
      </button>
    </form>
  );
}

/* ================= PRODUCTS ================= */

function ViewProducts({ adminKey }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    try {
      const res = await fetch("/api/admin/products", {
        headers: { "x-admin-key": adminKey },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("API Error:", text);
        setProducts([]);
        return;
      }

      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(id) {
    if (!confirm("Delete this product?")) return;

    await fetch("/api/admin/products/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
      },
      body: JSON.stringify({ id }),
    });

    loadProducts(); // refresh
  }

  useEffect(() => {
    loadProducts();
  }, [adminKey]);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="products-wrapper">
      <h2 className="products-title">All Products</h2>

      {products.length === 0 && (
        <p className="no-products">No products found</p>
      )}

      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            {/* Image */}
            <div className="product-image">
              <img
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.title}
              />
            </div>

            {/* Content */}
            <div className="product-body">
              <h3 className="product-name">{product.title}</h3>

              <p className="product-desc">{product.description}</p>

              <div className="product-price">
                <span className="price">₹{product.price}</span>

                {product.actualPrice && (
                  <span className="actual-price">₹{product.actualPrice}</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <button
              onClick={() => deleteProduct(product._id)}
              className="delete-btn"
            >
              Delete Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
