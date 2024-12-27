import Sidebar from "./Sidebar";
import NavbarAdmin from "./NavbarAdmin";
import { useEffect, useState } from "react";
import Product from "../pages/Product";
import { TbTrash } from "react-icons/tb";
import { deleteUser, fetchAllUsers } from "../services/userService";

interface Product {
    name: string;
    email: string;
    date: string;
}

const ListUsers = () => {
    const [allUsers, setAllUsers] = useState<Product[]>([]);

    const fetchInfo = async () => {
        try {
            const data = await fetchAllUsers();
            const formattedUsers = data.map((user) => ({
                ...user,
                date: new Date(user.date).toISOString().split("T")[0],
            }));
            setAllUsers(formattedUsers);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu người dùng:", error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const removeUser = async (username: string) => {
        try {
            await deleteUser(username);
            fetchInfo();
        } catch (error) {
            console.error("Lỗi khi xóa người dùng:", error);
        }
    };

    return (
        <div>
            <NavbarAdmin />
            <div className="flex flex-col overflow-hidden lg:flex-row">
                <Sidebar />
                <div className="box-border flex-grow w-full mt-4 bg-white rounded-sm ">
                    <div className="box-border w-full bg-white rounded-md ">
                        <h4 className="p-5 uppercase bold-22">User List</h4>
                        <div className="max-h-[70vh] max-w-[81vw] overflow-auto text-center shadow-lg">
                            <table className="w-full mx-auto">
                                <thead className="sticky top-0 z-10 bg-white">
                                    <tr className="shadow-lg bg-primary bold-14 sm:regular-22 text-start">
                                        <th className="p-2">Name</th>
                                        <th className="p-2">Email</th>
                                        <th className="p-2">Date</th>
                                        <th className="p-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allUsers.map((user, i) => (
                                        <tr
                                            key={i}
                                            className="p-6 border-b border-slate-900/20 text-gray-20 medium-14"
                                        >
                                            <td className="p-5">
                                                <div className="line-clamp-3">{user.name}</div>
                                            </td>
                                            <td className="">{user.email}</td>

                                            <td className="">{user.date}</td>
                                            <td>
                                                <div
                                                    className="flex items-center px-4 py-2 font-bold text-black bg-red-600 rounded cursor-pointer hover:bg-red-600"
                                                    style={{ width: "100px" }}
                                                    onClick={() => removeUser(user.name)}
                                                >
                                                    <TbTrash className="mr-2 " />
                                                    Delete
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListUsers;
