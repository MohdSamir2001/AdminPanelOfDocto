import axios from "axios";
import { useEffect, useState } from "react";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1234/api/admin/all-orders",
        {
          withCredentials: true,
        }
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:1234/api/admin/orders/update/${orderId}`,
        { orderId, status: newStatus },
        { withCredentials: true }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(
        `http://localhost:1234/api/admin/orders/delete/${orderId}`,
        {
          withCredentials: true,
        }
      );
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Admin Orders Panel
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-2">Order ID</th>
              <th className="p-2">User</th>
              <th className="p-2">Total Price</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <>
                <tr key={order._id} className="border-b">
                  <td className="p-2">{order._id}</td>
                  <td className="p-2">{order.user?.name || "Unknown User"}</td>
                  <td className="p-2">Rs {order.totalPrice}</td>
                  <td className="p-2">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                      className="border p-1 rounded"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="p-2 flex space-x-2">
                    <button
                      onClick={() => toggleOrderDetails(order._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                    >
                      {expandedOrders.includes(order._id)
                        ? "Hide Details"
                        : "View Details"}
                    </button>
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {expandedOrders.includes(order._id) && (
                  <tr>
                    <td colSpan="5" className="p-4 bg-gray-100">
                      <strong>Medicines Ordered:</strong>
                      <ul>
                        {order.medicines.map((item, index) => (
                          <li key={index}>
                            - {item.medicineId?.name || "Unknown Medicine"} (
                            {item.quantity} pcs)
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
