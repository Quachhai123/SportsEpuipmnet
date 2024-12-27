import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo/nikeLogo.png";
import Navbar from "./Navbar";
import { useContext, useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import user from "../assets/user.svg";
import { ShopContext } from "../Context/ShopContext";
import logout from "../assets/logout.svg";
import { MdOutlineShoppingCart } from "react-icons/md";

const Header = () => {
    const [menuOpened, setMenuOpened] = useState(false);
    const toggleMenu = () => {
        setMenuOpened(!menuOpened);
    };

    const { cartItems } = useContext(ShopContext);

    const getTotalCartQuantity = () => {
        if (cartItems && cartItems.products) {
            return cartItems.products.reduce((total, item) => {
                const { quantity } = item;
                return total + quantity;
            }, 0);
        }
        return 0;
    };

    return (
        <header className="fixed top-0 left-0  max_padd_container w-full bg-[#f5f5f5] ring-1 ring-slate-900/5 z-10">
            <div className="px-4 py-2 flexBetween max-xs:px-2">
                <div>
                    <Link to={""}>
                        <img src={logo} height={60} width={60} />
                    </Link>
                </div>
                <Navbar
                    containerStyles={"hidden md:flex gap-x-5 xl:gap-x-10 medium-15"}
                />
                <Navbar
                    containerStyles={`${menuOpened
                            ? "flex items-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300"
                            : "flex items-start flex-col gap-y-12 fixed top-20  p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 -right-[100%]"
                        }`}
                />
                <div className="flexBetween sm:gap-x-2 bold-16">
                    {!menuOpened ? (
                        <MdMenu
                            className="w-8 h-8 p-1 mr-2 rounded-full cursor-pointer md:hidden hover:text-secondary ring-1 ring-slate-900/30"
                            onClick={toggleMenu}
                        />
                    ) : (
                        <MdClose
                            className="w-8 h-8 p-1 mr-2 rounded-full cursor-pointer md:hidden hover:text-secondary ring-1 ring-slate-900/30"
                            onClick={toggleMenu}
                        />
                    )}
                    <div className="flexBetween sm:gap-x-7">
                        <NavLink to={"cart-page"} className={"flex"}>
                            <MdOutlineShoppingCart className="w-8 h-8 p-1 rounded-full ring-slate-900/30 ring-1" />
                            <span className="relative w-5 h-5 text-white rounded-full flexCenter bg-secondary medium-14 -top-2">
                                {getTotalCartQuantity()}
                            </span>
                        </NavLink>
                        {localStorage.getItem('auth-token') ?
                            <NavLink
                                to={"logout"}
                                onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}
                                className={"btn_secondary_rounded flexCenter gap-x-2 medium-16"}
                            >
                                <img src={logout} alt="logoutImg" height={19} width={19} />
                                Đăng xuất
                            </NavLink> :
                            <NavLink
                                to={"login"}
                                className={"btn_secondary_rounded flexCenter gap-x-2 medium-16"}
                            >
                                <img src={user} alt="userImg" height={19} width={19} />
                                Đăng nhập
                            </NavLink>}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;