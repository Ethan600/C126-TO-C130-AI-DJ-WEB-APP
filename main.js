song = "";

leftHandWristX = 0;
leftHandWristY = 0;

rightHandWristX = 0;
rightHandWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(400, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 400, 400);
    fill("#FFFF00");
    stroke("#FFFF00");

    if(scoreLeftWrist > 0.2){
        circle(leftHandWristX, leftHandWristY, 40);
        inNumberLeftWrist = Number(leftHandWristY);
        remove_decimals = floor(inNumberLeftWrist);
        volume = remove_decimals/400;
        document.getElementById("volume").innerHTML("Volume = " + volume);
        song.setVolume(volume);
    }

    if(scoreRightWrist > 0.2){
        circle(rightHandWristX, rightHandWristY, 40);

        if(rightHandWristY > 0 && rightHandWristY <= 100){
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }

        else if(rightHandWristY > 100 && rightHandWristY <= 200){
            document.getElementById("speed").innerHTML = "Speed = 1.0x";
            song.rate(1);
        }

        else if(rightHandWristY > 200 && rightHandWristY <= 300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }

        else if(rightHandWristY > 300 && rightHandWristY <= 400){
            document.getElementById("speed").innerHTML = "Speed = 2.0x";
            song.rate(2);
        }

        else if(rightHandWristY > 400){
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop(){
    song.stop();
}

function modelLoaded(){
    console.log("PoseNet is initialized");
}

function gotPoses(result){
    if(result.length > 0){
        console.log(result);
        scoreRightWrist = result[0].pose.keypoints[10].score
        scoreLeftWrist = result[0].pose.keypoints[9].score;
        console.log("score of left wrist = " + scoreLeftWrist);
        console.log("score of right wrist = " + scoreRightWrist);


        leftHandWristX = result[0].pose.leftWrist.x;
        leftHandWristY = result[0].pose.leftWrist.y;
        console.log("The left hand wrist's x = " + leftHandWristX + "and the y =" + leftHandWristY);

        rightHandWristX = result[0].pose.rightWrist.x;
        rightHandWristY = result[0].pose.rightWrist.y;
        console.log("The right hand wrist's x = " + rightHandWristX + "and the y =" + rightHandWristY);
    }
}
