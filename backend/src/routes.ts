import express from 'express';

import { addProduct, allProducts, editProduct, getProductDetail, newCollection, popularProduct, searchProduct, totalProducts } from './controllers/product';
import { registerUser, loginUser, totalUsers, allUsers, deleteUser } from './controllers/user';
import { createBrand, getAllBrands, getBrandById, updateBrand, deleteBrand } from './controllers/brand';
import { addToCart, getCartByUserId, updateCart, deleteCart } from './controllers/cart';

import { createReview, updateReview, deleteReview } from './controllers/review';

import { fetchUser } from './utils';

import saveStore from './controllers/store';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Server is running');
});

router.post('/addProduct', addProduct);
router.put('/editProduct/:id', editProduct);
router.get('/getProductDetail/:id', getProductDetail);

router.get('/popularProducts', popularProduct);
router.get('/allProducts', allProducts);
router.get('/newCollection', newCollection);
router.get('/totalProducts', totalProducts);
router.get('/searchProduct', searchProduct);

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.delete('/deleteUser', deleteUser);
router.get('/allUsers', allUsers);
router.get('/totalUsers', totalUsers);

router.post('/brands', createBrand);
router.get('/brands', getAllBrands);
router.get('/brands/:id', getBrandById);
router.put('/brands/:id', updateBrand);
router.delete('/brands/:id', deleteBrand);

router.get('/getCartByUserId', fetchUser, getCartByUserId);
router.post('/addCart', fetchUser, addToCart);
router.put('/updateCart/', fetchUser, updateCart);
router.delete('/deleteCart/', fetchUser, deleteCart);

router.post('/storeCart', saveStore);

router.post('/reviewToProduct', fetchUser, createReview);
router.put('/reviews/:id', updateReview);
router.delete('/reviews/:id', deleteReview);


export default router;
