import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import favourite from "../assets/background/love.svg";
import { formatCurrency } from "../utils";
import { ShopContext } from "../Context/ShopContext";

interface ItemProps {
    id: any;
    name: string;
    image: string;
    category: string;
    old_price: number;
    new_price: number;
}

const Item: React.FC<ItemProps> = ({
    id,
    name,
    image,
    category,
    old_price,
    new_price,
}) => {
    const { addToCart } = useContext(ShopContext)!;

    const handleAddToCart = () => {
        addToCart(id);
    };

    return (
        <div className="rounded-xl overflow-hidden bg-[#e5e5e5]" style={{ boxShadow: '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
            <div className="relative flex justify-center items-center group overflow-hidden transition-all duration-100 h-[60%]">
                <Link
                    to={`/product/${id}`}
                    className="h-12 w-12 bg-white rounded-full flexCenter absolute top-1/2 bottom-1/2 !py-2 z-20 transition-all duration-700 scale-0 group-hover:scale-100"
                >
                    <FaSearch className="transition-all duration-200 scale-125 hover:rotate-90 hover:scale-125" />
                </Link>

                <img
                    onClick={() => window.scrollTo(0, 0)}
                    src={image}
                    alt="productImage"
                    className="block object-cover w-full transition-all duration-1000 group-hover:scale-110"
                />
            </div>
            <div className="p-4 overflow-hidden">
                <div className="flex flex-wrap items-center justify-start py-3 md:justify-between">
                    <h2 className="text-xl font-semibold truncate max-w-44">
                        {name}
                    </h2>
                    <span className="font-bold text-lg bg-[#FDF7F4] ml-1 px-4 rounded-lg py-1">
                        {formatCurrency(new_price)}
                    </span>
                </div>

                <div className="flex items-center gap-2 py-2 mt-1">
                    <span className="text-sm line-through opacity-50">
                        {formatCurrency(old_price)}
                    </span>
                    <span className="bg-[#997C70] px-1.5 py-0.5 rounded-md text-xs text-white">
                    </span>
                </div>

                <div>
                    <span className="flex items-center p-1 py-2 mt-1 rounded">
                        <FaStar className="mr-1 text-lg text-yellow-500" />
                        <FaStar className="mr-1 text-lg text-yellow-500" />
                        <FaStar className="mr-1 text-lg text-yellow-500" />
                        <FaStar className="mr-1 text-lg text-yellow-500" />
                        <FaStarHalfStroke className="mr-1 text-lg text-yellow-500" />
                        {/* <FaRegStar className="mr-1 text-lg text-yellow-500" /> */}
                        <span className="ml-2 text-xs text-gray-500"></span>
                    </span>
                </div>

                <div className="flex justify-center gap-2 mt-5">
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-[#0f172a] hover:bg-secondary px-6 py-2 rounded-md text-white font-medium tracking-wide transition"
                    >
                        Thêm vào giỏ hàng
                    </button>

                    <div className="relative">
                        <Link to={`/product/${id}`}>
                            <button className="flex justify-center p-3 transition bg-gray-300 rounded-md hover:bg-gray-400">
                                <img
                                    className="opacity-50"
                                    src={favourite}
                                    alt="add to favourites"
                                />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Item;
