import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { uploadImage, addProduct } from "../services/productService";
import { getAllBrands } from "../services/brandsService";

import upload from "../assets/upload_area.svg";
import Sidebar from "./Sidebar";
import NavbarAdmin from "./NavbarAdmin";

const AddProduct = () => {
    const navigate = useNavigate();

    const [image, setImage] = useState<File | null>(null);
    const [brands, setBrands] = useState<{ _id: string, name: string }[]>([]);

    const [productDetails, setProductDetails] = useState({
        name: "",
        description: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
        brandId: ""
    });

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const brandsResponse = await getAllBrands();
                if (brandsResponse) {
                    setBrands(brandsResponse);
                } else {
                    console.log("Không thể tải danh sách thương hiệu");
                }
            } catch (error) {
                console.error("Lỗi khi tải danh sách thương hiệu", error);
            }
        };
        fetchBrands();
    }, []);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setProductDetails({
            ...productDetails,
            [e.target.name]: e.target.value
        });
    };

    const addProductHandler = async () => {
        const product = { ...productDetails };

        try {
            if (!product.name || !product.new_price || !product.old_price || !product.brandId || !product.description) {
                alert("Tất cả các trường (tên, mô tả, ảnh, danh mục, giá ưu đãi, giá gốc, thương hiệu) là bắt buộc.");
                return;
            }

            if (image) {
                const uploadResponse = await uploadImage(image);
                if (uploadResponse.image_url) {
                    product.image = uploadResponse.image_url;
                } else {
                    alert("Tải ảnh lên thất bại");
                    return;
                }
            }

            const addProductResponse = await addProduct(product);
            if (addProductResponse) {
                alert('Sản phẩm đã được thêm thành công');
                setProductDetails({
                    name: "",
                    description: "",
                    image: "",
                    category: "women",
                    new_price: "",
                    old_price: "",
                    brandId: ""
                });
                setImage(null);
                navigate("/listProduct");
            } else {
                alert("Thêm sản phẩm thất bại");
            }
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm:", error);
            alert("Lỗi khi thêm sản phẩm. Vui lòng thử lại.");
        }
    };

    const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <div>
            <NavbarAdmin />
            <div className="flex flex-col lg:flex-row">
                <Sidebar />
                <div className="box-border flex-grow w-full p-8 mt-4 bg-white rounded-sm lg:m-7">
                    <div className="mb-3">
                        <h4 className="pb-2 bold-18">Tên sản phẩm :</h4>
                        <input
                            type="text"
                            value={productDetails.name}
                            onChange={changeHandler}
                            name="name"
                            placeholder="Nhập tên sản phẩm.."
                            className="w-full px-4 py-3 rounded-md outline-none bg-primary max-w-80"
                        />
                    </div>
                    <div className="mb-3">
                        <h4 className="pb-2 bold-18">Mô tả sản phẩm :</h4>
                        <textarea
                            value={productDetails.description}
                            onChange={changeHandler}
                            name="description"
                            placeholder="Nhập mô tả sản phẩm.."
                            className="w-full px-4 py-3 rounded-md outline-none bg-primary max-w-80"
                            rows={5}
                        />
                    </div>
                    <div className="mb-3">
                        <h4 className="pb-2 bold-18">Giá gốc :</h4>
                        <input
                            type="number"
                            value={productDetails.old_price}
                            onChange={changeHandler}
                            name="old_price"
                            placeholder="Nhập giá gốc.."
                            className="w-full px-4 py-3 rounded-md outline-none bg-primary max-w-80"
                        />
                    </div>
                    <div className="mb-3">
                        <h4 className="pb-2 bold-18">Giá ưu đãi :</h4>
                        <input
                            type="number"
                            value={productDetails.new_price}
                            onChange={changeHandler}
                            name="new_price"
                            placeholder="Nhập giá ưu đãi.."
                            className="w-full px-4 py-3 rounded-md outline-none bg-primary max-w-80"
                        />
                    </div>
                    <div className="flex items-center mb-3 gap-x-4">
                        <h4 className="pb-2 bold-18">Danh mục sản phẩm : </h4>
                        <select
                            name="category"
                            value={productDetails.category}
                            onChange={changeHandler}
                            className="rounded-sm outline-none bg-primary ring-1 ring-slate-900/20 medium-16"
                        >
                            <option value="women">Phụ nữ</option>
                            <option value="men">Nam giới</option>
                            <option value="kid">Trẻ em</option>
                        </select>
                    </div>
                    <div className="flex items-center mb-3 gap-x-4">
                        <h4 className="pb-2 bold-18">Thương hiệu : </h4>
                        <select
                            name="brandId"
                            value={productDetails.brandId}
                            onChange={changeHandler}
                            className="rounded-sm outline-none bg-primary ring-1 ring-slate-900/20 medium-16"
                        >
                            <option value="">Chọn thương hiệu</option>
                            {brands && brands.length > 0 && brands.map((brand) => (
                                <option key={brand._id} value={brand._id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="file-input">
                            <img
                                src={image ? URL.createObjectURL(image) : upload}
                                alt=""
                                className="inline-block w-20 rounded-sm"
                            />
                        </label>
                        <input
                            onChange={imageHandler}
                            type="file"
                            name="image"
                            id="file-input"
                            hidden
                            className="w-full px-4 py-3 bg-primary max-w-80"
                        />
                    </div>
                    <button onClick={addProductHandler} className="mt-4 btn_dark_rounded flexCenter gap-x-1">
                        <FaPlus /> Thêm sản phẩm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
