# 🛋️ Premium Furniture E-Commerce Platform

A complete, full-stack e-commerce solution featuring a dynamic customer-facing website, a robust admin dashboard for catalog management, and a secure Express.js API backend connected to MongoDB Atlas.

https://github.com/user-attachments/assets/fef51d60-5a4a-4a52-9e30-769fa7dab8c2

---

## 🔗 Live Deployed URLs

* **🛒 Customer Website:** [https://furniture-website-re1j.vercel.app/](https://furniture-website-re1j.vercel.app/)
* **⚙️ Admin Dashboard:** [https://furniture-website-2b42.vercel.app/](https://furniture-website-2b42.vercel.app/)
* **💻 RESTful Backend API:** [https://furniture-website-peach.vercel.app/api/](https://furniture-website-peach.vercel.app/api/)
* **📦 GitHub Repository:** [https://github.com/gsumithub/furniture-website](https://github.com/gsumithub/furniture-website)

---

## 🛠️ Technology Stack

### Frontend (Customer Website)
* **Next.js 15 (React)** - Modern page layouts and Server-Side Rendering (SSR).
* **Tailwind CSS** - Sleek, utility-first CSS layout styling.
* **Redux Toolkit** - Global client state management (cart and auth).
* **React Slick / Slick Carousel** - Smooth product animations and slideshows.

### Management (Admin Dashboard)
* **React (Vite)** - Ultra-fast dashboard framework.
* **React Router v7** - Routing structure.
* **Axios** - Integrated API request intercepts mapping secure session headers.

### Backend (API Service)
* **Node.js & Express.js** - Robust server-side framework.
* **Mongoose & MongoDB Atlas** - Cloud document database.
* **JSON Web Token (JWT)** - Session authentication token signatures.
* **Multer** - Dynamic media upload controls.

---

## ✨ Features

### Customer Website
1. **Dynamic Pages:** Dynamic fetching for Category Grid Banners, Testimonials, Hero Banners, and Newsletters.
2. **Search Bar:** Functional search box with focus transitions, regex search routing, and custom search result views.
3. **Wishlist:** Fully operational database-backed wishlist allowing users to save, delete, or directly copy items to their cart.
4. **Shopping Cart & Side Cart Panel:** Direct item updates, quantity modulations, real-time header count syncs, and direct checkout redirection. Refactored with a vertical flex container layout so the items scroll (`flex-1 overflow-y-auto`) while keeping the checkout/view cart buttons sticky and visible at the bottom of the side drawer.
5. **Checkout & Order Flow:** Direct checkout access from the shopping cart page, dynamic shipping address validation, cart clearances, and MongoDB order creations.
6. **Modernized UI & Responsive Design:** Integrated a premium typography pairing (Jost & Playfair Display), customized scrollbars, hover-lift product card actions, and smooth category scale transitions. Fully optimized for mobile and tablet screens (<1024px) by hiding desktop bottom navigation and adding a slide-out navigation drawer with collapsible categories/pages accordions, search inputs, and dynamic account actions (Logout/Dashboard).
7. **Transition System:** Integrated a layout-wide page transition wrapper causing elements to gracefully fade and slide up on route changes.
8. **Toast Notifications:** Replaced traditional browser alerts with elegant, modern notification popups powered by `react-hot-toast`.
9. **Strict Session Auth Guards:** Configured strict token authentication checks on cart, wishlist, and checkout pages. Guest users are automatically blocked and redirected to the login interface with a warning toast. Redux state and local storage are synchronized to prevent state discrepancy issues.
10. **Resolved Dynamic Routing & Path Bugs:** Solved the Next.js 15+ promise parameter destructuring crash on the dynamic product details page, fixed the FAQ header route mismatch to eliminate 404s, and updated all header links to absolute paths.
11. **Responsive Table & Form Elements:** Wrapped shopping cart and dashboard orders tables in horizontal overflow scroll layouts to prevent viewport breakages. Rebuilt forgot/reset password forms into styled responsive card elements matching the core theme, and corrected parameter casing mismatches in Next.js dynamic routing.
12. **Bestselling Carousel Optimization:** Refactored the bestseller slider to dynamically calculate column display constraints in React state window resize callbacks, resolving react-slick hydration mismatch bugs on mobile devices.

### Admin Dashboard
1. **Dynamic Admin Promotions:** Manage and promote database users to admin roles directly from the panel.
2. **Catalog & Banner Controls:** Complete CRUD dashboards for Banners, Products, Categories, Subcategories, FAQs, and Testimonials.
3. **Contact Inbox:** Real-time logging of customer support enquiries and newsletter subscriptions.
4. **Interactive Profile Sync:** Persistent profile pictures synced using custom JavaScript event dispatches.

---

## ⚙️ Environment Configurations

### Backend (`backend/.env`)
Create a `.env` file in the `backend/` directory:
```env
PORT=7000
DBNAME=Ecom-app
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.d7s83ld.mongodb.net/Ecom-app
TOKENKEY=<your_jwt_signing_key>
ADMIN_EMAIL=krsumit2203@gmail.com
ADMIN_PASSWORD=<your_admin_password>
```

### Next.js Website (`client/furniture-project/.env`)
Create a `.env` file in the `client/furniture-project/` directory:
```env
NEXT_PUBLIC_APIBASEURL=https://furniture-website-peach.vercel.app/api/
```

### Vite Admin Panel (`client/admin-panel/.env`)
Create a `.env` file in the `client/admin-panel/` directory:
```env
VITE_APIBASEURL=https://furniture-website-peach.vercel.app/admin-api/
```

---

## 🚀 Local Installation & Execution

### 1. Clone the repository
```bash
git clone https://github.com/gsumithub/furniture-website.git
cd furniture-website
```

### 2. Start the Backend API
```bash
cd backend
npm install
npm run dev # or node index.js
```

### 3. Start the Next.js Frontend
```bash
cd ../client/furniture-project
npm install
npm run dev
```

### 4. Start the Vite Admin Panel
```bash
cd ../admin-panel
npm install
npm run dev
```
