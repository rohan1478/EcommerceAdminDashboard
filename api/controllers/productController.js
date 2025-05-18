import Product from '../models/product.js';

export async function addProduct(req, res) {
  try {
    const { name, description, price, stock, imageUrl } = req.body;

    const newProduct = new Product({ name, description, price, stock, imageUrl});
    await newProduct.save();

    res.status(201).json({ message: 'Product added', product: newProduct });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product' });
  }
}

export async function getProducts(req, res) {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
}

export async function updateProductStock(req, res) {
  try {
    const { id } = req.params;
    const stock = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      stock ,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Stock updated', product: updatedProduct });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update stock' });
  }
}

