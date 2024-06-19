export const addOrder = (order) => {
  return {
    type: 'ADD_ORDER',
    payload: order,
  };
};

export const deleteOrder = (orderId) => {
  return {
    type: 'DELETE_ORDER',
    payload: orderId,
  };
};

export const editOrder = (order) => {
  return {
    type: 'EDIT_ORDER',
    payload: order,
  };
};

export const loadOrders = (orders) => {
  return {
    type: 'LOAD_ORDERS',
    payload: orders,
  };
};
