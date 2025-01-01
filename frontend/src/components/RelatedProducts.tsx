import { getPopularProducts } from "../services/productService";
import Item from "./Item";
import React, { useEffect, useState } from "react";

interface PopularItem {
    _id: string;
    name: string;
    image: string;
    category: string;
    old_price: number;
    new_price: number;
}

const RelatedProduct: React.FC = () => {
    const [popularProducts, setPopularProducts] = useState<PopularItem[]>([]);
    const [visibleCount, setVisibleCount] = useState<number>(3); // Số sản phẩm hiển thị ban đầu

    const fetchInfo = async () => {
        try {
            const data = await getPopularProducts();
            setPopularProducts(data.data);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 3); // Tăng thêm 3 sản phẩm
    };

    const handleShowLess = () => {
        setVisibleCount(3); // Reset về 3 sản phẩm
    };

    return (
        <section className="bg-primary">
            <div className="max_padd_container py-12 xl:py-28 xl:w-[105%] ">
                <h3 className="text-center h3">Sản phẩm liên quan</h3>
                <hr className="h-[3px] md:w-1/2 mx-auto bg-gradient-to-1 from-transparent via-black to-transparent mb-16" />
                
                {/* Hiển thị sản phẩm */}
                <div className="grid grid-cols-1 gap-8 xs:grid-cols-2 md:grid-cols-3">
                    {popularProducts.slice(0, visibleCount).map((item) => (
                        <Item
                            key={item._id}
                            id={item._id}
                            image={item.image}
                            name={item.name}
                            category={item.category}
                            new_price={item.new_price}
                            old_price={item.old_price}
                        />
                    ))}
                </div>

                {/* Nút điều khiển */}
                <div className="flex justify-center mt-8">
                    {visibleCount < popularProducts.length ? (
                        <button
                            onClick={handleShowMore}
                            className="px-4 py-2 text-white bg-black rounded-md hover:bg-[#55684F] focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            Hiển thị thêm
                        </button>
                    ) : (
                        <button
                            onClick={handleShowLess}
                            className="px-4 py-2 text-white bg-black rounded-md hover:bg-[#55684F] focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            Ẩn bớt
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default RelatedProduct;
