'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { 
  PlayIcon, 
  EyeIcon, 
  HeartIcon,
  ScissorsIcon,
  ShareIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

// Clip data with more variety using available images
const allClips = [
  {
    id: 1,
    title: "Amazing Bluff - 15 seconds",
    views: "45.2K",
    likes: 2341,
    duration: "0:15",
    author: "PokerPro",
    thumbnail: "/images/thumbnails/amazing-bluff.jpeg",
    category: "Bluffs"
  },
  {
    id: 2,
    title: "Bad Beat of the Day",
    views: "32.1K",
    likes: 1892,
    duration: "0:23",
    author: "BadBeatTV",
    thumbnail: "/images/thumbnails/best-moments.jpeg",
    category: "Bad Beats"
  },
  {
    id: 3,
    title: "Quick Strategy Tip",
    views: "28.7K",
    likes: 1456,
    duration: "0:18",
    author: "PokerCoach",
    thumbnail: "/images/thumbnails/strategy.jpeg",
    category: "Strategy"
  },
  {
    id: 4,
    title: "WSOP Highlight Reel",
    views: "67.3K",
    likes: 3891,
    duration: "0:45",
    author: "WSOP",
    thumbnail: "/images/thumbnails/wsop-main.jpeg",
    category: "WSOP"
  },
  {
    id: 5,
    title: "Live Stream Moment",
    views: "19.4K",
    likes: 987,
    duration: "0:12",
    author: "LivePoker",
    thumbnail: "/images/thumbnails/live-stream.jpeg",
    category: "Live"
  },
  {
    id: 6,
    title: "Tournament Final Hand",
    views: "41.8K",
    likes: 2234,
    duration: "0:31",
    author: "TournamentTV",
    thumbnail: "/images/thumbnails/high-stakes.jpeg",
    category: "High Stakes"
  },
  {
    id: 7,
    title: "Epic Comeback Story",
    views: "38.9K",
    likes: 2156,
    duration: "0:52",
    author: "ComebackKing",
    thumbnail: "/images/thumbnail-1.jpeg",
    category: "Best Moments"
  },
  {
    id: 8,
    title: "Pro vs Amateur Showdown",
    views: "29.3K",
    likes: 1678,
    duration: "0:28",
    author: "ProPoker",
    thumbnail: "/images/thumbnail-2.jpeg",
    category: "Strategy"
  },
  {
    id: 9,
    title: "Cash Game Drama",
    views: "51.7K",
    likes: 2987,
    duration: "0:39",
    author: "CashGameTV",
    thumbnail: "/images/thumbnail-3.jpeg",
    category: "High Stakes"
  },
  {
    id: 10,
    title: "Poker Psychology Masterclass",
    views: "22.4K",
    likes: 1234,
    duration: "0:21",
    author: "PokerMind",
    thumbnail: "/images/thumbnail-4.jpeg",
    category: "Strategy"
  },
  {
    id: 11,
    title: "Celebrity Poker Night",
    views: "89.2K",
    likes: 4567,
    duration: "0:58",
    author: "CelebPoker",
    thumbnail: "/images/video-thumbnail.jpeg",
    category: "Best Moments"
  },
  {
    id: 12,
    title: "Online Tournament Win",
    views: "34.6K",
    likes: 1890,
    duration: "0:33",
    author: "OnlinePro",
    thumbnail: "/images/thumbnails/video-thumbnail.jpeg",
    category: "Tournaments"
  },
  {
    id: 11,
    title: "Celebrity Poker Night",
    views: "89.2K",
    likes: 4567,
    duration: "0:58",
    author: "CelebPoker",
    thumbnail: "/images/video-thumbnail.jpeg",
    category: "Best Moments"
  },
  {
    id: 12,
    title: "Online Tournament Win",
    views: "34.6K",
    likes: 1890,
    duration: "0:33",
    author: "OnlinePro",
    thumbnail: "/images/thumbnails/video-thumbnail.jpeg",
    category: "Tournaments"
  }
];

// Filter options
const filterOptions = ['All', 'Trending', 'Bluffs', 'Bad Beats', 'Strategy', 'WSOP', 'Live', 'High Stakes', 'Best Moments', 'Tournaments'];

