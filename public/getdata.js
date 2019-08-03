async function getData(){
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);

    for (item of data){
        
        const root = document.createElement('p');
        const lat = document.createElement('div');
        const lng = document.createElement('div');
        const alt = document.createElement('div');
        const weather = document.createElement('div');
        const temp = document.createElement('div');
        const hum = document.createElement('div');
        const time = document.createElement('div');

        lat.textContent =`${item.isslat}°`;
        lng.textContent = `${item.isslng}°`;
        alt.textContent = `${item.issalt}`;
        weather.textContent = `${item.issweather}`;
        hum.textContent = `${item.isshum}`;
        temp.textContent = `${item.isstemp}`;
        time.textContent = new Date(item.time).toLocaleString();

       // console.log(time,lat,lng,alt,weather,temp,hum);
        if (item.issalt != null){
        root.append(time,lat,lng,alt,weather,temp,hum);
        document.body.append(root);
        }
        

    }
}
getData();