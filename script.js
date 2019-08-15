const Datastore = require('nedb');
const cors = require('cors');
const express = require('express');
const fetch = require('node-fetch');
var firebase = require("firebase/app");
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongoose = require('mongoose');

const url_mongo = 'mongodb://localhost:27017/test';
// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

require('dotenv').config();

const app = express(); 
const port = process.env.PORT || 3000;
app.use(cors());
app.listen(port, ()=> console.log('listening'));
app.use(express.static('public'));
app.use(express.json({limit:'10mb'}));

const mongodb = 'mongoDB';
const database = new Datastore('database.db');
database.loadDatabase();

app.get('/mongoget',(request, response)=>{
    MongoClient.connect(url_mongo,(err,client)=>{
        assert.equal(null,err);
        const db = client.db(mongodb);  
    findDocuments(db,   () =>{
      client.close();
    });
  
    });                
});

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('data');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
}

app.post('/mongopost',(request, response)=>{
    const dbdata = request.body;  
    MongoClient.connect(url_mongo,(err,client)=>{
        assert.equal(null,err);
        const db = client.db(mongodb);
        // Get the documents collection
        const collection = db.collection('data');
        // Insert some documents
        collection.insertMany(dbdata,(err, result) =>{
        assert.equal(err, null);
        console.log(result);
        });
    });     
});
app.get('/api',(request, response)=>{
    database.find({}, (err,data)=>{
        response.json(data);
    });                      
});

app.get('/iss',(request, response)=>{
    database.find({iss}, (err,data)=>{
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

    /*const aq_api = `https://api.openaq.org/v1/measurements`;
    const aq_response = await fetch(aq_api);
    const aq_json = await aq_response.json();
    console.log(aq_json);*/

    const data = {
        weather: weather_json,
        //aq: aq_json,
    };
    response.json(data);
    //database.insert(data);
});

