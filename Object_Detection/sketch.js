// let img;
let video;
let detector;
let detections = [];

function preload(){
    // img = loadImage('./images/img3.jpg');
    detector = ml5.objectDetector('cocossd');

}

function gotDetections(error, results){
    if(error){
        console.error(error);
    }
    // console.log(results);  
    detections = results;
    // console.log("hello");
    console.log(detections);
    detector.detect(video, gotDetections);
}

function setup(){
    createCanvas(640, 480);
    console.log(detector);
    video = createCapture(VIDEO);
    video.size(640,480);
    // video.hide();
    // image(img, 0, 0);
    console.log("ready");
    detector.detect(video, gotDetections);
}

function draw(){
    image(video, 0, 0);

    for(let i = 0; i < detections.length; i++){
        let object = detections[i];
        stroke(0, 255, 0);
        strokeWeight(4);
        noFill();
        rect(object.x, object.y, object.width, object.height);
        noStroke();
        fill(0);
        textSize(24);
        text(object.label, object.x+10, object.y+24);
    }
}