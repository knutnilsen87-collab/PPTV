# Loading Components Documentation

This document describes the loading components and utilities implemented in the ProPokerTV application.

## Components

### 1. PageLoader

A full-screen loading component with poker-themed animations and progress tracking.

**Props:**
- `isLoading: boolean` - Controls whether the loader is visible
- `onComplete?: () => void` - Callback function when loading completes

**Features:**
- Animated logo with bouncing effect
- Step-by-step loading progress with poker-themed text
- Progress bar with shimmer effect
- Floating card animations in background
- Smooth fade-out transition

**Usage:**
```tsx
import PageLoader from '@/components/PageLoader';

function MyComponent() {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <>
      <PageLoader 
        isLoading={isLoading} 
        onComplete={() => setIsLoading(false)}
      />
      {/* Your content */}
    </>
  );
}
```

### 2. LoadingSpinner

A versatile loading spinner component with multiple variants and sizes.

**Props:**
- `size?: 'sm' | 'md' | 'lg'` - Size of the spinner (default: 'md')
- `text?: string` - Optional loading text below the spinner
- `variant?: 'default' | 'poker' | 'minimal'` - Visual style variant (default: 'default')

**Variants:**
- `default` - Green spinner with optional text
- `poker` - Gold spinner with sparkle icon and poker theme
- `minimal` - Simple spinner without text

**Usage:**
```tsx
import LoadingSpinner from '@/components/LoadingSpinner';

// Default usage
<LoadingSpinner />

// With text
<LoadingSpinner text="Loading videos..." />

// Poker themed
<LoadingSpinner variant="poker" size="lg" text="Shuffling deck..." />

// Minimal
<LoadingSpinner variant="minimal" size="sm" />
```

## Hooks

### 1. useLoading

A custom hook for managing single loading states.

**Returns:**
- `isLoading: boolean` - Current loading state
- `startLoading: () => void` - Function to start loading
- `stopLoading: () => void` - Function to stop loading
- `setLoading: (loading: boolean) => void` - Function to set loading state
- `withLoading: <T>(asyncFn: () => Promise<T>) => Promise<T>` - Wrapper for async functions

**Usage:**
```tsx
import { useLoading } from '@/utils/useLoading';

function MyComponent() {
  const { isLoading, withLoading, startLoading, stopLoading } = useLoading();
  
  const handleAsyncOperation = async () => {
    await withLoading(async () => {
      // Your async operation
      await someAsyncFunction();
    });
  };
  
  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <button onClick={handleAsyncOperation}>Load Data</button>
    </div>
  );
}
```

### 2. useMultiLoading

A custom hook for managing multiple loading states simultaneously.

**Returns:**
- `loadingStates: Record<string, boolean>` - Object with all loading states
- `setLoading: (key: string, loading: boolean) => void` - Set loading for specific key
- `isLoading: (key: string) => boolean` - Check if specific key is loading
- `startLoading: (key: string) => void` - Start loading for specific key
- `stopLoading: (key: string) => void` - Stop loading for specific key
- `withLoading: <T>(key: string, asyncFn: () => Promise<T>) => Promise<T>` - Wrapper for async functions

**Usage:**
```tsx
import { useMultiLoading } from '@/utils/useLoading';

function MyComponent() {
  const { 
    loadingStates, 
    isLoading, 
    withLoading 
  } = useMultiLoading(['videos', 'comments', 'profile']);
  
  const loadVideos = async () => {
    await withLoading('videos', async () => {
      // Load videos
    });
  };
  
  return (
    <div>
      {isLoading('videos') && <LoadingSpinner text="Loading videos..." />}
      {isLoading('comments') && <LoadingSpinner text="Loading comments..." />}
      {isLoading('profile') && <LoadingSpinner text="Loading profile..." />}
    </div>
  );
}
```

## CSS Animations

The following custom CSS animations are available:

### animate-float
Floating animation for card elements with rotation and opacity changes.

### animate-fade-in
Fade-in animation with upward movement.

### animate-slide-up
Slide-up animation with delayed start.

## Implementation Examples

### Page Loading
```tsx
// In your main page component
const { isLoading, setLoading } = useLoading(true);

useEffect(() => {
  // Simulate content loading
  const timer = setTimeout(() => {
    setLoading(false);
  }, 3000);
  
  return () => clearTimeout(timer);
}, [setLoading]);

return (
  <>
    <PageLoader isLoading={isLoading} onComplete={() => setLoading(false)} />
    {/* Your page content */}
  </>
);
```

### Component Loading
```tsx
// For individual components
const [componentLoading, setComponentLoading] = useState(false);

const handleAction = async () => {
  setComponentLoading(true);
  try {
    await someAsyncOperation();
  } finally {
    setComponentLoading(false);
  }
};

return (
  <div>
    {componentLoading ? (
      <LoadingSpinner variant="poker" text="Processing..." />
    ) : (
      <button onClick={handleAction}>Action</button>
    )}
  </div>
);
```

### Async Operations
```tsx
// Using the withLoading wrapper
const { withLoading } = useLoading();

const handleSubmit = async () => {
  await withLoading(async () => {
    await submitForm();
    // Loading state automatically managed
  });
};
```

## Best Practices

1. **Use PageLoader for initial page loads** - Provides a professional loading experience
2. **Use LoadingSpinner for component-level loading** - Less intrusive for smaller operations
3. **Leverage useLoading hooks** - Automatically manage loading states
4. **Provide meaningful loading text** - Help users understand what's happening
5. **Use appropriate variants** - Match the loading style to your context
6. **Handle loading errors gracefully** - Always provide fallback states

## Customization

You can customize the loading components by:

1. **Modifying CSS variables** - Change colors and timing in globals.css
2. **Adding new variants** - Extend the LoadingSpinner component
3. **Customizing animations** - Modify keyframes in the CSS
4. **Adding new loading steps** - Extend the PageLoader steps array
5. **Creating theme-specific loaders** - Build variants for different contexts
