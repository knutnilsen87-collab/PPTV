'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { useRouter } from 'next/navigation';
import { 
  UsersIcon, 
  VideoCameraIcon, 
  DocumentTextIcon, 
  Cog6ToothIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  PlayIcon,
  ChatBubbleLeftRightIcon,
  UserPlusIcon,
  ShieldCheckIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  FlagIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [lastUpdated, setLastUpdated] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 1234,
    totalVideos: 567,
    totalPosts: 890,
    activeUsers: 456
  });

  useEffect(() => {
    try {
      // Simple authentication check
      const userRole = localStorage.getItem('userRole');
      if (userRole !== 'admin') {
        router.push('/login');
        return;
      }
      
      // Set last updated time
      setLastUpdated(new Date().toLocaleString());
      setIsLoading(false);
    } catch (error) {
      console.warn('localStorage not available:', error);
      router.push('/login');
    }
  }, [router]);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'users', name: 'User Management' },
    { id: 'videos', name: 'Video Management' },
    { id: 'content', name: 'Content Moderation' },
    { id: 'settings', name: 'Settings' }
  ];

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-poker-950 flex items-center justify-center">
        <div className="text-accent-poker text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-poker-950">
      <Navigation />
      
      <main className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-accent-poker [text-shadow:0_0_8px_theme(colors.accent-poker)]">
            Admin Dashboard
          </h1>
          <div className="text-poker-400">
            Last updated: {lastUpdated}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-poker-800/50 backdrop-blur-sm rounded-xl p-6 border border-poker-700/50">
            <div className="text-poker-400 mb-2">Total Users</div>
            <div className="text-3xl font-bold text-accent-green">{stats.totalUsers}</div>
            <div className="text-sm text-accent-green mt-2">â†‘ 12% from last month</div>
          </div>
          <div className="bg-poker-800/50 backdrop-blur-sm rounded-xl p-6 border border-poker-700/50">
            <div className="text-poker-400 mb-2">Total Videos</div>
            <div className="text-3xl font-bold text-accent-green">{stats.totalVideos}</div>
            <div className="text-sm text-accent-green mt-2">â†‘ 8% from last month</div>
          </div>
          <div className="bg-poker-800/50 backdrop-blur-sm rounded-xl p-6 border border-poker-700/50">
            <div className="text-poker-400 mb-2">Total Posts</div>
            <div className="text-3xl font-bold text-accent-green">{stats.totalPosts}</div>
            <div className="text-sm text-accent-green mt-2">â†‘ 15% from last month</div>
          </div>
          <div className="bg-poker-800/50 backdrop-blur-sm rounded-xl p-6 border border-poker-700/50">
            <div className="text-poker-400 mb-2">Active Users</div>
            <div className="text-3xl font-bold text-accent-green">{stats.activeUsers}</div>
            <div className="text-sm text-accent-green mt-2">â†‘ 5% from last month</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-poker-700 mb-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-accent-poker text-accent-poker'
                    : 'border-transparent text-poker-400 hover:text-poker-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-poker-800/50 backdrop-blur-sm rounded-xl p-6 border border-poker-700/50">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold text-accent-poker mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {[
                      { type: 'video', user: 'John Doe', action: 'uploaded', content: 'Poker Hand #123', time: '2 hours ago', status: 'pending' },
                      { type: 'comment', user: 'Sarah Smith', action: 'reported', content: 'Inappropriate comment', time: '3 hours ago', status: 'urgent' },
                      { type: 'user', user: 'Mike Johnson', action: 'registered', content: 'New user account', time: '4 hours ago', status: 'new' },
                      { type: 'video', user: 'Emma Wilson', action: 'flagged', content: 'Poker Hand #456', time: '5 hours ago', status: 'review' },
                      { type: 'system', user: 'System', action: 'backup', content: 'Daily backup completed', time: '6 hours ago', status: 'success' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-poker-900/50 rounded-lg hover:bg-poker-900/70 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.type === 'video' ? 'bg-accent-blue/20' :
                            activity.type === 'comment' ? 'bg-accent-purple/20' :
                            activity.type === 'user' ? 'bg-accent-green/20' :
                            'bg-poker-700'
                          }`}>
                            {activity.type === 'video' ? <PlayIcon className="w-5 h-5 text-accent-blue" /> :
                             activity.type === 'comment' ? <ChatBubbleLeftRightIcon className="w-5 h-5 text-accent-purple" /> :
                             activity.type === 'user' ? <UserPlusIcon className="w-5 h-5 text-accent-green" /> :
                             <Cog6ToothIcon className="w-5 h-5 text-poker-300" />}
                          </div>
                          <div>
                            <div className="font-medium text-poker-100">
                              <span className="text-poker-400">{activity.user}</span> {activity.action} <span className="text-accent-green">{activity.content}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <span className="text-poker-400">{activity.time}</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                activity.status === 'pending' ? 'bg-accent-poker/20 text-accent-poker' :
                                activity.status === 'urgent' ? 'bg-red-900/50 text-red-300' :
                                activity.status === 'new' ? 'bg-accent-green/20 text-accent-green' :
                                activity.status === 'review' ? 'bg-accent-poker/20 text-accent-poker' :
                                'bg-accent-blue/20 text-accent-blue'
                              }`}>
                                {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button className="text-poker-400 hover:text-poker-100">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-accent-poker mb-4">System Health</h2>
                  <div className="space-y-4">
                    {[
                      { name: 'Server Load', value: 45, status: 'healthy', trend: 'stable' },
                      { name: 'Database Performance', value: 92, status: 'excellent', trend: 'up' },
                      { name: 'Storage Usage', value: 78, status: 'warning', trend: 'up' },
                      { name: 'API Response Time', value: 120, status: 'healthy', trend: 'down' }
                    ].map((metric, index) => (
                      <div key={index} className="bg-poker-900/50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-poker-300">{metric.name}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            metric.status === 'healthy' ? 'bg-accent-green/20 text-accent-green' :
                            metric.status === 'excellent' ? 'bg-accent-blue/20 text-accent-blue' :
                            'bg-accent-poker/20 text-accent-poker'
                          }`}>
                            {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
                          </span>
                        </div>
                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block text-accent-green">
                                {metric.value}{metric.name === 'API Response Time' ? 'ms' : '%'}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className={`text-xs font-semibold inline-block ${
                                metric.trend === 'up' ? 'text-accent-green' :
                                metric.trend === 'down' ? 'text-red-400' :
                                'text-poker-400'
                              }`}>
                                {metric.trend === 'up' ? 'â†‘' : metric.trend === 'down' ? 'â†“' : 'â†’'}
                              </span>
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-poker-700">
                            <div
                              style={{ width: `${metric.value}%` }}
                              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                                metric.status === 'healthy' ? 'bg-accent-green' :
                                metric.status === 'excellent' ? 'bg-accent-blue' :
                                'bg-accent-poker'
                              }`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-accent-poker mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: 'Approve Videos', count: 5, icon: PlayIcon, color: 'accent-blue' },
                    { name: 'Review Reports', count: 3, icon: ExclamationTriangleIcon, color: 'red' },
                    { name: 'New Users', count: 12, icon: UsersIcon, color: 'accent-green' },
                    { name: 'System Updates', count: 2, icon: Cog6ToothIcon, color: 'accent-purple' }
                  ].map((action, index) => {
                    const IconComponent = action.icon;
                    return (
                      <button
                        key={index}
                        className="bg-poker-900/50 rounded-lg p-4 hover:bg-poker-900/70 transition-colors text-left"
                      >
                                                <div className="flex items-center justify-between mb-2">
                          <IconComponent className="w-6 h-6 text-accent-poker" />
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            action.color === 'accent-blue' ? 'bg-accent-blue/20 text-accent-blue' :
                            action.color === 'red' ? 'bg-red-900/50 text-red-300' :
                            action.color === 'accent-green' ? 'bg-accent-green/20 text-accent-green' :
                            'bg-accent-purple/20 text-accent-purple'
                          }`}>
                            {action.count} pending
                          </span>
                        </div>
                        <div className="text-poker-100 font-medium">{action.name}</div>
                      </button>
                    );
                  })}
                  </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-accent-poker">User Management</h2>
                <button className="btn-primary px-4 py-2 text-sm flex items-center">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add New User
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-poker-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-poker-400 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-poker-400 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-poker-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-poker-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-poker-700">
                    {[1, 2, 3, 4, 5].map((user) => (
                      <tr key={user}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-poker-800/50 rounded-full flex items-center justify-center border border-accent-green/50 mr-3">
                              <UsersIcon className="w-5 h-5 text-accent-green" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-poker-100">User {user}</div>
                              <div className="text-sm text-poker-400">user{user}@example.com</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-poker-300">
                          {user === 1 ? 'Admin' : 'User'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-accent-green/20 text-accent-green">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-poker-300">
                          <button className="text-accent-green hover:text-green-400 mr-3 flex items-center">
                            <PencilIcon className="w-4 h-4 mr-1" />
                            Edit
                          </button>
                          <button className="text-accent-green hover:text-green-400 flex items-center">
                            <TrashIcon className="w-4 h-4 mr-1" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-accent-poker">Video Management</h2>
                <button className="btn-primary px-4 py-2 text-sm flex items-center">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Upload Video
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((video) => (
                  <div key={video} className="bg-poker-900/50 rounded-lg overflow-hidden">
                    <div className="aspect-video bg-poker-800 relative">
                      <div className="absolute top-2 right-2">
                        <div className="bg-black/50 rounded-full p-1">
                          <PlayIcon className="w-5 h-5 text-accent-poker" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-poker-100 mb-2">Poker Hand #{video}</h3>
                      <p className="text-sm text-poker-400 mb-4">Uploaded by User {video}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-poker-400">2 hours ago</span>
                        <div className="space-x-2">
                          <button className="text-accent-green hover:text-green-400 text-sm flex items-center">
                            <PencilIcon className="w-3 h-3 mr-1" />
                            Edit
                          </button>
                          <button className="text-accent-green hover:text-green-400 text-sm flex items-center">
                            <TrashIcon className="w-3 h-3 mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-accent-poker mb-4">Content Moderation</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((report) => (
                  <div key={report} className="bg-poker-900/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-poker-100">Reported Content #{report}</h3>
                        <p className="text-sm text-poker-400">Reported by User {report}</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-900/50 text-red-300">
                        Pending Review
                      </span>
                    </div>
                    <p className="text-poker-300 mb-4">
                      This content has been reported for inappropriate behavior. Please review and take appropriate action.
                    </p>
                    <div className="flex space-x-4">
                      <button className="btn-primary px-4 py-2 text-sm">Review</button>
                      <button className="px-4 py-2 text-sm text-poker-300 hover:text-poker-100 bg-poker-700 rounded-lg">
                        Dismiss
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'moderation' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-poker-800/50 backdrop-blur-sm rounded-xl p-6 border border-poker-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-accent-poker">Pending Reports</h4>
                    <span className="px-3 py-1 rounded-full text-sm bg-red-900/50 text-red-300">12 New</span>
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3].map((report) => (
                      <div key={report} className="bg-poker-900/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-poker-800/50 rounded-full flex items-center justify-center border border-accent-green/50">
                              <UsersIcon className="w-4 h-4 text-accent-green" />
                            </div>
                            <span className="text-poker-100">User {report}</span>
                          </div>
                          <span className="text-sm text-poker-400">2h ago</span>
                        </div>
                        <p className="text-poker-300 text-sm mb-2">Reported for inappropriate content in video #{report}</p>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 rounded-lg bg-red-900/50 text-red-300 text-sm hover:bg-red-900/70">Review</button>
                          <button className="px-3 py-1 rounded-lg bg-poker-700/50 text-poker-300 text-sm hover:bg-poker-700/70">Dismiss</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-poker-800/50 backdrop-blur-sm rounded-xl p-6 border border-poker-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-accent-poker">Flagged Content</h4>
                    <span className="px-3 py-1 rounded-full text-sm bg-accent-poker/20 text-accent-poker">5 Items</span>
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="bg-poker-900/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <FlagIcon className="w-5 h-5 text-accent-poker" />
                            <span className="text-poker-100">Video #{item}</span>
                          </div>
                          <span className="text-sm text-poker-400">3 flags</span>
                        </div>
                        <p className="text-poker-300 text-sm mb-2">Multiple reports of inappropriate content</p>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 rounded-lg bg-accent-poker/20 text-accent-poker text-sm hover:bg-accent-poker/30">Review</button>
                          <button className="px-3 py-1 rounded-lg bg-poker-700/50 text-poker-300 text-sm hover:bg-poker-700/70">Ignore</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-poker-800/50 backdrop-blur-sm rounded-xl p-6 border border-poker-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-accent-poker">Moderation Stats</h4>
                    <span className="text-sm text-poker-400">Last 7 days</span>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-poker-900/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-poker-300">Total Reports</span>
                        <span className="text-poker-100 font-medium">45</span>
                      </div>
                      <div className="w-full bg-poker-700 rounded-full h-2">
                        <div className="bg-accent-green h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div className="bg-poker-900/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-poker-300">Resolved</span>
                        <span className="text-poker-100 font-medium">32</span>
                      </div>
                      <div className="w-full bg-poker-700 rounded-full h-2">
                        <div className="bg-accent-green h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    <div className="bg-poker-900/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-poker-300">Pending Review</span>
                        <span className="text-poker-100 font-medium">13</span>
                      </div>
                      <div className="w-full bg-poker-700 rounded-full h-2">
                        <div className="bg-accent-poker h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-poker-800/50 backdrop-blur-sm rounded-xl p-6 border border-poker-700/50">
                <h4 className="text-lg font-semibold text-accent-poker mb-4">Moderation Rules</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircleIcon className="w-5 h-5 text-accent-green mt-1" />
                      <div>
                        <h5 className="text-poker-100 font-medium">Content Guidelines</h5>
                        <p className="text-poker-300 text-sm">All content must comply with our community guidelines and terms of service.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircleIcon className="w-5 h-5 text-accent-green mt-1" />
                      <div>
                        <h5 className="text-poker-100 font-medium">User Behavior</h5>
                        <p className="text-poker-300 text-sm">Users must maintain respectful and professional conduct in all interactions.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircleIcon className="w-5 h-5 text-accent-green mt-1" />
                      <div>
                        <h5 className="text-poker-100 font-medium">Copyright</h5>
                        <p className="text-poker-300 text-sm">All content must respect intellectual property rights and copyright laws.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircleIcon className="w-5 h-5 text-accent-green mt-1" />
                      <div>
                        <h5 className="text-poker-100 font-medium">Spam Prevention</h5>
                        <p className="text-poker-300 text-sm">No spam, self-promotion, or excessive posting of similar content.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-poker-800/50 backdrop-blur-sm rounded-xl p-6 border border-poker-700/50">
                  <h4 className="text-lg font-semibold text-accent-poker mb-4">Site Configuration</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-poker-300 mb-2">Site Name</label>
                      <input
                        type="text"
                        className="w-full bg-poker-900/50 border border-poker-700 rounded-lg px-4 py-2 text-poker-100 focus:outline-none focus:border-accent-green"
                        defaultValue="ProPokerTV"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-poker-300 mb-2">Site Description</label>
                      <textarea
                        className="w-full bg-poker-900/50 border border-poker-700 rounded-lg px-4 py-2 text-poker-100 focus:outline-none focus:border-accent-green"
                        rows={3}
                        defaultValue="The ultimate platform for poker enthusiasts to watch, share, and discuss the best poker moments."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-poker-300 mb-2">Maintenance Mode</label>
                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 bg-accent-green text-poker-950 rounded-lg hover:bg-green-400 transition-colors">Enable</button>
                        <button className="px-4 py-2 bg-poker-700 text-poker-100 rounded-lg hover:bg-poker-600 transition-colors">Disable</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-poker-800/50 backdrop-blur-sm rounded-xl p-6 border border-poker-700/50">
                  <h4 className="text-lg font-semibold text-accent-poker mb-4">Email Settings</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-poker-300 mb-2">SMTP Server</label>
                      <input
                        type="text"
                        className="w-full bg-poker-900/50 border border-poker-700 rounded-lg px-4 py-2 text-poker-100 focus:outline-none focus:border-accent-green"
                        defaultValue="smtp.example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-poker-300 mb-2">SMTP Port</label>
                      <input
                        type="number"
                        className="w-full bg-poker-900/50 border border-poker-700 rounded-lg px-4 py-2 text-poker-100 focus:outline-none focus:border-accent-green"
                        defaultValue="587"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-poker-300 mb-2">Email Templates</label>
                      <select className="w-full bg-poker-900/50 border border-poker-700 rounded-lg px-4 py-2 text-poker-100 focus:outline-none focus:border-accent-green">
                        <option>Welcome Email</option>
                        <option>Password Reset</option>
                        <option>Notification</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-poker-800/50 backdrop-blur-sm rounded-xl p-6 border border-poker-700/50">
                <h4 className="text-lg font-semibold text-accent-poker mb-4">Security Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-poker-300 mb-2">Two-Factor Authentication</label>
                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 bg-accent-green text-poker-950 rounded-lg hover:bg-green-400 transition-colors">Enable</button>
                        <button className="px-4 py-2 bg-poker-700 text-poker-100 rounded-lg hover:bg-poker-600 transition-colors">Disable</button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-poker-300 mb-2">Session Timeout (minutes)</label>
                      <input
                        type="number"
                        className="w-full bg-poker-900/50 border border-poker-700 rounded-lg px-4 py-2 text-poker-100 focus:outline-none focus:border-accent-green"
                        defaultValue="30"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-poker-300 mb-2">IP Whitelist</label>
                      <textarea
                        className="w-full bg-poker-900/50 border border-poker-700 rounded-lg px-4 py-2 text-poker-100 focus:outline-none focus:border-accent-green"
                        rows={3}
                        placeholder="Enter IP addresses (one per line)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-poker-300 mb-2">Failed Login Attempts</label>
                      <input
                        type="number"
                        className="w-full bg-poker-900/50 border border-poker-700 rounded-lg px-4 py-2 text-poker-100 focus:outline-none focus:border-accent-green"
                        defaultValue="5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 
