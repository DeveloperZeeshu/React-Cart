# 🛒 React Cart

A modern, minimal **e-commerce web application** built with **React + TypeScript**.  
Users can browse products, apply filters & sorting, view detailed product information, and manage a shopping cart with persistent state using **localStorage**.

🔗 Live Demo: https://www.reacts-cart.vercel.app

---

## ✨ Features

### 🏠 Home Page
- Displays **all products** in a responsive grid
- Each **Product Card** shows only:
  - 🖼️ Image  
  - 🏷️ Title  
  - 💰 Price  
  - ✅ Availability  
- **Category filters** and **price sorting** available directly on the Home Page

### 📄 Product Detail Page
- Full product details
- Product description
- Add to Cart button (➕ Add to cart only from here)

### 🛍️ Cart Page
- View selected products
- Increase / decrease quantity
- Remove items from cart
- Cart total & item count displayed
- Cart state **persists using localStorage**

### ✅ General
- Responsive design for all screen sizes
- Toast notifications using **React Hot Toast**
- Clean UI with simple user flow

---

## 🧪 E2E Testing
Basic **End-to-End testing** is implemented using **Playwright**:
- Home page loads products  
- Product detail navigation  
- Add to cart and view in cart  

---

## ⚙️ Technologies Used

- ⚛️ React.js
- 🔐 TypeScript
- 🔀 React Router
- 🧠 React Context API (State Management)
- 📦 FakeStoreAPI (Product Data)
- 🔔 React Hot Toast (Notifications)
- 💾 localStorage (Cart Persistence)
- 🧪 Playwright (E2E Testing)

---

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/DeveloperZeeshu/React-Cart.git


2. **Navigate to the project directory:**
   ```bash
    cd React-Cart

4. **Install dependencies:**
   ```bash
    npm install
    # or
    yarn

5. **Start the development server:**
   ```bash
    npm run dev
    # or
    yarn dev

6. **Open your browser and go to:**
   ```bash
    http://localhost:5173

> Make sure you have Node.js (v18 or higher) installed before running the project.

---

# How to Use

- Browse products on the Home Page
- Filter products by category
- Sort products by price
- Click on any product to open the Product Detail Page
- Add product to cart from the detail page
- Open the Cart Page to:
 - Adjust quantities
 - Remove items
 - View total price
- Reload the page — your cart will still be there 


## 🙋‍♂️ Author
Made with ❤️ by Jeesan Abbas
