song="";
song1="";
songFINAL="What Makes you Beautiful Soundtrack.mp3";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristScores = 0;
rightWristScores = 0;


function preload(){
   song = loadSound("What Makes you Beautiful Soundtrack.mp3");
   song1 = loadSound("Faded Soundtrack.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.position(500, 230);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function modelLoaded(){
    console.log("Model Loaded");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X - " + leftWristX + "  |  Left Wrist Y - " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X - " + rightWristX + "  |  Right Wrist Y - " + rightWristY);
        
        leftWristScores = results[0].pose.keypoints[9].score;
        rightWristScores = results[0].pose.keypoints[10].score;
        if(leftWristScores > 0.10 && rightWristScores > 0.10){
        console.log("Left Wrist Accuracy - " + leftWristScores + "  |  Right Wrist Accuracy - " + rightWristScores)
    }
    }
}

function draw(){
    image(video, 0, 0, 600, 500);

    
    fill("#FFFFFF");
    stroke("#008080");

        if(rightWristScores > 0.01){
            circle(rightWristX, rightWristY, 30);

            NumberRightWrist = Number(rightWristX);
            NoDecimal = floor(NumberRightWrist);
            
            if(NumberRightWrist > 0 && NumberRightWrist <= 250){
            document.getElementById("song_img").src = "Faded Cover.jpg";
            document.getElementById("song").innerHTML = "Faded" + '<br>'  + "- Alan Walker";
            songFINAL = song1;
            }
            else if(NumberRightWrist > 250 && NumberRightWrist <=500){
            document.getElementById("song_img").src = "Cover1.png";
            document.getElementById("song").innerHTML = "What Makes You Beautiful" + '<br>'  + "- One Direction";
            songFINAL = song;
            }
        }

    if(leftWristScores > 0.01){
        circle(leftWristX, leftWristY, 30);
        NumberLeftWrist = Number(leftWristY);
        NoDecimal = floor(NumberLeftWrist / 10);
        NoDecimal2 = floor(NumberLeftWrist);
        volume = NoDecimal2 / 500;
        document.getElementById("volume").innerHTML = "Volume: " + NoDecimal + "%";
        song.setVolume(volume);
    }


}

function playsong(){
    songFINAL.stop();
    songFINAL.play();
    songFINAL.setVolume(1);
    songFINAL.rate(1);
}

