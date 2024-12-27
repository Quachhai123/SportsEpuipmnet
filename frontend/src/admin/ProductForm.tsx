import React from 'react';

type ProductFormProps = {
    productDetails: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    image: File | null;
};

const ProductForm: React.FC<ProductFormProps> = ({ productDetails, onChange, onImageChange, image }) => {
    return (
        <div className="box-border flex-grow w-full p-8 mt-4 bg-white rounded-sm lg:m-7">
            <div className="mb-3">
                <h4 className="pb-2 bold-18">Product title :</h4>
                <input
                    type="text"
                    value={productDetails.name}
                    onChange={onChange}
                    name="name"
                    placeholder="Type here.."
                    className="w-full px-4 py-3 rounded-md outline-none bg-primary max-w-80"
                />
            </div>
            <div className="mb-3">
                <h4 className="pb-2 bold-18">Price :</h4>
                <input
                    type="number"
                    value={productDetails.old_price}
                    onChange={onChange}
                    name="old_price"
                    placeholder="Type here.."
                    className="w-full px-4 py-3 rounded-md outline-none bg-primary max-w-80"
                />
            </div>
            <div className="mb-3">
                <h4 className="pb-2 bold-18">Offer Price :</h4>
                <input
                    type="number"
                    value={productDetails.new_price}
                    onChange={onChange}
                    name="new_price"
                    placeholder="Type here.."
                    className="w-full px-4 py-3 rounded-md outline-none bg-primary max-w-80"
                />
            </div>
            <div className="flex items-center mb-3 gap-x-4">
                <h4 className="pb-2 bold-18">Product Category : </h4>
                <select
                    name="category"
                    value={productDetails.category}
                    onChange={onChange}
                    className="rounded-sm outline-none bg-primary ring-1 ring-slate-900/20 medium-16"
                >
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div>
                <label htmlFor="file-input">
                    <img
                        src={image ? URL.createObjectURL(image) : productDetails.image || ""}
                        alt="Product"
                        className="inline-block w-20 rounded-sm"
                    />
                </label>
                <input
                    onChange={onImageChange}
                    type="file"
                    name="image"
                    id="file-input"
                    hidden
                    className="w-full px-4 py-3 bg-primary max-w-80"
                />
            </div>
        </div>
    );
};

export default ProductForm;
