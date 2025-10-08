Perfect ✅
You want the **Live Aarti Page** to automatically detect the **current time**, identify which **Aarti is ongoing**, display **that Aarti’s lyrics**, and also **show the current clock time** on the live page.

Below is a **detailed functional and technical documentation** update for this feature — how it works, how to structure the time logic, and how it fits in your overall app.

---

# 🕒 **Live Aarti Auto-Detection & Time Display Documentation**

## 🎯 **Feature Goal**

Automatically detect the current system time (from the user’s device), and:

1. Match it against the temple’s daily aarti schedule.
2. Display the currently ongoing (Live) Aarti.
3. Show the current time (live updating clock).
4. If no Aarti is happening, display a “Next Aarti” message with countdown or upcoming schedule.
5. Still allow manual navigation to other Aartis from Home or Schedule page.

---

## 🧠 **Core Logic Summary**

| Step | Action                                                                                 |
| ---- | -------------------------------------------------------------------------------------- |
| 1    | Fetch current time from device.                                                        |
| 2    | Compare with stored schedule (array of aartis with start and end times).               |
| 3    | If `currentTime` falls between any aarti’s time range → that becomes “Live Aarti.”     |
| 4    | Show current aarti’s lyrics, name, and live time clock.                                |
| 5    | Else → Show “No live aarti right now” and the next upcoming aarti with its start time. |

---

## 🧾 **Data Structure Example**

In `src/data/aartis.js`:

```js
export const aartis = [
  {
    id: 1,
    title: "Mangal Aarti",
    startTime: "04:30", // 24hr format HH:mm
    endTime: "04:45",
    lyrics: {
      en: "Govindam adi-purusham tam aham bhajami...",
      hi: "गोविन्दं आदि-पुरुषं तम् अहं भजामि..."
    }
  },
  {
    id: 2,
    title: "Tulasi Aarti",
    startTime: "05:00",
    endTime: "05:15",
    lyrics: {
      en: "Namo namah tulasi krishna-preyasi namo namah...",
      hi: "नमो नमः तुलसी कृष्ण-प्रेयसि नमो नमः..."
    }
  },
  {
    id: 3,
    title: "Rajbhog Aarti",
    startTime: "12:00",
    endTime: "12:20",
    lyrics: {
      en: "Sri Krishna Govinda Hare Murare...",
      hi: "श्रीकृष्ण गोविन्द हरे मुरारे..."
    }
  },
  {
    id: 4,
    title: "Sandhya Aarti",
    startTime: "18:00",
    endTime: "18:20",
    lyrics: {
      en: "Jaya Jaya Arati Madhava Dayala...",
      hi: "जय जय आरती माधव दयाल..."
    }
  },
  {
    id: 5,
    title: "Shayan Aarti",
    startTime: "20:30",
    endTime: "20:50",
    lyrics: {
      en: "Om namo bhagavate vasudevaya...",
      hi: "ॐ नमो भगवते वासुदेवाय..."
    }
  }
];
```

---

## ⚙️ **Logic in LiveAarti.jsx**

### **Main Responsibilities**

* Detect current time.
* Continuously update every minute.
* Match against schedule.
* Display current or next aarti accordingly.
* Show real-time clock.

---

### **Pseudo Code:**

