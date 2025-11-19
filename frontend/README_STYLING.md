# Frontend Styling Guide

## Overview

The frontend uses **Tailwind CSS** for styling and **Lucide React** for icons. This provides a modern, maintainable, and scalable styling approach.

## Tailwind CSS Setup

### Files Involved
- `tailwind.config.ts` - Configuration
- `postcss.config.js` - Post-processor setup
- `globals.css` - Global styles and Tailwind directives

### Key CSS Classes

#### Layout Classes
```css
flex           /* Flexbox container */
flex-col       /* Column direction */
flex-1         /* Flexible growing */
h-screen       /* Full screen height */
w-64           /* Fixed 256px width */
overflow-auto  /* Scrollable content */
```

#### Spacing Classes
```css
p-4            /* Padding: 1rem */
px-6           /* Horizontal padding: 1.5rem */
py-4           /* Vertical padding: 1rem */
m-0            /* No margin */
gap-3          /* Gap between items: 0.75rem */
```

#### Color Classes
```css
bg-white       /* White background */
bg-gray-50     /* Very light gray */
bg-gray-100    /* Light gray */
text-gray-900  /* Dark gray text */
text-gray-600  /* Medium gray text */
border-gray-200 /* Light gray border */
```

#### Interactive Classes
```css
hover:bg-gray-100    /* Hover effect */
transition-colors    /* Smooth transitions */
disabled:bg-gray-400 /* Disabled state */
focus:ring-2         /* Focus outline */
cursor-pointer       /* Pointer cursor */
```

## Color System

### Primary Colors
```
Black:   #000000  (bg-black, text-black)
White:   #ffffff  (bg-white, text-white)
Gray:    Various shades (50-900)
```

### Semantic Colors
```
Success: #22e100 (green-600)
Info:    #00b8e1 (cyan-600)
Error:   #ff0000 (red-600)
Warning: #ffaa00 (amber-600)
```

### Usage Examples

**Success Badge (Citations)**
```tsx
className="bg-green-100 text-green-700 border border-green-300"
```

**Info Badge (Inline citations)**
```tsx
className="bg-cyan-100 text-cyan-600 border border-cyan-300"
```

**Error State**
```tsx
className="bg-red-50 text-red-700"
```

## Typography

### Font Sizes
```
text-xs      /* 12px */
text-sm      /* 14px */
text-base    /* 16px */
text-lg      /* 18px */
text-xl      /* 20px */
text-2xl     /* 24px */
text-3xl     /* 30px */
```

### Font Weights
```
font-normal     /* 400 */
font-medium     /* 500 */
font-semibold   /* 600 */
font-bold       /* 700 */
```

### Usage Examples
```tsx
/* Heading */
<h1 className="text-3xl font-bold text-gray-900">Title</h1>

/* Subheading */
<h2 className="text-xl font-semibold text-gray-800">Subtitle</h2>

/* Body text */
<p className="text-sm text-gray-600">Description</p>

/* Emphasized text */
<span className="font-semibold">Important</span>
```

## Spacing System

### Padding/Margin Scale (in rem, 1rem = 16px)
```
0    → 0
1    → 0.25rem (4px)
2    → 0.5rem (8px)
3    → 0.75rem (12px)
4    → 1rem (16px)
6    → 1.5rem (24px)
8    → 2rem (32px)
```

### Usage Examples
```tsx
/* Card with padding */
<div className="p-6 bg-white rounded-lg">

/* Flex gap */
<div className="flex gap-4 items-center">

/* Margin bottom */
<div className="mb-6">

/* All sides */
<div className="m-4">

/* Horizontal only */
<div className="px-6">

/* Vertical only */
<div className="py-4">
```

## Border Radius

```
rounded       → 0.25rem (4px)
rounded-lg    → 0.5rem (8px)
rounded-xl    → 0.75rem (12px)
rounded-2xl   → 1rem (16px)
rounded-full  → 9999px (circles)
```

### Usage
```tsx
/* Buttons */
<button className="rounded-lg">

/* Cards */
<div className="rounded-xl bg-white">

/* Avatars */
<img className="rounded-full w-10 h-10">
```

## Flexbox Utilities

### Direction
```
flex-row    /* Default: horizontal */
flex-col    /* Vertical layout */
```

### Alignment
```
items-start     /* Align top */
items-center    /* Align center */
items-end       /* Align bottom */
justify-start   /* Start of row */
justify-center  /* Center of row */
justify-end     /* End of row */
justify-between /* Space between */
```

### Sizing
```
flex-1      /* Grow equally */
flex-auto   /* Grow based on content */
flex-none   /* Don't grow */
```

### Examples
```tsx
/* Horizontal center */
<div className="flex items-center justify-center">

/* Vertical layout with gap */
<div className="flex flex-col gap-4">

/* Stretch to fill */
<div className="flex flex-1 gap-3">

/* Space items apart */
<div className="flex justify-between items-center">
```

## Responsive Design

### Breakpoints
```
sm   → 640px
md   → 768px
lg   → 1024px
xl   → 1280px
2xl  → 1536px
```

### Mobile-first Approach
```tsx
/* Mobile first, then scale up */
<div className="px-4 md:px-6 lg:px-8">
  {/* 16px on mobile, 24px on tablet, 32px on desktop */}
</div>

/* Hidden on mobile, shown on desktop */
<div className="hidden lg:block">
  Desktop only content
</div>
```

