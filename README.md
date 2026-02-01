# Sleepy Train V2 🚂💤

Sleepy Train ist eine intelligente Web-Applikation für Bahnreisende. Sie ermöglicht es dir nicht nur, Zugverbindungen zu suchen, sondern bietet ein entscheidendes Feature für entspanntes Reisen:

**Einen Wecker, der mitdenkt.** 🧠⏰

Du kannst einstellen, wie viele Minuten vor Ankunft du geweckt werden möchtest. Der Wecker orientiert sich dabei an den Echtzeitdaten der Zugverbindung. Das bedeutet: **Er passt sich automatisch an Verspätungen an.** So wirst du immer rechtzeitig vor deinem Halt geweckt, egal ob der Zug pünktlich ist oder später kommt.

## Features ✨

*   **Intelligenter Wecker**: Weckt dich X Minuten vor Ankunft – unter Berücksichtigung von Verspätungen.
*   **Verbindungssuche**: Suche nach Zugverbindungen zwischen zwei Bahnhöfen (basierend auf der ÖBB-Schnittstelle).
*   **Detaillierte Ansicht**: Anzeige aller Zwischenhalte, Umstiege, Gleisinformationen und Zugdetails.
*   **Dark Mode**: Augenschonendes Design für nächtliche Fahrten.
*   **Früher/Später**: Einfaches Navigieren zu früheren oder späteren Verbindungen.
*   **Alarm**: Visueller und akustischer Alarm direkt im Browser.

## Technologien 🛠️

*   **Frontend**: React.js
*   **Backend**: Node.js mit Express
*   **API**: `hafas-client` (ÖBB Profil)
*   **Styling**: CSS (mit Dark Mode Support)

## Installation & Start 🚀

### Voraussetzungen

*   Node.js installiert (Version 14 oder höher empfohlen)

### 1. Repository klonen

```bash
git clone <repository-url>
cd Sleepy_TrainV2
```

### 2. Backend starten

Das Backend läuft auf Port 5000 und kommuniziert mit der HAFAS-Schnittstelle.

```bash
cd server
npm install
node index.js
```

### 3. Frontend starten

Das Frontend läuft standardmäßig auf Port 3000.

```bash
cd client
npm install
npm start
```

Die App sollte nun unter `http://localhost:3000` erreichbar sein.

## Nutzung 📱

1.  Gib Start- und Zielbahnhof ein (z.B. "Wien Hbf" nach "Linz Hbf").
2.  Wähle eine Verbindung aus der Liste.
3.  In der Detailansicht kannst du unten einen Wecker stellen (z.B. 15 Minuten vor Ankunft).
4.  Bestätige den Wecker. Ein Banner oben rechts zeigt den aktiven Alarm an.
5.  Lass den Tab offen. Wenn die Zeit gekommen ist, ertönt ein Alarm und ein visueller Hinweis erscheint.

## Hinweise ⚠️

*   Da es sich um eine Web-App handelt, muss der **Browser-Tab geöffnet bleiben**, damit der Wecker funktioniert.
*   Stelle sicher, dass dein Gerät nicht in den Ruhezustand wechselt, wenn du dich auf den Wecker verlassen möchtest.
*   Die Zugdaten werden live von der ÖBB-Schnittstelle geladen.

## Lizenz 📄

Dieses Projekt ist für private Zwecke erstellt.
