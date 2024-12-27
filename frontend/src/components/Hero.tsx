import { MdOutlineLocalOffer } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Hero = () => {
    return (
        <section className="relative w-full h-screen bg-no-repeat bg-hero">
            <div className="mx-auto max-w-[1540px] px-6 lg:px-40 relative top-32 xs:top-52">
                <h1 className="h1 capitalize max-w-[37rem]">Sản Phẩm Mới
                    <span className="text-secondary"> Dụng Cụ Thể Thao</span></h1>
                <p className="text-gray-50 regular-16 mt-6 max-w-[35rem]">
                    Khám phá bộ sưu tập dụng cụ thể thao đỉnh cao của chúng tôi. Từ thiết bị tập luyện đến trang phục thể thao, trải nghiệm chất lượng và công nghệ tiên tiến. Mua sắm với sự tự tin và tận hưởng dịch vụ giao hàng nhanh chóng cho mọi đơn hàng.
                </p>
                <div className="flex gap-2 mt-5 max-xs:flex-col">
                    <NavLink to={""} className={"btn_dark_rounded flexCenter"}>
                        Mua ngay
                    </NavLink>
                    <NavLink to={""} className={"btn_dark_rounded flexCenter gap-x-2"}>
                        <MdOutlineLocalOffer className="text-2xl" />
                        Ưu Đãi
                    </NavLink>
                </div>
            </div>
        </section>
    );
};

export default Hero;
