
        async function getData(){
            const response = await fetch('/api');
            const data = await response.json();
            console.log(data);
            for (item of data){
                const root1 = document.createElement('div');
                const ltlg= document.createElement('div');
                const time= document.createElement('div');
                const weathers = document.createElement('div');
                const weathert = document.createElement('div');
                const weatherh = document.createElement('div');
                const feel = document.createElement('div');
                const image= document.createElement('img');
                feel.textContent = item.feel;
                weathers.textContent = item.sum_of_person;
                weathert.textContent = `${item.temp_of_person}°`;
                weatherh.textContent = item.hum_of_person;
                ltlg.textContent = `${item.lat_of_person}°, ${item.lng_of_person}°`;
                const dateString = new Date(item.time).toLocaleString();
                time.textContent = dateString;
                image.src = item.image64;
                image.alt="picture of user";
                image.height="200";
                image.width="300";

                //console.log(time,image,ltlg,weathers,weathert,weatherh,feel);
                if (item.sum_of_person != null){
                root1.append(time,image,ltlg,weathers,weathert,weatherh,feel);
                document.body.append(root1);
                }
            }
}
getData();