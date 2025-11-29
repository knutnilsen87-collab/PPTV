'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Image from 'next/image';
import { 
  HeartIcon,
  ChatBubbleLeftIcon,
  UsersIcon,
  StarIcon,
  BookmarkIcon,
  ShareIcon,
  ClockIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckBadgeIcon,
  FireIcon,
  ArrowTrendingUpIcon,
  FunnelIcon,
  PlusIcon,
  FlagIcon,
  PhotoIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [dislikedPosts, setDislikedPosts] = useState<Set<number>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(new Set());

  const posts = [
    {
      id: 1,
      title: "Strategy Discussion: Advanced Bluffing Techniques",
      content: "Let's discuss some advanced bluffing techniques that can help improve your game. What are your favorite spots to bluff? I've been working on my bluffing frequency and would love to hear your thoughts on optimal bluffing spots in different positions.",
      author: "PokerPro",
      authorBadge: "Pro",
      authorAvatar: "/images/creator-avatar.jpeg",
      timestamp: "2 hours ago",
      likes: 23,
      dislikes: 2,
      comments: 12,
      tags: ['Bluffing', 'Strategy', 'Advanced'],
      isPinned: true,
      isBestAnswer: false,
      views: 156,
      category: 'strategy'
    },
    {
      id: 2,
      title: "ICM Considerations in Tournament Play",
      content: "How do you adjust your play when ICM pressure is high? Share your experiences and strategies. I'm particularly interested in how you handle bubble situations and final table dynamics.",
      author: "TournamentGuru",
      authorBadge: "Coach",
      authorAvatar: "/images/user1-avatar.jpeg",
      timestamp: "4 hours ago",
      likes: 18,
      dislikes: 1,
      comments: 8,
      tags: ['ICM', 'Tournaments', 'Bubble'],
      isPinned: false,
      isBestAnswer: false,
      views: 89,
      category: 'tournaments'
    },
    {
      id: 3,
      title: "Bankroll Management Best Practices",
      content: "What's your approach to bankroll management? Let's share tips and strategies for sustainable play. I'm looking to improve my bankroll management and would appreciate any advice.",
      author: "BankrollMaster",
      authorBadge: "Pro",
      authorAvatar: "/images/thumbnail-1.jpeg",
      timestamp: "6 hours ago",
      likes: 31,
      dislikes: 0,
      comments: 15,
      tags: ['Bankroll', 'Management', 'Sustainability'],
      isPinned: false,
      isBestAnswer: true,
      views: 234,
      category: 'bankroll'
    },
    {
      id: 4,
      title: "Live vs Online: Key Differences",
      content: "What adjustments do you make when switching between live and online play? I find the transition challenging and would love to hear your strategies for adapting to different environments.",
      author: "LivePlayer",
      authorBadge: "Champion",
      authorAvatar: "/images/thumbnail-2.jpeg",
      timestamp: "8 hours ago",
      likes: 27,
      dislikes: 3,
      comments: 11,
      tags: ['Live Play', 'Online', 'Adaptation'],
      isPinned: false,
      isBestAnswer: false,
      views: 167,
      category: 'strategy'
    },
    {
      id: 5,
      title: "Mental Game: Staying Focused",
      content: "How do you maintain focus during long sessions? Share your mental game strategies. I struggle with maintaining concentration after 4+ hours and need some tips.",
      author: "MindMaster",
      authorBadge: "Coach",
      authorAvatar: "/images/thumbnail-3.jpeg",
      timestamp: "1 day ago",
      likes: 42,
      dislikes: 1,
      comments: 19,
      tags: ['Mental Game', 'Psychology', 'Focus'],
      isPinned: false,
      isBestAnswer: false,
      views: 312,
      category: 'psychology'
    },
    {
      id: 6,
      title: "Hand Analysis: Tough Spot",
      content: "Facing a tough decision in a recent hand. Would love to hear your thoughts on this spot. I was in the BB with AQs facing a 3-bet from the button. What would you do?",
      author: "HandAnalyzer",
      authorBadge: "Pro",
      authorAvatar: "/images/thumbnail-4.jpeg",
      timestamp: "1 day ago",
      likes: 15,
      dislikes: 2,
      comments: 7,
      tags: ['Hand Analysis', 'Strategy', 'Preflop'],
      isPinned: false,
      isBestAnswer: false,
      views: 78,
      category: 'hand-analysis'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', count: 156, icon: ArrowTrendingUpIcon },
    { id: 'strategy', name: 'Strategy', count: 45, icon: StarIcon },
    { id: 'hand-analysis', name: 'Hand Analysis', count: 32, icon: CheckBadgeIcon },
    { id: 'tournaments', name: 'Tournaments', count: 28, icon: FireIcon },
    { id: 'cash-games', name: 'Cash Games', count: 23, icon: UsersIcon },
    { id: 'psychology', name: 'Mental Game', count: 18, icon: StarIcon },
    { id: 'bankroll', name: 'Bankroll', count: 10, icon: CheckBadgeIcon }
  ];

  const sortOptions = [
    { id: 'latest', name: 'Latest', icon: ClockIcon },
    { id: 'trending', name: 'Trending', icon: ArrowTrendingUpIcon },
    { id: 'most-liked', name: 'Most Liked', icon: HeartIcon },
    { id: 'most-commented', name: 'Most Commented', icon: ChatBubbleLeftIcon }
  ];

  const availableTags = ['Strategy', 'Hand Analysis', 'Tournaments', 'Cash Games', 'Mental Game', 'Bankroll', 'WSOP', 'Bluffing', 'ICM', 'Live Play', 'Online'];

  const filteredPosts = posts.filter(post => 
    selectedCategory === 'all' || post.category === selectedCategory
  );

  const getAuthorBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Pro': return 'bg-accent-green/20 text-accent-green border-accent-green/30';
      case 'Coach': return 'bg-accent-blue/20 text-accent-blue border-accent-blue/30';
      case 'Champion': return 'bg-accent-gold/20 text-accent-gold border-accent-gold/30';
      default: return 'bg-poker-700 text-poker-300 border-poker-600';
    }
  };

  const handleLike = (postId: number) => {
    if (likedPosts.has(postId)) {
      setLikedPosts(prev => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    } else {
      setLikedPosts(prev => new Set(prev).add(postId));
      if (dislikedPosts.has(postId)) {
        setDislikedPosts(prev => {
          const newSet = new Set(prev);
          newSet.delete(postId);
          return newSet;
        });
      }
    }
  };

  const handleDislike = (postId: number) => {
    if (dislikedPosts.has(postId)) {
      setDislikedPosts(prev => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    } else {
      setDislikedPosts(prev => new Set(prev).add(postId));
      if (likedPosts.has(postId)) {
        setLikedPosts(prev => {
          const newSet = new Set(prev);
          newSet.delete(postId);
          return newSet;
        });
      }
    }
  };

  const handleBookmark = (postId: number) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleCreatePost = () => {
    if (newPostContent.trim() && selectedTags.length > 0) {
      // Here you would typically send the post to your backend
      console.log('Creating post:', { content: newPostContent, tags: selectedTags });
      setNewPostContent('');
      setSelectedTags([]);
      setShowCreatePost(false);
    }
  };

  const handleCancelPost = () => {
    setNewPostContent('');
    setSelectedTags([]);
    setShowCreatePost(false);
  };

  return (
    <div className="min-h-screen bg-poker-950">
      <Navigation />
      
      <main className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <UsersIcon className="w-8 h-8 text-accent-green" />
                  <h1 className="text-h1 font-bold text-poker-100">Community</h1>
                </div>
                <button 
                  onClick={() => setShowCreatePost(!showCreatePost)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <PlusIcon className="w-5 h-5" />
                  <span>Create Post</span>
                </button>
              </div>
              <p className="text-poker-300 text-body-lg">
                Connect with fellow poker players and share insights
              </p>
            </div>

            {/* Create Post */}
            {showCreatePost && (
              <div className="card p-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent-green/30 flex-shrink-0">
                    <Image 
                      src="/images/creator-avatar.jpeg"
                      alt="Your Avatar"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <textarea 
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="w-full p-4 bg-poker-800/50 rounded-xl text-poker-100 border border-poker-700 focus:border-accent-green focus:outline-none resize-none"
                      placeholder="Start a discussion..."
                      rows={3}
                    />
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex flex-wrap gap-2">
                        {availableTags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleTagToggle(tag)}
                            className={`badge text-xs transition-colors ${
                              selectedTags.includes(tag)
                                ? 'bg-accent-green/20 text-accent-green border-accent-green/30'
                                : 'badge-secondary hover:bg-accent-green/20 hover:text-accent-green hover:border-accent-green/30'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={handleCancelPost}
                          className="btn-outline text-sm"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={handleCreatePost}
                          disabled={!newPostContent.trim() || selectedTags.length === 0}
                          className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Filters and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`badge flex items-center space-x-2 transition-colors ${
                        selectedCategory === category.id 
                          ? 'bg-accent-green/20 text-accent-green border-accent-green/30' 
                          : 'badge-secondary hover:bg-accent-green/20 hover:text-accent-green hover:border-accent-green/30'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{category.name}</span>
                      <span className="text-xs opacity-75">({category.count})</span>
                    </button>
                  );
                })}
              </div>
              
              <div className="flex items-center space-x-2 ml-auto">
                <FunnelIcon className="w-4 h-4 text-poker-400" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-poker-800/50 border border-poker-700 text-poker-100 rounded-lg px-3 py-1 text-sm focus:border-accent-green focus:outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div key={post.id} className={`card p-6 hover-lift transition-all duration-200 ${post.isPinned ? 'ring-2 ring-accent-gold/30' : ''}`}>
                  {post.isPinned && (
                    <div className="flex items-center space-x-2 mb-4">
                      <StarIcon className="w-4 h-4 text-accent-gold" />
                      <span className="text-sm text-accent-gold font-medium">Pinned Post</span>
                    </div>
                  )}
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent-green/30 flex-shrink-0">
                      <Image 
                        src={post.authorAvatar}
                        alt={`${post.author}'s Avatar`}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-poker-100">{post.author}</h3>
                        <span className={`badge text-xs ${getAuthorBadgeColor(post.authorBadge)}`}>
                          {post.authorBadge}
                        </span>
                        <span className="text-sm text-poker-400">â€¢</span>
                        <span className="text-sm text-poker-400">{post.timestamp}</span>
                        {post.isBestAnswer && (
                          <>
                            <span className="text-sm text-poker-400">â€¢</span>
                            <span className="flex items-center space-x-1 text-sm text-accent-gold">
                              <CheckBadgeIcon className="w-4 h-4" />
                              <span>Best Answer</span>
                            </span>
                          </>
                        )}
                      </div>
                      
                      <h4 className="text-lg font-semibold text-poker-100 mb-2">
                        {post.title}
                      </h4>
                      
                      <p className="text-poker-300 mb-4 leading-relaxed">
                        {post.content}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span key={tag} className="badge badge-secondary text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-poker-400">
                          <div className="flex items-center space-x-1">
                            <button 
                              onClick={() => handleLike(post.id)}
                              className={`flex items-center space-x-1 transition-colors ${
                                likedPosts.has(post.id) ? 'text-accent-green' : 'hover:text-accent-green'
                              }`}
                            >
                              <ArrowUpIcon className="w-4 h-4" />
                            </button>
                            <span className="font-medium">{post.likes - post.dislikes + (likedPosts.has(post.id) ? 1 : 0) - (dislikedPosts.has(post.id) ? 1 : 0)}</span>
                            <button 
                              onClick={() => handleDislike(post.id)}
                              className={`flex items-center space-x-1 transition-colors ${
                                dislikedPosts.has(post.id) ? 'text-red-400' : 'hover:text-red-400'
                              }`}
                            >
                              <ArrowDownIcon className="w-4 h-4" />
                            </button>
                          </div>
                          <button className="flex items-center space-x-1 hover:text-accent-green transition-colors">
                            <ChatBubbleLeftIcon className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </button>
                          <span className="flex items-center space-x-1">
                            <UsersIcon className="w-4 h-4" />
                            <span>{post.views}</span>
                          </span>
                          <button 
                            onClick={() => handleBookmark(post.id)}
                            className={`transition-colors ${
                              bookmarkedPosts.has(post.id) ? 'text-accent-green' : 'hover:text-accent-green'
                            }`}
                          >
                            <BookmarkIcon className="w-4 h-4" />
                          </button>
                          <button className="hover:text-accent-green transition-colors">
                            <ShareIcon className="w-4 h-4" />
                          </button>
                          <button className="hover:text-red-400 transition-colors">
                            <FlagIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <button className="btn-secondary">
                Load More Posts
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Quick Stats */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-poker-100 mb-4">Community Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-poker-300">Total Members</span>
                  <span className="text-poker-100 font-semibold">12,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-poker-300">Active Today</span>
                  <span className="text-accent-green font-semibold">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-poker-300">Posts This Week</span>
                  <span className="text-poker-100 font-semibold">456</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-poker-300">New Members</span>
                  <span className="text-accent-blue font-semibold">89</span>
                </div>
              </div>
            </div>

            {/* Top Contributors */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-poker-100 mb-4">Top Contributors</h3>
              <div className="space-y-3">
                {[
                  { name: 'PokerPro', posts: 156, badge: 'Pro', color: 'accent-green', avatar: '/images/creator-avatar.jpeg' },
                  { name: 'StrategyGuru', posts: 134, badge: 'Coach', color: 'accent-blue', avatar: '/images/user1-avatar.jpeg' },
                  { name: 'TournamentKing', posts: 98, badge: 'Champion', color: 'accent-gold', avatar: '/images/thumbnail-1.jpeg' },
                  { name: 'LivePlayer', posts: 87, badge: 'Pro', color: 'accent-green', avatar: '/images/thumbnail-2.jpeg' },
                  { name: 'MindMaster', posts: 76, badge: 'Coach', color: 'accent-blue', avatar: '/images/thumbnail-3.jpeg' }
                ].map((contributor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-accent-green/30">
                        <Image 
                          src={contributor.avatar}
                          alt={`${contributor.name}'s Avatar`}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-poker-100">{contributor.name}</div>
                        <div className="text-xs text-poker-400">{contributor.posts} posts</div>
                      </div>
                    </div>
                    <span className={`badge text-xs ${getAuthorBadgeColor(contributor.badge)}`}>
                      {contributor.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-poker-100 mb-4">Trending Topics</h3>
              <div className="space-y-2">
                {[
                  { tag: 'WSOP', count: 45, trending: true },
                  { tag: 'Bluffing', count: 32, trending: true },
                  { tag: 'ICM', count: 28, trending: false },
                  { tag: 'Bankroll', count: 23, trending: false },
                  { tag: 'Mental Game', count: 19, trending: true }
                ].map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-poker-300 text-sm">#{topic.tag}</span>
                      {topic.trending && (
                        <ArrowTrendingUpIcon className="w-4 h-4 text-accent-green" />
                      )}
                    </div>
                    <span className="text-poker-400 text-sm">{topic.count} posts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-poker-100 mb-4">Community Guidelines</h3>
              <div className="space-y-3 text-sm text-poker-300">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-accent-green rounded-full mt-2 flex-shrink-0" />
                  <span>Be respectful and constructive</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-accent-green rounded-full mt-2 flex-shrink-0" />
                  <span>Share valuable insights and experiences</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-accent-green rounded-full mt-2 flex-shrink-0" />
                  <span>Use appropriate tags for better organization</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-accent-green rounded-full mt-2 flex-shrink-0" />
                  <span>Report inappropriate content</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
} 
