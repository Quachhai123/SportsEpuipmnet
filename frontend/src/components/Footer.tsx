import logofooter from "../assets/logo/logofooter.jpg"

function Footer() {
    return (
        <footer className="text-white bg-black body-font">
            <div className="container flex flex-col flex-wrap px-5 py-10 mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap">
                <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
                    <div className="flex flex-col items-start py-5 pl-12">
                        <img src={logofooter} height={250} width={140} />
                    </div>
                    <p className="mt-2 text-sm text-[#fafafa] pl-10">
                        Mua sắm các sản phẩm mới nhất về công nghệ, thời trang và đồ nội thất. Giao hàng nhanh chóng và những ưu đãi hấp dẫn mỗi ngày!
                    </p>
                </div>
                <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
                    <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                        <h2 className="title-font font-medium text-[#fafafa] tracking-widest text-sm mb-3">
                            CÔNG TY
                        </h2>
                        <nav className="mb-10 list-none">
                            <li>
                                <a className="text-[#fafafa] hover:text-gray-400" href="#">
                                    Giới Thiệu
                                </a>
                            </li>
                            <li>
                                <a className="text-[#fafafa] hover:text-gray-400" href="#">
                                    Liên Hệ
                                </a>
                            </li>
                            <li>
                                <a className="text-[#fafafa] hover:text-gray-400" href="#">
                                    Điều Khoản & Điều Kiện
                                </a>
                            </li>
                            <li>
                                <a className="text-[#fafafa] hover:text-gray-400" href="#">
                                    Chính Sách Bảo Mật
                                </a>
                            </li>
                        </nav>
                    </div>
                    <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                        <h2 className="title-font font-medium text-[#fafafa] tracking-widest text-sm mb-3">
                            HỖ TRỢ
                        </h2>
                        <nav className="mb-10 list-none">
                            <li>
                                <a className="text-[#fafafa] hover:text-gray-400" href="#">
                                    Câu Hỏi Thường Gặp
                                </a>
                            </li>
                            <li>
                                <a className="text-[#fafafa] hover:text-gray-400" href="#">
                                    Thông Tin Giao Hàng
                                </a>
                            </li>
                            <li>
                                <a className="text-[#fafafa] hover:text-gray-400" href="#">
                                    Chính Sách Đổi Trả
                                </a>
                            </li>
                            <li>
                                <a className="text-[#fafafa] hover:text-gray-400" href="#">
                                    Hỗ Trợ Khách Hàng
                                </a>
                            </li>
                        </nav>
                    </div>
                    <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                        <h2 className="title-font font-medium text-[#fafafa] tracking-widest text-sm mb-3">
                            THEO DÕI CHÚNG TÔI
                        </h2>
                        <nav className="mb-10 list-none">
                            <li>
                                <a className="text-[#fafafa] hover:text-gray-400" href="#">
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a className="text-[#fafafa] hover:text-gray-400" href="#">
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a className="text-[#fafafa] hover:text-gray-400" href="#">
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a className="text-[#fafafa] hover:text-gray-400" href="#">
                                    Pinterest
                                </a>
                            </li>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="bg-black">
                <div className="container flex flex-col flex-wrap py-1 mx-auto sm:flex-row">
                    <p className="mx-auto text-sm text-white sm:text-left">
                        © 2024 NguyenQuachHai. Tất cả quyền lợi được bảo lưu. Điều Khoản & Điều Kiện | Chính Sách Bảo Mật
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
