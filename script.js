const Datastore = require('nedb');
const cors = require('cors');
const express = require('express');
const fetch = require('node-fetch');

require('dotenv').config();

const app = express(); 
const port = process.env.PORT || 3000;
app.use(cors());
app.listen(port, ()=> console.log('listening'));
app.use(express.static('public'));
app.use(express.json({limit:'10mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api',(request, response)=>{
    database.find({}, (err,data)=>{
        response.json(data);
    });                      
});

app.post('/api', (request,response)=>{
    const data = request.body;
    console.log(request.body);
    const time=Date.now();
    data.time = time;
    database.insert(data);

    response.json({
        status: "success",
        time:time,
    })
});

app.get('/weather/:latlng', async (request,response)=>{
    console.log(request.params);
    const latlng = request.params.latlng.split(',');
    console.log(latlng);
    const lat = latlng[0];
    const lng = latlng[1];
    console.log(lat,lng);
    const api_key = process.env.API_KEY;
    const weather_api =`https://api.darksky.net/forecast/${api_key}/${lat},${lng}/?units=si`;
    const weather_response = await fetch(weather_api);
    const weather_json = await weather_response.json();
    console.log(weather_json);

    const aq_api = `https://api.openaq.org/v1/measurements`;
    const aq_response = await fetch(aq_api);
    const aq_json = await aq_response.json();
    console.log(aq_json);

    const data = {
        weather: weather_json,
        aq: aq_json,
    };
    response.json(data);
});

