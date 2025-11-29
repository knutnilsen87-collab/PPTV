'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { 
  HandThumbUpIcon, 
  HandThumbDownIcon, 
  ShareIcon, 
  BookmarkIcon,
  EllipsisHorizontalIcon,
  ChatBubbleLeftIcon,
  EyeIcon,
  ClockIcon,
  PlayIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

export default function VideoPage() {
  const [activeFilter, setActiveFilter] = useState('Latest');

  const filters = ['Latest', 'Most Viewed', 'Duration', 'Category'];
  const categories = ['All', 'WSOP', 'Cash Games', 'Tournaments', 'Strategy', 'Live Streams'];

  return (
    <div className="min-h-screen bg-poker-950">
      <Navigation />
      
      <main className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Video Player */}
            <section className="mb-8">
              <div className="aspect-video bg-poker-800 rounded-xl overflow-hidden mb-6">
                <video 
                  controls 
                  className="w-full h-full"
                  poster="/images/video-thumbnail.jpeg"
                >
                  <source src="/videos/sample.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video Info */}
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-poker-100 mb-3">WSOP Main Event Final Table - Epic Bluff</h1>
                    <div className="flex items-center space-x-6 text-sm text-poker-400">
                      <span className="flex items-center">
                        <EyeIcon className="w-4 h-4 mr-2" />
                        245.3K views
                      </span>
                      <span className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-2" />
                        2 days ago
                      </span>
                      <span className="badge badge-primary">WSOP</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-poker-800/50 rounded-lg hover:bg-poker-700/50 transition-colors">
                      <HandThumbUpIcon className="w-5 h-5" />
                      <span>24.5K</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-poker-800/50 rounded-lg hover:bg-poker-700/50 transition-colors">
                      <HandThumbDownIcon className="w-5 h-5" />
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-poker-800/50 rounded-lg hover:bg-poker-700/50 transition-colors">
                      <ShareIcon className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-poker-800/50 rounded-lg hover:bg-poker-700/50 transition-colors">
                      <BookmarkIcon className="w-5 h-5" />
                      <span>Save</span>
                    </button>
                    <button className="p-2 bg-poker-800/50 rounded-lg hover:bg-poker-700/50 transition-colors">
                      <EllipsisHorizontalIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Creator Info */}
                <div className="flex items-center justify-between p-6 glass rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-accent-green/30">
                      <img 
                        src="/images/creator-avatar.jpeg" 
                        alt="PokerPro Channel Avatar" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-poker-100">PokerPro Channel</h3>
                      <p className="text-sm text-poker-400">1.2M subscribers</p>
                    </div>
                  </div>
                  <button className="btn-primary">
                    Subscribe
                  </button>
                </div>

                {/* Video Description */}
                <div className="p-6 glass rounded-xl">
                  <p className="text-poker-300 mb-4 leading-relaxed">
                    An incredible bluff from the 2023 WSOP Main Event final table. Watch as our player makes a bold move against one of the best in the game. This hand demonstrates advanced poker psychology and strategic thinking.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge badge-secondary">#WSOP</span>
                    <span className="badge badge-secondary">#Poker</span>
                    <span className="badge badge-secondary">#Bluff</span>
                    <span className="badge badge-secondary">#MainEvent</span>
                    <span className="badge badge-secondary">#Strategy</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Comments Section */}
            <section className="space-y-6">
              <div className="flex items-center space-x-4">
                <ChatBubbleLeftIcon className="w-6 h-6 text-poker-100" />
                <h3 className="text-xl font-bold text-poker-100">Comments (1.2K)</h3>
              </div>

              <div className="space-y-6">
                <div className="flex space-x-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-accent-green/30 flex-shrink-0">
                    <img 
                      src="/images/user1-avatar.jpeg" 
                      alt="User Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <textarea 
                      className="w-full p-4 bg-poker-800/50 rounded-xl text-poker-100 border border-poker-700 focus:border-accent-green focus:outline-none resize-none"
                      placeholder="Add a comment..."
                      rows={3}
                    />
                    <div className="flex justify-end mt-3">
                      <button className="btn-primary">
                        Comment
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sample Comments */}
                <div className="space-y-6">
                  <div className="flex space-x-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-accent-green/30 flex-shrink-0">
                      <img 
                        src="/images/creator-avatar.jpeg" 
                        alt="PokerFan123 Avatar" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-poker-100">PokerFan123</h4>
                        <span className="text-sm text-poker-400">2 days ago</span>
                      </div>
                      <p className="text-poker-300 mb-3">This bluff was absolutely insane! The way they read their opponent was masterful. The timing and sizing were perfect.</p>
                      <div className="flex items-center space-x-4 text-sm text-poker-400">
                        <button className="flex items-center space-x-1 hover:text-accent-green transition-colors">
                          <HandThumbUpIcon className="w-4 h-4" />
                          <span>245</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-accent-green transition-colors">
                          <HandThumbDownIcon className="w-4 h-4" />
                        </button>
                        <button className="hover:text-accent-green transition-colors">Reply</button>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-accent-green/30 flex-shrink-0">
                      <img 
                        src="/images/user1-avatar.jpeg" 
                        alt="StrategyGuru Avatar" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-poker-100">StrategyGuru</h4>
                        <span className="text-sm text-poker-400">1 day ago</span>
                      </div>
                      <p className="text-poker-300 mb-3">Great analysis! The key insight here is the player's understanding of their opponent's range. Notice how they sized the bet to get maximum value.</p>
                      <div className="flex items-center space-x-4 text-sm text-poker-400">
                        <button className="flex items-center space-x-1 hover:text-accent-green transition-colors">
                          <HandThumbUpIcon className="w-4 h-4" />
                          <span>89</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-accent-green transition-colors">
                          <HandThumbDownIcon className="w-4 h-4" />
                        </button>
                        <button className="hover:text-accent-green transition-colors">Reply</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Filters */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-poker-100">Related Videos</h3>
                <button className="text-poker-400 hover:text-poker-100 transition-colors">
                  <FunnelIcon className="w-5 h-5" />
                </button>
              </div>
              
              {/* Category Filters */}
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors hover:bg-poker-800/50"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Related Videos */}
            <div className="space-y-4">
              {[
                {
                  thumbnail: '/images/thumbnails/amazing-bluff.jpeg',
                  title: 'Amazing Bluff That Won the Tournament',
                  channel: 'PokerPro Channel',
                  views: '156K views',
                  time: '2 days ago',
                  duration: '8:42'
                },
                {
                  thumbnail: '/images/thumbnails/best-moments.jpeg',
                  title: 'Best Poker Moments of 2024',
                  channel: 'WSOP Highlights',
                  views: '89K views',
                  time: '1 week ago',
                  duration: '15:23'
                },
                {
                  thumbnail: '/images/thumbnails/high-stakes.jpeg',
                  title: 'High Stakes Cash Game Action',
                  channel: 'Poker Elite',
                  views: '234K views',
                  time: '3 days ago',
                  duration: '12:15'
                },
                {
                  thumbnail: '/images/thumbnails/live-stream.jpeg',
                  title: 'Live Stream: Final Table Action',
                  channel: 'Live Poker TV',
                  views: '67K views',
                  time: '5 hours ago',
                  duration: '45:30'
                },
                {
                  thumbnail: '/images/thumbnails/strategy.jpeg',
                  title: 'Advanced Poker Strategy Guide',
                  channel: 'Poker Academy',
                  views: '198K views',
                  time: '4 days ago',
                  duration: '22:18'
                }
              ].map((video, index) => (
                <div key={index} className="flex space-x-3 group cursor-pointer">
                  <div className="relative w-40 h-24 flex-shrink-0">
                    <div className="w-full h-full bg-poker-800 rounded-lg overflow-hidden">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 bg-accent-green/90 rounded-full flex items-center justify-center">
                        <PlayIcon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <span className="absolute bottom-1 right-1 bg-poker-950/90 px-1 text-xs rounded text-poker-100">
                      {video.duration}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-poker-100 line-clamp-2 group-hover:text-accent-green transition-colors">
                      {video.title}
                    </h4>
                    <p className="text-sm text-poker-400">{video.channel}</p>
                    <p className="text-sm text-poker-400">{video.views} â€¢ {video.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
} 
