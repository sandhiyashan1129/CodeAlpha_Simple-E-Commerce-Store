const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const Product = require('./models/Product');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Seed data function
const seedData = async () => {
  try {
    const productsCount = await Product.countDocuments();
    if (productsCount === 0) {
      console.log('Seeding dummy products...');
      const dummyProducts = [
        {
          name: 'Wireless Bluetooth Headphones',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
          description: 'High quality wireless bluetooth headphones with noise cancellation.',
          brand: 'SoundPro',
          category: 'Electronics',
          price: 99.99,
          countInStock: 15
        },
        {
          name: 'Smart Watch Series 7',
          image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80',
          description: 'Latest smartwatch with health tracking and seamless connectivity.',
          brand: 'TechTime',
          category: 'Electronics',
          price: 299.99,
          countInStock: 25
        },
        {
          name: 'Minimalist Leather Wallet',
          image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
          description: 'Sleek and slim genuine leather wallet with RFID blocking.',
          brand: 'ClassicGoods',
          category: 'Accessories',
          price: 45.00,
          countInStock: 50
        },
        {
          name: 'Ergonomic Office Chair',
          image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80',
          description: 'Comfortable ergonomic chair for long working hours.',
          brand: 'OfficeComfort',
          category: 'Furniture',
          price: 189.50,
          countInStock: 10
        },
        {
          name: '4K Ultra HD Action Camera',
          image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80',
          description: 'Waterproof action camera with 4K recording capabilities.',
          brand: 'CamPro',
          category: 'Electronics',
          price: 149.99,
          countInStock: 30
        },
        {
          name: 'Stainless Steel Water Bottle',
          image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
          description: 'Insulated water bottle keeps drinks cold for 24 hours.',
          brand: 'HydroLife',
          category: 'Accessories',
          price: 25.00,
          countInStock: 100
        }
      ];
      await Product.insertMany(dummyProducts);
      console.log('Dummy products seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

// Execute seeding
seedData();

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
