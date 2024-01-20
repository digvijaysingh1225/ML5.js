let mobilenet;
let video;
let label;
let classifier;
let ukeButton;
let whistleButton;
let trainButton;


function modelReady(){
    console.log('Model is ready!!!');
    
}

function videoReady(){
    console.log("Video is Ready!!!");
}

function whileTraining(loss){
    if(loss == null){
        console.log('Training Complete');
        classifier.classify(gotResults);
    }else{
        console.log(loss);
    }
}

function gotResults(error, result){
    if(error){
        console.error(error);
    }
    else{
        // console.log(results);
        label = result;
        classifier.classify(gotResults);
        // let prob = results[0].confidence;
        
        // createP(label);
        // createP(prob);
        mobilenet.predict(gotResults);
    }
}

// function imageReady(){
//     image(puffin, 0, 0, width, height);
// }

function draw(){
    background(0);
    image(video, 0, 0, 640, 450);
    fill(255);
    textSize(30);        
    text(label, 10, height-20);
}

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    background(0);

    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    classifier = mobilenet.classification(video, videoReady);

    ukeButton = createButton('ukulele');
    ukeButton.mousePressed(function() {
        classifier.addImage('ukulele');
    });

    whistleButton = createButton('whistle');
    whistleButton.mousePressed(function() {
        classifier.addImage('whistle');
    });

    trainButton = createButton('train');
    trainButton.mousePressed(function() {
        classifier.train(whileTraining);
    });
}