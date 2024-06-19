import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import OrderList from '../components/OrderList';
import TotalOrderValue from '../components/TotalOrderValue';
import { loadOrders } from '../actions/orderActions';

function Home(userDetails) {
    const user = userDetails.user;

    const logout = () => {
        window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
    };

    useEffect(() => {
        fetch('/data.json')
            .then((response) => response.json())
            .then((data) => {
                store.dispatch(loadOrders(data));
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-1 flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-600">
                    Welcome, {user ? user.name : "Guest"}!
                </h1>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-2 py-0"
                    onClick={logout}
                >
                    Log Out
                </button>
            </div>
            <Provider store={store} className="flex-grow">
                <div className="container mx-auto p-4 flex-grow flex flex-col">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mt-5">Order Management System</h2>
                        <TotalOrderValue />
                    </div>
                    <div className="flex-grow overflow-auto">
                        <OrderList />
                    </div>
                </div>
            </Provider>
        </div>
    );
}

export default Home;
