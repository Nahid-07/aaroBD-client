AaroShop - Modern MERN Stack E-Commerce Platform

AaroShop is a full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js). It features a modern, responsive UI, comprehensive admin dashboard, secure authentication, and a robust shopping cart system. This project demonstrates a complete user journey from browsing products to secure checkout and order tracking.

🚀 Live Demo

Frontend: https://aarobd-client.vercel.app

Backend API: https://aarobd-server.onrender.com

✨ Key Features

🛍️ User Experience

Modern UI/UX: Built with React and Tailwind CSS for a seamless, responsive experience on all devices.

Product Filtering: Advanced client-side filtering by Category, Gender, and Price sorting.

Search Functionality: Real-time search for instant product discovery.

Product Reviews: Users can rate and review products with a 5-star system.

Secure Authentication: - JWT-based Email/Password login.

Google OAuth integration for one-click sign-in.

🛒 Shopping & Checkout

Smart Cart: Add items with specific Size and Color variants.

Stock Management: Automatic stock decrement upon order placement.

Checkout Process:

Multi-step checkout form.

Dynamic delivery fee calculation (Inside/Outside Dhaka).

Order summary with sticky positioning.

👨‍💻 Admin Dashboard

Product Management: Create, Read, Update, and Delete (CRUD) products with image URLs and inventory control.

Order Management: View all customer orders, track payments, and update delivery status (Pending -> Shipped -> Delivered).

Analytics: (Ready for future expansion) visual overview of store performance.

🛠️ Technology Stack

Category

Technologies

Frontend

React (Vite), Redux Toolkit, Tailwind CSS, Framer Motion, Lucide React

Backend

Node.js, Express.js, REST API

Database

MongoDB, Mongoose

Authentication

JWT (JSON Web Tokens), Google OAuth 2.0

Deployment

Vercel (Client), Render (Server)

📸 Screenshots

Home Page

Shop Page





Product Details

Admin Dashboard





⚙️ Installation & Local Setup

Follow these steps to run the project locally.

1. Clone the Repository

git clone [https://github.com/nahid-07/aarobd-client.git](https://github.com/nahid-07/aarobd-client.git)
cd aarobd-client


2. Backend Setup

Navigate to the server directory and install dependencies.

cd server
npm install


Create a .env file in the server folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JSON_SECRET_KEY=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id


Start the server:

npm run dev


3. Frontend Setup

Navigate to the client directory and install dependencies.

cd client
npm install


Create a .env file in the client folder:

VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id


Start the frontend:

npm run dev


📬 Contact

Developer: Nahidul Islam

Email: your.email@example.com

Portfolio: your-portfolio-link.com

GitHub: github.com/nahid-07

Note: This project is part of my full-stack development portfolio.