// Clip card component
const ClipCard = ({ clip }: { clip: typeof allClips[0] }) => (
  <div className="video-card group">
    <div className="video-thumbnail">
      <img 
        src={clip.thumbnail} 
        alt={clip.title}
        className="w-full h-full object-cover"
      />
      <div className="video-overlay" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="w-12 h-12 bg-accent-green/90 rounded-full flex items-center justify-center hover:bg-accent-green transition-colors">
          <PlayIcon className="w-6 h-6 text-white" />
        </button>
      </div>
      <div className="duration-chip">
        {clip.duration}
      </div>
      <div className="absolute top-2 left-2">
        <div className="badge badge-primary">
          <ScissorsIcon className="w-3 h-3 mr-1" />
          Clip
        </div>
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-poker-100 mb-2 group-hover:text-accent-green transition-colors line-clamp-2">
        {clip.title}
      </h3>
      <div className="flex items-center justify-between text-sm text-poker-400 mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-poker-800/50 rounded-full flex items-center justify-center border border-accent-green/30">
            <span className="text-xs text-accent-green font-medium">P</span>
          </div>
          <span>{clip.author}</span>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-poker-400">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <EyeIcon className="w-4 h-4 mr-1" />
            {clip.views}
          </span>
          <span className="flex items-center">
            <HeartIcon className="w-4 h-4 mr-1" />
            {clip.likes}
          </span>
        </div>
        <button className="text-poker-400 hover:text-accent-green transition-colors">
          <ShareIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

// Filter button component
const FilterButton = ({ 
  filter, 
  isActive, 
  onClick 
}: { 
  filter: string; 
  isActive: boolean; 
  onClick: () => void; 
}) => (
  <button
    onClick={onClick}
    className={`badge transition-colors ${
      isActive 
        ? 'bg-accent-green text-poker-950 border-accent-green' 
        : 'badge-secondary hover:bg-accent-green/20 hover:text-accent-green hover:border-accent-green/30'
    }`}
  >
    {filter}
  </button>
);

export default function ClipsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [displayedClips, setDisplayedClips] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  // Filter clips based on selected category
  const filteredClips = selectedFilter === 'All' 
    ? allClips 
    : allClips.filter(clip => clip.category === selectedFilter);

  // Get clips to display
  const clipsToShow = filteredClips.slice(0, displayedClips);

  // Handle load more
  const handleLoadMore = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setDisplayedClips(prev => Math.min(prev + 8, filteredClips.length));
    setIsLoading(false);
  };

  // Handle filter change
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setDisplayedClips(8); // Reset to initial count when filter changes
  };

  const hasMoreClips = displayedClips < filteredClips.length;

  return (
    <div className="min-h-screen bg-poker-950">
      <Navigation />
      
      <main className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <ScissorsIcon className="w-8 h-8 text-accent-green" />
            <h1 className="text-h1 font-bold text-poker-100">Poker Clips</h1>
          </div>
          <p className="text-poker-300 text-body-lg">
            Short, shareable moments from the poker world
          </p>
        </div>

        {/* Create Clip CTA */}
        <div className="mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-poker-100 mb-2">Create Your Own Clip</h2>
                <p className="text-poker-300">
                  Cut 15-60 second clips from any video and share with the community
                </p>
              </div>
              <button className="btn-primary flex items-center space-x-2">
                <ScissorsIcon className="w-5 h-5" />
                <span>Create Clip</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filterOptions.map((filter, index) => (
            <FilterButton
              key={`${filter}-${index}`}
              filter={filter}
              isActive={selectedFilter === filter}
              onClick={() => handleFilterChange(filter)}
            />
          ))}
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-poker-300">
            Showing {clipsToShow.length} of {filteredClips.length} clips
            {selectedFilter !== 'All' && ` in ${selectedFilter}`}
          </p>
        </div>

        {/* Clips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {clipsToShow.map((clip, index) => (
            <ClipCard key={`${clip.id}-${index}`} clip={clip} />
          ))}
        </div>

        {/* Load More */}
        {hasMoreClips && (
          <div className="mt-12 text-center">
            <button 
              className="btn-secondary flex items-center space-x-2 mx-auto"
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-poker-400 border-t-transparent rounded-full animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>Load More Clips</span>
                  <span className="text-sm text-poker-400">
                    ({filteredClips.length - displayedClips} remaining)
                  </span>
                </>
              )}
            </button>
          </div>
        )}

        {/* No more clips message */}
        {!hasMoreClips && filteredClips.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-poker-400">
              You've seen all {filteredClips.length} clips in this category!
            </p>
          </div>
        )}

        {/* No clips found message */}
        {filteredClips.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-poker-400">
              No clips found for "{selectedFilter}". Try a different filter!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
