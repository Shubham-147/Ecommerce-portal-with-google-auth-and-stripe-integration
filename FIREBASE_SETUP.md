# Firebase Setup Guide

## 🔥 Setting Up Google Authentication

Follow these steps to enable Google Sign-In in your e-commerce store:

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add Project"** or **"Create a Project"**
3. Enter your project name (e.g., "ShopHub")
4. Click **Continue**
5. (Optional) Enable Google Analytics
6. Click **Create Project**

### Step 2: Register Your Web App

1. In the Firebase Console, click the **Web icon** (</>) to add a web app
2. Register app with a nickname (e.g., "ShopHub Web")
3. Click **Register app**
4. Firebase will display your configuration - **COPY these values**

```javascript
const firebaseConfig = {
  apiKey: 'AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project.appspot.com',
  messagingSenderId: '123456789012',
  appId: '1:123456789012:web:abcdef123456',
};
```

### Step 3: Enable Google Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click on **Google** provider
3. Toggle **Enable** to ON
4. Set a support email (your email)
5. Click **Save**

### Step 4: Update Your Project Configuration

Open `src/config/firebase.ts` and replace the placeholder values with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: 'YOUR_ACTUAL_API_KEY',
  authDomain: 'your-actual-project.firebaseapp.com',
  projectId: 'your-actual-project-id',
  storageBucket: 'your-actual-project.appspot.com',
  messagingSenderId: 'YOUR_ACTUAL_SENDER_ID',
  appId: 'YOUR_ACTUAL_APP_ID',
};
```

### Step 5: Configure Authorized Domains

1. In Firebase Console, go to **Authentication** → **Settings** → **Authorized domains**
2. By default, `localhost` is already authorized
3. When deploying, add your production domain (e.g., `yourdomain.com`)

### Step 6: Test Your Setup

1. Start your development server:

```bash
npm run dev
```

2. Navigate to `/login`
3. Click **"Continue with Google"**
4. Sign in with your Google account
5. You should be redirected back to the app as an authenticated user

---

## 🔐 Authentication Features

### Google Sign-In

- **One-click authentication** using Google account
- Automatic profile photo and name retrieval
- Secure OAuth 2.0 flow

### Guest Checkout

- **No account required** for quick purchases
- Orders not saved to user profile
- Can upgrade to full account anytime

### User Session

- **Persistent sessions** across page refreshes
- Automatic sign-in on return visits
- Secure token management via Firebase

---

## 🛡️ Security Best Practices

### API Key Security

The Firebase API key in your config is **safe to expose** in client-side code:

- It's used to identify your Firebase project
- Firebase Security Rules protect your data
- Authentication still requires Google OAuth

### Environment Variables (Optional)

For additional organization, you can use environment variables:

Create `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Update `src/config/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

---

## 🚀 Deployment

### Before Deploying

1. Update authorized domains in Firebase Console
2. Ensure production URL is added to Google OAuth consent screen
3. Test authentication in production environment

### Netlify/Vercel

Both platforms support Firebase out of the box. Just deploy and your authentication will work!

---

## 🐛 Troubleshooting

### "Firebase: Error (auth/unauthorized-domain)"

**Solution**: Add your domain to Authorized Domains in Firebase Console

### "No Firebase App"

**Solution**: Check that firebase.ts is properly initialized and imported

### Google Sign-In popup blocked

**Solution**: Allow popups for your site or use redirect method

### Sign-in not working

**Solutions**:

1. Check browser console for errors
2. Verify Firebase config values are correct
3. Ensure Google provider is enabled in Firebase Console
4. Clear browser cache and cookies

---

## 📚 Additional Resources

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Google Sign-In Guide](https://firebase.google.com/docs/auth/web/google-signin)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Firebase Console](https://console.firebase.google.com/)

---

## 🎯 What's Protected

### Protected Routes

- `/checkout` - Requires login or guest mode

### Unprotected Routes

- `/` - Product listing (public)
- `/cart` - Shopping cart (public)
- `/login` - Login page (public)

Users can browse and add items to cart without logging in. Authentication is only required at checkout.

---

**Need Help?** Open an issue on GitHub or consult the Firebase documentation!
