import React, { useState, useEffect } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { useParams, useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import NavbarAdmin from "./NavbarAdmin";
import upload from "../assets/upload_area.svg";
import { getProductDetails, updateProduct, uploadImage } from "../services/productService";
import { getAllBrands } from "../services/brandsService";

interface ProductDetails {
    _id: number;
    name: string;
    image: string;
    category: string;
    new_price: string;
    old_price: string;
    description: string;
    brandId?: string;
}

const EditProduct = () => {
    const { id } = useParams<{ id: string }>();
    const productId = id
    const navigate = useNavigate();

    const [productDetails, setProductDetails] = useState<ProductDetails>({
        _id: productId,
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
        description: "",
        brandId: "",
    });

    const [brands, setBrands] = useState<{ _id: string, name: string }[]>([]);
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productData, brandsResponse] = await Promise.all([
                    getProductDetails(productId),
                    getAllBrands(),
                ]);

                setProductDetails({
                    ...productData,
                    brandId: productData.brand?._id || "",
                });

                setBrands(brandsResponse);
            } catch (error) {
                console.error("Error fetching product or brands:", error);
            }
        };

        fetchData();
    }, [productId]);

    const changeHandler = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setProductDetails({
            ...productDetails,
            [e.target.name]: e.target.value,
        });
    };

    const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            if (image) {
                URL.revokeObjectURL(URL.createObjectURL(image));
            }
            setImage(e.target.files[0]);
        }
    };

    const handleUpdateProduct = async () => {
        try {
            let imageUrl = productDetails.image;
            if (image) {
                const uploadData = await uploadImage(image);
                imageUrl = uploadData.image_url;
            }

            const updatedProduct = { ...productDetails, image: imageUrl };
            await updateProduct(updatedProduct._id, updatedProduct);
            alert("Sản phẩm cập nhật thành công");
            navigate("/listProduct");
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update product. Please try again.");
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
                            {brands?.map((brand) => (
                                <option key={brand._id} value={brand._id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="file-input">
                            <img
                                src={image ? URL.createObjectURL(image) : productDetails.image || upload}
                                alt="Product"
                                className="inline-block w-20 rounded-sm"
                            />
                        </label>
                        <input
                            onChange={imageHandler}
                            type="file"
                            name="image"
                            id="file-input"
                            hidden
                        />
                    </div>
                    <button onClick={handleUpdateProduct} className="mt-4 btn_dark_rounded flexCenter gap-x-1">
                        <RiEdit2Line className="w-6 h-6 mr-2" /> Sửa sản phẩm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
