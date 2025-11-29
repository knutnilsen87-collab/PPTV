import Navigation from '@/components/Navigation';
import { 
  PlayIcon, 
  EyeIcon, 
  HeartIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function StrategyPage() {
  const strategyVideos = [
    {
      id: 1,
      title: "Advanced Bluffing Techniques",
      views: "12.5K",
      likes: 892,
      duration: "18:30",
      author: "PokerCoach",
      thumbnail: "/images/thumbnails/strategy.jpeg",
      level: "Advanced",
      category: "Bluffing"
    },
    {
      id: 2,
      title: "ICM Considerations in Tournaments",
      views: "8.7K",
      likes: 654,
      duration: "22:15",
      author: "TournamentPro",
      thumbnail: "/images/thumbnails/wsop-main.jpeg",
      level: "Intermediate",
      category: "Tournaments"
    },
    {
      id: 3,
      title: "Bankroll Management Fundamentals",
      views: "15.2K",
      likes: 1234,
      duration: "14:45",
      author: "PokerFinance",
      thumbnail: "/images/thumbnails/high-stakes.jpeg",
      level: "Beginner",
      category: "Bankroll"
    },
    {
      id: 4,
      title: "Reading Opponents: Body Language",
      views: "9.8K",
      likes: 756,
      duration: "16:20",
      author: "PokerPsychology",
      thumbnail: "/images/thumbnails/best-moments.jpeg",
      level: "Intermediate",
      category: "Psychology"
    },
    {
      id: 5,
      title: "Preflop Hand Selection",
      views: "20.1K",
      likes: 1456,
      duration: "25:10",
      author: "PokerCoach",
      thumbnail: "/images/thumbnails/amazing-bluff.jpeg",
      level: "Beginner",
      category: "Preflop"
    },
    {
      id: 6,
      title: "Postflop Bet Sizing",
      views: "11.3K",
      likes: 823,
      duration: "19:45",
      author: "StrategyGuru",
      thumbnail: "/images/thumbnails/live-stream.jpeg",
      level: "Advanced",
      category: "Postflop"
    }
  ];

  const categories = [
    { name: 'All', count: 156 },
    { name: 'Preflop', count: 34 },
    { name: 'Postflop', count: 42 },
    { name: 'Bluffing', count: 28 },
    { name: 'Tournaments', count: 31 },
    { name: 'Cash Games', count: 25 },
    { name: 'Psychology', count: 18 },
    { name: 'Bankroll', count: 12 }
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="min-h-screen bg-poker-950">
      <Navigation />
      
      <main className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <AcademicCapIcon className="w-8 h-8 text-accent-green" />
            <h1 className="text-h1 font-bold text-poker-100">Poker Strategy</h1>
          </div>
          <p className="text-poker-300 text-body-lg">
            Learn from the best players and improve your game
          </p>
        </div>

        {/* Strategy Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { title: 'Beginner', count: '45 videos', icon: BookOpenIcon, color: 'text-accent-green' },
            { title: 'Intermediate', count: '67 videos', icon: ChartBarIcon, color: 'text-accent-blue' },
            { title: 'Advanced', count: '44 videos', icon: AcademicCapIcon, color: 'text-accent-gold' }
          ].map((level, index) => (
            <div key={index} className="card p-6 text-center">
              <level.icon className={`w-12 h-12 mx-auto mb-4 ${level.color}`} />
              <h3 className="text-xl font-bold text-poker-100 mb-2">{level.title}</h3>
              <p className="text-poker-400">{level.count}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category.name}
                className="badge badge-secondary hover:bg-accent-green/20 hover:text-accent-green hover:border-accent-green/30 transition-colors"
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <button
                key={level}
                className="badge badge-primary"
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Strategy Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategyVideos.map((video) => (
            <div key={video.id} className="video-card group">
              <div className="video-thumbnail">
                <div className="w-full h-full bg-gradient-to-br from-poker-700 to-poker-800" />
                <div className="video-overlay" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-12 h-12 bg-accent-green/90 rounded-full flex items-center justify-center hover:bg-accent-green transition-colors">
                    <PlayIcon className="w-6 h-6 text-white" />
                  </button>
                </div>
                <div className="duration-chip">
                  {video.duration}
                </div>
                <div className="absolute top-2 left-2">
                  <div className="badge badge-primary">
                    {video.level}
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="badge badge-secondary">
                    {video.category}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-poker-100 mb-2 group-hover:text-accent-green transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-poker-400 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-poker-800/50 rounded-full flex items-center justify-center border border-accent-green/30">
                      <span className="text-xs text-accent-green font-medium">P</span>
                    </div>
                    <span>{video.author}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-poker-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <EyeIcon className="w-4 h-4 mr-1" />
                      {video.views}
                    </span>
                    <span className="flex items-center">
                      <HeartIcon className="w-4 h-4 mr-1" />
                      {video.likes}
                    </span>
                  </div>
                  <span className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {video.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Path */}
        <div className="mt-16">
          <h2 className="text-h2 font-bold text-poker-100 mb-8">Learning Path</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Fundamentals',
                description: 'Master the basics of poker strategy',
                steps: ['Hand Rankings', 'Position', 'Pot Odds', 'Basic Math'],
                color: 'border-accent-green'
              },
              {
                title: 'Intermediate',
                description: 'Develop advanced strategic thinking',
                steps: ['Range Analysis', 'Board Texture', 'Bet Sizing', 'ICM'],
                color: 'border-accent-blue'
              },
              {
                title: 'Advanced',
                description: 'Perfect your game with expert techniques',
                steps: ['Game Theory', 'Exploitative Play', 'Mental Game', 'Live Reads'],
                color: 'border-accent-gold'
              }
            ].map((path, index) => (
              <div key={index} className={`card p-6 border-l-4 ${path.color}`}>
                <h3 className="text-xl font-bold text-poker-100 mb-2">{path.title}</h3>
                <p className="text-poker-300 mb-4">{path.description}</p>
                <ul className="space-y-2">
                  {path.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-center text-sm text-poker-400">
                      <div className="w-2 h-2 bg-accent-green rounded-full mr-3" />
                      {step}
                    </li>
                  ))}
                </ul>
                <button className="btn-outline w-full mt-4">
                  Start Learning
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
