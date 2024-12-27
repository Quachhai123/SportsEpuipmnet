import React, { useState, useEffect } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

import { getBrandById, updateBrand } from "../services/brandsService";
import { uploadImage } from "../services/productService";

import BrandForm from "./BrandForm";
import Sidebar from "./Sidebar";
import NavbarAdmin from "./NavbarAdmin";

const EditBrand = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [brandDetails, setBrandDetails] = useState<any>({
        id: id,
        name: "",
        image: "",
        description: "",
    });

    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        const fetchBrandDetails = async () => {
            try {
                const data = await getBrandById(id);
                setBrandDetails(data);
            } catch (error) {
                console.error("Error fetching brand details:", error);
            }
        };

        fetchBrandDetails();
    }, [id]);

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

    const handleUpdateBrand = async () => {
        try {
            let imageUrl = brandDetails.image;
            if (image) {
                const uploadData = await uploadImage(image);
                imageUrl = uploadData.image_url;
            }

            const updatedBrand = { ...brandDetails, image: imageUrl };
            await updateBrand(updatedBrand._id, updatedBrand);
            alert("Cập nhật thương hiệu thành công");
            navigate("/listBrand");
        } catch (error) {
            console.error("Lỗi khi cập nhật thương hiệu:", error);
            alert("Cập nhật thương hiệu thất bại. Vui lòng thử lại.");
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
                        onClick={handleUpdateBrand}
                        className="flex items-center justify-center mt-4 btn_dark_rounded gap-x-2"
                    >
                        <RiEdit2Line className="w-6 h-6 mr-2" /> Cập nhật Thương Hiệu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditBrand;
