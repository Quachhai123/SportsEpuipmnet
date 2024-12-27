const NewsLetter = () => {
    return (
        <section className="py-12 bg-white max_padd_container xl:py-28">
            <div className="mx-auto xl:w-[80%] flexCenter flex-col gap-y-8 w-full">
                <h3 className="h3">Nhận Những Ưu Đãi Tốt Nhất Gửi Đến Bạn</h3>
                <h4 className="uppercase bold-18">
                    Đăng ký ngay để tận hưởng những ưu đãi và khuyến mãi đặc biệt.
                </h4>
                <div className="flexBetween rounded-full ring-1 ring-slate-900-/10 hover:ring-slate-900/15 bg-primary w-full max-w-[588px]">
                    <input
                        type="email"
                        placeholder="Địa chỉ email của bạn"
                        className="w-full bg-transparent border-none outline-none ml-7 regular-16"
                    />
                    <button className="w-[50%] btn_dark_rounded">Đăng ký</button>
                </div>
            </div>
        </section>
    );
};

export default NewsLetter;
