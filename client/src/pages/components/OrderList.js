import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OrderItem from './OrderItem';
import OrderForm from './OrderForm';
import { deleteOrder } from '../actions/orderActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const OrderList = () => {
  const orders = useSelector(state => state.orders.orders) || [];
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsFormOpen(true);
  };

  const handleCreateOrder = () => {
    setSelectedOrder(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter(order =>
    order.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredOrders.length / ordersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search by Customer Name"
          className="border-green-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm w-64 px-3 py-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleCreateOrder}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create New Order
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Customer Email</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map(order => (
            <OrderItem key={order.id} order={order} onDelete={handleDeleteOrder} onEdit={handleEditOrder} />
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center">
        <button
          onClick={prevPage}
          className={`px-3 py-1 border rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white'}`}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="mx-2">{currentPage} of {Math.ceil(filteredOrders.length / ordersPerPage)}</div>
        <button
          onClick={nextPage}
          className={`px-3 py-1 border rounded ${currentPage === Math.ceil(filteredOrders.length / ordersPerPage) ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white'}`}
          disabled={currentPage === Math.ceil(filteredOrders.length / ordersPerPage)}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      {isFormOpen && (
        <OrderForm order={selectedOrder} isEditing={!!selectedOrder} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default OrderList;
