# Theme System Guide

## 🎨 Dark & Light Theme

Your e-commerce store now supports both **Light** and **Dark** themes with automatic persistence and smooth transitions!

## ✨ Features

- **Toggle Button**: Easily switch themes using the moon/sun icon in the navigation bar
- **Auto-Detection**: Automatically detects your system's preferred theme on first visit
- **Persistence**: Your theme preference is saved in `localStorage`
- **Smooth Transitions**: All colors transition smoothly when switching themes
- **Consistent**: All components use the same theme variables

## 🎯 How to Use

1. **Toggle Theme**: Click the 🌙/☀️ button in the navigation bar
2. **Your preference is saved**: The theme persists across page refreshes
3. **Works everywhere**: All pages and components respect the theme

## 🎨 Theme Colors

### Light Theme (Default)

```css
--bg-primary: #f8f9fa        /* Main background */
--bg-secondary: #e9ecef      /* Secondary background */
--bg-card: #ffffff           /* Card backgrounds */
--text-primary: #2d3436      /* Main text */
--text-secondary: #636e72    /* Secondary text */
--border-color: #e1e8ed      /* Borders */
```

### Dark Theme

```css
--bg-primary: #1a1a2e        /* Main background */
--bg-secondary: #16213e      /* Secondary background */
--bg-card: #0f3460           /* Card backgrounds */
--text-primary: #eaeaea      /* Main text */
--text-secondary: #b2bec3    /* Secondary text */
--border-color: #2d3436      /* Borders */
```

### Common Colors (Same in both themes)

```css
--gradient-start: #667eea    /* Purple gradient start */
--gradient-end: #764ba2      /* Purple gradient end */
--success: #00b894           /* Success green */
--error: #ff4757             /* Error red */
```

## 🔧 Customizing Themes

### Method 1: Change in `index.css`

Edit the CSS variables in `/src/index.css`:

```css
:root {
  /* Modify light theme colors here */
  --bg-primary: #your-color;
  --text-primary: #your-color;
  /* ... other variables */
}

[data-theme='dark'] {
  /* Modify dark theme colors here */
  --bg-primary: #your-color;
  --text-primary: #your-color;
  /* ... other variables */
}
```

### Method 2: Add New Theme Variables

Add new variables to both themes:

```css
:root {
  --my-custom-color: #ff6b6b;
}

[data-theme='dark'] {
  --my-custom-color: #ee5a6f;
}
```

Then use in your components:

```css
.my-element {
  background: var(--my-custom-color);
}
```

## 💻 Using Theme in Components

### In CSS Files

Always use CSS variables instead of hardcoded colors:

```css
/* ✅ Good - Uses theme variables */
.my-component {
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

/* ❌ Bad - Hardcoded colors */
.my-component {
  background: #ffffff;
  color: #2d3436;
  border: 1px solid #e1e8ed;
}
```

### In React Components

Use the `useTheme` hook:

```tsx
import { useTheme } from '../context/ThemeContext';

const MyComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
```

## 📦 Theme Architecture

### Files Structure

```
src/
├── context/
│   └── ThemeContext.tsx       # Theme state management
├── components/
│   ├── ThemeToggle.tsx        # Theme toggle button
│   └── ThemeToggle.css        # Toggle button styles
└── index.css                  # Theme variables & colors
```

### How It Works

1. **ThemeContext**: Manages theme state globally
2. **localStorage**: Saves user preference
3. **data-theme attribute**: Applied to `<html>` element
4. **CSS Variables**: All colors use CSS custom properties
5. **Smooth Transitions**: CSS transitions on color properties

## 🎯 Best Practices

1. **Always use CSS variables** for colors
2. **Test in both themes** when styling new components
3. **Use semantic variable names** (`--text-primary` not `--color-1`)
4. **Keep gradients consistent** across themes
5. **Ensure good contrast** in both light and dark modes

## 🔍 Debugging Themes

### Check Current Theme

Open browser console:

```javascript
console.log(document.documentElement.getAttribute('data-theme'));
console.log(localStorage.getItem('theme'));
```

### Test Theme Toggle

```javascript
// Manually switch themes
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.setAttribute('data-theme', 'light');
```

### View All CSS Variables

In browser DevTools:

1. Inspect any element
2. Look for `:root` in the Styles panel
3. See all CSS variable values

## 🌈 Advanced: Adding More Themes

Want to add a third theme (e.g., "high-contrast")?

1. Add to `ThemeContext.tsx`:

```tsx
type Theme = 'light' | 'dark' | 'high-contrast';
```

2. Add CSS variables:

```css
[data-theme='high-contrast'] {
  --bg-primary: #000000;
  --text-primary: #ffffff;
  /* ... other colors */
}
```

3. Update toggle logic to cycle through themes

## 💡 Tips

- **Images**: Consider adding `filter` properties for dark mode
- **Shadows**: Use variable-based shadows (`var(--shadow)`)
- **Icons**: Emoji icons work well in both themes
- **Accessibility**: Ensure WCAG contrast ratios in both themes

## 📱 Currency Display

The store displays all prices in **US Dollars ($)**:

- Format: `$XXX.XX`
- Example: `$299.99`
- Tax calculations use the same currency
- Stripe processes payments in USD

To change currency:

1. Update the `$` symbol in all price displays
2. Adjust Stripe currency in checkout
3. Update price formatting in components

---

Enjoy your new theme system! 🎉 Switch between light and dark modes anytime.
