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
    trains[i] ={
        data:j,
    }
  });
  return trains;
}

// TODO: Add API routes for train connections

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
