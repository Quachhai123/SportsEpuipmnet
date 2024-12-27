import { useState, useContext } from "react";
import { TbTrash } from "react-icons/tb";
import { ShopContext } from "../Context/ShopContext";
import { storeCart } from "../services/storeService";
import { Font, PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import NotoSans from '../assets/NotoSans-VariableFont_wdth,wght.ttf';

Font.register({
    family: 'Noto Sans',
    src: NotoSans
});

const CartItems = () => {
    const context = useContext(ShopContext);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        email: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPDF, setShowPDF] = useState(false);


    if (!context) {
        return <div>Đang tải...</div>;
    }

    const { all_products, cartItems, removeFromCart, updateCart } = context;

    const filteredProducts = all_products.filter(product => cartItems && cartItems?.products?.some(item => item.product._id === product._id));

    const getTotalAmount = () => {
        return cartItems?.products?.reduce((total, item) => {
            return total + (item.product.new_price * item.quantity);
        }, 0);
    };

    const handleQuantityChange = async (productId, operation) => {
        const product = cartItems.products.find(item => item.product._id === productId);
        if (!product) return;

        const updatedQuantity = operation === "increase" ? product.quantity + 1 : product.quantity - 1;

        if (updatedQuantity > 0) {
            await updateCart(productId, updatedQuantity);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, address, phone, email } = formData;

        if (!name || !address || !phone || !email) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        setIsSubmitting(true);

        try {
            setShowPDF(true);
        } catch (error) {
            alert("Đã xảy ra lỗi khi lưu hoá đơn.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Tạo PDF document
    const generatePDF = () => {
        if (!filteredProducts) return

        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={styles.title}>Hóa Đơn Mua Hàng</Text>
                        <Text style={styles.normalText}>Họ và tên: {formData.name}</Text>
                        <Text style={styles.normalText}>Địa chỉ: {formData.address}</Text>
                        <Text style={styles.normalText}>Số điện thoại: {formData.phone}</Text>
                        <Text style={styles.normalText}>Email: {formData.email}</Text>

                        <Text style={styles.title}>Thông tin cửa hàng:</Text>
                        {filteredProducts.map(product => (
                            <>
                                <Text key={product._id} style={styles.normalText}>
                                    Tên cửa hàng: {product.brand?.name || ""}
                                </Text>
                                <Text key={`desc-${product._id}`} style={styles.normalText}>
                                    Mô tả: {product.brand?.description || ""}
                                </Text>
                            </>
                        ))}
                        <Text style={styles.title}>Thông tin chi tiết:</Text>
                        {cartItems?.products.map(item => {
                            const product = filteredProducts.find(p => p._id === item.product._id);  // Tìm sản phẩm trong filteredProducts
                            return product ? (
                                <Text key={item.product._id} style={styles.normalText}>
                                    Sản phẩm: {product.name} - {item.quantity} x {product.new_price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })} ({product.brand?.name})
                                </Text>
                            ) : null;
                        })}

                        <Text style={styles.normalText}>Tổng cộng: {getTotalAmount().toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</Text>
                    </View>
                </Page>
            </Document>
        );
    };


    return (
        <section className="max_padd_container pt-28">
            <table className="w-full mx-auto">
                <thead>
                    <tr className="py-12 bg-slate-900/10 regular-18 sm:regular-22 text-start">
                        <th className="p-1 py-2">Sản phẩm</th>
                        <th className="p-1 py-2">Tên</th>
                        <th className="p-1 py-2">Giá</th>
                        <th className="p-1 py-2">Số lượng</th>
                        <th className="p-1 py-2">Tổng</th>
                        <th className="p-1 py-2">Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems && cartItems.products && cartItems.products.map((item) => {
                        const { product, quantity } = item;

                        return (
                            <tr key={product._id} className="p-6 text-center border-b border-slate-900/20 text-gray-30 medium-14">
                                <td className="flexCenter">
                                    <img src={product.image} alt="productImage" height={43} width={43} className="my-1 rounded-lg ring-1 ring-slate-900/5" />
                                </td>
                                <td>
                                    <div className="line-clamp-3">{product.name}</div>
                                </td>
                                <td>
                                    {product.new_price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                </td>
                                <td>
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => handleQuantityChange(product._id, "decrease")}
                                            className="p-2 bg-gray-200 rounded-full"
                                        >
                                            -
                                        </button>
                                        <span>{quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(product._id, "increase")}
                                            className="p-2 bg-gray-200 rounded-full"
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td className="w-16 h-16 bg-white">
                                    {(product.new_price * quantity).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                </td>
                                <td>
                                    <div className="flex justify-center cursor-pointer bold-22">
                                        <TbTrash onClick={() => removeFromCart(product._id)} />
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="flex flex-col gap-20 my-16 p-8 mg:flex-row rounded-md bg-white w-full max-w-[666px]">
                <div className="flex flex-col gap-10">
                    <div className="flex items-center justify-between">
                        <h4 className="bold-20">Lưu hoá đơn</h4>
                        {showPDF && (
                            <div className="pdf-preview-modal">
                                <PDFDownloadLink document={generatePDF()} fileName="order_invoice.pdf">
                                    {({ loading }) => (loading ? "Đang tạo PDF..." : "Tải PDF")}
                                </PDFDownloadLink>
                            </div>
                        )}
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div>
                            <label className="medium-16">Họ và tên:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="medium-16">Địa chỉ:</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="medium-16">Số điện thoại:</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="medium-16">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                        </div>
                        <hr />
                        <div className="py-4 flexBetween">
                            <h4 className="bold-18">Tổng cộng :</h4>
                            <h4 className="bold-18">
                                {getTotalAmount()?.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                            </h4>
                        </div>

                        <button
                            type="submit"
                            className={`btn_dark_rounded w-44 ${isSubmitting ? "bg-gray-500" : "bg-primary"}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Đang lưu..." : "Lưu hoá đơn"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Noto Sans',
    },
    section: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Noto Sans',
    },
    normalText: {
        fontSize: 12,
        fontFamily: 'Noto Sans',
    },
});

export default CartItems;
