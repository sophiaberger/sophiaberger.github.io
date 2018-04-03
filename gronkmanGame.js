var gronkman;
var dennis;
var sheila;
var canvasHeight;
var canvasWidth;
var Yamt = 1;
var Xamt = -1;
var cubicles = [];

function startGame() {
    gronkman = new component(60, 60, "Jim Torso.png", 10, 120, "image");
    dennis = new component(26.3, 50, "Dennis Flip.png", 400, 120, "image");
    //sheila = new component(60, 60, "Sheila.png", 200, 120, "image");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        canvasWidth = this.canvas.width;
        this.canvas.height = 270;
        canvasHeight = this.canvas.height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;   

    }
    this.upAndDown = function(){

        if ((this.y + Yamt > canvasHeight - this.height) || (this.y + Yamt < 0)){
            Yamt = -Yamt;
  
        }
        this.y += Yamt;
        this.x += Xamt;

    }
     this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           crash = false;
        }
        return crash;
    }

}

function updateGameArea() {
    var x;
    var y;
    for (i = 0; i < cubicles.length; i+= 1){
        if (gronkman.crashWith(cubicles[i])){
            myGameArea.stop();
            return;
        }
    }
    if (gronkman.crashWith(dennis)){
        myGameArea.stop();
    }
    else {
    myGameArea.clear();
    myGameArea.frameNo +=1;
    if (myGameArea.frameNo == 1 || everyinterval(150)){
        x = myGameArea.canvas.width;
        minHeight = 20; 
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight + 1)+ minHeight);
        minGap = 50; 
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap + 1)+ minGap);
        y = myGameArea.canvas.height - 200;
        cubicles.push(new component(10, height, "gray", x, 0));
        cubicles.push(new component(10, x- height - gap, "gray", x, height+ gap));
    }
    for (i = 0; i < cubicles.length; i+=1){
        cubicles[i].x += -1;
        cubicles[i].update();
    }
    
    dennis.upAndDown();
    dennis.update();
    gronkman.newPos();
    gronkman.update();
   // sheila.update();
    
    }
}

function moveup() {
    gronkman.speedY = -1; 
}

function movedown() {
    gronkman.speedY = 1; 
}

// function moveleft() {
//     gronkman.speedX = -1; 
// }

// function moveright() {
//     gronkman.speedX = 1; 
// }

function clearmove() {
    gronkman.speedX = 0; 
    gronkman.speedY = 0; 
}