song = "";
status = "";
objects = [];
function preload(){
    song = loadSound('music.mp3')
}
function setup(){
canvas = createCanvas(380, 380);
canvas.center();
video = createCapture(VIDEO);
video.hide();
video.size(380, 380)
}
function start(){
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Object Detecting";
}
function modelLoaded(){
    console.log("COCOSSD is Initialized");
    status = true;
}
function gotResults(error, results){
    if(error){
        console.log(error)
    }
    console.log(results);
    objects = results;
}
function draw(){
image(video, 0, 0, 380, 380);
if(status != ""){
    r = random(255);
    g = random(255);
    b = random(255);
    objectdetector.detect(video, gotResults);
    document.getElementById("no-obj").innerHTML = "No. of objects detected = " + objects.length;
    for(i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Status : Object Detected";
        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label == "person"){
            document.getElementById("found").innerHTML = "Baby Detected";
            song.stop();
        }
        else{
            document.getElementById("found").innerHTML = "Baby NOT Detected";
            song.play();
        }
    }
    if(objects.length == 0){
        document.getElementById("found").innerHTML = "Baby NOT Detected";
        song.play();
    }
}
}
