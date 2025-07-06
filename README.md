# SNAPVERSE 🖼️

A full-stack SaaS platform for AI-powered **text-to-image generation**, built with the **MERN stack**, **CLIPDROP API**, **Stripe**, **JWT Authentication**, and **Tailwind CSS**. SNAPVERSE enables users to generate visuals from text prompts, manage credits, and access a secure subscription-based experience.

## ✨ Features

- ⚡ AI text-to-image generation via **CLIPDROP API**
- 🧾 Subscription billing and credit-based usage with **Stripe**
- 🔐 Secure login and session management using **JWT**
- 🌐 RESTful API architecture with role-based access control
- 💅 Responsive UI styled with **Tailwind CSS**

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (with Mongoose)  
- **Authentication:** JWT (JSON Web Tokens)  
- **Payments:** Stripe API (subscriptions + credits)  
- **AI API:** CLIPDROP (Text-to-Image API)

## 📽️Demo Video


https://github.com/user-attachments/assets/cd697c1a-4b42-47f3-be3c-68f9d7d64cc4




## 🚀 Getting Started


### 1. Clone the repository

```bash
git clone https://github.com/your-username/snapverse.git
cd snapverse


## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/snapverse.git
cd snapverse
````

### 2. Install dependencies

```bash
# Install client-side packages
cd client
npm install

# Install server-side packages
cd ../server
npm install
```

### 3. Configure environment variables

Create a `.env` file in both `client` and `server` directories. Example `.env` for the **server**:

```env
PORT=5000
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLIPDROP_API_KEY=your_clipdrop_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
FRONTEND_URL=http://localhost:3000
```

Example `.env` for the **client**:

```env
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_API_URL=http://localhost:5000
```

### 4. Run the application

```bash
# Start the server
cd server
npm run dev

# Start the client
cd ../client
npm run dev
```

## 📦 Folder Structure

```
snapverse/
├── client/             # React frontend (Vite or CRA)
│   └── ...
├── server/             # Express backend API
│   └── routes/
│   └── controllers/
│   └── middleware/
│   └── models/
└── README.md
```

## ✅ To-Do / Future Improvements

* [ ] User dashboard to track credits and generations
* [ ] Image gallery with download and history
* [ ] Admin panel for user and payment insights
* [ ] Add OAuth as an alternative to JWT

