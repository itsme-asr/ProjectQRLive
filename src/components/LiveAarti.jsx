import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aartis, defaultAarti } from "../data/aartis";
import { Clock, Sun, Moon, Type, Languages, Home, Calendar, List } from "lucide-react";

function LiveAarti() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveAarti, setLiveAarti] = useState(null);
  const [language, setLanguage] = useState("hi"); // Default to Hindi
  const [fontSize, setFontSize] = useState(18);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState("home"); // home, schedule, all-aartis
  const [selectedAarti, setSelectedAarti] = useState(null); // null or aarti object

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Function to check which aarti is live
  const findLiveAarti = () => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    
    for (let aarti of aartis) {
      const start = parseInt(aarti.startTime.split(":")[0]) * 60 + parseInt(aarti.startTime.split(":")[1]);
      const end = parseInt(aarti.endTime.split(":")[0]) * 60 + parseInt(aarti.endTime.split(":")[1]);
      
      if (now >= start && now <= end) {
        return aarti;
      }
    }
    return null;
  };

  // Detect live aarti
  useEffect(() => {
    const live = findLiveAarti();
    setLiveAarti(live);
  }, [currentTime]);

  // Format time for display
  const formattedTime = currentTime.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });

  // Get next aarti
  const getNextAarti = () => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    return aartis.find(a => {
      const start = parseInt(a.startTime.split(":")[0]) * 60 + parseInt(a.startTime.split(":")[1]);
      return start > now;
    }) || aartis[0]; // fallback to first (next day)
  };

  const nextAarti = getNextAarti();

  // Theme toggle
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Font size controls
  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 32));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

  const resetFontSize = () => {
    setFontSize(18);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-orange-50 to-yellow-50 text-gray-800'
    }`} style={{ fontFamily: 'Laila, serif' }}>
      {/* Header */}
      <header className={`p-4 shadow-lg ${
        isDarkMode 
          ? 'bg-gray-800 border-b border-gray-700' 
          : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
      }`}>
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold"> Live Aarti Display</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Clock className="w-5 h-5" />
              {formattedTime}
            </div>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-white bg-opacity-20 hover:bg-opacity-30'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation and Control Buttons */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex flex-wrap justify-center gap-4">
          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView("home")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentView === "home"
                  ? (isDarkMode ? 'bg-orange-600 text-white' : 'bg-orange-500 text-white')
                  : (isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-800')
              }`}
            >
              <Home className="w-4 h-4" />
              Live Aarti
            </button>
            
            <button
              onClick={() => setCurrentView("schedule")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentView === "schedule"
                  ? (isDarkMode ? 'bg-orange-600 text-white' : 'bg-orange-500 text-white')
                  : (isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-800')
              }`}
            >
              <Calendar className="w-4 h-4" />
              Schedule
            </button>
            
            <button
              onClick={() => setCurrentView("all-aartis")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentView === "all-aartis"
                  ? (isDarkMode ? 'bg-orange-600 text-white' : 'bg-orange-500 text-white')
                  : (isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-800')
              }`}
            >
              <List className="w-4 h-4" />
              All Aartis
            </button>
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            <Languages className="w-4 h-4" />
            {language === "en" ? "हिन्दी" : "English"}
          </button>

          {/* Font Size Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={decreaseFontSize}
              className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
              aria-label="Decrease font size"
            >
              A-
            </button>
            
            <button
              onClick={resetFontSize}
              className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
              aria-label="Reset font size"
            >
              A
            </button>
            
            <button
              onClick={increaseFontSize}
              className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
              aria-label="Increase font size"
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {currentView === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Live Aarti Section */}
              <div className={`rounded-xl p-8 shadow-xl mb-8 ${
                isDarkMode 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-white border border-orange-200'
              }`}>
                <h2 className={`text-3xl font-bold mb-6 ${
                  isDarkMode ? 'text-orange-400' : 'text-orange-600'
                }`}>
                   Live Aarti
                </h2>
                
                {liveAarti ? (
                  <>
                    {/* Live Indicator */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-lg font-semibold text-red-600 dark:text-red-400">
                        🔴 LIVE NOW
                      </span>
                    </div>

                    {/* Aarti Title */}
                    <h3 className={`text-2xl font-bold mb-4 ${
                      isDarkMode ? 'text-orange-400' : 'text-orange-600'
                    }`}>
                      {liveAarti.title}
                    </h3>

                    {/* Time Range */}
                    <p className={`text-lg mb-6 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {liveAarti.startTime} - {liveAarti.endTime}
                    </p>

                    {/* Lyrics */}
                    <div
                      className={`leading-relaxed whitespace-pre-line text-center ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-800'
                      }`}
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      {liveAarti.lyrics[language]}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-6xl mb-6"></div>
                    <h3 className={`text-2xl font-bold mb-4 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      No live aarti right now
                    </h3>
                    <p className={`text-lg mb-6 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Next Aarti: <span className="font-semibold">{nextAarti.title}</span> at {nextAarti.startTime}
                    </p>
                    
                    {/* Default Mantra */}
                    <div className={`mt-8 p-6 rounded-lg ${
                      isDarkMode ? 'bg-gray-700' : 'bg-orange-50'
                    }`}>
                      <h4 className={`text-xl font-semibold mb-4 ${
                        isDarkMode ? 'text-orange-400' : 'text-orange-600'
                      }`}>
                        {defaultAarti.title}
                      </h4>
                      <div
                        className={`leading-relaxed whitespace-pre-line text-center ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-800'
                        }`}
                        style={{ fontSize: `${fontSize}px` }}
                      >
                        {defaultAarti.lyrics[language]}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {currentView === "schedule" && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`rounded-xl p-8 shadow-xl ${
                isDarkMode 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-white border border-orange-200'
              }`}>
                <h2 className={`text-3xl font-bold mb-8 text-center ${
                  isDarkMode ? 'text-orange-400' : 'text-orange-600'
                }`}>
                  📅 Daily Aarti Schedule
                </h2>
                
                <div className="grid gap-4">
                  {aartis.map((aarti) => (
                    <div
                      key={aarti.id}
                      className={`p-4 rounded-lg border ${
                        liveAarti && liveAarti.id === aarti.id
                          ? (isDarkMode ? 'bg-orange-900 border-orange-500' : 'bg-orange-100 border-orange-300')
                          : (isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200')
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className={`text-xl font-semibold ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-800'
                        }`}>
                          {aarti.title}
                        </h3>
                        <div className={`text-lg font-medium ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {aarti.startTime} - {aarti.endTime}
                        </div>
                      </div>
                      {liveAarti && liveAarti.id === aarti.id && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-red-600 dark:text-red-400 font-semibold">
                            🔴 LIVE NOW
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentView === "all-aartis" && (
            <motion.div
              key="all-aartis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`rounded-xl p-8 shadow-xl ${
                isDarkMode 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-white border border-orange-200'
              }`}>
                {!selectedAarti ? (
                  <>
                    <h2 className={`text-3xl font-bold mb-8 text-center ${
                      isDarkMode ? 'text-orange-400' : 'text-orange-600'
                    }`}>
                      📚 All Aartis
                    </h2>
                    
                    <div className="grid gap-4">
                      {aartis.map((aarti) => (
                        <div
                          key={aarti.id}
                          onClick={() => setSelectedAarti(aarti)}
                          className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-lg ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <h3 className={`text-xl font-semibold ${
                              isDarkMode ? 'text-gray-200' : 'text-gray-800'
                            }`}>
                              {aarti.title}
                            </h3>
                          </div>
                          <p className={`text-sm mt-2 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            Click to view lyrics
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Back Button */}
                    <div className="mb-6">
                      <button
                        onClick={() => setSelectedAarti(null)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                          isDarkMode 
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                        }`}
                      >
                        ← Back to List
                      </button>
                    </div>

                    {/* Selected Aarti */}
                    <div className="text-center">
                      <h2 className={`text-3xl font-bold mb-6 ${
                        isDarkMode ? 'text-orange-400' : 'text-orange-600'
                      }`}>
                        {selectedAarti.title}
                      </h2>
                      
                      <div className={`text-lg mb-6 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {selectedAarti.startTime} - {selectedAarti.endTime}
                      </div>
                      
                      <div
                        className={`leading-relaxed whitespace-pre-line text-center ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-800'
                        }`}
                        style={{ fontSize: `${fontSize}px` }}
                      >
                        {selectedAarti.lyrics[language]}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className={`mt-12 py-6 text-center ${
        isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-orange-100 text-gray-600'
      }`}>
        <p>© 2025 ISKCON BHOPAL Temple Aarti Display🙏</p>
      </footer>
    </div>
  );
}

export default LiveAarti;
