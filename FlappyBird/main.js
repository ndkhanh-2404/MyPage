var canvas = document.getElementById('gameZone');
var context = canvas.getContext('2d');
var scoreShow = document.getElementById('score');

var birdImg = new Image();
var mainScreen = new Image();
var pipeOn = new Image();
var pipeBelow = new Image();
birdImg.src="images/bird.png";
mainScreen.src="images/nenchinh.png";
pipeOn.src="images/ongtren.png";
pipeBelow.src="images/ongduoi.png";

var score = 0;
var distanceOfTwoPipes = 140;
var distanceToPipeBelow;
var bird={
    x : 900/5,
    y : 500/2
}
var pipe = [];
pipe[0]={
    x : canvas.width,
    y : 0
}

function run(){
    context.drawImage(mainScreen,0,0);
    context.drawImage(birdImg,bird.x,bird.y);
    for(var i = 0; i < pipe.length; i++){
        distanceToPipeBelow = pipeOn.height + distanceOfTwoPipes;
        context.drawImage(pipeOn,pipe[i].x, pipe[i].y);
        context.drawImage(pipeBelow,pipe[i].x,pipe[i].y + distanceToPipeBelow);
        pipe[i].x-=5;

        if(pipe[i].x == canvas.width/2){
            pipe.push({
                x:canvas.width,
                y:Math.floor(Math.random()*pipeOn.height)-pipeOn.height
            })
        }
        if(pipe[i] == 0) pipe.splice(0,1);
        if(pipe[i].x == bird.x) score++;
        if(bird.y+birdImg.height == canvas.height ||
            bird.x+birdImg.width >= pipe[i].x && bird.x <= pipe[i].x + pipeOn.width
            && (bird.y <= pipe[i].y+pipeOn.height || bird.y+birdImg.height >= pipe[i].y + distanceToPipeBelow)
        ){
            return;
        }
    }

    scoreShow.innerHTML="score :"+score;
    bird.y+=3;
    requestAnimationFrame(run);
}
document.addEventListener("keydown",function(){
    bird.y-=60;
})
run();
