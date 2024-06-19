import React from 'react';
import { useSelector } from 'react-redux';

const TotalOrderValue = () => {
  const orders = useSelector((state) => state.orders.orders) || [];

  const totalValue = orders.reduce((total, order) => total + order.order_value, 0);

  return (
    <div className="text-lg font-bold">
      Total Order Value: ${totalValue.toFixed(2)}
    </div>
  );
};

export default TotalOrderValue;
