import React, { useState, useEffect } from "react";

import { fetchNewCollection } from "../services/productService";
import Item from "./Item";

interface LatestItem {
    id: string;
    name: string;
    image: string;
    old_price: number;
    category: string;
    new_price: number;
}

const NewCollection: React.FC = () => {
    const [new_collection, setNew_collection] = useState<LatestItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getNewCollection = async () => {
            try {
                const data = await fetchNewCollection();
                setNew_collection(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        getNewCollection();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center w-full min-h-32">Đang tải...</div>;
    }

    if (error) {
        return <div>Lỗi: {error}</div>;
    }

    return (
        <section className="bg-primary">
            <div className="max_padd_container py-12 xl:py-28 xl:w-[99%]">
                <h3 className="text-center h3">Sản phẩm mới nhất</h3>
                <hr className="h-[3px] md:w-1/2 mx-auto bg-gradient-to-1 from-transparent via-black to-transparent mb-16" />
                <div className="grid grid-cols-1 gap-6 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    {new_collection.map((item) => (
                        <Item
                            key={item.id}
                            id={item.id}
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

export default NewCollection;
