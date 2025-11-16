<!-- # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
``` -->


# React Cart

This is a basic e-commerce application built with React and TypeScript. 
Users can browse products, view details, filter and sort products by category and price, 
add items to the cart, and manage cart quantities. Cart state is persisted in localStorage.

---

## Features

- Home page displays products in a grid with **name, price, and thumbnail**
- Product detail page with dynamic routing (`/product/:id`)
- Multi-category filtering (fetches products from API)
- Sort products by price (ascending/descending)
- Add to Cart functionality with **quantity input in Cart page**
- Remove items from cart
- Cart state persists in **localStorage**
- Responsive design for mobile and desktop
- Notifications using **React Hot Toast**

---

## Installation / Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DeveloperZeeshu/React-Cart.git

cd React-Cart

npm install
# or
yarn

npm start
# or
yarn start

http://localhost:5173

# How to Use

- Browse products on the Home Page
- Click on a product image to view Product Details
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


