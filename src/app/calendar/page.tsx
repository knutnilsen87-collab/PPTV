'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { 
  CalendarIcon, 
  ClockIcon, 
  UsersIcon, 
  CurrencyDollarIcon,
  MapPinIcon,
  GlobeAltIcon,
  ArrowDownTrayIcon,
  PlusIcon,
  SignalIcon,
  TrophyIcon,
  AcademicCapIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export default function CalendarPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const [userTimezone, setUserTimezone] = useState('UTC');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Auto-detect user timezone and set selected month on client side
  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(timezone);
    setSelectedMonth(new Date());
  }, []);

  const tabs = [
    { id: 'upcoming', name: 'Upcoming Events', count: 12 },
    { id: 'calendar', name: 'Calendar View', count: null },
    { id: 'my-events', name: 'My Events', count: 2 }
  ];

  const filters = [
    { id: 'all', name: 'All Events', icon: CalendarIcon },
    { id: 'live', name: 'Live Streams', icon: SignalIcon },
    { id: 'tournaments', name: 'Tournaments', icon: TrophyIcon },
    { id: 'coaching', name: 'Coaching Sessions', icon: AcademicCapIcon }
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const events = [
    {
      id: 1,
      title: "WSOP Main Event Qualifier",
      date: "2024-03-15T14:00:00",
      duration: "4 hours",
      type: "tournaments",
      status: "upcoming",
      participants: 128,
      prizePool: "$1,000",
      description: "Join us for this exciting qualifier tournament. Top 3 players will win seats to the WSOP Main Event.",
      location: "Online",
      featured: true,
      image: "/images/thumbnails/wsop-main.jpeg"
    },
    {
      id: 2,
      title: "High Stakes Cash Game Live Stream",
      date: "2024-03-16T20:00:00",
      duration: "6 hours",
      type: "live",
      status: "upcoming",
      participants: 45,
      prizePool: "$25,000",
      description: "Watch top professionals battle it out in this high-stakes cash game session.",
      location: "Las Vegas",
      featured: false,
      image: "/images/thumbnails/high-stakes.jpeg"
    },
    {
      id: 3,
      title: "Advanced Strategy Coaching Session",
      date: "2024-03-17T15:00:00",
      duration: "2 hours",
      type: "coaching",
      status: "upcoming",
      participants: 25,
      price: "$50",
      description: "Learn advanced bluffing techniques and range analysis from professional coaches.",
      location: "Online",
      featured: false,
      image: "/images/thumbnails/strategy.jpeg"
    },
    {
      id: 4,
      title: "Weekend Tournament Series",
      date: "2024-03-18T12:00:00",
      duration: "8 hours",
      type: "tournaments",
      status: "upcoming",
      participants: 256,
      prizePool: "$5,000",
      description: "A series of tournaments running throughout the weekend with various buy-ins.",
      location: "Online",
      featured: false,
      image: "/images/thumbnails/best-moments.jpeg"
    },
    {
      id: 5,
      title: "Live Stream: Final Table Action",
      date: "2024-03-19T19:00:00",
      duration: "3 hours",
      type: "live",
      status: "upcoming",
      participants: 12,
      prizePool: "$10,000",
      description: "Watch the final table of our monthly championship tournament.",
      location: "Atlantic City",
      featured: true,
      image: "/images/thumbnails/live-stream.jpeg"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: months[date.getMonth()].substring(0, 3).toUpperCase(),
      fullDate: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZoneName: 'short'
      })
    };
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'live': return SignalIcon;
      case 'tournaments': return TrophyIcon;
      case 'coaching': return AcademicCapIcon;
      default: return CalendarIcon;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'live': return 'bg-accent-green/20 text-accent-green border-accent-green/30';
      case 'tournaments': return 'bg-accent-gold/20 text-accent-gold border-accent-gold/30';
      case 'coaching': return 'bg-accent-blue/20 text-accent-blue border-accent-blue/30';
      default: return 'bg-poker-700 text-poker-300 border-poker-600';
    }
  };

  const exportCalendar = (format: 'ical' | 'google') => {
    // Implementation for calendar export
    console.log(`Exporting calendar in ${format} format`);
  };

  return (
    <div className="min-h-screen bg-poker-950">
      <Navigation />
      
      <main className="container-custom py-8">
        {/* Calendar Header */}
        <div className="glass rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-accent-green to-accent-teal rounded-2xl flex items-center justify-center shadow-2xl shadow-accent-green/20">
                <CalendarIcon className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -inset-4 bg-accent-green/10 rounded-2xl blur-2xl animate-pulse-slow" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-h1 font-bold text-poker-100 mb-2">
                Tournament Calendar
              </h1>
              <p className="text-poker-300 mb-4">
                Stay updated with upcoming poker tournaments, live streams, and coaching sessions. 
                Never miss an opportunity to improve your game.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-poker-400">
                  <GlobeAltIcon className="w-4 h-4" />
                  <span>Timezone: {userTimezone}</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="glass rounded-lg px-4 py-2">
                  <div className="text-sm text-poker-400">Upcoming Events</div>
                  <div className="text-poker-100 font-medium">12</div>
                </div>
                <div className="glass rounded-lg px-4 py-2">
                  <div className="text-sm text-poker-400">Live Streams</div>
                  <div className="text-poker-100 font-medium">3</div>
                </div>
                <div className="glass rounded-lg px-4 py-2">
                  <div className="text-sm text-poker-400">My Registrations</div>
                  <div className="text-poker-100 font-medium">2</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button className="btn-primary flex items-center space-x-2">
                <PlusIcon className="w-5 h-5" />
                <span>Add Event</span>
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={() => exportCalendar('ical')}
                  className="btn-outline flex items-center space-x-2 text-sm"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  <span>iCal</span>
                </button>
                <button 
                  onClick={() => exportCalendar('google')}
                  className="btn-outline flex items-center space-x-2 text-sm"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  <span>Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`badge flex items-center space-x-2 transition-colors ${
                    selectedFilter === filter.id 
                      ? 'bg-accent-green/20 text-accent-green border-accent-green/30' 
                      : 'badge-secondary hover:bg-accent-green/20 hover:text-accent-green hover:border-accent-green/30'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{filter.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-poker-800 mb-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-accent-green text-accent-green'
                    : 'border-transparent text-poker-400 hover:text-poker-300'
                }`}
              >
                {tab.name}
                {tab.count && (
                  <span className="ml-2 bg-poker-700 text-poker-300 px-2 py-0.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {events
              .filter(event => selectedFilter === 'all' || event.type === selectedFilter)
              .map((event) => {
                const formattedDate = formatDate(event.date);
                const EventTypeIcon = getEventTypeIcon(event.type);
                const typeColor = getEventTypeColor(event.type);
                
                                 return (
                   <div key={event.id} className={`card p-6 hover-lift ${event.featured ? 'ring-2 ring-accent-gold/30' : ''}`}>
                     {event.featured && (
                       <div className="flex items-center space-x-2 mb-4">
                         <StarIcon className="w-4 h-4 text-accent-gold" />
                         <span className="text-sm text-accent-gold font-medium">Featured Event</span>
                       </div>
                     )}
                     <div className="flex items-start justify-between mb-4">
                       <div className="flex items-center space-x-4">
                         <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-poker-700">
                           <img 
                             src={event.image} 
                             alt={event.title}
                             className="w-full h-full object-cover"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-poker-950/60 to-transparent" />
                           <div className="absolute inset-0 flex items-center justify-center">
                             <div className="text-center">
                               <div className="text-accent-green font-bold text-lg">{formattedDate.day}</div>
                               <div className="text-xs text-poker-400">{formattedDate.month}</div>
                             </div>
                           </div>
                         </div>
                        <div>
                          <h3 className="text-lg font-semibold text-poker-100 mb-1">{event.title}</h3>
                          <div className="text-sm text-poker-400 mb-2">
                            {formattedDate.fullDate} â€¢ {formattedDate.time}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-poker-400">
                            <span className="flex items-center">
                              <MapPinIcon className="w-4 h-4 mr-1" />
                              {event.location}
                            </span>
                            <span className="flex items-center">
                              <ClockIcon className="w-4 h-4 mr-1" />
                              {event.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={`badge ${typeColor}`}>
                        <EventTypeIcon className="w-4 h-4 mr-1" />
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </div>
                    </div>
                    <p className="text-poker-300 mb-4">
                      {event.description}
                    </p>
                                         <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-6 text-sm text-poker-400">
                         <div className="flex items-center space-x-2">
                           <div className="flex -space-x-2">
                             <img 
                               src="/images/user1-avatar.jpeg" 
                               alt="Participant" 
                               className="w-6 h-6 rounded-full border-2 border-poker-800"
                             />
                             <img 
                               src="/images/creator-avatar.jpeg" 
                               alt="Participant" 
                               className="w-6 h-6 rounded-full border-2 border-poker-800"
                             />
                             <div className="w-6 h-6 rounded-full bg-poker-700 border-2 border-poker-800 flex items-center justify-center text-xs text-poker-300">
                               +{event.participants - 2}
                             </div>
                           </div>
                           <span className="flex items-center">
                             <UsersIcon className="w-4 h-4 mr-1" />
                             {event.participants} registered
                           </span>
                         </div>
                         <span className="flex items-center">
                           {event.prizePool ? (
                             <>
                               <CurrencyDollarIcon className="w-4 h-4 mr-1" />
                               {event.prizePool} prize pool
                             </>
                           ) : (
                             <>
                               <CurrencyDollarIcon className="w-4 h-4 mr-1" />
                               {event.price}
                             </>
                           )}
                         </span>
                       </div>
                       <button className="btn-primary px-6 py-2">
                         {event.type === 'coaching' ? 'Book Session' : 'Register Now'}
                       </button>
                     </div>
                  </div>
                );
              })}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calendar Widget */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-poker-100">Calendar</h3>
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:text-accent-green transition-colors">
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <span className="text-poker-100 text-sm">{months[selectedMonth?.getMonth() || 0]} {selectedMonth?.getFullYear()}</span>
                  <button className="p-1 hover:text-accent-green transition-colors">
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-poker-400 py-2 text-xs font-medium">{day}</div>
                ))}
                {Array.from({ length: 35 }, (_, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-lg text-sm ${
                      i === 15
                        ? 'bg-accent-green text-white'
                        : i > 0 && i < 31
                        ? 'hover:bg-poker-800/50 cursor-pointer text-poker-300'
                        : 'text-poker-600'
                    }`}
                  >
                    {i > 0 && i < 31 ? i : ''}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-poker-100 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-poker-300">Total Events</span>
                  <span className="text-poker-100 font-medium">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-poker-300">My Registrations</span>
                  <span className="text-poker-100 font-medium">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-poker-300">Total Prize Pool</span>
                  <span className="text-accent-gold font-medium">$50,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-poker-300">Live Streams</span>
                  <span className="text-accent-green font-medium">3</span>
                </div>
              </div>
            </div>

                         {/* Featured Event */}
             <div className="card p-6">
               <h3 className="text-lg font-semibold text-poker-100 mb-4">Featured Event</h3>
               <div className="space-y-4">
                 <div className="aspect-video rounded-lg relative overflow-hidden">
                   <img 
                     src="/images/thumbnails/wsop-main.jpeg" 
                     alt="WSOP Main Event"
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-poker-950/60 to-transparent" />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <button className="w-12 h-12 bg-accent-green/90 rounded-full flex items-center justify-center hover:bg-accent-green transition-colors">
                       <TrophyIcon className="w-6 h-6 text-white" />
                     </button>
                   </div>
                   <div className="absolute top-2 left-2">
                     <div className="badge badge-gold">
                       <StarIcon className="w-3 h-3 mr-1" />
                       Featured
                     </div>
                   </div>
                 </div>
                <div>
                  <h4 className="text-poker-100 font-medium mb-2">WSOP Main Event 2024</h4>
                  <p className="text-sm text-poker-300 mb-4">
                    The biggest poker tournament of the year. Don&apos;t miss your chance to become a champion!
                  </p>
                  <button className="w-full btn-primary py-2">Learn More</button>
                </div>
              </div>
            </div>

            {/* Timezone Info */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-poker-100 mb-4">Timezone Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-poker-300 text-sm">Current Timezone</span>
                  <span className="text-poker-100 text-sm font-medium">{userTimezone}</span>
                </div>
                <div className="text-xs text-poker-400">
                  All times are displayed in your local timezone. You can change this in your profile settings.
                </div>
                <button className="w-full btn-outline py-2 text-sm">
                  Change Timezone
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
