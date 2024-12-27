const ProductDescription = (props) => {
    const reviews = props?.product?.review;

    return (
        <div className="mt-20">
            {/* Mô tả sản phẩm */}
            <div className="flex gap-3 mb-4">
                <button className="btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36">
                    Mô tả
                </button>
            </div>
            <div className="flex flex-col pb-0">
                <p className="text-base">
                    {props?.product?.description?.split("\n").map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))}
                </p>
            </div>
            {reviews && reviews.length > 0 ? (
                <div className="mt-12">
                    <h3 className="mb-4 text-lg font-semibold">Đánh giá sản phẩm</h3>
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <div
                                key={review._id}
                                className="flex flex-col p-4 rounded-lg shadow-sm bg-black/10"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full">
                                        <span className="text-xl text-white">
                                            {review?.user?.name[0]?.toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">{review?.user?.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(review?.rating)].map((_, index) => (
                                        <svg
                                            key={index}
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4 text-yellow-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 15l-3.22 2.14.86-3.72-2.85-2.48 3.72-.32L10 5l1.49 4.82 3.72.32-2.85 2.48.86 3.72L10 15z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-700">{review?.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mt-12">
                    <p className="text-sm text-gray-500">Chưa có đánh giá cho sản phẩm này.</p>
                </div>
            )}
        </div>
    );
};

export default ProductDescription;
