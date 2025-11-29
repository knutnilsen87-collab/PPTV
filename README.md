# ProPokerTV — Elite Poker Video Platform

A premium poker video platform and community built with Next.js, featuring elite poker content, strategy breakdowns, and live highlights.

## 🎯 Features

### Core Functionality
- **Video Streaming**: High-quality poker video content with advanced player
- **Live Streams**: Real-time poker action from tournaments and cash games
- **Clips**: Short, shareable moments (15-60 seconds) with watermarking
- **Strategy Content**: Educational videos organized by skill level
- **Community**: Discussion forums with upvoting and tagging
- **Search**: Advanced search with filters and categories

### Premium Design
- **Dark Theme**: Professional dark palette with premium accents
- **Typography**: Inter/Manrope fonts with consistent scaling
- **Responsive**: Mobile-first design with smooth animations
- **Accessibility**: WCAG compliant with focus management

### Poker-Specific Features
- **Hand Explorer**: Tag videos with game type, blinds, streets, themes
- **Coach Notes**: Timestamped annotations for Pro users
- **Gamification**: Voting system with badges and leaderboards
- **Calendar**: Tournament schedules with iCal export

## 🎨 Design System

### Color Palette
- **Primary**: `#0f172a` (Dark Navy)
- **Text**: `#e5e7eb` (Light Gray)
- **Accent Green**: `#10b981` (Poker Green)
- **Accent Gold**: `#d4af37` (Muted Gold)
- **Accent Blue**: `#60a5fa` (Focus Blue)

### Typography
- **Headings**: Inter (700 weight)
- **Body**: Inter (400-500 weight)
- **UI**: Manrope (500-600 weight)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/propokertv.git
   cd propokertv
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── admin/             # Admin dashboard
│   ├── calendar/          # Tournament calendar
│   ├── clips/             # Short video clips
│   ├── community/         # Discussion forums
│   ├── live/              # Live streams
│   ├── strategy/          # Educational content
│   ├── video/             # Video player
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── Navigation.tsx     # Main navigation
│   └── ...               # Other components
├── utils/                 # Utility functions
│   └── const.ts          # Constants and data
└── styles/               # Global styles
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Heroicons**: Icon library

### Performance
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Automatic component and image lazy loading
- **Code Splitting**: Automatic route-based code splitting

### SEO & Analytics
- **Metadata**: Open Graph, Twitter Cards, Schema.org
- **Analytics**: Google Analytics 4 integration ready
- **Performance**: Core Web Vitals optimization

## 🎯 Key Pages

### Homepage (`/`)
- Hero section with value proposition
- Featured videos with filters
- Community highlights
- Onboarding flow

### Videos (`/video`)
- Full video player with controls
- Comments and engagement
- Related videos sidebar
- Creator profiles

### Live (`/live`)
- Live stream directory
- Viewer counts and chat
- Upcoming streams
- Stream categories

### Clips (`/clips`)
- Short video clips (15-60s)
- Clip creation tools
- Sharing with watermarks
- Trending clips

### Strategy (`/strategy`)
- Educational content by level
- Learning paths
- Category filters
- Progress tracking

### Community (`/community`)
- Discussion forums
- Post creation and voting
- User profiles and badges
- Topic categorization

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:

```env
# Analytics
NEXT_PUBLIC_GA_ID=your-ga-id
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret

# Database
DATABASE_URL=your-database-url

# Video Storage
CLOUDINARY_URL=your-cloudinary-url
```

### Tailwind Configuration
The design system is configured in `tailwind.config.ts` with:
- Custom color palette
- Typography scales
- Animation keyframes
- Component utilities

## 📱 Responsive Design

The platform is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## ♿ Accessibility

- **WCAG 2.1 AA** compliant
- **Keyboard navigation** support
- **Screen reader** friendly
- **Focus management** with visible indicators
- **Reduced motion** support
- **High contrast** ratios

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Compatible with Next.js
- **AWS**: Use Amplify or custom setup
- **Docker**: Multi-stage build available

## 📊 Analytics & Monitoring

### Google Analytics 4
Track user behavior, video engagement, and conversion funnels.

### Performance Monitoring
- Core Web Vitals tracking
- Error monitoring with Sentry
- Uptime monitoring

## 🔒 Security

- **Content Security Policy** (CSP)
- **HTTPS** enforcement
- **XSS protection**
- **CSRF protection**
- **Rate limiting** on API routes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style
- **ESLint** configuration included
- **Prettier** for code formatting
- **TypeScript** strict mode enabled

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.propokertv.com](https://docs.propokertv.com)
- **Issues**: [GitHub Issues](https://github.com/your-org/propokertv/issues)
- **Discord**: [Community Server](https://discord.gg/propokertv)

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core video platform
- ✅ Community features
- ✅ Premium design system
- ✅ Search and filters

### Phase 2 (Next)
- 🔄 Hand Explorer MVP
- 🔄 Clip creation tools
- 🔄 Coach Notes system
- 🔄 Advanced analytics

### Phase 3 (Future)
- 📋 Mobile app
- 📋 Live streaming infrastructure
- 📋 AI-powered recommendations
- 📋 Tournament integration

---

Built with ❤️ by the ProPokerTV team
