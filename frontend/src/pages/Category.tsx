import React, { useContext, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Item from "../components/Item";
import { ShopContext } from "../Context/ShopContext";

interface CategoryProps {
    category: string;
    banner: string;
}

const Category: React.FC<CategoryProps> = ({ category, banner }) => {
    const { all_products } = useContext(ShopContext);

    // State để lưu số lượng sản phẩm đang hiển thị
    const [visibleCount, setVisibleCount] = useState(6); // Mặc định hiển thị 6 sản phẩm

    // Lọc sản phẩm theo danh mục
    const filteredProducts = all_products.filter((item) => item.category === category);

    // Hàm xử lý hiển thị thêm sản phẩm
    const handleShowMoreOrLess = () => {
        if (visibleCount >= filteredProducts.length) {
            // Quay lại trạng thái mặc định (2 hàng, 6 sản phẩm)
            setVisibleCount(6);
        } else {
            // Hiển thị thêm 2 hàng (6 sản phẩm)
            setVisibleCount((prevCount) => prevCount + 6);
        }
    };

    return (
        <section className="py-12 max_padd_container xl:py-28">
            <div>
                <div>
                    <img
                        src={banner}
                        alt=""
                        className="block my-7 mx-auto h-[20rem] w-[100vw] bg-cover"
                    />
                </div>
                <div className="mx-2 my-8 flexBetween">
                    <div className="px-8 py-3 flexBetween max-sm:p-4 gap-x-4 rounded-5xl ring-1 ring-slate-900/15">
                        Lọc theo
                        <MdOutlineKeyboardArrowDown />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-8 xs:grid-cols-2 md:grid-cols-3">
                    {filteredProducts.slice(0, visibleCount).map((item) => (
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
                <div className="mt-16 text-center">
                    <button className="btn_dark_rounded" onClick={handleShowMoreOrLess}>
                        {visibleCount >= filteredProducts.length ? "Ẩn đi" : "Hiển thị thêm"}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Category;
