const images = [
    'pic2.jpg',
    'pic1.jpg',
    'rainbow.jpg',
    'pic3.jpg',
];
  rainstuff(images)
  .then(response =>{
    //console.log('function works');
  })
  .catch(error => {
    console.log('error!');
    console.error(error);
  });

  poemstuff()
  .then(response =>{
    //console.log('function works');
    document.getElementById('poem').innerText = response;
  })
  .catch(error => {
    console.log('error!');
    console.error(error);
  });

  async function rainstuff(images){
    for (let image of images){
    const response = await fetch(image);
    const blob = await response.blob();
    const img = document.createElement('img');
    img.src = URL.createObjectURL(blob);
    img.width = '200';
    document.body.append(img);
    }
  }

  async function poemstuff(){
    const response = await fetch('poem.txt');
    return await response.text();
  }

  document.getElementById('submit').addEventListener('click',async ()=>{
    const stuff = document.getElementById('input').value;
    const data = { stuff };
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

  async function mongodb(){
    const response = await fetch('/mongoget');
    const data = await response.json();
    console.log(data);
  }
  mongodb();

  document.getElementById('submit').addEventListener('click',async ()=>{
    const stuff = document.getElementById('input').value;
    const data = [{ 
        "id" : `${stuff}`
    }];
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const response = await fetch('/mongopost', options);
    const json = await response.json();
    console.log(json);
  });
  /*fetch('rainbow.jpg')
  .then(response => {
    console.log(response);
    return response.blob();
  })
  .then(blob => {
    console.log(blob);
    document.getElementById('rainbow').src = URL.createObjectURL(blob);
  })
  .catch(error => {
    console.log('error!');
    console.error(error);
  });*/
  