```js
import { useState, useEffect } from "react";
import { aartis } from "../data/aartis";

function LiveAarti() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveAarti, setLiveAarti] = useState(null);
  const [language, setLanguage] = useState("en");
  const [fontSize, setFontSize] = useState(18);

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
  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Live Aarti Lyrics</h1>
        <div className="text-sm text-gray-600">{formattedTime}</div>
      </header>

      {liveAarti ? (
        <>
          <h2 className="text-lg font-semibold mb-2">{liveAarti.title}</h2>
          <p className="text-sm text-gray-500 mb-3">
            {liveAarti.startTime} - {liveAarti.endTime}
          </p>
          <div
            className="leading-relaxed"
            style={{ fontSize: `${fontSize}px` }}
          >
            {liveAarti.lyrics[language]}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-600">
          <p>No live aarti right now.</p>
          <p>Next Aarti: {getNextAarti()?.title} at {getNextAarti()?.startTime}</p>
        </div>
      )}

      <div className="flex justify-center gap-3 mt-4">
        <button onClick={() => setLanguage(language === "en" ? "hi" : "en")} className="px-3 py-1 bg-yellow-200 rounded">
          {language === "en" ? "हिन्दी" : "English"}
        </button>
        <button onClick={() => setFontSize(fontSize + 2)} className="px-3 py-1 bg-gray-200 rounded">A+</button>
        <button onClick={() => setFontSize(fontSize - 2)} className="px-3 py-1 bg-gray-200 rounded">A-</button>
      </div>
    </div>
  );

  function getNextAarti() {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    return aartis.find(a => {
      const start = parseInt(a.startTime.split(":")[0]) * 60 + parseInt(a.startTime.split(":")[1]);
      return start > now;
    }) || aartis[0]; // fallback to first (next day)
  }
}
```

---

## 🧮 **Detection Logic Explained**

| Function               | Purpose                                           |
| ---------------------- | ------------------------------------------------- |
| `findLiveAarti()`      | Checks which aarti is live based on current time. |
| `getNextAarti()`       | Finds next scheduled aarti after current time.    |
| `setInterval()`        | Updates clock and re-checks every second.         |
| `toLocaleTimeString()` | Formats time display (e.g., 06:54 AM).            |

**Note:** Works even if user’s system time is slightly off; can later sync with server clock for precision.

---

## 🎨 **UI Behavior**

### When Live Aarti Found:

```
🕒 06:54 AM
Now Live: Mangal Aarti (4:30–4:45 AM)

[Lyrics displayed in chosen language]
[Font and Language controls visible below]
```

### When No Live Aarti:

```
🕒 10:23 AM
No live aarti right now.
Next Aarti: Rajbhog Aarti at 12:00 PM
```

---

## 💡 **User Interaction Summary**

| Action                 | Effect                                                       |
| ---------------------- | ------------------------------------------------------------ |
| Tap “हिन्दी / English” | Toggles lyric language                                       |
| Tap “A+ / A-”          | Adjusts text size instantly                                  |
| Time passes            | Automatically switches aarti when the next one’s time starts |
| Page load              | Detects and displays current live aarti                      |

---

## 📱 **Design Considerations for Mobile**

* Use large, bold clock text on top (`text-lg font-semibold text-gray-700`).
* Current aarti highlighted in saffron.
* Smooth crossfade animation (`Framer Motion AnimatePresence`) when switching aartis.
* Optional “Refresh Now” button (for manual sync).
* Minimal scrolling—lyrics area auto-adjusts with `overflow-y-auto`.

---

## 🔋 **Performance Notes**

* Uses only client time — no API latency.
* `setInterval` updates every 1s — lightweight since operations are simple.
* On mobile, time updates consume negligible resources.

---

## 🧰 **Future Improvements**

| Enhancement               | Description                                      |
| ------------------------- | ------------------------------------------------ |
| **Server time sync**      | Use a central temple time source (for accuracy). |
| **Countdown Timer**       | Show “Next Aarti in 1h 22m.”                     |
| **Audio trigger**         | Option to auto-play kirtan when live starts.     |
| **PWA push notification** | “Rajbhog Aarti starting now!” alert.             |
| **Theme change by time**  | Morning = bright saffron, evening = dim golden.  |

---

## 🪔 **Spiritual Design Note**

Displaying the *Live Aarti* on time cultivates punctual remembrance and participation in temple worship. The time-based automation ensures devotees always see what’s happening *right now*—mirroring the discipline and rhythm of temple life.

---

Would you like me to include this new **Live Aarti auto-detection** section merged neatly into your **previous full documentation** (as one single finalized technical document)?
That way you’ll have one complete, consistent specification for the entire project.
