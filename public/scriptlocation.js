
function setup(){
  noCanvas();
  const video = createCapture(VIDEO);
  video.size(320,240);

  let lat,lng;
  let weather = {
  };
  let feel;

  document.getElementById('location').addEventListener('click',async event=> {
  if ("geolocation" in navigator) {
      console.log('geolocation available');
      navigator.geolocation.getCurrentPosition(async position => {
      try{
      //console.log(position);
      
      lat = position.coords.latitude;
      lng = position.coords.longitude;
  
      document.getElementById('lat').textContent= lat + '°';
      document.getElementById('lng').textContent= lng + '°';
      const mymap = L.map('mapid').setView([lat,lng], 14);

      const stuff={
        attribution : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        tileURL : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        api_url : 'https://api.wheretheiss.at/v1/satellites/25544',
        
      };
    
      const tiles = L.tileLayer(stuff.tileURL,stuff.attribution,{id: 'mapbox.streets'});
      tiles.addTo(mymap);
      //const weather_api ='weather/ ${lat},${lng}';
      const url_api = `weather/${lat},${lng}`;
      const response = await fetch(url_api);
      const json = await response.json();
      console.log(json.aq.results[21]);
      weather = {
        sum: json.weather.currently.summary,
        temp: json.weather.currently.temperature,
        hum: json.weather.currently.humidity
      }
      feel = 'feeling ' + document.getElementById('feel').value;
      const marker = L.marker([lat, lng]).addTo(mymap)
      .bindPopup(`my location is latitude: ${lat}°, logitude: ${lng}°, 
      the weather is ${weather.sum} with temperature ${weather.temp}°C
      and humidity is ${weather.hum} and im ${feel}`)
      .openPopup()
      //document.getElementById('aq').textContent = json.aq.results[21].measurements.parameter=pm25;
      //document.getElementById('aq_val').textContent = json.aq.results.measurements.value;
      //document.getElementById('aq_units').textContent = json.aq.results.measurements.units;
      //document.getElementById('aq_date').textContent = json.aq.results.measurements.lastUpdated;
      document.getElementById('weather').textContent = json.weather.currently.summary;
      document.getElementById('temp').textContent = json.weather.currently.temperature;
      console.log(json);

    }
      catch(error){
        console.error(error);  
    }

      });
  } else {
      console.log('geo not available');
  }
  });
  
  document.getElementById('send').addEventListener('click',async event=> {
      video.loadPixels();
      const image64 = video.canvas.toDataURL();
      feel = 'feeling ' + document.getElementById('feel').value;
      const data = { lat, lng ,image64, weather ,feel};
      document.getElementById("demo").innerHTML = JSON.stringify(data);
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      const response = await fetch('/api', options);
      const json = await response.json();
      console.log(json);
  
  });

}

/*let lat, lng;
const button = document.getElementById('location');
button.addEventListener('click', async event => {
  const data = { lat, lng };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const response = await fetch('/api', options);
  const json = await response.json();
  console.log(json);
});
if ('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async position => {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    document.getElementById('lat').textContent = lat;
    document.getElementById('lng').textContent = lng;
  });
} else {
  console.log('geolocation not available');
}*/