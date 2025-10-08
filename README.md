# 🕉️ Temple Aarti Display

A modern React-based live aarti display system that automatically detects the current time and shows the appropriate aarti lyrics with real-time updates.

## ✨ Features

- **🕒 Live Time Detection**: Automatically detects current time and shows the appropriate aarti
- **📱 Mobile Responsive**: Beautiful design that works on all devices
- **🌙 Dark/Light Theme**: Toggle between dark and light modes
- **🔤 Language Toggle**: Switch between Hindi and English lyrics
- **📏 Font Size Controls**: Adjustable text size (A-, A, A+)
- **⚡ Real-time Updates**: Live clock and automatic aarti switching
- **🎨 Modern UI**: Clean, spiritual design with smooth animations

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and visit `http://localhost:5173`

## 📋 Aarti Schedule

The system includes the following daily aarti schedule:

- **04:30-04:50**: Guru Vandana
- **04:50-05:00**: Narasimha Prayer  
- **05:00-05:15**: Tulasi Pranama
- **07:15-07:20**: Gurudeva Prayer
- **07:25-08:00**: Sri Guru Charana Padma
- **12:30-12:59**: Yasomati Nandana
- **18:30-18:55**: Tulasi Pranama (Evening)
- **18:55-19:20**: Gaura Arati
- **19:25-19:40**: Narasimha Prayer (Evening)
- **20:30-20:45**: Jaya Radhe Krishna Vrindavan

## 🛠️ Technology Stack

- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

## 📁 Project Structure

```
src/
├── components/
│   └── LiveAarti.jsx      # Main component
├── data/
│   └── aartis.js         # Aarti data and schedule
├── App.jsx               # Main app component
├── App.css              # Global styles
└── index.css            # Tailwind directives
```

## 🎯 How It Works

1. **Time Detection**: The app continuously monitors the current time
2. **Aarti Matching**: Compares current time with predefined aarti schedules
3. **Live Display**: Shows the appropriate aarti lyrics or "Next Aarti" message
4. **Real-time Updates**: Updates every second for accurate time display

## 🔧 Customization

### Adding New Aartis

Edit `src/data/aartis.js` to add new aartis:

```javascript
{
  id: 11,
  title: "New Aarti Name",
  startTime: "21:00",
  endTime: "21:15",
  lyrics: {
    en: "English lyrics here...",
    hi: "हिन्दी lyrics here..."
  }
}
```

### Modifying Schedule

Update the `startTime` and `endTime` fields in the aarti objects to change the schedule.

## 🌟 Features in Detail

### Live Detection
- Automatically detects which aarti is currently live
- Shows "🔴 LIVE NOW" indicator when an aarti is active
- Displays next upcoming aarti when none is live

### Theme Support
- Light mode with warm orange/yellow colors
- Dark mode with gray/black colors
- Smooth transitions between themes

### Language Support
- Hindi (Devanagari script) - Default
- English (Roman script)
- Easy toggle button

### Font Controls
- Increase font size (A+)
- Decrease font size (A-)
- Reset to default (A)
- Range: 12px to 32px

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Touch-friendly controls
- Optimized typography for mobile reading
- Smooth animations and transitions

## 🙏 Spiritual Design

The interface is designed with spiritual principles in mind:
- Warm, devotional color scheme
- Clean, distraction-free layout
- Emphasis on the sacred text
- Respectful use of Hindu symbols and colors

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

## 📄 License

This project is created for temple use and spiritual purposes.

---

**Hare Krishna! 🙏**

*May this digital aarti display help devotees connect with the divine through technology.*
