let r,g,b;
let database;
let bodyElement;
let buttons = [];
let rgbDiv;
let colorByLabel = {
    'blue-ish': [],
    'green-ish': [],
    'pink-ish': [],
    'grey-ish': [],
    'red-ish': [],
    'purple-ish': [],
    'brown-ish': [],
    'orange-ish': [],
    'yellow-ish': [],
};
let colors=[];
let labels=[];
let data;
//var firebase = require("firebase/app");
//require("firebase/auth");
//require("firebase/firestore");

function setup(){
    // Your web app's Firebase configuration
    //const apiKey = process.env.API_KEYfire;
    var firebaseConfig = {
        apiKey: "your key here",
        authDomain: "tensorcolors.firebaseapp.com",
        databaseURL: "https://tensorcolors.firebaseio.com",
        projectId: "tensorcolors",
        storageBucket: "",
        messagingSenderId: "168911603559",
        appId: "1:168911603559:web:41fa7da6e999c543"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          // ...
        } else {
          // User is signed out.
          // ...
        }
        // ...
    });
    database = firebase.database();
    let ref = database.ref('tensorcolors');
    ref.on('value',getData);

    console.log(firebase);
    
    
    createCanvas(200,200).parent('#root');
    //rgbDiv = createDiv().parent('#root');
    bodyElement = document.body;
    pickColor();


    //rgbDiv.html(`R:${r} G:${g} B:${b}`);
  
    buttons.push(createButton('red-ish').parent('#root').class('red-ish'));
    buttons.push(createButton('green-ish').parent('#root').class('green-ish'));
    buttons.push(createButton('blue-ish').parent('#root').class('blue-ish'));
    buttons.push(createButton('orange-ish').parent('#root').class('orange-ish'));
    buttons.push(createButton('yellow-ish').parent('#root').class('yellow-ish'));
    buttons.push(createButton('pink-ish').parent('#root').class('pink-ish'));
    buttons.push(createButton('purple-ish').parent('#root').class('purple-ish'));
    buttons.push(createButton('brown-ish').parent('#root').class('brown-ish'));
    buttons.push(createButton('grey-ish').parent('#root').class('grey-ish'));
  
  
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].mouseClicked(sendData);
    }
}

function pickColor(){
    
    r = random(256);
    g = random(256);
    b = random(256);
    background(r,g,b);
}

function sendData() {
let colorDatabase = database.ref('tensorcolors');

  let data = {
    r: r,
    g: g,
    b: b,
    label: this.html()
  };
  console.log('saving data');
  //console.log(data);

  let color = colorDatabase.push(data, finished);
  console.log("Firebase generated key: " + color.key);

  function finished(err) {
    if (err) {
      console.error("ooops, something went wrong.");
      console.error(err);
    } else {
      console.log('Data saved successfully');
      pickColor();
    }
  }
}

function getData(results){
    let data = results.val();
   // console.log(data);
    let keys = Object.keys(data);
   // console.log(keys.length);
    let allData={
      entries : []  
    }

    for (let key of keys) {
        let record = data[key];
        //  console.log(record);
        let col = color(record.r,record.g,record.b);
        colorByLabel[record.label].push(col);
        let coltensor = [record.r/255,record.g/255,record.b/255];
        colors.push(coltensor);
        labels.push(record.label);
        allData.entries.push(record);
    }
    console.log(colorByLabel);
    //console.log(labels);
   // saveJSON(allData,'colorData.json');
}

/*function loadBigData(){
    data = loadJSON('colorbigData.json');
    let bigDatacolors = [];
    for (let record of data.entries){
        let bigcol = [record.r/255,record.g/255,record.b/255];
        bigDatacolors.push(bigcol);
    }
    let xs = tf.tensor2d(bigDatacolors);
    xs.print();
}*/



