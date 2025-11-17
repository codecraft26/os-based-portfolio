'use client';

import { useState, useEffect } from 'react';
import linksData from '@/config/links.json';
import portfolioData from '@/config/portfolio.json';
import { 
  FileText, 
  Wrench, 
  Briefcase, 
  FolderOpen, 
  Trophy, 
  Mail,
  Github,
  Linkedin,
  Globe,
  PenTool,
  Minimize2,
  X,
  Server,
  Code,
  Database,
  Cloud,
  MessageSquare,
  Zap,
  CreditCard,
  Palette,
  Maximize2,
  Minimize,
  Sun,
  Moon,
  Terminal as TerminalIcon,
  Send,
  RefreshCw,
  ArrowLeft,
  Home as HomeIcon,
  Lock
} from 'lucide-react';

export default function Home() {
  const [activeSection, setActiveSection] = useState('about');
  const [isWindowOpen, setIsWindowOpen] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [recentSections, setRecentSections] = useState<string[]>(['about']);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const [windowSize, setWindowSize] = useState({ width: 900, height: 600 });
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{type: 'input' | 'output' | 'error', text: string}>>([
    { type: 'output', text: '🚀 Welcome to Aman\'s Portfolio Terminal!' },
    { type: 'output', text: 'Type /help to see available commands' },
    { type: 'output', text: '' }
  ]);
  const [widgetPosition, setWidgetPosition] = useState({ x: 32, y: typeof window !== 'undefined' ? window.innerHeight - 380 : 400 });
  const [isWidgetDragging, setIsWidgetDragging] = useState(false);
  const [widgetDragStart, setWidgetDragStart] = useState({ x: 0, y: 0 });
  const [widgetSize, setWidgetSize] = useState({ width: 320, height: 200 });
  const [isWidgetResizing, setIsWidgetResizing] = useState(false);
  const [browserUrl, setBrowserUrl] = useState('');
  const [isBrowserOpen, setIsBrowserOpen] = useState(false);
  const [browserPosition, setBrowserPosition] = useState({ x: 0, y: 0 });
  const [isBrowserDragging, setIsBrowserDragging] = useState(false);
  const [browserDragStart, setBrowserDragStart] = useState({ x: 0, y: 0 });
  const [browserSize, setBrowserSize] = useState({ width: 1000, height: 700 });
  const [isBrowserMaximized, setIsBrowserMaximized] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [inputUrl, setInputUrl] = useState('');

  // Generate contribution data for current year
  const generateContributions = () => {
    const contributions = [];
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Calculate weeks from start of year to now
    const startOfYear = new Date(currentYear, 0, 1);
    const weeks = Math.ceil((now.getTime() - startOfYear.getTime()) / (7 * 24 * 60 * 60 * 1000));
    
    for (let week = 0; week < weeks; week++) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        // Random contribution level (0-4) - simulate real activity
        const level = Math.floor(Math.random() * 5);
        weekData.push(level);
      }
      contributions.push(weekData);
    }
    return contributions;
  };

  const contributions = generateContributions();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle window dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return; // Don't drag when maximized
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, isMaximized]);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (!isMaximized) {
      // Reset position when maximizing
      setPosition({ x: 0, y: 0 });
    }
  };

  // Handle window resizing
  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    if (isMaximized) return;
    setIsResizing(true);
    setResizeDirection(direction);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing && !isMaximized) {
        const newSize = { ...windowSize };
        
        if (resizeDirection.includes('e')) {
          newSize.width = Math.max(400, windowSize.width + e.movementX);
        }
        if (resizeDirection.includes('w')) {
          newSize.width = Math.max(400, windowSize.width - e.movementX);
          setPosition(prev => ({ ...prev, x: prev.x + e.movementX }));
        }
        if (resizeDirection.includes('s')) {
          newSize.height = Math.max(300, windowSize.height + e.movementY);
        }
        if (resizeDirection.includes('n')) {
          newSize.height = Math.max(300, windowSize.height - e.movementY);
          setPosition(prev => ({ ...prev, y: prev.y + e.movementY }));
        }
        
        setWindowSize(newSize);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeDirection('');
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizeDirection, windowSize, isMaximized]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setIsWindowOpen(true);
    
    // Update recents
    setRecentSections(prev => {
      const filtered = prev.filter(s => s !== section);
      return [section, ...filtered].slice(0, 4); // Keep max 4 recent items
    });
  };

  // Handle widget dragging
  const handleWidgetMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWidgetDragging(true);
    setWidgetDragStart({
      x: e.clientX - widgetPosition.x,
      y: e.clientY - widgetPosition.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isWidgetDragging) {
        setWidgetPosition({
          x: e.clientX - widgetDragStart.x,
          y: e.clientY - widgetDragStart.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsWidgetDragging(false);
    };

    if (isWidgetDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isWidgetDragging, widgetDragStart]);

  // Handle widget resizing
  const handleWidgetResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWidgetResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isWidgetResizing) {
        setWidgetSize(prev => ({
          width: Math.max(250, prev.width + e.movementX),
          height: Math.max(150, prev.height + e.movementY)
        }));
      }
    };

    const handleMouseUp = () => {
      setIsWidgetResizing(false);
    };

    if (isWidgetResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isWidgetResizing]);

  const getSectionIcon = (section: string) => {
    switch(section) {
      case 'about': return <FileText className="w-5 h-5" />;
      case 'skills': return <Wrench className="w-5 h-5" />;
      case 'experience': return <Briefcase className="w-5 h-5" />;
      case 'projects': return <FolderOpen className="w-5 h-5" />;
      case 'achievements': return <Trophy className="w-5 h-5" />;
      case 'contact': return <Mail className="w-5 h-5" />;
      case 'terminal': return <TerminalIcon className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  // Open in-built browser
  const openBrowser = (url: string) => {
    setInputUrl(url);
    setBrowserUrl(url);
    setIsBrowserOpen(true);
    setIsBrowserMaximized(false);
    setBrowserPosition({ x: 0, y: 0 });
    setIframeError(false);
  };

  const handleUrlSubmit = () => {
    let url = inputUrl.trim();
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    setBrowserUrl(url);
    setIframeError(false);
  };

  // Handle browser dragging
  const handleBrowserMouseDown = (e: React.MouseEvent) => {
    if (isBrowserMaximized) return;
    setIsBrowserDragging(true);
    setBrowserDragStart({
      x: e.clientX - browserPosition.x,
      y: e.clientY - browserPosition.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isBrowserDragging && !isBrowserMaximized) {
        setBrowserPosition({
          x: e.clientX - browserDragStart.x,
          y: e.clientY - browserDragStart.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsBrowserDragging(false);
    };

    if (isBrowserDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isBrowserDragging, browserDragStart, isBrowserMaximized]);

  const handleTerminalCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    const newHistory = [...terminalHistory, { type: 'input' as const, text: `$ ${cmd}` }];
    
    if (command === '/help') {
      newHistory.push(
        { type: 'output', text: '📋 Available Commands:' },
        { type: 'output', text: '/github - Open GitHub profile' },
        { type: 'output', text: '/linkedin - Open LinkedIn profile' },
        { type: 'output', text: '/website - Open personal website' },
        { type: 'output', text: '/blog - Open blog' },
        { type: 'output', text: '/email - Open email client' },
        { type: 'output', text: '/about - View about section' },
        { type: 'output', text: '/skills - View skills' },
        { type: 'output', text: '/projects - View projects' },
        { type: 'output', text: '/clear - Clear terminal' },
        { type: 'output', text: '/help - Show this help' },
        { type: 'output', text: '' }
      );
    } else if (command === '/github') {
      newHistory.push({ type: 'output', text: '🚀 Opening GitHub in browser...' });
      openBrowser(linksData.social.github.url);
    } else if (command === '/linkedin') {
      newHistory.push({ type: 'output', text: '💼 Opening LinkedIn in browser...' });
      openBrowser(linksData.social.linkedin.url);
    } else if (command === '/website') {
      newHistory.push({ type: 'output', text: '🌐 Opening website in browser...' });
      openBrowser(linksData.social.website.url);
    } else if (command === '/blog') {
      newHistory.push({ type: 'output', text: '✍️ Opening blog in browser...' });
      openBrowser(linksData.social.blog.url);
    } else if (command === '/email') {
      newHistory.push({ type: 'output', text: '📧 Opening email client...' });
      window.open(linksData.social.email.url, '_blank');
    } else if (command === '/about') {
      newHistory.push({ type: 'output', text: '📄 Navigating to About section...' });
      handleSectionChange('about');
    } else if (command === '/skills') {
      newHistory.push({ type: 'output', text: '🛠️ Navigating to Skills section...' });
      handleSectionChange('skills');
    } else if (command === '/projects') {
      newHistory.push({ type: 'output', text: '📁 Navigating to Projects section...' });
      handleSectionChange('projects');
    } else if (command === '/clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (command === '') {
      // Empty command, just add blank line
    } else {
      newHistory.push({ 
        type: 'error', 
        text: `❌ Command not found: ${cmd}. Type /help for available commands.` 
      });
    }
    
    newHistory.push({ type: 'output', text: '' });
    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  const skills = portfolioData.skills;
  const projects = linksData.projects;
  const experience = portfolioData.experience;
  const achievements = portfolioData.achievements;
  const learning = portfolioData.learning;
  const quickStats = portfolioData.quickStats;

  return (
    <div className={`h-screen relative overflow-hidden transition-colors duration-700 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900' 
        : 'bg-gradient-to-br from-[#D4C5A9] via-[#C4B59A] to-[#B4A58A]'
    }`}>
      {/* Textured Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
      }}></div>
      
      {/* Animated gradient orbs for dark mode */}
      {isDarkMode && (
        <>
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>
        </>
      )}

      {/* Main Desktop Layout */}
      <div className="h-full relative overflow-hidden">
        {/* Desktop Area - Full Screen */}
        <div className="h-full relative p-8 overflow-hidden">
          
          {/* Theme Toggle - Top Right Corner */}
          <div className="absolute top-8 right-8 z-50 flex flex-col gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`${
                isDarkMode 
                  ? 'bg-gray-800/80 border-gray-600' 
                  : 'bg-white/80 border-gray-300'
              } backdrop-blur-md border-2 rounded-xl p-3 shadow-lg hover:scale-110 transition-all duration-300`}
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
            >
              {isDarkMode ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-gray-700" />
              )}
            </button>

            {/* Analog Clock Widget */}
            <div className={`${
              isDarkMode 
                ? 'bg-gray-800/80 border-gray-600' 
                : 'bg-white/80 border-gray-300'
            } backdrop-blur-md border-2 rounded-xl p-4 shadow-lg transition-colors duration-500`}>
              {/* Analog Clock */}
              <div className="relative w-32 h-32 mx-auto mb-3">
                {/* Clock face */}
                <div className={`absolute inset-0 rounded-full shadow-inner transition-colors duration-500 ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-gray-700 to-gray-800 border-4 border-gray-400'
                    : 'bg-gradient-to-br from-white to-gray-100 border-4 border-gray-800'
                }`}>
                  {/* Clock numbers */}
                  {[...Array(12)].map((_, i) => {
                    const angle = (i * 30 - 90) * (Math.PI / 180);
                    const x = 50 + 38 * Math.cos(angle);
                    const y = 50 + 38 * Math.sin(angle);
                    return (
                      <div
                        key={i}
                        className={`absolute text-xs font-bold transition-colors duration-500 ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        {i === 0 ? 12 : i}
                      </div>
                    );
                  })}
                  
                  {/* Center dot */}
                  <div className={`absolute top-1/2 left-1/2 w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-md transition-colors duration-500 ${
                    isDarkMode ? 'bg-gray-200' : 'bg-gray-800'
                  }`}></div>
                  
                  {/* Hour hand */}
                  <div
                    className={`absolute top-1/2 left-1/2 origin-bottom rounded-full shadow-md transition-colors duration-500 ${
                      isDarkMode ? 'bg-gray-200' : 'bg-gray-800'
                    }`}
                    style={{
                      width: '4px',
                      height: '35px',
                      transform: `translate(-50%, -100%) rotate(${
                        (currentTime.getHours() % 12) * 30 + currentTime.getMinutes() * 0.5
                      }deg)`,
                      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  ></div>
                  
                  {/* Minute hand */}
                  <div
                    className={`absolute top-1/2 left-1/2 origin-bottom rounded-full shadow-md transition-colors duration-500 ${
                      isDarkMode ? 'bg-gray-300' : 'bg-gray-700'
                    }`}
                    style={{
                      width: '3px',
                      height: '45px',
                      transform: `translate(-50%, -100%) rotate(${
                        currentTime.getMinutes() * 6 + currentTime.getSeconds() * 0.1
                      }deg)`,
                      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  ></div>
                  
                  {/* Second hand */}
                  <div
                    className="absolute top-1/2 left-1/2 origin-bottom bg-red-500 rounded-full shadow-lg"
                    style={{
                      width: '2px',
                      height: '50px',
                      transform: `translate(-50%, -100%) rotate(${currentTime.getSeconds() * 6}deg)`,
                      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  ></div>
                </div>
              </div>
              
              {/* Date display */}
              <div className="text-center">
                <div className={`text-sm font-semibold transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </div>
                <div className={`text-xs font-mono transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
              </div>
            </div>
            
            {/* Status indicator */}
            <div className={`${
              isDarkMode 
                ? 'bg-gray-800/80 border-gray-600' 
                : 'bg-white/80 border-gray-300'
            } backdrop-blur-md border-2 rounded-xl p-3 shadow-lg transition-colors duration-500`}>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-md"></div>
                <span className={`font-medium transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>Available for Work</span>
              </div>
            </div>
          </div>

          {/* Desktop Icons - Grid Layout */}
          <div className="absolute top-8 left-8 z-50">
            <div className="grid grid-cols-3 gap-4">
              {/* File Icons on Desktop */}
              <button 
                onClick={() => handleSectionChange('about')}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 group ${activeSection === 'about' ? 'bg-white/20 backdrop-blur-sm' : 'hover:bg-white/10'}`}
              >
                <div className="w-16 h-20 bg-white border-2 border-gray-400 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <FileText className="w-8 h-8 text-gray-700" />
                </div>
                <span className="text-xs font-semibold text-gray-800 bg-white/80 px-2 py-1 rounded shadow-sm font-display">about.md</span>
              </button>
              
              <button 
                onClick={() => handleSectionChange('skills')}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 group ${activeSection === 'skills' ? 'bg-white/20 backdrop-blur-sm' : 'hover:bg-white/10'}`}
              >
                <div className="w-16 h-20 bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-400 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Wrench className="w-8 h-8 text-blue-700" />
                </div>
                <span className="text-xs font-semibold text-gray-800 bg-white/80 px-2 py-1 rounded shadow-sm font-display">skills.json</span>
              </button>
              
              <button 
                onClick={() => handleSectionChange('experience')}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 group ${activeSection === 'experience' ? 'bg-white/20 backdrop-blur-sm' : 'hover:bg-white/10'}`}
              >
                <div className="w-16 h-20 bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-400 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Briefcase className="w-8 h-8 text-green-700" />
                </div>
                <span className="text-xs font-semibold text-gray-800 bg-white/80 px-2 py-1 rounded shadow-sm font-display">experience</span>
              </button>
              
              <button 
                onClick={() => handleSectionChange('projects')}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 group ${activeSection === 'projects' ? 'bg-white/20 backdrop-blur-sm' : 'hover:bg-white/10'}`}
              >
                <div className="w-16 h-20 bg-gradient-to-br from-purple-100 to-purple-200 border-2 border-purple-400 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <FolderOpen className="w-8 h-8 text-purple-700" />
                </div>
                <span className="text-xs font-semibold text-gray-800 bg-white/80 px-2 py-1 rounded shadow-sm font-display">projects</span>
              </button>
              
              <button 
                onClick={() => handleSectionChange('achievements')}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 group ${activeSection === 'achievements' ? 'bg-white/20 backdrop-blur-sm' : 'hover:bg-white/10'}`}
              >
                <div className="w-16 h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-400 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Trophy className="w-8 h-8 text-yellow-700" />
                </div>
                <span className="text-xs font-semibold text-gray-800 bg-white/80 px-2 py-1 rounded shadow-sm font-display">achievements</span>
              </button>
              
              <button 
                onClick={() => handleSectionChange('contact')}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 group ${activeSection === 'contact' ? 'bg-white/20 backdrop-blur-sm' : 'hover:bg-white/10'}`}
              >
                <div className="w-16 h-20 bg-gradient-to-br from-pink-100 to-pink-200 border-2 border-pink-400 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Mail className="w-8 h-8 text-pink-700" />
                </div>
                <span className="text-xs font-semibold text-gray-800 bg-white/80 px-2 py-1 rounded shadow-sm font-display">contact.html</span>
              </button>
              
              <button 
                onClick={() => handleSectionChange('terminal')}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 group ${activeSection === 'terminal' ? 'bg-white/20 backdrop-blur-sm' : 'hover:bg-white/10'}`}
              >
                <div className="w-16 h-20 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <TerminalIcon className="w-8 h-8 text-green-400" />
                </div>
                <span className="text-xs font-semibold text-gray-800 bg-white/80 px-2 py-1 rounded shadow-sm font-display">terminal.app</span>
              </button>
            </div>
          </div>

          {/* Desktop Dock - Bottom Center */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 fade-in">
            <div className="bg-white/80 backdrop-blur-md border-2 border-gray-300 rounded-2xl p-3 shadow-2xl flex items-center gap-3">
              {/* Social Links */}
              <button 
                onClick={() => openBrowser(linksData.social.github.url)}
                className="w-14 h-14 bg-gray-800 rounded-xl flex items-center justify-center hover:scale-125 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2"
                title="GitHub"
              >
                <Github className="w-6 h-6 text-white" />
              </button>
              <button 
                onClick={() => openBrowser(linksData.social.linkedin.url)}
                className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center hover:scale-125 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2"
                title="LinkedIn"
              >
                <Linkedin className="w-6 h-6 text-white" />
              </button>
              <a 
                href={linksData.social.website.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center hover:scale-125 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2"
                title="Website"
              >
                <Globe className="w-6 h-6 text-white" />
              </a>
              <a 
                href={linksData.social.blog.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center hover:scale-125 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2"
                title="Blog"
              >
                <PenTool className="w-6 h-6 text-white" />
              </a>
              <a 
                href={linksData.social.email.url}
                className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center hover:scale-125 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2"
                title="Email"
              >
                <Mail className="w-6 h-6 text-white" />
              </a>
              
              <div className="w-px h-10 bg-gray-400 mx-1"></div>
              
              {/* Recents Section */}
              {recentSections.slice(0, 3).map((section) => (
                <button
                  key={section}
                  onClick={() => handleSectionChange(section)}
                  className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center hover:scale-125 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2 border-2 border-gray-300"
                  title={`Recent: ${section}`}
                >
                  {getSectionIcon(section)}
                </button>
              ))}
              
              <div className="w-px h-10 bg-gray-400 mx-1"></div>
              
              {/* Window Control */}
              <button 
                onClick={() => setIsWindowOpen(!isWindowOpen)}
                className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center hover:scale-125 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2 relative"
                title={isWindowOpen ? "Minimize Window" : "Open Window"}
              >
                {isWindowOpen ? (
                  <Minimize2 className="w-6 h-6 text-white" />
                ) : (
                  <>
                    <FileText className="w-6 h-6 text-white" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Wallpaper - Subtle Bottom Right */}
          {!isWindowOpen && (
            <div className="absolute bottom-32 right-12 pointer-events-none z-5">
              <div className="text-right">
                {/* Large Name */}
                <h1 className={`text-6xl font-bold mb-3 font-display bg-gradient-to-r bg-clip-text text-transparent drop-shadow-xl transition-all duration-500 ${
                  isDarkMode
                    ? 'from-blue-400 via-purple-400 to-pink-400'
                    : 'from-blue-600 via-purple-600 to-pink-600'
                }`}>
                  {linksData.personal.name.toUpperCase()}
                </h1>
                {/* Designation */}
                <p className={`text-2xl font-semibold tracking-wide mb-1 transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-300/70' : 'text-gray-700/60'
                }`}>
                  {linksData.personal.designation}
                </p>
                <p className={`text-lg transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-400/60' : 'text-gray-600/50'
                }`}>
                  {linksData.personal.subtitle}
                </p>
              </div>
            </div>
          )}

          {/* Background Illustration Elements */}
          <div className="absolute right-20 top-32 w-64 h-64 opacity-20 pointer-events-none z-0">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300 rounded-full animate-pulse" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-200 rounded-full" style={{ clipPath: 'circle(50% at 50% 50%)' }}></div>
          </div>

          {/* Floating shapes decoration */}
          <div className="absolute top-40 left-1/3 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl pointer-events-none z-0"></div>
          <div className="absolute bottom-40 right-1/4 w-40 h-40 bg-blue-300/20 rounded-full blur-2xl pointer-events-none z-0"></div>

          {/* GitHub Contributions Widget - Draggable & Resizable */}
          <div 
            className="absolute z-50"
            style={{
              left: `${widgetPosition.x}px`,
              top: `${widgetPosition.y}px`,
              width: `${widgetSize.width}px`,
              cursor: isWidgetDragging ? 'grabbing' : 'default'
            }}
          >
            <div className={`backdrop-blur-md border-2 rounded-xl p-4 shadow-lg transition-colors duration-500 relative ${
              isDarkMode 
                ? 'bg-gray-800/90 border-gray-600' 
                : 'bg-white/90 border-gray-300'
            }`}>
              {/* Drag Handle */}
              <div 
                className="flex items-center gap-2 mb-3 cursor-move"
                onMouseDown={handleWidgetMouseDown}
              >
                <Github className={`w-4 h-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`} />
                <h3 className={`text-xs font-bold flex-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  GitHub Activity 2025
                </h3>
                <div className="text-xs text-gray-500">⋮⋮</div>
              </div>
              
              {/* Contribution Graph */}
              <div className="flex gap-0.5 overflow-x-auto pb-2">
                {contributions.slice(-Math.floor((widgetSize.width - 80) / 14)).map((week, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-0.5">
                    {week.map((level, dayIdx) => {
                      const colors = isDarkMode
                        ? ['bg-gray-700', 'bg-green-900', 'bg-green-700', 'bg-green-500', 'bg-green-400']
                        : ['bg-gray-200', 'bg-green-200', 'bg-green-400', 'bg-green-600', 'bg-green-700'];
                      return (
                        <div
                          key={dayIdx}
                          className={`w-2.5 h-2.5 rounded-sm ${colors[level]} transition-all duration-300 hover:ring-2 hover:ring-green-400 hover:scale-110`}
                          title={`${level} contributions`}
                        ></div>
                      );
                    })}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {linksData.social.github.stats.stars} ⭐ • {linksData.social.github.stats.repositories} repos • {contributions.length} weeks
                </span>
                <a 
                  href={linksData.social.github.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:text-blue-600 font-semibold hover:underline"
                >
                  View Profile →
                </a>
              </div>

              {/* Resize Handle */}
              <div
                onMouseDown={handleWidgetResizeStart}
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full cursor-se-resize hover:scale-150 transition-transform shadow-lg"
                style={{ zIndex: 9999 }}
                title="Drag to resize"
              ></div>
            </div>
            
            {/* Desktop Info */}
            <div className={`mt-3 text-xs backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm transition-colors duration-500 ${
              isDarkMode 
                ? 'bg-gray-800/60 border border-gray-600 text-gray-200' 
                : 'bg-white/60 text-gray-700'
            }`}>
              <div className="font-semibold">Portfolio Desktop v1.0</div>
              <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{linksData.personal.name} © 2025</div>
            </div>
          </div>

          {/* Document Window */}
          <div className={`${
            isMaximized 
              ? 'fixed inset-4 z-30' 
              : 'absolute z-20'
          }`} 
               style={!isMaximized ? {
                 top: '50%',
                 left: '50%',
                 transform: 'translate(-50%, -50%)',
               } : {}}>
            
            {isWindowOpen && (
              <div 
                className={`shadow-2xl border-2 overflow-hidden window-enter transition-colors duration-500 relative ${
                  isMaximized 
                    ? 'w-full h-full rounded-none' 
                    : 'rounded-lg'
                } ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-600'
                    : 'bg-white border-gray-300'
                }`}
                style={!isMaximized ? {
                  width: `${windowSize.width}px`,
                  height: `${windowSize.height}px`,
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  cursor: isDragging ? 'grabbing' : 'default'
                } : {}}
              >
              
              {/* Resize Handles - Only show when not maximized */}
              {!isMaximized && (
                <>
                  {/* Corner Handles */}
                  <div
                    onMouseDown={(e) => handleResizeStart(e, 'nw')}
                    className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full cursor-nw-resize hover:scale-150 transition-transform"
                    style={{ zIndex: 9999 }}
                  ></div>
                  <div
                    onMouseDown={(e) => handleResizeStart(e, 'ne')}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-ne-resize hover:scale-150 transition-transform"
                    style={{ zIndex: 9999 }}
                  ></div>
                  <div
                    onMouseDown={(e) => handleResizeStart(e, 'sw')}
                    className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full cursor-sw-resize hover:scale-150 transition-transform"
                    style={{ zIndex: 9999 }}
                  ></div>
                  <div
                    onMouseDown={(e) => handleResizeStart(e, 'se')}
                    className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-se-resize hover:scale-150 transition-transform"
                    style={{ zIndex: 9999 }}
                  ></div>
                  
                  {/* Edge Handles */}
                  <div
                    onMouseDown={(e) => handleResizeStart(e, 'n')}
                    className="absolute -top-1 left-4 right-4 h-2 cursor-n-resize"
                    style={{ zIndex: 9999 }}
                  ></div>
                  <div
                    onMouseDown={(e) => handleResizeStart(e, 's')}
                    className="absolute -bottom-1 left-4 right-4 h-2 cursor-s-resize"
                    style={{ zIndex: 9999 }}
                  ></div>
                  <div
                    onMouseDown={(e) => handleResizeStart(e, 'w')}
                    className="absolute -left-1 top-4 bottom-4 w-2 cursor-w-resize"
                    style={{ zIndex: 9999 }}
                  ></div>
                  <div
                    onMouseDown={(e) => handleResizeStart(e, 'e')}
                    className="absolute -right-1 top-4 bottom-4 w-2 cursor-e-resize"
                    style={{ zIndex: 9999 }}
                  ></div>
                </>
              )}
              {/* Window Title Bar */}
              <div 
                className={`border-b-2 px-4 py-3 flex items-center justify-between transition-colors duration-500 ${
                  isDarkMode
                    ? 'bg-gradient-to-b from-gray-700 to-gray-800 border-gray-600'
                    : 'bg-gradient-to-b from-[#E8DCC4] to-[#D4C5A9] border-gray-300'
                }`}
                onMouseDown={handleMouseDown}
                style={{ cursor: isMaximized ? 'default' : 'grab' }}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-semibold flex items-center gap-2 transition-colors duration-500 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>
                    {activeSection === 'about' && <><FileText className="w-4 h-4" /> about.md</>}
                    {activeSection === 'skills' && <><Wrench className="w-4 h-4" /> skills.json</>}
                    {activeSection === 'experience' && <><Briefcase className="w-4 h-4" /> experience</>}
                    {activeSection === 'projects' && <><FolderOpen className="w-4 h-4" /> projects/</>}
                    {activeSection === 'achievements' && <><Trophy className="w-4 h-4" /> achievements</>}
                    {activeSection === 'contact' && <><Mail className="w-4 h-4" /> contact.html</>}
                    {activeSection === 'terminal' && <><TerminalIcon className="w-4 h-4 text-green-400" /> terminal.app</>}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {!isMaximized && (
                    <button 
                      onClick={() => setIsWindowOpen(false)}
                      className="p-1.5 hover:bg-yellow-200 rounded transition"
                      title="Minimize"
                    >
                      <Minimize2 className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    onClick={handleMaximize}
                    className="p-1.5 hover:bg-green-200 rounded transition"
                    title={isMaximized ? "Restore" : "Maximize"}
                  >
                    {isMaximized ? <Minimize className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={() => setIsWindowOpen(false)}
                    className="p-1.5 hover:bg-red-200 hover:text-red-700 rounded transition"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Document Content */}
              <div className={`overflow-y-auto transition-colors duration-500 ${
                activeSection === 'terminal' 
                  ? 'p-0 bg-black' 
                  : `p-12 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`
              }`}
              style={{
                height: isMaximized ? 'calc(100vh - 80px)' : `${windowSize.height - 60}px`
              }}>
                
                {/* About Section */}
                {activeSection === 'about' && (
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl text-white font-bold shadow-lg animate-pulse">
                        {linksData.personal.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold mb-2 font-display">👋 Hello, I'm {linksData.personal.name}</h1>
                        <p className="text-xl text-gray-600">🚀 {linksData.personal.designation} | {linksData.personal.subtitle}</p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                      <p className="italic text-gray-700">"An engineer's contribution should never be measured by lines of code or commits per pay."</p>
                    </div>

                    <div className="space-y-6 text-gray-700 leading-relaxed">
                      <p className="text-lg">
                        I'm a passionate <strong>{linksData.personal.designation}</strong> from India with <strong>{linksData.personal.experience} of professional experience</strong> building scalable, production-grade systems.
                      </p>
                      
                      <p>
                        I specialize in <strong>Backend Engineering</strong> with <strong>Node.js</strong> and <strong>Spring Boot</strong>, and I love designing clean architectures, building cloud-native applications, and optimizing systems for performance and cost.
                      </p>

                      <p>
                        I'm currently expanding my expertise into <strong>Machine Learning</strong>, <strong>DevOps</strong>, and modern cloud design patterns. I also enjoy sharing knowledge through blogs, open-source contributions, and technical communities.
                      </p>

                      <div className="flex gap-4 mt-8">
                        <a href={linksData.social.email.url} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition shadow-md">
                          📧 Contact Me
                        </a>
                        <a href={linksData.social.website.url} target="_blank" rel="noopener noreferrer" className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition border-2 border-gray-300">
                          🌐 Visit Website
                        </a>
                        <a href={linksData.social.blog.url} target="_blank" rel="noopener noreferrer" className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition border-2 border-gray-300">
                          ✍️ Read Blog
                        </a>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        {quickStats.map((stat, idx) => (
                          <div key={idx} className={`bg-${stat.color}-50 p-4 rounded-lg text-center`}>
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="font-semibold">{stat.value}</div>
                            {stat.sublabel && <div className="text-sm text-gray-600">{stat.sublabel}</div>}
                            {stat.label && !stat.sublabel && <div className="text-sm text-gray-600">{stat.label}</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Skills Section */}
                {activeSection === 'skills' && (
                  <div>
                    <h1 className="text-4xl font-bold mb-8 flex items-center gap-3 font-display">
                      <Wrench className="w-10 h-10" /> Technical Skills
                    </h1>
                    
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 font-display">
                          <Palette className="w-6 h-6" /> Frontend
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {skills.frontend.map((skill) => (
                            <div key={skill} className="bg-gradient-to-br from-purple-100 to-purple-200 text-purple-800 px-4 py-3 rounded-xl font-medium border-2 border-purple-300 shadow-sm hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2">
                              <Code className="w-5 h-5" />
                              <span className="text-sm">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 font-display">
                          <Server className="w-6 h-6" /> Backend
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {skills.backend.map((skill) => (
                            <div key={skill} className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 px-4 py-3 rounded-xl font-medium border-2 border-blue-300 shadow-sm hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2">
                              <Server className="w-5 h-5" />
                              <span className="text-sm">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 font-display">
                          <Database className="w-6 h-6" /> Databases
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {skills.database.map((skill) => (
                            <div key={skill} className="bg-gradient-to-br from-green-100 to-green-200 text-green-800 px-4 py-3 rounded-xl font-medium border-2 border-green-300 shadow-sm hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2">
                              <Database className="w-5 h-5" />
                              <span className="text-sm">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 font-display">
                          <Cloud className="w-6 h-6" /> Cloud & DevOps
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {skills.cloud.map((skill) => (
                            <div key={skill} className="bg-gradient-to-br from-orange-100 to-orange-200 text-orange-800 px-4 py-3 rounded-xl font-medium border-2 border-orange-300 shadow-sm hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2">
                              <Cloud className="w-5 h-5" />
                              <span className="text-sm">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 font-display">
                          <Zap className="w-6 h-6" /> AI/ML
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {skills.aiml.map((skill) => (
                            <div key={skill} className="bg-gradient-to-br from-pink-100 to-pink-200 text-pink-800 px-4 py-3 rounded-xl font-medium border-2 border-pink-300 shadow-sm hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2">
                              <Zap className="w-5 h-5" />
                              <span className="text-sm">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 font-display">
                          <CreditCard className="w-6 h-6" /> Payment Integration
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {skills.payment.map((skill) => (
                            <div key={skill} className="bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-800 px-4 py-3 rounded-xl font-medium border-2 border-yellow-300 shadow-sm hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2">
                              <CreditCard className="w-5 h-5" />
                              <span className="text-sm">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Experience Section */}
                {activeSection === 'experience' && (
                  <div>
                    <h1 className="text-4xl font-bold mb-8">💼 Experience & Achievements</h1>
                    
                    <div className="space-y-6">
                      {experience.map((exp, idx) => (
                        <div key={idx} className={`border-l-4 border-${exp.color}-500 pl-6 py-4 bg-${exp.color}-50 rounded-r-lg`}>
                          <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                          <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: exp.description }}></p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-xl">
                      <h3 className="text-2xl font-bold mb-3">🌱 Currently Learning</h3>
                      <ul className="space-y-2 text-lg">
                        {learning.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Projects Section */}
                {activeSection === 'projects' && (
                  <div>
                    <h1 className="text-4xl font-bold mb-8">📁 Featured Projects</h1>
                    
                    <div className="grid gap-6">
                      {projects.map((project, idx) => (
                        <div key={idx} className="border-2 border-gray-300 rounded-xl p-6 hover:shadow-xl transition bg-gradient-to-br from-white to-gray-50">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                              <p className="text-gray-600">{project.description}</p>
                            </div>
                            {project.link && (
                              <a href={project.link} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2">
                                <span>View</span>
                                <span>→</span>
                              </a>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.split(', ').map((tech, i) => (
                              <span key={i} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 text-center">
                      <a href={linksData.social.github.url} target="_blank" rel="noopener noreferrer" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition shadow-lg">
                        💻 View All {linksData.social.github.stats.repositories} Repositories on GitHub →
                      </a>
                    </div>
                  </div>
                )}

                {/* Achievements Section */}
                {activeSection === 'achievements' && (
                  <div>
                    <h1 className="text-4xl font-bold mb-8">🏆 Achievements & Stats</h1>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      {achievements.map((achievement, idx) => (
                        <div key={idx} className={`bg-gradient-to-br ${achievement.color} p-6 rounded-xl text-white shadow-xl`}>
                          <div className="text-4xl mb-3">{achievement.icon}</div>
                          <h3 className="text-2xl font-bold mb-2">{achievement.name}</h3>
                          <p>{achievement.description}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white border-2 border-gray-300 p-6 rounded-xl text-center shadow-sm">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{linksData.social.github.stats.repositories}</div>
                        <div className="text-gray-600">Repositories</div>
                      </div>
                      <div className="bg-white border-2 border-gray-300 p-6 rounded-xl text-center shadow-sm">
                        <div className="text-3xl font-bold text-green-600 mb-2">{linksData.social.github.stats.stars}</div>
                        <div className="text-gray-600">Stars</div>
                      </div>
                      <div className="bg-white border-2 border-gray-300 p-6 rounded-xl text-center shadow-sm">
                        <div className="text-3xl font-bold text-purple-600 mb-2">{linksData.social.github.stats.followers}</div>
                        <div className="text-gray-600">Followers</div>
                      </div>
                      <div className="bg-white border-2 border-gray-300 p-6 rounded-xl text-center shadow-sm">
                        <div className="text-3xl font-bold text-orange-600 mb-2">{linksData.social.github.stats.following}</div>
                        <div className="text-gray-600">Following</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Terminal Section */}
                {activeSection === 'terminal' && (
                  <div className="h-full flex flex-col bg-black p-0">
                    <div className="flex-1 overflow-y-auto p-6 font-mono text-sm space-y-1">
                      {terminalHistory.map((entry, idx) => (
                        <div key={idx} className={`${
                          entry.type === 'input' ? 'text-cyan-400' :
                          entry.type === 'error' ? 'text-red-400' :
                          'text-green-400'
                        }`}>
                          {entry.text}
                        </div>
                      ))}
                      
                      {/* Input Line */}
                      <div className="flex items-center gap-2 pt-2">
                        <span className="text-green-400 font-bold">❯</span>
                        <input
                          type="text"
                          value={terminalInput}
                          onChange={(e) => setTerminalInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleTerminalCommand(terminalInput);
                            }
                          }}
                          placeholder="Type /help for commands"
                          className="flex-1 bg-transparent text-white outline-none font-mono placeholder-gray-600 caret-green-400"
                          autoFocus
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Section */}
                {activeSection === 'contact' && (
                  <div>
                    <h1 className="text-4xl font-bold mb-8">📧 Get In Touch</h1>
                    
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-4">Let's connect!</h2>
                      <p className="text-gray-700 text-lg mb-6">
                        I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
                        Feel free to reach out through any of the platforms below.
          </p>
        </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <a href={linksData.social.email.url} className="bg-gradient-to-br from-red-500 to-pink-500 p-6 rounded-xl text-white hover:shadow-xl transition">
                        <div className="text-4xl mb-3">📧</div>
                        <h3 className="text-xl font-bold mb-2">Email</h3>
                        <p className="opacity-90">{linksData.social.email.address}</p>
                      </a>

                      <a href={linksData.social.linkedin.url} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-xl text-white hover:shadow-xl transition">
                        <div className="text-4xl mb-3">💼</div>
                        <h3 className="text-xl font-bold mb-2">LinkedIn</h3>
                        <p className="opacity-90">linkedin.com/in/{linksData.social.linkedin.username}</p>
                      </a>

                      <a href={linksData.social.github.url} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-gray-700 to-gray-900 p-6 rounded-xl text-white hover:shadow-xl transition">
                        <div className="text-4xl mb-3">💻</div>
                        <h3 className="text-xl font-bold mb-2">GitHub</h3>
                        <p className="opacity-90">github.com/{linksData.social.github.username}</p>
                      </a>

                      <a href={linksData.social.twitter.url} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-sky-400 to-blue-500 p-6 rounded-xl text-white hover:shadow-xl transition">
                        <div className="text-4xl mb-3">𝕏</div>
                        <h3 className="text-xl font-bold mb-2">Twitter / X</h3>
                        <p className="opacity-90">{linksData.social.twitter.username}</p>
                      </a>

                      <a href={linksData.social.website.url} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-xl text-white hover:shadow-xl transition">
                        <div className="text-4xl mb-3">🌐</div>
                        <h3 className="text-xl font-bold mb-2">Website</h3>
                        <p className="opacity-90">{linksData.social.website.url.replace('https://', '')}</p>
                      </a>

                      <a href={linksData.social.blog.url} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-xl text-white hover:shadow-xl transition">
                        <div className="text-4xl mb-3">✍️</div>
                        <h3 className="text-xl font-bold mb-2">Blog</h3>
                        <p className="opacity-90">{linksData.social.blog.platform} {linksData.social.blog.username}</p>
                      </a>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-xl p-6">
                      <h3 className="text-2xl font-bold mb-3 text-green-800">📍 Location</h3>
                      <p className="text-lg text-gray-700">{linksData.personal.location} 🇮🇳</p>
                      <p className="text-gray-600 mt-2">Open to remote opportunities worldwide</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            )}
          </div>

          {/* In-Built Browser Window */}
          {isBrowserOpen && (
            <div 
              className={`${
                isBrowserMaximized 
                  ? 'fixed inset-4 z-60' 
                  : 'fixed z-60'
              }`}
              style={!isBrowserMaximized ? {
                top: '50%',
                left: '50%',
                transform: `translate(calc(-50% + ${browserPosition.x}px), calc(-50% + ${browserPosition.y}px))`,
                width: `${browserSize.width}px`,
                height: `${browserSize.height}px`
              } : {}}
            >
              <div className={`h-full flex flex-col shadow-2xl border-2 rounded-lg overflow-hidden transition-colors duration-500 ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-600'
                  : 'bg-white border-gray-300'
              }`}>
                {/* Browser Title Bar */}
                <div 
                  className={`px-4 py-3 flex items-center justify-between border-b-2 transition-colors duration-500 ${
                    isDarkMode
                      ? 'bg-gradient-to-b from-gray-700 to-gray-800 border-gray-600'
                      : 'bg-gradient-to-b from-[#E8DCC4] to-[#D4C5A9] border-gray-300'
                  }`}
                  onMouseDown={handleBrowserMouseDown}
                  style={{ cursor: isBrowserMaximized ? 'default' : 'grab' }}
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span className={`text-sm font-semibold transition-colors duration-500 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>
                      Browser
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {!isBrowserMaximized && (
                      <button 
                        onClick={() => setIsBrowserOpen(false)}
                        className="p-1.5 hover:bg-yellow-200 rounded transition"
                        title="Minimize"
                      >
                        <Minimize2 className="w-4 h-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => setIsBrowserMaximized(!isBrowserMaximized)}
                      className="p-1.5 hover:bg-green-200 rounded transition"
                      title={isBrowserMaximized ? "Restore" : "Maximize"}
                    >
                      {isBrowserMaximized ? <Minimize className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => setIsBrowserOpen(false)}
                      className="p-1.5 hover:bg-red-200 hover:text-red-700 rounded transition"
                      title="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Browser Controls */}
                <div className={`px-4 py-3 flex items-center gap-3 border-b transition-colors duration-500 ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-50 border-gray-300'
                }`}>
                  <button 
                    onClick={() => {
                      const iframe = document.getElementById('browser-iframe') as HTMLIFrameElement;
                      if (iframe?.contentWindow) {
                        iframe.contentWindow.history.back();
                      }
                    }}
                    className={`p-2 rounded-lg hover:bg-gray-200 transition ${
                      isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                    }`}
                    title="Back"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      const iframe = document.getElementById('browser-iframe') as HTMLIFrameElement;
                      if (iframe) {
                        iframe.src = iframe.src;
                      }
                    }}
                    className={`p-2 rounded-lg transition ${
                      isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                    }`}
                    title="Refresh"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setBrowserUrl(linksData.social.github.url)}
                    className={`p-2 rounded-lg transition ${
                      isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                    }`}
                    title="Home"
                  >
                    <HomeIcon className="w-4 h-4" />
                  </button>
                  
                  <div className={`flex-1 flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-500 ${
                    isDarkMode
                      ? 'bg-gray-800 border border-gray-600'
                      : 'bg-white border border-gray-300'
                  }`}>
                    <Lock className="w-3 h-3 text-green-500" />
                    <input
                      type="text"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleUrlSubmit();
                        }
                      }}
                      className={`flex-1 bg-transparent outline-none text-sm ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-900'
                      }`}
                      placeholder="Try: wikipedia.org, example.com..."
                    />
                    <button
                      onClick={handleUrlSubmit}
                      className="p-1 hover:bg-blue-500 hover:text-white rounded transition"
                      title="Go"
                    >
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Browser Content */}
                <div className={`flex-1 relative overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                  {browserUrl ? (
                    <>
                      {/* Try to load iframe first */}
                      {!iframeError ? (
                        <iframe
                          id="browser-iframe"
                          src={browserUrl}
                          className="w-full h-full border-0"
                          title="Browser"
                          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                          onError={() => setIframeError(true)}
                        />
                      ) : (
                        /* Fallback when iframe fails */
                        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                          <Globe className={`w-24 h-24 mb-6 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                          <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                            Cannot Display in Browser
                          </h3>
                          <p className={`text-lg mb-6 max-w-md ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            This website restricts embedding for security. Click below to open in a new tab.
                          </p>
                          <div className="flex flex-col gap-3 w-full max-w-md">
                            <a
                              href={browserUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition shadow-lg inline-flex items-center justify-center gap-2"
                            >
                              <Globe className="w-5 h-5" />
                              Open in New Tab
                            </a>
                            
                            {/* Quick Info Card */}
                            <div className={`p-6 rounded-xl border-2 text-left ${
                              isDarkMode 
                                ? 'bg-gray-800 border-gray-600' 
                                : 'bg-gray-50 border-gray-300'
                            }`}>
                              <div className="flex items-start gap-3 mb-3">
                                {browserUrl.includes('github') && <Github className="w-6 h-6" />}
                                {browserUrl.includes('linkedin') && <Linkedin className="w-6 h-6 text-blue-600" />}
                                {!browserUrl.includes('github') && !browserUrl.includes('linkedin') && <Globe className="w-6 h-6" />}
                                <div className="flex-1">
                                  <h4 className={`font-bold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                                    {browserUrl.includes('github') && 'GitHub Profile'}
                                    {browserUrl.includes('linkedin') && 'LinkedIn Profile'}
                                    {!browserUrl.includes('github') && !browserUrl.includes('linkedin') && 'External Link'}
                                  </h4>
                                  <p className={`text-sm break-all ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {browserUrl}
                                  </p>
                                </div>
                              </div>
                              
                              {browserUrl.includes('github') && (
                                <div className="space-y-2 text-sm">
                                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                    📊 {linksData.social.github.stats.repositories} repositories
                                  </p>
                                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                    ⭐ {linksData.social.github.stats.stars} stars earned
                                  </p>
                                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                    👥 {linksData.social.github.stats.followers} followers
                                  </p>
                                </div>
                              )}
                              
                              {browserUrl.includes('linkedin') && (
                                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  👔 Connect professionally on LinkedIn
                                </p>
                              )}
                            </div>
                            
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(browserUrl);
                              }}
                              className={`px-6 py-3 rounded-lg font-medium transition ${
                                isDarkMode
                                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                              }`}
                            >
                              📋 Copy URL
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center max-w-2xl px-8">
                        <Globe className={`w-32 h-32 mx-auto mb-6 ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                        <h3 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                          Welcome to Browser
                        </h3>
                        <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Enter a URL in the address bar above
                        </p>
                        
                        {/* Quick Links */}
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={() => {
                              setInputUrl('example.com');
                              setBrowserUrl('https://example.com');
                              setIframeError(false);
                            }}
                            className={`p-4 rounded-xl border-2 hover:shadow-lg transition ${
                              isDarkMode
                                ? 'bg-gray-800 border-gray-600 hover:border-gray-500'
                                : 'bg-white border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <Globe className={`w-8 h-8 mx-auto mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                            <p className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Example Site</p>
                          </button>
                          
                          <button
                            onClick={() => {
                              setInputUrl('wikipedia.org');
                              setBrowserUrl('https://wikipedia.org');
                              setIframeError(false);
                            }}
                            className={`p-4 rounded-xl border-2 hover:shadow-lg transition ${
                              isDarkMode
                                ? 'bg-gray-800 border-gray-600 hover:border-gray-500'
                                : 'bg-white border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <Globe className={`w-8 h-8 mx-auto mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                            <p className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Wikipedia</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
