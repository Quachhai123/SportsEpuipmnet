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


    return (
        <section className="bg-primary">
            <div className="max_padd_container py-12 xl:py-28 xl:w-[105%] ">
                <h3 className="text-center h3">Sản phẩm liên quan</h3>
                <hr className="h-[3px] md:w-1/2 mx-auto bg-gradient-to-1 from-transparent via-black to-transparent mb-16" />
                <div className="grid grid-cols-1 gap-8 xs:grid-cols-2 md:grid-cols-3">
                    {popularProducts.map((item) => (
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
            </div>
        </section>
    );
};

export default RelatedProduct;
