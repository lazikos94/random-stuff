
function setup(){
  noCanvas();
  const video = createCapture(VIDEO);
  video.size(320,240);

  let lat_of_person,lng_of_person;

  let feel;
  let sum_of_person,temp_of_person,hum_of_person;

  document.getElementById('location').addEventListener('click',async event=> {
  if ("geolocation" in navigator) {
      console.log('geolocation available');
      navigator.geolocation.getCurrentPosition(async position => {
      try{
      
      lat_of_person = position.coords.latitude;
      lng_of_person = position.coords.longitude;
  
      document.getElementById('lat').textContent= lat_of_person + '°';
      document.getElementById('lng').textContent= lng_of_person + '°';
      const mymap = L.map('mapid').setView([lat_of_person,lng_of_person], 14);

      const stuff={
        attribution : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        tileURL : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        api_url : 'https://api.wheretheiss.at/v1/satellites/25544',
        
      };
    
      const tiles = L.tileLayer(stuff.tileURL,stuff.attribution,{id: 'mapbox.streets'});
      tiles.addTo(mymap);
      //const weather_api ='weather/ ${lat},${lng}';
      const url_api = `weather/${lat_of_person},${lng_of_person}`;
      const response = await fetch(url_api);
      const json = await response.json();
  

      sum_of_person = json.weather.currently.summary;
      temp_of_person =  json.weather.currently.temperature;
      hum_of_person = json.weather.currently.humidity;
      
      feel = 'feeling ' + document.getElementById('feel').value;
      const marker = L.marker([lat_of_person, lng_of_person]).addTo(mymap)
      .bindPopup(`my location is latitude: ${lat_of_person}°, logitude: ${lng_of_person}°, 
      the weather is ${sum_of_person} with temperature ${temp_of_person}°C
      and humidity is ${hum_of_person} and im ${feel}`)
      .openPopup()
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
      const data = { lat_of_person, lng_of_person ,image64,sum_of_person,temp_of_person,hum_of_person ,feel};
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