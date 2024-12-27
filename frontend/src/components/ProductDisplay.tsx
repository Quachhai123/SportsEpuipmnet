import { MdStar } from "react-icons/md";
import { useContext, useState } from "react";

import { formatCurrency } from "../utils";
import { ShopContext } from "../Context/ShopContext";
import { reviewToProduct } from "../services/reviewService";

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);

    const handleStarClick = (index) => {
        setRating(index + 1);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmitReview = async () => {
        if (!localStorage.getItem('auth-token')) {
            alert("Bạn cần đăng nhập để gửi đánh giá!");
        } else if (rating === 0) {
            alert("Bạn cần chọn số sao đánh giá!");
        } else {
            const token = localStorage.getItem('auth-token');

            try {
                const response = await reviewToProduct(product._id, token, rating, review);
                if (response) {
                    alert("Đánh giá của bạn đã được gửi!");
                    closeModal();
                }
            } catch (error) {
                console.error("Error submitting review: ", error);
                alert("Đã có lỗi xảy ra. Vui lòng thử lại!");
            }
        }
    };


    return (
        <section>
            <div className="flex flex-col gap-14 xl:flex-row">
                <div className="flex gap-x-2 xl:flex-1">
                    <div className="flex flex-col gap-[7px] flex-wrap ">
                        <img src={product.brand.image} alt="brandImg" className="max-h-[99px] shadow-lg rounded-md" />
                    </div>
                    <div className="rounded-md shadow-lg">
                        <img src={product.image} alt="" height={450} width={330} />
                    </div>
                </div>
                <div className="flex-col flex xl:flex-[1.7]">
                    <h3 className="h3">{product.name}</h3>
                    <div className="flex gap-x-2 text-[#feaf00] medium-22">
                        {[1, 2, 3, 4, 5].map((_, index) => (
                            <MdStar
                                key={index}
                                className={`cursor-pointer hover:text-yellow-500 ${index < rating ? "text-yellow-500" : "text-gray-300"}`}
                                onClick={() => handleStarClick(index)}
                            />
                        ))}
                        <p>({props?.product?.review.length})</p>
                    </div>
                    <div className="flex my-4 gap-x-6 medium-20">
                        <div className="line-through">{formatCurrency(product.old_price)}</div>
                        <div className="text-[#ff813f]">{formatCurrency(product.new_price)}</div>
                    </div>
                    <div className="mb-4">
                        {/* <h4 className="bold-16">Lựa chọn kích cỡ:</h4>
                        <div className="flex gap-3 my-3">
                            <div className="w-10 h-10 cursor-pointer ring-2 ring-slate-900 flexCenter">S</div>
                            <div className="w-10 h-10 cursor-pointer ring-2 ring-slate-900/10 flexCenter">M</div>
                            <div className="w-10 h-10 cursor-pointer ring-2 ring-slate-900/10 flexCenter">L</div>
                            <div className="w-10 h-10 cursor-pointer ring-2 ring-slate-900/10 flexCenter">XL</div>
                        </div> */}
                    </div>
                    <div className="flex flex-col gap-y-3 mb-4 max-w-[555px]">
                        <button className="btn_dark_outline !rounded-none uppercase regular-14 tracking-widest" onClick={() => addToCart(product._id)}>Thêm vào giỏ hàng</button>
                        <button className="btn_dark_rounded !rounded-none uppercase regular-14 tracking-widest">Mua ngay</button>
                    </div>
                    <p><span className="medium-16 text-tertiary">Danh mục :</span> {product.category === "men" ? "Đàn ông" : product.category === "women" ? "Phụ nữ" : "Trẻ em"}</p>
                    <p><span className="medium-16 text-tertiary">Nhãn hàng :</span> {product.brand.name}</p>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                        <h3 className="mb-4 text-lg font-bold">Đánh giá sản phẩm</h3>
                        <textarea
                            rows={4}
                            placeholder="Nhập đánh giá của bạn..."
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSubmitReview}
                                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                            >
                                Gửi đánh giá
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductDisplay;
