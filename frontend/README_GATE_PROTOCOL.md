# Gate Protocol Frontend

A modern, pixel-perfect Web3 protocol landing page built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Design**: Glassmorphism effects, gradient animations, and smooth transitions
- **Fully Responsive**: Mobile-first design that works on all devices
- **Performance Optimized**: GPU-accelerated animations using Framer Motion
- **TypeScript**: Full type safety throughout the application
- **Accessibility**: WCAG AA compliant with proper ARIA labels and keyboard navigation
- **SEO Ready**: Semantic HTML and meta tags for search engine optimization

## 📦 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Recharts** - Chart library for tokenomics visualization

## 🛠️ Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/           # Layout components (Navbar, Footer, Container)
│   ├── sections/         # Page sections (Hero, Features, etc.)
│   ├── ui/              # Reusable UI components (Button, Card, Badge)
│   └── animations/      # Animation wrapper components
├── assets/              # Static assets (images, icons)
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles & Tailwind imports
```

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to customize the color palette:
```typescript
colors: {
  primary: {
    cyan: '#00D4FF',
    purple: '#7B61FF',
    pink: '#FF3366',
  }
}
```

### Animations
Adjust animation durations in `tailwind.config.ts`:
```typescript
animation: {
  'float': 'float 6s ease-in-out infinite',
  'gradient': 'gradient 8s linear infinite',
}
```

## 🚀 Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Sections

1. **Hero Section** - Eye-catching introduction with animated orb and stats
2. **Features Section** - Six key features in a responsive grid
3. **Architecture Section** - Three-layer system architecture diagram
4. **Stats Section** - Key metrics with counter animations
5. **Partners Section** - Partner logos and testimonials
6. **Tokenomics Section** - Token distribution with interactive chart
7. **Roadmap Section** - Timeline of development milestones
8. **CTA Section** - Final call-to-action with newsletter signup
9. **Footer** - Comprehensive site navigation and social links

## 🎨 Design Highlights

- **Glass Morphism**: Frosted glass effects throughout
- **Gradient Animations**: Dynamic gradient backgrounds that shift colors
- **Floating Elements**: Smooth bobbing animations for visual depth
- **Scroll Animations**: Elements fade and slide in as you scroll
- **Hover Effects**: Interactive hover states on all clickable elements
- **Responsive Grid**: Adapts seamlessly from mobile to desktop

## 🔧 Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically try the next available port. You can also specify a custom port:

```bash
npm run dev -- --port 3000
```

### TypeScript Errors
Make sure all dependencies are installed:
```bash
npm install
```

### Tailwind Classes Not Working
Ensure PostCSS and Tailwind are properly configured and the dev server is restarted after config changes.

## 📄 License

This project is part of the TokeDex ecosystem.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using React + Vite + Tailwind CSS
