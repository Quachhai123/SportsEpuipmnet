import { useEffect, useState } from "react";
import { TbTrash } from "react-icons/tb";
import { RiEdit2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

import { deleteProduct, fetchAllProducts } from "../services/productService";
import { formatCurrency } from "../utils"

import Sidebar from "./Sidebar";
import NavbarAdmin from "./NavbarAdmin";
interface Product {
    _id: number;
    name: string;
    old_price: number;
    new_price: number;
    category: string;
    remove: string;
    image?: string;
}

const ListProduct = () => {
    const [allProducts, setAllProducts] = useState<Product[]>([]);

    const fetchInfo = async () => {
        try {
            const data = await fetchAllProducts();
            setAllProducts(data);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const removeProduct = async (productId: number) => {
        try {
            await deleteProduct(productId);
            fetchInfo();
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
        }
    };

    return (
        <div>
            <NavbarAdmin />
            <div className="flex flex-col overflow-hidden lg:flex-row">
                <Sidebar />
                <div className="box-border flex-grow w-full bg-white rounded-sm">
                    <div className="box-border w-full px-4 bg-white rounded-md">
                        <div className="flex items-center justify-between w-full">
                            <h4 className="p-5 uppercase bold-22">Danh sách sản phẩm</h4>
                            <Link to={"/addProduct"}>
                                <button className="flex items-center gap-2 bg-primary h-14 w-fit medium-16 hover:bg-[#B2C9AD] rounded-md hover:text-secondary transition duration-200 px-4">
                                    <span className="text-base">Thêm sản phẩm</span>
                                </button>
                            </Link>
                        </div>
                        <div className="max-h-[74vh] overflow-auto max-w-[81vw] text-center shadow-lg">
                            <table className="w-full mx-auto">
                                <thead className="sticky top-0 z-10 bg-white">
                                    <tr className="shadow-lg bg-primary bold-14 sm:regular-22 text-start">
                                        <th className="p-2">Sản phẩm</th>
                                        <th className="p-2">Tiêu đề</th>
                                        <th className="p-2">Giá cũ</th>
                                        <th className="p-2">Giá mới</th>
                                        <th className="p-2">Danh mục</th>
                                        <th className="p-2"></th>
                                        <th className="p-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allProducts.map((product, i) => (
                                        <tr
                                            key={i}
                                            className="p-6 border-b border-slate-900/20 text-gray-20 medium-14"
                                        >
                                            <td className="flexStart sm:flexCenter">
                                                <img
                                                    src={product.image}
                                                    alt=""
                                                    height={43}
                                                    width={43}
                                                    className="my-1 rounded-lg ring-1 ring-slate-900/5"
                                                />
                                            </td>
                                            <td>
                                                <div className="line-clamp-3">{product.name}</div>
                                            </td>
                                            <td className="">{formatCurrency(product.old_price)}</td>
                                            <td className="">{formatCurrency(product.new_price)}</td>
                                            <td className="">{product.category}</td>
                                            <td>
                                                <Link
                                                    to={`/editProduct/${product._id}`}
                                                    className="hover:no-underline"
                                                >
                                                    <div className="flex items-center px-4 py-2 font-bold text-black bg-[#FDF7F4] rounded cursor-pointer hover:bg-[#FFF5D7] max-w-fit">
                                                        <RiEdit2Line className="mr-2" />
                                                        Chỉnh sửa
                                                    </div>
                                                </Link>
                                            </td>
                                            <td>
                                                <div
                                                    className="flex items-center px-4 py-2 font-bold text-black bg-[#FFCCE1] rounded cursor-pointer hover:bg-[#E195AB]"
                                                    style={{ width: "100px" }}
                                                    onClick={() => removeProduct(product._id)}
                                                >
                                                    <TbTrash className="mr-2" />
                                                    Xóa
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListProduct;
