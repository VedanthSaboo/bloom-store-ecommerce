# Bloom Store - Full-Stack E-commerce Website

Welcome to the Bloom Store, a complete, multi-page e-commerce website built with the MERN stack. This platform is designed to sell home decor plants, gardening accessories, and related products, featuring a comprehensive admin panel for easy management.

![Bloom Store Homepage](https://i.imgur.com/your-homepage-screenshot.png) <!-- Optional: You can add a screenshot of your app here -->

## Key Features

### Customer-Facing Features

* **Modern Home Page:** Engaging design with featured products, category navigation, and blog highlights.
* **Full-Featured Shop:** Includes product search, category filtering, and an "Add to Cart" functionality directly on product cards.
* **Product Details:** Dedicated pages for each product with images, descriptions, stock status, and customer reviews.
* **Shopping Cart:** A fully functional cart to review items, adjust quantities, and mark orders as gifts.
* **Secure Checkout:** A multi-step checkout process with options for online payment (Razorpay) or Pay on Delivery.
* **User Authentication:** Customers can register, log in, and manage their account information and view order history.
* **Blog & Static Pages:** A complete blog to engage with customers, plus "About" and "Contact" pages.

### Admin Panel Features

* **Secure Admin Login:** Separate, secure login for administrators.
* **Dashboard Overview:** A high-level view of key metrics like total sales, orders, products, and users.
* **Inventory Management:** Full CRUD (Create, Read, Update, Delete) functionality for all products, including image uploads via Cloudinary.
* **Order Management:** View all customer orders, update delivery status, and view payment details.
* **Invoice Management:** Automatically generate invoices for each order with the ability to view, edit, and download as a PDF.
* **Content Management:** Full CRUD functionality for creating and managing blog posts.

## Tech Stack

* **Frontend:** React, React Router, Tailwind CSS, Axios, React Hot Toast
* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose
* **Image Hosting:** Cloudinary
* **Payments:** Razorpay
* **Email Service:** Resend

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js installed on your machine.
* MongoDB or MongoDB Compass installed locally.
* A Cloudinary account for image uploads.
* A Resend account for sending emails.
* A Razorpay account for payments.

### Installation & Setup

1.  **Clone the repo:**
    ```sh
    git clone [https://github.com/your_username/bloom-store.git](https://github.com/your_username/bloom-store.git)
    ```
2.  **Setup Backend:**
    * Navigate to the `server` directory: `cd bloom-store/server`
    * Install NPM packages: `npm install`
    * Create a `.env` file in the `server` directory and add the following variables:
        ```env
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        PORT=5000
        CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
        CLOUDINARY_API_KEY=your_cloudinary_api_key
        CLOUDINARY_API_SECRET=your_cloudinary_api_secret
        RAZORPAY_KEY_ID=your_razorpay_key_id
        RAZORPAY_KEY_SECRET=your_razorpay_key_secret
        RESEND_API_KEY=your_resend_api_key
        ```
3.  **Setup Frontend:**
    * Navigate to the `client` directory: `cd ../client`
    * Install NPM packages: `npm install`
    * Create a `.env` file in the `client` directory and add your Razorpay Key ID:
        ```env
        REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
        ```
4.  **Run the Application:**
    * In the `server` terminal, run: `npm run server`
    * In the `client` terminal, run: `npm start`

## Author

Created with 💜 by **Vedanth Saboo**
