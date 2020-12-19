var ball;
var database, position;

function setup(){
    database = firebase.database()
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    // refering to the position node of the databse
    var ballPosition = database.ref("ball/position");
    // create a listener to the database i.e, one that keeps on listening to the data from the database
    ballPosition.on("value", readPosition, showError)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-2,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(2,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-2);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,2);
    }
    drawSprites();
}
// changing the psoition in the database
function changePosition(x,y){
    database.ref("ball/position").set({
        x: position.x + x,
        y: position.y + y
    })
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function readPosition(data){

position = data.val()
ball.x = position.x
ball.y = position.y
}

function showError(){

console.log("It's a trap!")

}
