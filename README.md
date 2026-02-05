# Sleepy Train V2 🚂💤

**Sleepy Train** is a smart web application designed for train travelers. It doesn't just help you find connections; it offers a crucial feature for a stress-free journey:

**An alarm clock that thinks for itself.** 🧠⏰

Set exactly how many minutes before arrival you want to be woken up. The alarm relies on **real-time train data**, meaning it **automatically adjusts to delays**. You’ll always be woken up at the right time before your stop, regardless of whether the train is on schedule or running late.

---

## Features ✨

* **Intelligent Alarm**: Wakes you up X minutes before arrival, accounting for real-time delays.
* **Connection Search**: Search for train connections between any two stations (powered by the ÖBB interface).
* **Detailed View**: See all intermediate stops, transfers, platform information, and train details.
* **Dark Mode**: Eye-friendly design, perfect for night-time travel.
* **Earlier/Later**: Easily navigate through previous or upcoming connections.
* **Alarm System**: Both visual and acoustic alerts triggered directly in your browser.

---

## Tech Stack 🛠️

* **Frontend**: React.js
* **Backend**: Node.js with Express
* **API**: `hafas-client` (ÖBB profile)
* **Styling**: CSS (with native Dark Mode support)

---

## Installation & Setup 🚀

### Prerequisites

* Node.js installed (Version 14 or higher recommended)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Sleepy_TrainV2

```

### 2. Start the Backend

The backend runs on port 5000 and communicates with the HAFAS interface.

```bash
cd server
npm install
node index.js

```

### 3. Start the Frontend

The frontend runs on port 3000 by default.

```bash
cd client
npm install
npm start

```

The app should now be accessible at `http://localhost:3000`.

---

## How to Use 📱

1. Enter your **Departure** and **Destination** stations (e.g., "Wien Hbf" to "Linz Hbf").
2. Select a connection from the list.
3. In the **Details View**, set your alarm at the bottom (e.g., 15 minutes before arrival).
4. Confirm the alarm. An active alarm banner will appear in the top right corner.
5. **Keep the tab open.** When the time comes, the alarm will sound and a visual notification will appear.

---

## Important Notes ⚠️

* Since this is a web application, the **browser tab must remain open** for the alarm to function.
* Ensure your device does not enter **Sleep Mode** if you are relying on the alarm.
* Train data is fetched live from the ÖBB interface.

---

## License 📄

This project is created for private purposes.

---