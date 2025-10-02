# 🛍️ E-Commerce Store

A modern, fully-featured e-commerce store built with React, TypeScript, and Stripe integration.

![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Vite](https://img.shields.io/badge/Vite-7.1-purple)
![Stripe](https://img.shields.io/badge/Stripe-Integrated-green)

## ✨ Features

- 🎨 **Modern UI/UX** - Beautiful gradient design with smooth animations
- 🌓 **Dark/Light Theme** - Toggle between dark and light modes with persistence
- 🔐 **Google Authentication** - Sign in with Google OAuth or continue as guest
- 👤 **Guest Checkout** - Complete purchases without creating an account
- 🛒 **Shopping Cart** - Full cart management with add, remove, and quantity updates
- 💳 **Stripe Integration** - Secure payment processing with Stripe
- 🔍 **Product Search** - Real-time product search functionality
- 🏷️ **Category Filters** - Filter products by category
- 📱 **Responsive Design** - Fully responsive across all devices
- ⚡ **Fast Performance** - Built with Vite for lightning-fast dev and build times
- 🎯 **TypeScript** - Type-safe codebase for better developer experience
- 💵 **INR Currency** - All prices displayed in Indian Rupees (₹)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:

```bash
cd ecommerce-store
```

2. Install dependencies:

```bash
npm install
```

3. Set up Firebase for Google Authentication:

   - **See detailed guide in `FIREBASE_SETUP.md`**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Google Sign-in provider
   - Update `src/config/firebase.ts` with your Firebase credentials

4. Set up Stripe (Optional for testing):

   - Sign up for a [Stripe account](https://stripe.com)
   - Get your publishable key from the Stripe Dashboard
   - Update the Stripe key in `src/pages/Checkout.tsx`:

   ```typescript
   const stripePromise = loadStripe('your_publishable_key_here');
   ```

5. Start the development server:

```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## 🧪 Testing Payments

For testing Stripe payments, use these test card numbers:

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- Use any future expiration date and any 3-digit CVC

## 📁 Project Structure

```
ecommerce-store/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CheckoutForm.tsx
│   │   └── ThemeToggle.tsx       # NEW: Theme toggle button
│   ├── pages/           # Page components
│   │   ├── Products.tsx
│   │   ├── Cart.tsx
│   │   └── Checkout.tsx
│   ├── context/         # React Context for state management
│   │   ├── CartContext.tsx
│   │   └── ThemeContext.tsx      # NEW: Theme state management
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/           # Utility functions and data
│   │   └── products.ts
│   ├── App.tsx          # Main app component with routing
│   └── main.tsx         # App entry point
├── package.json
├── README.md
└── THEME_GUIDE.md       # NEW: Theme system documentation
```

## 🛠️ Built With

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Stripe** - Payment processing
- **CSS3** - Modern styling with gradients and animations

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Features Breakdown

### Product Listing

- Grid layout with product cards
- Search functionality
- Category filtering
- Product images from Unsplash
- Stock availability display

### Shopping Cart

- Add/remove products
- Update quantities
- Real-time price calculations
- Tax estimation
- Persistent cart state

### Checkout

- Shipping information form
- Stripe payment integration
- Order summary
- Secure payment processing
- Success confirmation

## 🔒 Security

- Stripe handles all sensitive payment data
- No credit card information is stored
- PCI-DSS compliant payment processing

## 🚧 Future Enhancements

- [ ] User authentication
- [ ] Order history
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Backend API integration
- [ ] Database for products
- [ ] Email notifications
- [ ] Multiple payment methods

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Development

Built with ❤️ using React, TypeScript, and Stripe.

---

**Note**: This is a demo application. For production use, you would need:

- A backend server to handle Stripe payments securely
- A database for products and orders
- User authentication system
- Proper error handling and validation
