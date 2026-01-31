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
    console.log(start,ziel)
    const result = await getVerbindungen(start, ziel);
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

async function getVerbindungen(startname, zielname) {
  const [startStations, zielStations] = await Promise.all([
    hafasClient.locations(startname),
    hafasClient.locations(zielname)
  ]);

  const start = startStations[0];
  const ziel = zielStations[0];

  let con = {
    results: 5,
    stopovers: true,
  }
  const {journeys} = await hafasClient.journeys(start.id, ziel.id, con);
  let trains = []
  journeys.forEach((j, i) => {
    const departure = new Date(j.legs[0].departure);
    const arrival = new Date(j.legs[j.legs.length - 1].arrival);
    let stops = []
    if (j.legs[0].stopovers) {
      for (let k = 0; k < j.legs[0].stopovers.length; k++) {
        const stopTime = j.legs[0].stopovers[k].departure || j.legs[0].stopovers[k].arrival;
        if (stopTime) {
            stops[k] = {
                station: j.legs[0].stopovers[k].stop.name,
                time: new Date(stopTime).toLocaleTimeString('de-AT', {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
            }
        }
      }
    }
    
    const durationMinutes = (arrival - departure) / 1000 / 60;

    trains[i] ={
        data:j,
        departure:{
          time:departure.toLocaleTimeString('de-AT', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          station:j.legs[0].origin.name,
          platform:j.legs[0].departurePlatform
        },
        arrival:{
          time:arrival.toLocaleTimeString('de-AT', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          station:j.legs[j.legs.length - 1].destination.name,
          platform:j.legs[j.legs.length - 1].arrivalPlatform
        },
        duration: formatDuration(durationMinutes),
        trains: [j.legs[0].line.name],
        stops: stops
    }
  });
  return trains;
}

// TODO: Add API routes for train connections

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
