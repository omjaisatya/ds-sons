import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../auth/firebase";
import { Table, Button, Modal, Form, Input, Select } from "antd";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      // Fetch products
      const productsSnapshot = await getDocs(collection(db, "products"));
      setProducts(
        productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );

      // Fetch users
      const usersSnapshot = await getDocs(collection(db, "users"));
      setUsers(
        usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );

      // Fetch orders
      const ordersSnapshot = await getDocs(collection(db, "orders"));
      setOrders(
        ordersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );

      // Fetch reviews
      const reviewsSnapshot = await getDocs(collection(db, "reviews"));
      setReviews(
        reviewsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchData();
  }, []);

  // Product Columns for Table
  const productColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => handleEditProduct(record)}>Edit</Button>
          <Button danger onClick={() => handleDeleteProduct(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  // User Columns for Table
  const userColumns = [
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button danger onClick={() => handleDeleteUser(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  // Review Columns for Table
  const reviewColumns = [
    { title: "Product", dataIndex: "productId", key: "productId" },
    { title: "Review", dataIndex: "text", key: "text" },
    { title: "Rating", dataIndex: "rating", key: "rating" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button danger onClick={() => handleDeleteReview(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  // Order Columns for Table
  const orderColumns = [
    { title: "Order ID", dataIndex: "id", key: "id" },
    { title: "Customer", dataIndex: "customerName", key: "customerName" },
    { title: "Total", dataIndex: "total", key: "total" },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Select
          defaultValue={record.status}
          onChange={(value) => handleUpdateOrderStatus(record.id, value)}
        >
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="processing">Processing</Select.Option>
          <Select.Option value="shipped">Shipped</Select.Option>
          <Select.Option value="delivered">Delivered</Select.Option>
        </Select>
      ),
    },
  ];

  // Handlers
  const handleDeleteProduct = async (productId) => {
    await deleteDoc(doc(db, "products", productId));
    setProducts(products.filter((p) => p.id !== productId));
  };

  const handleDeleteUser = async (userId) => {
    await deleteDoc(doc(db, "users", userId));
    setUsers(users.filter((u) => u.id !== userId));
  };

  const handleDeleteReview = async (reviewId) => {
    await deleteDoc(doc(db, "reviews", reviewId));
    setReviews(reviews.filter((r) => r.id !== reviewId));
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    await updateDoc(doc(db, "orders", orderId), { status });
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status } : o)));
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleSubmitProduct = async (values) => {
    if (selectedProduct) {
      await updateDoc(doc(db, "products", selectedProduct.id), values);
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id ? { ...p, ...values } : p
        )
      );
    }
    setIsModalVisible(false);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="dashboard-sections">
        {/* Products Section */}
        <section>
          <h2>Product Management</h2>
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            Add New Product
          </Button>
          <Table dataSource={products} columns={productColumns} rowKey="id" />
        </section>

        {/* Users Section */}
        <section>
          <h2>User Management</h2>
          <Table dataSource={users} columns={userColumns} rowKey="id" />
        </section>

        {/* Reviews Section */}
        <section>
          <h2>Review Management</h2>
          <Table dataSource={reviews} columns={reviewColumns} rowKey="id" />
        </section>

        {/* Orders Section */}
        <section>
          <h2>Order Management</h2>
          <Table dataSource={orders} columns={orderColumns} rowKey="id" />
        </section>
      </div>

      {/* Product Edit/Add Modal */}
      <Modal
        title={selectedProduct ? "Edit Product" : "Add New Product"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form initialValues={selectedProduct} onFinish={handleSubmitProduct}>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Image URL" name="image">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
