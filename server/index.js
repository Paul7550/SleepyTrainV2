import {createClient} from 'hafas-client';
import {profile as oebbProfile} from 'hafas-client/p/oebb/index.js';
import cors from 'cors';
import express from 'express';

const app = express();
const port =  5000;

// Middleware
app.use(express.json());
app.use(cors());

const hafasClient = createClient(oebbProfile, 'sleepy-train-app');

app.get('/',function (req,res){
  console.log("log");
  res.send("Welcome")
})

app.get('/api/trains',async function (req,res){
  try {
    const start = req.query.start;
    const ziel = req.query.stop;
    const time = req.query.time;
    
    const result = await getVerbindungen(start, ziel, time);
    res.json({
      status: "Erhalten",
      Trains: result,
    });
  } catch (error) {
    console.error("Fehler bei der Suche:", error);
    res.status(500).json({status: "Error", message: error.message});
  }
})

function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h > 0) {
    return `${h}h ${m}min`;
  }
  return `${m}min`;
}

// Helper to remove numbers from train names
const formatTrainName = (name) => {
    if (!name) return '';
    return name.replace(/\s*\d+\s*/g, ' ').trim();
}

async function getVerbindungen(startname, zielname, timeParam) {
  console.time("Locations Suche");
  const [startStations, zielStations] = await Promise.all([
    hafasClient.locations(startname, { results: 1 }),
    hafasClient.locations(zielname, { results: 1 })
  ]);
  console.log(`Suche Verbindung von ${startStations[0].name} nach ${zielStations[0].name}`);
  console.timeEnd("Locations Suche");

  if (!startStations.length || !zielStations.length) {
    throw new Error("Bahnhof nicht gefunden");
  }

  const start = startStations[0];
  const ziel = zielStations[0];

  let con = {
    results: 5,
    stopovers: true,
  }
  
  if (timeParam) {
    con.departure = new Date(parseInt(timeParam));
  }
  
  console.time("Verbindungen Suche");
  const {journeys} = await hafasClient.journeys(start.id, ziel.id, con);
  console.timeEnd("Verbindungen Suche");

  let trains = []
  journeys.forEach((j, i) => {
    const departure = new Date(j.legs[0].departure);
    const arrival = new Date(j.legs[j.legs.length - 1].arrival);
    
    let allStops = [];
    let trainNames = [];

    j.legs.forEach((leg, legIndex) => {
        // Collect train names
        if (leg.line && leg.line.name) {
             const formattedName = formatTrainName(leg.line.name);
             if (!trainNames.includes(formattedName)) {
                 trainNames.push(formattedName);
             }
        }

        // Intermediate stops
        if (leg.stopovers) {
            leg.stopovers.forEach(stop => {
                const stopTime = stop.departure || stop.arrival;
                if (stopTime) {
                    allStops.push({
                        station: stop.stop.name,
                        time: new Date(stopTime).toLocaleTimeString('de-AT', {
                            hour: '2-digit',
                            minute: '2-digit'
                        }),
                        type: 'stop'
                    });
                }
            });
        }

        // Transfer logic
        if (legIndex < j.legs.length - 1) {
            const nextLeg = j.legs[legIndex + 1];
            const arrivalTime = new Date(leg.arrival);
            const departureTime = new Date(nextLeg.departure);
            const duration = Math.round((departureTime - arrivalTime) / 60000);
            
            allStops.push({
                station: leg.destination.name,
                arrival: arrivalTime.toLocaleTimeString('de-AT', {hour: '2-digit', minute: '2-digit'}),
                departure: departureTime.toLocaleTimeString('de-AT', {hour: '2-digit', minute: '2-digit'}),
                duration: duration,
                type: 'transfer',
                platform: nextLeg.departurePlatform,
                trainTo: nextLeg.line ? formatTrainName(nextLeg.line.name) : 'Weiterfahrt'
            });
        }
    });
    
    const durationMinutes = (arrival - departure) / 1000 / 60;

    trains[i] ={
        data:j,
        departure:{
          time:departure.toLocaleTimeString('de-AT', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          iso: departure.toISOString(),
          station:j.legs[0].origin.name,
          platform:j.legs[0].departurePlatform
        },
        arrival:{
          time:arrival.toLocaleTimeString('de-AT', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          iso: arrival.toISOString(),
          station:j.legs[j.legs.length - 1].destination.name,
          platform:j.legs[j.legs.length - 1].arrivalPlatform
        },
        duration: formatDuration(durationMinutes),
        trains: trainNames,
        stops: allStops
    }
  });
  return trains;
}

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
