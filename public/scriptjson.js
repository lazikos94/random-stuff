
    const issIcon = L.icon({
        iconUrl: 'iss200.png',
        iconSize: [50, 32],
        iconAnchor: [25, 16]
    });


    const mymap = L.map('mapid').setView([0, 0], 1);
    const marker = L.marker([0, 0], {icon:issIcon}).addTo(mymap);
    const stuff={
      attribution : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      tileURL : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      api_url :'https://api.wheretheiss.at/v1/satellites/25544'
    };
    //const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(stuff.tileURL,stuff.attribution);
    tiles.addTo(mymap);

    // let firstTime = true;
    async function getISS(){
      const responce = await fetch(stuff.api_url);
      const data = await responce.json();
      //console.log(data.latitude);
      //console.log(data.longitude);
      const {latitude,longitude,altitude}= data ;
      const url_api = `weather/${latitude},${longitude}`;
      const weather_response = await fetch(url_api);
      const json = await weather_response.json();
      marker.setLatLng([latitude,longitude]);
      // if(firstTime){
      mymap.setView([latitude,longitude],2);
      // firstTime=false;
      const issweather = json.weather.currently.summary;
      const isstemp = json.weather.currently.temperature;
      const isshum = json.weather.currently.humidity;
      const isslat = latitude;
      const isslng = longitude;
      const issalt = altitude;
      //console.log(latitude,longitude);
      document.getElementById('weather').textContent=json.weather.currently.summary;
      document.getElementById('temp').textContent=json.weather.currently.temperature;
      document.getElementById('hum').textContent=json.weather.currently.humidity;
      document.getElementById('lat').textContent=latitude;
      document.getElementById('lon').textContent=longitude;
      document.getElementById('alt').textContent=altitude;

      const issinfo = {issweather,isstemp,isshum,isslat,isslng,issalt};
      const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(issinfo)
      };
      const response = await fetch('/api', options);
      const iss_json = await response.json();
      console.log(iss_json);
    }
    getISS();

    setInterval( getISS,10000);
