song = "";
song1= "";
song2= "";
scoreleftwrist = 0;
leftwristx = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy = 0;
scorerightwrist = 0;

function preload(){
    song1 = loadSound("avengers.mp3");
    song2 = loadSound("harrypotter.mp3");
}

function setup(){
    canvas = createCanvas(600,450);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelloaded);
    posenet.on('pose', gotposes);
}

function modelloaded(){
    console.log("modelloaded");
}

function gotposes(result){
    console.log(result);
    if(result.length > 0){
        leftwristx = result[0].pose.leftWrist.x;
        leftwristy = result[0].pose.leftWrist.y;
        rightwristx = result[0].pose.rightWrist.x;
        rightwristy = result[0].pose.rightWrist.y;
        scoreleftwrist = result[0].pose.keypoints[9].score;
        scorerightwrist = result[0].pose.keypoints[10].score;
    }
}

function draw(){
    image(video, 0, 0, 600, 450);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    fill(0, 0, 100);
    stroke(100, 0, 0);
    if(scoreleftwrist > 0.2){
        circle(leftwristx, leftwristy, 20);
        song1.stop();
        if(song2_status == false){
            song2.play();
        }        
    }
    if(scorerightwrist > 0.2){
        circle(rightwristx, rightwristy, 20);
        song2.stop();
        if(song1_status == false){
            song1.play();
        }        
    }
}
//if(song1_status = false){
    //song1.play();
    //document.getElementById("songname").innerHTML = "avengers theme";
//}