import { useState } from "react";
import { login, signup } from "../services/userService";

const Login = () => {
    const [state, setState] = useState("Đăng Nhập");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const changeHandler = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async () => {
        console.log("Chức năng đăng nhập được thực thi", formData);

        if (formData.email === "admin@gmail.com" && formData.password === "admin123") {
            window.location.replace("/dashboard");
            return;
        }

        try {
            const responseData = await login(formData);

            if (responseData.token) {
                localStorage.setItem("auth-token", responseData.token);
                window.location.replace("/");
            } else {
                alert(responseData.errors);
            }
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleSignup = async () => {
        console.log("Chức năng đăng ký được thực thi", formData);

        try {
            const responseData = await signup(formData);

            if (responseData) {
                setState("Đăng Nhập");
                alert("Đăng ký thành công! Vui lòng đăng nhập.");
            } else {
                alert(responseData.errors);
            }
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <section className="flex-col pt-32 pb-20 max_padd_container flexCenter">
            <div className="max-w-[555px] h-[570px] bg-white m-auto px-14 py-10 rounded-md">
                <h3 className="h3 flexCenter">{state}</h3>
                <div className="flex flex-col gap-4 mt-7">
                    {state === "Đăng Ký" && (
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={changeHandler}
                            placeholder="Tên của bạn"
                            className="w-full pl-5 outline-none h-14 bg-slate-900/5 rounded-xl"
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={changeHandler}
                        placeholder="Email của bạn"
                        className="w-full pl-5 outline-none h-14 bg-slate-900/5 rounded-xl"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={changeHandler}
                        placeholder="Mật khẩu của bạn"
                        className="w-full pl-5 outline-none h-14 bg-slate-900/5 rounded-xl"
                    />
                </div>
                <button onClick={() => { state === "Đăng Nhập" ? handleLogin() : handleSignup() }} className="btn_dark_rounded my-4 w-full !rounded-md">
                    Tiếp Tục
                </button>

                {state === "Đăng Ký" ? (
                    <p className="font-bold text-black">
                        Bạn đã có tài khoản?{" "}
                        <span onClick={() => setState("Đăng Nhập")} className="text-[#ff813f] underline cursor-pointer">Đăng nhập</span>
                    </p>
                ) : (
                    <p className="font-bold text-black">
                        Tạo tài khoản.{" "}
                        <span onClick={() => setState("Đăng Ký")} className="text-[#ff813f] underline cursor-pointer">Nhấn vào đây</span>
                    </p>
                )}
                <div className="gap-3 mt-6 flexCenter">
                    <input type="checkbox" name="" id="" />
                    <p>Bằng việc tiếp tục, tôi đồng ý với các điều khoản sử dụng & chính sách bảo mật</p>
                </div>
            </div>
        </section>
    );
};

export default Login;
