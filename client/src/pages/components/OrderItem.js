import React from 'react';

const OrderItem = ({ order, onDelete, onEdit }) => {
  const { id, customer_name, customer_email, product, quantity } = order;

  return (
    <tr>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{id}</td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{customer_name}</td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{customer_email}</td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{product}</td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{quantity}</td>
      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
        <button className="text-indigo-600 hover:text-indigo-900 mr-2" onClick={() => onEdit(order)}>Edit</button>
        <button className="text-red-600 hover:text-red-900" onClick={() => onDelete(id)}>Delete</button>
      </td>
    </tr>
  );
};

export default OrderItem;
