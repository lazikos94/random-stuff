//model
const model= tf.sequential();

// create fully connected layers 
const hidden1 = tf.layers.dense({
    units: 4,//nodes
    inputShape:[10],
    activation: 'sigmoid'
});
//add the layer i made
model.add(hidden1);

const hidden2 = tf.layers.dense({
    units: 8,//nodes
    inputShape:[4],
    activation: 'sigmoid'
});
//add the layer i made
model.add(hidden2);

const output = tf.layers.dense({
    units: 1,
    //inputShape unnecessary cause it kinda figures it out
    inputShape: [8],
    activation: 'sigmoid'
});
//add last layer
model.add(output);

//using gradient descent
const sgdoptimizer = tf.train.sgd(0.5);

model.compile({
    //model optimizer
    optimizer: sgdoptimizer,
    loss: tf.losses.meanSquaredError
    // or 'meanSquaredError'
});
//input data for training
const inputsx = tf.tensor2d([
    [0,0.1,0.12,0.11,0.13,0.16,0.15,0.2,0.22,0.145],
    [0.45,0.5,0.4,0.5,0.55,0.47,0.4,0.6,0.53,0.495],
    [0.88,0.9,0.80,0.91,0.93,0.98,0.95,1,0.81,0.893],
    
]);
//expected outputs
const outputsy = tf.tensor2d([
    [1],
    [0.5],
    [0],
]);
// async is for the promise stuff

async function training(){
    for (let i=0; i<1000;i++){
        const response = await model.fit(inputsx,outputsy,{
            epochs: 10,
            verbose: true,
            shuffle:true,
            //validationSplit:0.1
            // doing 1000 recursions and having 10 epochs is like doing 10000 recursion
            //but only see data for 10 at a time
        });
    console.log(response.history.loss[0]);
    }
}


function startTraining(){       
    //output after training/ prediction
    training().then(()=> {console.log('training done')
        let outputs =model.predict(inputsx);
        outputs.print();
    });
}