import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
import stripeRoutes from './routes/stripeRoutes.js';
import webhookHandler from './routes/webhookRoute.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.post('/webhook', express.raw({ type: 'application/json' }), webhookHandler);

app.use(express.json());


// Must come BEFORE express.json()

(async () => {
  try {
    await connectDB();
    app.use('/api/user', userRouter);
    app.use('/api/image', imageRouter);
   
    app.use('/api/payment', stripeRoutes);
    app.get('/', (req, res) => {
      res.send('API is running');
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect or start server:', err);
  }
})();
