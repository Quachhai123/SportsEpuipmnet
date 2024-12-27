import React from "react";

interface BrandFormProps {
    brandDetails: {
        id: number;
        name: string;
        image: string;
        description: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    image: File | null;
}

const BrandForm: React.FC<BrandFormProps> = ({ brandDetails, onChange, onImageChange, image }) => {
    return (
        <div className="flex flex-col items-start w-full p-4 space-y-4 bg-white rounded-md shadow-md lg:w-1/2">
            <div className="w-full">
                <label htmlFor="name" className="text-sm font-semibold">Tên thương hiệu</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={brandDetails.name}
                    onChange={onChange}
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                    placeholder="Nhập tên thương hiệu"
                />
            </div>

            <div className="w-full">
                <label htmlFor="description" className="text-sm font-semibold">Mô tả</label>
                <textarea
                    id="description"
                    name="description"
                    value={brandDetails.description}
                    onChange={onChange}
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                    placeholder="Nhập mô tả thương hiệu"
                />
            </div>

            <div className="flex flex-col w-full">
                <label htmlFor="image" className="text-sm font-semibold">Ảnh thương hiệu</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={onImageChange}
                    className="mt-2"
                />
                {image && (
                    <div className="mt-2">
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Brand preview"
                            className="object-cover w-24 h-24 rounded-md"
                        />
                    </div>
                )}
                {!image && brandDetails.image && (
                    <div className="mt-2">
                        <img
                            src={brandDetails.image}
                            alt="Brand image"
                            className="object-cover w-24 h-24 rounded-md"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrandForm;
