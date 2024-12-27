import { FaUsers } from "react-icons/fa";
import { GiRunningShoe } from "react-icons/gi";
import { useEffect, useState } from 'react';
import { LuShoppingBag } from "react-icons/lu";

import { fetchTotalUsers } from '../services/userService';
import { fetchTotalProducts } from '../services/productService';

import Sidebar from './Sidebar';
import NavbarAdmin from './NavbarAdmin';

const Dashboard = () => {
    const [counts, setCounts] = useState({ products: 0, users: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const totalUsers = await fetchTotalUsers();
                const totalProducts = await fetchTotalProducts();

                setCounts({
                    users: totalUsers,
                    products: totalProducts,
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <NavbarAdmin />
            <div className='flex flex-col lg:flex-row'>
                <Sidebar />
                <div className='box-border flex-grow w-full p-8 mt-4 bg-white rounded-sm lg:m-7'>
                    <h2 className="mb-4 text-2xl font-bold">Bảng điều khiển</h2>
                    <div className="flex gap-4">
                        <div className="flex-1 p-4 bg-gray-200 rounded-md shadow-lg">
                            <div className='flex justify-center'>
                                <FaUsers className="text-3xl mb-2 w-[90px] h-[90px]" />
                            </div>
                            <h1 className="text-[60px] font-semibold">{counts.users}</h1>
                            <p className="text-[25px] text-gray-600">Người dùng</p>
                        </div>
                        <div className="flex-1 p-4 bg-gray-200 rounded-md shadow-lg">
                            <div className='flex justify-center'>
                                <GiRunningShoe className="text-3xl mb-2 w-[90px] h-[90px]" />
                            </div>
                            <h1 className="text-[60px] font-semibold">{counts.products}</h1>
                            <p className="text-[25px] text-gray-600">Sản phẩm</p>
                        </div>
                        <div className="flex-1 p-4 bg-gray-200 rounded-md shadow-lg">
                            <div className='flex justify-center'>
                                <LuShoppingBag className="text-3xl mb-2 w-[90px] h-[90px]" />
                            </div>
                            <h1 className="text-[60px] font-semibold">1</h1>
                            <p className="text-[25px] text-gray-600">Đặt hàng</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
