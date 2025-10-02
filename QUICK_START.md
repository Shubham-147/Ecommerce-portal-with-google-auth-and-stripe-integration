# Quick Start Guide

## 🚀 Run the Project

```bash
npm run dev
```

Then open http://localhost:5173 in your browser.

## 🎯 Key Features Implemented

### 1. Product Listing Page (`/`)

- 8 sample products with images from Unsplash
- Search functionality
- Category filters (Electronics, Accessories, Home, Fitness)
- Responsive grid layout
- **Dark/Light theme toggle** - Click the 🌙/☀️ icon in navbar

### 2. Shopping Cart (`/cart`)

- Add/remove products
- Adjust quantities
- Real-time price calculations
- Tax estimation (10%)
- Empty cart handling

### 3. Checkout Page (`/checkout`)

- Shipping information form
- Stripe payment integration
- Order summary
- Payment success confirmation

## 🧪 Testing

### Test the Flow:

1. Browse products on the home page
2. Use search and filters
3. Add items to cart
4. View cart and adjust quantities
5. Proceed to checkout
6. Fill in shipping information
7. Use test card: `4242 4242 4242 4242`
8. Complete payment

## 📝 Stripe Setup (Optional)

The app includes a placeholder Stripe key. To use real Stripe:

1. Sign up at https://stripe.com
2. Get your test publishable key (starts with `pk_test_`)
3. Update in `src/pages/Checkout.tsx`:

```typescript
const stripePromise = loadStripe('pk_test_YOUR_KEY_HERE');
```

## 🎨 Customization

### Dark/Light Theme 🌓

**Toggle between themes** using the 🌙/☀️ button in the navbar!

- Your preference is automatically saved
- System theme auto-detected on first visit
- Smooth color transitions

See `THEME_GUIDE.md` for detailed customization.

### Add More Products

Edit `src/utils/products.ts` to add or modify products.

### Change Theme Colors

All colors are CSS variables in `src/index.css`:

- Light mode: `:root { }` section
- Dark mode: `[data-theme='dark'] { }` section

Example:

```css
:root {
  --gradient-start: #667eea; /* Your color */
  --gradient-end: #764ba2; /* Your color */
}
```

### Modify Tax Rate

In `src/pages/Cart.tsx` and `src/pages/Checkout.tsx`:

```typescript
const tax = subtotal * 0.1; // Change 0.1 to your tax rate
```

### Currency (USD 💵)

All prices are in US Dollars ($). The store is configured for USD throughout.

## 📂 File Structure

```
src/
├── components/
│   ├── Navbar.tsx              # Navigation bar with cart badge
│   ├── ProductCard.tsx         # Individual product display
│   └── CheckoutForm.tsx        # Stripe payment form
├── pages/
│   ├── Products.tsx            # Product listing with filters
│   ├── Cart.tsx                # Shopping cart management
│   └── Checkout.tsx            # Checkout and payment
├── context/
│   └── CartContext.tsx         # Global cart state
├── types/
│   └── index.ts                # TypeScript definitions
└── utils/
    └── products.ts             # Product data

```

## 🔧 Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Check for code issues

## 💡 Tips

- Cart state is stored in React Context (resets on page refresh)
- All styling is in individual CSS files for each component
- Images are loaded from Unsplash CDN
- Stripe test mode doesn't charge real money
- The app is mobile-responsive

## 🐛 Troubleshooting

**Port already in use?**

```bash
# Kill the process on port 5173
kill -9 $(lsof -ti:5173)
```

**Dependencies not installing?**

```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Stripe errors?**

- Make sure you're using a test publishable key (pk*test*)
- Use test card numbers only
- Check browser console for detailed errors

## 🎓 Learning Resources

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Stripe Documentation](https://stripe.com/docs)
- [React Router](https://reactrouter.com)
- [Vite Guide](https://vitejs.dev/guide/)

Enjoy building your e-commerce store! 🎉
