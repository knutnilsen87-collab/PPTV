"use client"

import Navigation from '@/components/Navigation';
import { 
  PlayIcon, 
  EyeIcon, 
  HeartIcon,
  SignalIcon,
  UsersIcon,
  ClockIcon,
  ChatBubbleLeftIcon,
  FireIcon,
  StarIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function LivePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('viewers');

  const categories = [
    { id: 'all', name: 'All Streams', count: 8 },
    { id: 'tournaments', name: 'Tournaments', count: 3 },
    { id: 'cash-games', name: 'Cash Games', count: 2 },
    { id: 'training', name: 'Training', count: 2 },
    { id: 'entertainment', name: 'Entertainment', count: 1 }
  ];

  const liveStreams = [
    {
      id: 1,
      title: "WSOP Main Event Final Table - Day 3",
      viewers: "12.5K",
      duration: "LIVE",
      author: "PokerStars",
      thumbnail: "/images/thumbnails/wsop-main.jpeg",
      isLive: true,
      category: "tournaments",
      quality: "1080p",
      language: "English",
      stakes: "$10,000",
      chatActive: true,
      chatUsers: "2.1K",
      tags: ["WSOP", "Final Table", "High Stakes"]
    },
    {
      id: 2,
      title: "High Stakes Cash Game - $100/$200 NLH",
      viewers: "8.7K",
      duration: "LIVE",
      author: "LivePoker Pro",
      thumbnail: "/images/thumbnails/high-stakes.jpeg",
      isLive: true,
      category: "cash-games",
      quality: "720p",
      language: "English",
      stakes: "$100/$200",
      chatActive: true,
      chatUsers: "1.5K",
      tags: ["Cash Game", "High Stakes", "NLH"]
    },
    {
      id: 3,
      title: "Poker Strategy Masterclass with Daniel Negreanu",
      viewers: "15.2K",
      duration: "LIVE",
      author: "PokerStars Training",
      thumbnail: "/images/thumbnails/strategy.jpeg",
      isLive: true,
      category: "training",
      quality: "1080p",
      language: "English",
      stakes: "Free",
      chatActive: true,
      chatUsers: "3.2K",
      tags: ["Strategy", "Training", "Masterclass"]
    },
    {
      id: 4,
      title: "Amazing Bluff Compilation - Live Reactions",
      viewers: "6.8K",
      duration: "LIVE",
      author: "Poker Entertainment",
      thumbnail: "/images/thumbnails/amazing-bluff.jpeg",
      isLive: true,
      category: "entertainment",
      quality: "720p",
      language: "English",
      stakes: "N/A",
      chatActive: true,
      chatUsers: "1.8K",
      tags: ["Entertainment", "Bluffs", "Reactions"]
    },
    {
      id: 5,
      title: "Best Moments from WSOP 2024",
      viewers: "9.3K",
      duration: "LIVE",
      author: "WSOP Official",
      thumbnail: "/images/thumbnails/best-moments.jpeg",
      isLive: true,
      category: "tournaments",
      quality: "1080p",
      language: "English",
      stakes: "N/A",
      chatActive: true,
      chatUsers: "2.4K",
      tags: ["WSOP", "Highlights", "Best Moments"]
    },
    {
      id: 6,
      title: "Live Stream Strategy Analysis",
      viewers: "4.1K",
      duration: "LIVE",
      author: "Poker Pro Academy",
      thumbnail: "/images/thumbnails/live-stream.jpeg",
      isLive: true,
      category: "training",
      quality: "720p",
      language: "English",
      stakes: "Free",
      chatActive: true,
      chatUsers: "890",
      tags: ["Strategy", "Analysis", "Live"]
    },
    {
      id: 7,
      title: "High Stakes Tournament Qualifier",
      viewers: "7.6K",
      duration: "LIVE",
      author: "PokerStars",
      thumbnail: "/images/thumbnails/video-thumbnail.jpeg",
      isLive: true,
      category: "tournaments",
      quality: "1080p",
      language: "English",
      stakes: "$1,000",
      chatActive: true,
      chatUsers: "1.9K",
      tags: ["Tournament", "Qualifier", "High Stakes"]
    },
    {
      id: 8,
      title: "Cash Game Strategy Session",
      viewers: "3.9K",
      duration: "LIVE",
      author: "Cash Game Pro",
      thumbnail: "/images/thumbnails/strategy.jpeg",
      isLive: true,
      category: "cash-games",
      quality: "720p",
      language: "English",
      stakes: "$25/$50",
      chatActive: true,
      chatUsers: "750",
      tags: ["Cash Game", "Strategy", "NLH"]
    }
  ];

  const filteredStreams = liveStreams.filter(stream => 
    selectedCategory === 'all' || stream.category === selectedCategory
  );

  const sortedStreams = [...filteredStreams].sort((a, b) => {
    if (sortBy === 'viewers') {
      return parseInt(b.viewers.replace('K', '000')) - parseInt(a.viewers.replace('K', '000'));
    }
    if (sortBy === 'quality') {
      return b.quality.localeCompare(a.quality);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-poker-950">
      <Navigation />
      
      <main className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-h1 font-bold text-poker-100 mb-2">Live Streams</h1>
              <p className="text-poker-300 text-body-lg">
                Watch live poker action from around the world
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-poker-900/50 px-3 py-2 rounded-lg">
                <SignalIcon className="w-4 h-4 text-red-400" />
                <span className="text-red-400 text-sm font-medium">
                  {liveStreams.length} Live Now
                </span>
              </div>
            </div>
          </div>

          {/* Filters and Categories */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-accent-green text-poker-950'
                      : 'bg-poker-900/50 text-poker-300 hover:bg-poker-800/50'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-3">
              <AdjustmentsHorizontalIcon className="w-5 h-5 text-poker-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-poker-900/50 text-poker-100 px-3 py-2 rounded-lg text-sm border border-poker-700 focus:border-accent-green focus:outline-none"
              >
                <option value="viewers">Sort by Viewers</option>
                <option value="quality">Sort by Quality</option>
              </select>
            </div>
          </div>
        </div>

        {/* Live Streams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedStreams.map((stream) => (
            <div key={stream.id} className="video-card group bg-poker-900/30 rounded-xl overflow-hidden border border-poker-800/50 hover:border-accent-green/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent-green/10">
              <div className="video-thumbnail relative">
                <img 
                  src={stream.thumbnail} 
                  alt={stream.title}
                  className="w-full h-48 object-cover"
                />
                <div className="video-overlay" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-16 h-16 bg-accent-green/90 rounded-full flex items-center justify-center hover:bg-accent-green transition-colors shadow-lg">
                    <PlayIcon className="w-8 h-8 text-white" />
                  </button>
                </div>
                
                {/* Live Badge */}
                <div className="absolute top-3 left-3">
                  <div className="badge badge-primary flex items-center space-x-1 bg-red-500 text-white px-2 py-1">
                    <SignalIcon className="w-3 h-3" />
                    <span className="text-xs font-bold">LIVE</span>
                  </div>
                </div>
                
                {/* Quality Badge */}
                <div className="absolute top-3 right-3">
                  <div className="bg-poker-950/90 px-2 py-1 rounded text-xs text-poker-100 font-medium">
                    {stream.quality}
                  </div>
                </div>
                
                {/* Viewers Count */}
                <div className="absolute bottom-3 right-3">
                  <div className="flex items-center space-x-1 bg-poker-950/90 px-2 py-1 rounded text-xs text-poker-100">
                    <EyeIcon className="w-3 h-3" />
                    <span>{stream.viewers}</span>
                  </div>
                </div>

                {/* Stakes Badge */}
                {stream.stakes !== "N/A" && stream.stakes !== "Free" && (
                  <div className="absolute bottom-3 left-3">
                    <div className="bg-accent-green/90 text-poker-950 px-2 py-1 rounded text-xs font-bold">
                      {stream.stakes}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-poker-100 mb-2 group-hover:text-accent-green transition-colors line-clamp-2">
                  {stream.title}
                </h3>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {stream.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="text-xs bg-poker-800/50 text-poker-300 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-poker-400 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-poker-800/50 rounded-full flex items-center justify-center border border-accent-green/30">
                      <span className="text-xs text-accent-green font-medium">P</span>
                    </div>
                    <span>{stream.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center">
                      <UsersIcon className="w-4 h-4 mr-1" />
                      {stream.viewers}
                    </span>
                  </div>
                </div>

                {/* Chat Preview */}
                {stream.chatActive && (
                  <div className="flex items-center justify-between text-xs text-poker-400 bg-poker-800/30 p-2 rounded">
                    <div className="flex items-center space-x-1">
                      <ChatBubbleLeftIcon className="w-3 h-3" />
                      <span>Chat Active</span>
                    </div>
                    <span>{stream.chatUsers} users</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16">
          <h2 className="text-h2 font-bold text-poker-100 mb-8">Upcoming Streams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "WSOP Circuit Event",
                time: "Tomorrow at 8 PM EST",
                description: "Join us for an exciting WSOP Circuit event with top players competing for the championship and a chance to qualify for the main event.",
                image: "/images/thumbnails/wsop-main.jpeg"
              },
              {
                title: "High Stakes Training Session",
                time: "Friday at 7 PM EST",
                description: "Learn advanced strategies from professional players in this exclusive high stakes training session.",
                image: "/images/thumbnails/strategy.jpeg"
              },
              {
                title: "Poker Entertainment Show",
                time: "Saturday at 9 PM EST",
                description: "A fun-filled evening of poker entertainment, bluffs, and amazing plays from the community.",
                image: "/images/thumbnails/amazing-bluff.jpeg"
              }
            ].map((stream, index) => (
              <div key={index} className="card p-6 bg-poker-900/30 border border-poker-800/50 hover:border-accent-green/30 transition-all duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={stream.image} 
                    alt={stream.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-poker-100">{stream.title}</h3>
                    <p className="text-sm text-poker-400">{stream.time}</p>
                  </div>
                </div>
                <p className="text-poker-300 mb-4 text-sm">
                  {stream.description}
                </p>
                <button className="btn-outline w-full hover:bg-accent-green hover:text-poker-950 transition-colors">
                  Set Reminder
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

