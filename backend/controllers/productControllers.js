const Product = require('../modles/Product');


async function createProduct(req, res) {
  try {
    const { title, description, category, price, quantity } = req.body;
    const createdProduct = await Product.create({
        title,
        description,
        category,
        price,
        quantity,
        stockItems: quantity < 3 ? quantity : 0  // Set stockItems to quantity if it's less than 3, otherwise 0
    });
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const {title, description, category, price, quantity } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {title, description, category, price, quantity, stockItems: quantity < 3 ? quantity : 0}, { new: true, runValidators: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function getLowStockProducts(req, res) {
  try {
    const products = await Product.find({ quantity: { $lt: 3 } }); //$lt means less than 3, which is the low stock threshold
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function getProductStatistics(req, res) {
  try {
    const totalProducts = await Product.countDocuments();
    const totalQuantity = await Product.aggregate([ // Aggregate to sum up the total quantity of all products
      { $group: { _id: null, totalQuantity: { $sum: "$quantity" } } } // Aggregate to sum up the total quantity of all products
    ]);
    res.json({ totalProducts, totalQuantity: totalQuantity[0]?.totalQuantity || 0 }); // Return total products and total quantity of all products
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getLowStockProducts, getProductStatistics };