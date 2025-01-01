import React, { useState } from 'react';
import { Link } from "react-router-dom";

import apiClient from '../services/axios';

const SearchProduct = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [brandName, setBrandName] = useState('');
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/searchProduct', {
                params: { name, category, brandName },
            });
            setProducts(response.data);
            setError('');
        } catch (err) {
            setError('An error occurred while searching products.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-primary">
            <div className="max_padd_container py-12 xl:py-28 xl:w-[95%]">
                <h3 className="text-center h3">Tìm kiếm sản phẩm</h3>
                <hr className="h-[3px] md:w-1/2 mx-auto bg-gradient-to-1 from-transparent via-black to-transparent mb-16" />
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Tên sản phẩm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                </div>
                <div className="mb-4">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300" >
                        <option value="">Chọn thể loại</option>  {/* Giá trị rỗng */}
                        <option value="men">Nam</option>
                        <option value="women">Nữ</option>
                        <option value="kid">Trẻ em</option>
                    </select>
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Nhãn hàng"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                </div>
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 text-white bg-secondary rounded-md max-w-fit hover:bg-[#55684F] focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    Tìm kiếm
                </button>

                {loading && <p className="mt-4 text-center text-gray-500">Đang tải...</p>}
                {error && <p className="mt-4 text-center text-red-500">{error}</p>}

                {products.length > 0 && (
                    <div className="mt-6">
                        <ul className="space-y-4">
                            {products.map((product) => (
                                <Link
                                to={`/product/${product._id}`} key={product._id} className="pb-4 border-b">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="object-cover w-16 h-16 rounded-md"
                                        />
                                        <div>
                                            <h4 className="text-lg font-semibold">{product.name}</h4>
                                            <p className="text-sm text-gray-500">{product.category}</p>
                                            <p className="text-sm text-gray-500">{product.brand?.name}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SearchProduct;
