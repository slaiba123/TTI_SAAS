// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import connectDB from './config/mongodb.js';
// import userRouter from './routes/userRoutes.js';
// import imageRouter from './routes/imageRoutes.js';
// import stripeRoutes from './routes/stripeRoutes.js';
// import webhookHandler from './routes/webhookRoute.js';
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 4000;

// app.use(cors());

// app.post('/webhook', express.raw({ type: 'application/json' }), webhookHandler);

// app.use(express.json());


// // Must come BEFORE express.json()

// (async () => {
//   try {
//     await connectDB();
//     app.use('/api/user', userRouter);
//     app.use('/api/image', imageRouter);
   
//     app.use('/api/payment', stripeRoutes);
//     app.get('/', (req, res) => {
//       res.send('API is running');
//     });

//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
      
//     });
//   } catch (err) {
//     console.error('Failed to connect or start server:', err);
//   }
// })();


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

// Stripe webhook must be raw
app.post('/webhook', express.raw({ type: 'application/json' }), webhookHandler);

// JSON parser for all other routes
app.use(express.json());

// CORS config
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

(async () => {
  try {
    await connectDB();
    app.use('/api/user', userRouter);
    app.use('/api/image', imageRouter);
    app.use('/api/payment', stripeRoutes);

    app.get('/', (req, res) => res.redirect(process.env.FRONTEND_URL));
    app.get('/health', (req, res) => res.status(200).json({ success: true }));

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log("Running in", process.env.NODE_ENV, "mode");
    });
  } catch (err) {
    console.error('Failed to connect or start server:', err);
  }
})();
