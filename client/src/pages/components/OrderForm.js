import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addOrder, editOrder } from '../actions/orderActions';

const OrderForm = ({ order, isEditing, onClose }) => {
  const dispatch = useDispatch();

  // Initialize state variables
  const [orderId, setOrderId] = useState(''); // State for Order ID
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [product, setProduct] = useState('Product 1');
  const [quantity, setQuantity] = useState(1);
  const [orderValue, setOrderValue] = useState(29); // Default for Product 1

  useEffect(() => {
    // Set initial form values when editing an existing order
    if (isEditing && order) {
      setOrderId(order.id);
      setCustomerName(order.customer_name);
      setCustomerEmail(order.customer_email);
      setProduct(order.product);
      setQuantity(order.quantity);
      setOrderValue(order.order_value);
    } else {
      // Generate Order ID for new order
      const generatedId = generateOrderId();
      setOrderId(generatedId);
    }
  }, [isEditing, order]);

  // Function to generate a unique Order ID using current timestamp and random alphanumeric characters
  const generateOrderId = () => {
    const timestamp = Date.now().toString(36); // Convert current time to base-36 string
    const randomChars = Math.random().toString(36).substr(2, 5); // Random alphanumeric characters
    return `ORD-${timestamp}-${randomChars}`.toLowerCase(); // Combine timestamp and random characters
  };

  const handleProductChange = (e) => {
    const selectedProduct = e.target.value;
    setProduct(selectedProduct);
    const productPrices = { 'Product 1': 29, 'Product 2': 49, 'Product 3': 149 };
    setOrderValue(productPrices[selectedProduct] * quantity);
  };

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value, 10);
    setQuantity(qty);
    const productPrices = { 'Product 1': 29, 'Product 2': 49, 'Product 3': 149 };
    setOrderValue(productPrices[product] * qty);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      id: orderId,
      customer_name: customerName,
      customer_email: customerEmail,
      product,
      quantity,
      order_value: orderValue,
    };
    if (isEditing) {
      dispatch(editOrder(newOrder));
    } else {
      dispatch(addOrder(newOrder));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">{isEditing ? 'Edit Order' : 'Create New Order'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Customer Email</label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Product</label>
            <select
              value={product}
              onChange={handleProductChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="Product 1">Product 1</option>
              <option value="Product 2">Product 2</option>
              <option value="Product 3">Product 3</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Order Value</label>
            <input
              type="number"
              value={orderValue}
              readOnly
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <p className="text-red-500 text-sm mb-4">Order ID will be automatically generated.</p>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isEditing ? 'Update Order' : 'Create Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
