import { TbArrowRight } from "react-icons/tb";

const ProductHeader = (props) => {
    const { product } = props;
    return (
        <div className="flex flex-wrap items-center my-4 capitalize gap-x-2 medium-16">
            Trang chủ <TbArrowRight /> Cửa hàng <TbArrowRight /> {product.category === "men" ? "Đàn ông" : product.category === "women" ? "Phụ nữ" : "Trẻ em" }{" "}
            <TbArrowRight /> {product.name}
        </div>
    );
};

export default ProductHeader;