## Interactive States

### Hover
```tsx
<button className="bg-black hover:bg-gray-900">
  /* Black normally, dark gray on hover */
</button>
```

### Focus
```tsx
<input className="border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent">
```

### Active/Pressed
```tsx
<button className="active:scale-95">
  /* Scales down when pressed */
</button>
```

### Disabled
```tsx
<button disabled className="disabled:bg-gray-400 disabled:cursor-not-allowed">
  {/* Gray and unclickable when disabled */}
</button>
```

## Transitions & Animations

### Transitions
```tsx
<button className="transition-colors hover:bg-gray-100">
  {/* Smooth color change */}
</button>

<div className="transition-all duration-300">
  {/* All properties change over 300ms */}
</div>
```

### Animations
```tsx
<div className="animate-spin">
  {/* Built-in spinning animation */}
</div>

<div className="animate-pulse">
  {/* Fading in/out animation */}
</div>
```

## Shadows & Borders

### Shadows
```
shadow-sm    → Small shadow
shadow       → Default shadow
shadow-lg    → Large shadow
shadow-xl    → Extra large shadow
```

### Borders
```
border           → 1px border
border-2         → 2px border
border-gray-200  → Specific color
border-t         → Top border only
border-b         → Bottom border only
```

### Usage
```tsx
/* Card with shadow */
<div className="bg-white rounded-lg shadow-lg">

/* Input with border */
<input className="border border-gray-300 rounded-lg">

/* Divider */
<div className="border-t border-gray-200">
```

## Advanced Patterns

### Message Bubble
```tsx
<div className="max-w-2xl bg-gray-100 rounded-2xl px-4 py-3">
  User message
</div>
```

### Badge
```tsx
<span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
  Success
</span>
```

### Button Group
```tsx
<div className="flex gap-2">
  <button className="px-4 py-2 bg-black text-white rounded-lg">Primary</button>
  <button className="px-4 py-2 border border-gray-300 text-gray-900 rounded-lg">Secondary</button>
</div>
```

### Card Layout
```tsx
<div className="bg-white rounded-lg shadow-lg p-6">
  <h3 className="text-xl font-semibold mb-4">Title</h3>
  <p className="text-gray-600">Content goes here</p>
</div>
```

## Lucide React Icons

### Usage
```tsx
import { MessageSquare, Settings, HelpCircle } from 'lucide-react';

<MessageSquare className="w-5 h-5 text-gray-600" />
<Settings className="w-6 h-6 text-black" />
<HelpCircle className="w-4 h-4 text-gray-400" />
```

### Sizing
```
w-4 h-4      → 16px × 16px
w-5 h-5      → 20px × 20px
w-6 h-6      → 24px × 24px
w-8 h-8      → 32px × 32px
```

### Commonly Used Icons in App
```
MessageSquare   - Chat
Settings        - Admin
HelpCircle      - Help/Info
PanelLeft       - Toggle
Plus            - Add/New
Send            - Submit
Copy            - Copy text
RotateCw        - Refresh/Redo
Share2          - Share
Database        - Ingest
RefreshCw       - Refresh metrics
```

## Tips & Best Practices

### 1. Use Consistent Spacing
```tsx
/* Good: Consistent gap */
<div className="flex gap-4 items-center">

/* Avoid: Inconsistent spacing */
<div className="flex">
  <div className="mr-2">
  <div className="ml-6">
</div>
```

### 2. Leverage Tailwind's Composition
```tsx
/* Good: Use Tailwind classes */
className="p-4 bg-white rounded-lg shadow"

/* Avoid: Custom CSS */
style={{padding: '16px', background: 'white', borderRadius: '8px'}}
```

### 3. Extract Repeated Patterns
```tsx
/* Good: Extract components */
const Card = ({children}) => (
  <div className="p-6 bg-white rounded-lg shadow-lg">
    {children}
  </div>
);

/* Avoid: Repeat classes everywhere */
<div className="p-6 bg-white rounded-lg shadow-lg">...</div>
```

### 4. Use Semantic Colors
```tsx
/* Good: Meaningful color names */
className="bg-green-100 text-green-700"

/* Avoid: Arbitrary colors */
className="bg-[#c3ffc8] text-[#22e100]"
```

### 5. Mobile-first Responsive Design
```tsx
/* Good: Mobile first, then scale up */
className="text-sm md:text-base lg:text-lg"

/* Avoid: Large first, then reduce */
className="text-xl md:text-sm lg:text-xs"
```

## Customization

### Global Colors
Edit `globals.css`:
```css
:root {
  --background: 0 0% 100%;  /* Change global background */
  --foreground: 0 0% 3.6%;  /* Change global foreground */
}
```

### Theme Customization
Edit `tailwind.config.ts`:
```ts
theme: {
  extend: {
    colors: {
      primary: '#000000',
      secondary: '#f2f2f2',
    },
  },
}
```

### Custom Utility Classes
Add to `globals.css`:
```css
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors;
  }
}
```

## Resources

- Tailwind CSS Docs: https://tailwindcss.com
- Color Palette: https://tailwindcss.com/docs/customizing-colors
- Component Examples: https://tailwindui.com (not included but useful reference)
- Responsive Design: https://tailwindcss.com/docs/responsive-design
