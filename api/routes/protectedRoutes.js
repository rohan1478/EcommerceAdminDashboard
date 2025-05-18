import { Router } from 'express';
import { addProduct, getProducts, updateProductStock } from '../controllers/productController.js';

const router = Router();

router.post('/add', addProduct);
router.patch('/:id/stock', updateProductStock);
router.get('/', getProducts);

export default router;
