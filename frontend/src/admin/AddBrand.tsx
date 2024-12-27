import React, { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { createBrand } from "../services/brandsService";
import { uploadImage } from "../services/productService";

import BrandForm from "./BrandForm";
import Sidebar from "./Sidebar";
import NavbarAdmin from "./NavbarAdmin";

const AddBrand = () => {
    const navigate = useNavigate();

    const [brandDetails, setBrandDetails] = useState<any>({
        name: "",
        image: "",
        description: "",
    });

    const [image, setImage] = useState<File | null>(null);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setBrandDetails({
            ...brandDetails,
            [e.target.name]: e.target.value,
        });
    };

    const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleAddBrand = async () => {
        try {
            let imageUrl = brandDetails.image;
            if (image) {
                const uploadData = await uploadImage(image);
                imageUrl = uploadData.image_url;
            }

            const newBrand = { ...brandDetails, image: imageUrl };
            await createBrand(newBrand);
            alert("Thêm thương hiệu thành công");
            navigate("/listBrand");
        } catch (error) {
            console.error("Lỗi khi thêm thương hiệu:", error);
            alert("Thêm thương hiệu thất bại. Vui lòng thử lại.");
        }
    };

    return (
        <div>
            <NavbarAdmin />
            <div className="flex flex-col lg:flex-row">
                <Sidebar />
                <div className="flex flex-col items-center w-full">
                    <BrandForm
                        brandDetails={brandDetails}
                        onChange={changeHandler}
                        onImageChange={imageHandler}
                        image={image}
                    />
                    <button
                        onClick={handleAddBrand}
                        className="flex items-center justify-center mt-4 btn_dark_rounded gap-x-2"
                    >
                        <RiAddLine className="w-6 h-6 mr-2" /> Thêm Thương Hiệu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddBrand;
