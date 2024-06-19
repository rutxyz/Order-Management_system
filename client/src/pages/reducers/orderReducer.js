const initialState = {
  orders: [], // Initializing orders as an empty array
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_ORDERS':
      return {
        ...state,
        orders: action.payload,
      };
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case 'DELETE_ORDER':
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload),
      };
    case 'EDIT_ORDER':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id ? action.payload : order
        ),
      };
    default:
      return state;
  }
};

export default orderReducer;
