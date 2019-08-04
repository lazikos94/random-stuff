let data;
let labelList = [
  'red-ish',
  'green-ish',
  'blue-ish',
  'orange-ish',
  'yellow-ish',
  'pink-ish',
  'purple-ish',
  'brown-ish',
  'grey-ish'
]
let lossP;
let rSlider, gSlider, bSlider;
let model;
let buttonTrain;
let buttonPredict;
let labelP;
let input;

function preload() {
  data =loadJSON('colorbigData.json');
}

function setup() {
    
    labelP = createP('');
    lossP = createP('loss');
    rSlider = createSlider(0, 255, 255);
    gSlider = createSlider(0, 255, 0);
    bSlider = createSlider(0, 255, 255);
    buttonTrain = createButton('Start Training');
    buttonTrain.mousePressed(startTraining);
    buttonPredict = createButton('Predict');
    buttonPredict.mousePressed(predict);


    const colors = [];
    const labels = [];

    for (let record of data.entries) {
        const col = [record.r / 255, record.g / 255, record.b / 255];
        colors.push(col);
        labels.push(labelList.indexOf(record.label));
    }
    model = tf.sequential();
    const hidden1 = tf.layers.dense({
        units:16,
        inputDim:3,
        activation:'sigmoid' 
    });
    model.add(hidden1);
    const hidden2 = tf.layers.dense({
        units:16,
        inputDim:16,
        activation:'sigmoid' 
    });
    model.add(hidden2);
    const output = tf.layers.dense({
        units:9,
        activation:'softmax' 
    });
    model.add(output);

    const sgdoptimizer = tf.train.sgd(0.2);

    model.compile({
        optimizer: sgdoptimizer,
        loss: 'categoricalCrossentropy'
    });

    const xs = tf.tensor2d(colors);
    xs.print();

    const labelsT = tf.tensor1d(labels,'int32');

    const ys = tf.oneHot(labelsT,9);
    labelsT.dispose();
    ys.print();

    async function training(){
            const response = await model.fit(xs,ys,{
                epochs: 20,
                shuffle:true,
                validationSplit: 0.1,
                metrics: ['accuracy'],
                callbacks:{
                    onTrainBegin: ()=> console.log('training started')+ alert('training started'),
                    onTrainEnd: ()=> console.log('training done') + alert('training done'),
                    onBatchEnd: async(num,logs) =>{
                        await tf.nextFrame();
                    },
                    onEpochEnd: (num,logs)=>{
                        console.log('Epoch: '+num);
                        console.log('Loss: '+logs.loss);
                        lossP.html('Loss: '+logs.loss);
                    }
                }
            });
    }

    function startTraining(){       
        training();
    }
    function predict(){
        let results = model.predict(input);
        let index = results.argMax(1).dataSync()[0];
        let label = labelList[index];
        labelP.html(label);
    }
}

function draw(){
    let r = rSlider.value();
    let g = gSlider.value();
    let b = bSlider.value();
    background(r , g , b);
    stroke(255);
    strokeWeight(2);
    line(frameCount % width, 0, frameCount %width,height);
    input = tf.tensor2d([
        [r/255,g/255,b/255]
    ]);

}
