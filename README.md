# React Cart

This is a basic e-commerce application built with React and TypeScript. 
Users can browse products, view details, filter and sort products by category and price, 
add items to the cart, and manage cart quantities. Cart state is persisted in localStorage.

---

## Features

- Home page displays **4 products** in a grid, each showing:
  - Product image
  - Title
  - Category
  - Rating
  - Price
  - Add to Cart button
- Clicking on the product image or title redirects to **Product Detail Page**
- Separate **Products Page** displays all products with multi-category filtering and sorting
- Sort products by price (ascending/descending)
- Add to Cart functionality with **quantity input only on the Cart page**
- Remove items from cart
- Cart state persists in **localStorage**
- Responsive design for mobile and desktop
- Notifications using **React Hot Toast**

---

## Installation / Setup Instructions

1. **Clone the repository:**
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

---

# How to Use

- Browse products on the Home Page (4 featured products)
- Click on a product image or title to view Product Details
- Navigate to the Products Page to see all products
- Use category checkboxes to filter products
- Use the sort dropdown to sort products by price
- Click Add to Cart to add a product to your cart
- Adjust quantities directly in the Cart Page
- Remove items from the cart using the Remove button
- Cart totals and number of items are displayed on the Cart Page


# Assumptions & Limitations

- Sorting only works by price (ascending/descending)
- Quantity input is only available on the Cart page
- Cart persists only in localStorage, not on a server
- Filtering and sorting happen via API calls; no local filtering of products
- Home page displays only 4 products; full product list is on the Products Page


# Additional Features

- Cart state persists across page reloads using localStorage
- Notifications for adding/removing items from cart


# Technologies Used

- React.js for UI
- TypeScript for type safety
- React Router for navigation
- React Context API for state management
- FakeStoreAPI for fetching product data
- React Hot Toast for notifications
- Playwright for E2E testing


