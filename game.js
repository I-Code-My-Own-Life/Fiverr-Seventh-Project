// Things to achieve in our game : 
// 1 - Scroll the background on key pressing :  -- Done -- 
// 2 - Placing a few rocks at randomized places in the aqurariuim : -- Done --
// 3 - Having at least three different types of tropical fishes -- Done --  :  
// 4 - Having three schools of fishes with each school containing 8 to 12 fishes -- Done --  : 
// 5 - Making seaweeds which will slowly sway : -- Done -- 
// 6 - Producing bubbles form the rocks : -- Done -- 
// Our Game Variables : 
let goBack = true;
let goRight = true;
let aquarium;
let rock;
let rock2;
let rocks = [];
let bubbles = [];
let fishes = [];
let fishes1 = [];
let fishes2 = [];
let fishes3 = [];
let weeds = [];
let bubbleImg;
let timeToSpawnBubbles = 1;
let stop = false;
let ang = 0;
let ang1 = 0;
let ang3 = 0;
let spawn = false;
let values = [0.01,0.05,0.02,0.04,0.06,0.07];
let dxs = [0.5,0.6,0.7,0.8,0.9];
let loading = false;
let colorarray = ['#b04119','yellow','blue']
function preload(){
    loading = true;
}
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const AQUARIUM_WIDTH = 1500;
const AQUARIUM_HEIGHT = 400;
let backgroundx = 0;
let backgroundy = 0;
let i = 0;
// Defining our background : 
// Our function setup : 
function setup(){
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    for(let i = 0; i < 12; i++){
        addWeed()
    }
    angleMode(RADIANS);
}
function draw(){
    // Let's draw our Aquarium image here : 
    background(0)
    // Moving the background here :
    background1.update();
    // Placing rocks at randomized loactions in the aquarium : 
    for(let rock of rocks){
        rock.place();
        rock.radius = 13;
    }
    // Let's produce some bubbles :
    for(let i = 0; i < bubbles.length; i++){
        bubbles[i].produce();
        if(bubbles[i].y <= 0){
            bubbles.splice(i,1)
        }
    }
    // Spawning the school of fishes (Number 1): 
    for(let fish of fishes1){
        fish.swim();
        // console.log(fish);
    }
    for (let fish of fishes2){
        fish.swim();
    }
    for (let fish of fishes3){
        fish.swim();
    }
    for(let fish of fishes){
        fish.swim();
    }
    // Something related to seaweed : 
    prepWeeds();
    weeds.filter(weed=>weed.basey < height*9/10).map((weed)=>drawWeed(weed));
    prepWeeds();
    weeds.filter(weed=>weed.basey >= height*9/10).map((weed)=>drawWeed(weed));
    ground.spawn();
    for(let i = 0; i < rocks.length; i++){
        console.log(rocks[i])
    }
}
                                // All of our classes are going to be here : 
let c1;
let c2;
let n;
// Let's make a Background class: 
class Background {
    constructor(gameWidth,gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = aquarium;
        this.x = 0;
        this.y = 0;
        this.width = AQUARIUM_WIDTH;
        this.height = AQUARIUM_HEIGHT;
        this.speed = 0;
    }
    drawBackground(){
        // image(aquarium,this.x,this.y,this.width,this.height);
        // Water : 
        c1 = color(112, 225, 203);
        c2 = color(18, 96, 252);

        for(let y=0; y<height; y++){
        n = map(y,0,height,0,1);
        let newc = lerpColor(c1,c2,n);
        stroke(newc);
        line(0,y,this.width, y);
        }
        // image(aquarium,this.x + this.width,this.y,this.width,this.height);
    }
    update(){
        this.drawBackground();
        this.x += this.speed;
        if(this.x > 0){
            stop = false;
            goBack = false;
            this.speed = 0;
        }
        if(this.x < 0 - this.width) this.x = 0;
        if(this.x < -1085) {
        stop = true;
        this.speed = 0;
        goRight = false;
        }
        console.log("Background's x from class is  ",this.x);
    }
}
class Ground{
    constructor(x,y,width,height,speed){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }
    spawn(){
        // Ground : 
        fill("brown")
        rect(this.x,this.y,this.width,this.height);
        this.x += this.speed;
        if(this.x > 0){
            stop = false;
            goBack = false;
            this.speed = 0;
        }
        if(this.x < 0 - this.width) this.x = 0;
        if(this.x < -1085) {
        stop = true;
        this.speed = 0;
        goRight = false;
        }
    }
}
let ground = new Ground(-10,CANVAS_WIDTH - 35,1515,60,1);
// Making the background class's Instance: 
let background1 = new Background(CANVAS_WIDTH,CANVAS_HEIGHT);
// Let's make a class Rock : 
class Rock{
    constructor(x,y,radius,steps,dx){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.steps = steps;
        this.dx = dx;
        this.i = 0;
    }
    place(){
        this.radius = 13;
        this.x += this.dx;
        let xValues = [];
        let yValues = [];
        for (let i = 0; i < this.steps; i++) {
            strokeWeight(2);
            stroke(104, 102, 110);
            let rad = this.radius + random(-this.radius / 10,this.radius / 10) // you can change the 10 here to how intense you want the change to be;
            xValues[i] = (this.x + rad * cos(2 * PI * i / this.steps));
            yValues[i] = (this.y + rad * sin(2 * PI * i / this.steps));
        }
        beginShape();
        for(let i = 0; i < xValues.length; i ++){
            fill("gray")
            curveVertex(xValues[i], yValues[i]);
        }
        endShape(CLOSE);
    }
};
// Let's make a class Bubble : 
class Bubble{
    constructor(x,y,size,dx,dy){
        this.x = x;
        this.y = y;
        this.size = size;
        this.dx = dx;
        this.dy = dy;
    }
    produce(){
        bubble(this.x,this.y,this.size)
        // image(bubbleImg,this.x,this.y,this.width,this.height);
        this.size += 0.1
        this.y += this.dy;
        this.dy += 0.01
        this.x += this.dx;
        // this.dx = Math.cos(ang)
    }
};
// Now, let's make the most important class of our game FISH (Number 1) : 
let s = 0.9;
let sc = 0.00001;
let rotateFish = true;
let rotateFish2 = true;
let ro = 0;
class Fish{
    constructor(x,y,height,length,dx,dy){
        this.x = x;
        this.y = y;
        this.height = height;
        this.length = length;
        this.dx = dx;
        this.dy = dy;
    }
    swim (){
        // if(this.x > 360){
        //     this.dx = - this.dx;
        //     if(rotateFish){
        //         ro++;
        //         rotateFish = false;
        //         rotateFish2 = true;
        //     }
        // }
        // else if (this.x < 20){
        //     this.dx = - this.dx;
        //     if(rotateFish2){
        //         ro++;
        //         rotateFish2 = false;
        //         rotateFish = true;
        //         // rotateFish2 = true;
        //     }
        // }
        // if(this.x > 360 || this.x < 20){
        //     this.dx = - this.dx;
        // }
        if(this.x < -10){
            this.dx = - this.dx;
        }
        // console.log(background1.x,this.x)
        if(this.x > 360 && background1.x <= -1085){
            this.dx = - this.dx;
        }
        noStroke();
        fill('tomato');
        // this.y = constrain(this.y, 30, height - 30);
        // this.x = constrain(this.x, 30, width - 30);
        push();
        translate(this.x, this.y);
        // Rotate here : 
        // if(ro % 2 == 0){
        //     rotate(0)
        // }
        // else{
        //     rotate(Math.PI)
        // }
        // console.log(this.dx
        if(Math.sign(this.dx) == 1){
            rotate(0);
        }
        else if(Math.sign(this.dx) == -1){
            rotate(Math.PI);
        }
        ellipse(0, 0, this.length, this.height);
        push()
        // tail
        scale(s)
        if(s > 1 || s < 0.8){
          sc = -sc;
        }
        s+=sc;
        // console.log(s)
        let tailWidth = this.length / 4;
        let tailHeight = this.height / 2;
        fill(245, 15, 7)
        triangle(0 - this.length / 2, 0, 0 - this.length / 2 - tailWidth, 0 - tailHeight, 0 - this.length / 2 - tailWidth, 0 + tailHeight);
        // eye
        pop()
        noStroke();
        fill(33, 33, 33);
        ellipse(0 + this.length / 4, 0, this.height / 5, this.height / 5);
        pop();
        // this.x -= speed;
        this.y += Math.sin(ang);
        this.x += this.dx * 2;
        ang+= 0.008;
    }
}
// And now let's make another class FISH (Number 2) : 
let s1 = 0.9;
let sc1 = 0.00001;
class Fish2 extends Fish{
    constructor(x,y,height,length,dx,dy){
        super(x,y,height,length,dx,dy);
    }
    swim(){
        if(this.x < -10){
            this.dx = - this.dx;
        }
        if(this.x > 360 && background1.x <= -1085){
            this.dx = - this.dx;
        }
        noStroke();
        fill(130, 245, 7);
        push();
        translate(this.x, this.y);
        // Rotate here : 
        if(Math.sign(this.dx) == 1){
            rotate(0);
        }
        else if(Math.sign(this.dx) == -1){
            rotate(Math.PI);
        }
        // curve(95, 26, 53, 24, 53, 61, 125, 65);
        ellipse(0, 0, this.length, this.height);
        fill(186, 245, 7)                
        push()
        // tail
        scale(s1)
        if(s1 > 1 || s1 < 0.8){
            sc1 = -sc1;
        }
        s1+=sc1;
        let tailWidth = this.length / 4;
        let tailHeight = this.height / 2;
        triangle(0 - this.length / 2, 0, 0 - this.length / 2 - tailWidth, 0 - tailHeight, 0 - this.length / 2 - tailWidth, 0 + tailHeight);
        // eye
        pop()
        noStroke();
        fill(23, 53, 203);
        ellipse(0 + this.length / 4, 0, this.height / 5, this.height / 5);
        pop();
        this.y += Math.sin(ang1) 
        this.x += this.dx;
        ang1+= 0.01;
    }
};
// And now let's make another class FISH again but that's.... (Number 3) : 
let s3 = 0.8;
let sc3 = 0.00001;
class Fish3 extends Fish{
    constructor(x,y,height,length,dx,dy){
        super(x,y,height,length,dx,dy);
    }
    swim(){
        if(this.x < -10){
            this.dx = - this.dx;
        }
        if(this.x > 360 && background1.x <= -1085){
            this.dx = - this.dx;
        }
        noStroke();
        fill(7, 250, 165);
        push();
        translate(this.x, this.y);
        // Rotate here : 
        if(Math.sign(this.dx) == 1){
            rotate(0);
        }
        else if(Math.sign(this.dx) == -1){
            rotate(Math.PI);
        }
        // curve(95, 26, 53, 24, 53, 61, 125, 65);
        ellipse(0, 0, this.length, this.height);
        fill(245, 7, 245)                
        push()
        // tail
        if(s3 > 1 || s3 < 0.7){
            sc3 = -sc3;
        }
        s3+=sc3;
        // sc3 -= 0.001
        let tailWidth = this.length / 4;
        let tailHeight = this.height / 2;
        scale(s3)
        triangle(0 - this.length / 2, 0, 0 - this.length / 2 - tailWidth, 0 - tailHeight, 0 - this.length / 2 - tailWidth, 0 + tailHeight);
        // eye
        pop()
        noStroke();
        fill(23, 53, 203);
        ellipse(0 + this.length / 4, 0, this.height / 5, this.height / 5);
        pop();
        this.y += Math.sin(ang3) 
        this.x += this.dx;
        ang3+= 0.01;
    }
};
// So, now we are going to make schools of fish containg 9 fishes : 
// let x = 380;
let rand;
let rands = [0,1,2]
rand = rands[Math.floor(Math.random() * rands.length)]
if(rand == 0){
    // Random coordinates for our fishes (Number 1 school) : 
    let x = randomIntFromInterval(40, 150);
    let y = randomIntFromInterval(20, 350);
    let dx = dxs[Math.floor(Math.random() * dxs.length)];
    for(let i = 0; i < 10; i++){
        // Up LEFT : 
        if(i == 1){
            x = x - 40;
        } 
        // Up Right : 
        if(i == 2){
            x = x + 80;
        }
        // Center : 
        if(i == 3){
            x = x - 40;
            y = y + 25;
        }
        // Center Left :
        if(i == 4){
            x = x - 40;
        }
        // Center Right : 
        if(i == 5){
            x = x + 80;
        }
        // Down : 
        if(i == 6){
            x = x - 40;
            y = y + 25;
        }
        // Down Left : 
        if(i == 7){
            x = x - 40;
        }
        if(i == 8){
            x = x + 80;
        }
        fishes1.push(new Fish(x,y,15,27,dx,1));
    };
}
else if(rand == 1){
    // Random coordinates for our fishes (Number 2 school) : 
    let x2 = randomIntFromInterval(40, 150);
    let y2 = randomIntFromInterval(50, 350);
    let dx = dxs[Math.floor(Math.random() * dxs.length)];
    for(let i = 0; i < 10; i++){
        // Up LEFT : 
        if(i == 1){
            x2 = x2 - 40;
        } 
        // Up Right : 
        if(i == 2){
            x2 = x2 + 80;
        }
        // Center : 
        if(i == 3){
            x2 = x2 - 40;
            y2 = y2 + 25;
        }
        // Center Left :
        if(i == 4){
            x2 = x2 - 40;
        }
        // Center Right : 
        if(i == 5){
            x2 = x2 + 80;
        }
        // Down : 
        if(i == 6){
            x2 = x2 - 40;
            y2 = y2 + 25;
        }
        // Down Left : 
        if(i == 7){
            x2 = x2 - 40;
        }
        if(i == 8){
            x2 = x2 + 80;
        }
        fishes2.push(new Fish2(x2,y2,15,27,dx,1));
    };        
}
else{
    // Random coordinates for our fishes (Number 3 school) : 
    let x3 = randomIntFromInterval(40, 150);
    let y3 = randomIntFromInterval(50, 350);
    let dx = dxs[Math.floor(Math.random() * dxs.length)];;
    for(let i = 0; i < 10; i++){
        // Up LEFT : 
        if(i == 1){
            x3 = x3 - 40;
        } 
        // Up Right : 
        if(i == 2){
            x3 = x3 + 80;
        }
        // Center : 
        if(i == 3){
            x3 = x3 - 40;
            y3 = y3 + 25;
        }
        // Center Left :
        if(i == 4){
            x3 = x3 - 40;
        }
        // Center Right : 
        if(i == 5){
            x3 = x3 + 80;
        }
        // Down : 
        if(i == 6){
            x3 = x3 - 40;
            y3 = y3 + 25;
        }
        // Down Left : 
        if(i == 7){
            x3 = x3 - 40;
        }
        if(i == 8){
            x3 = x3 + 80;
        }
        fishes3.push(new Fish3(x3,y3,15,27,dx,1));

    };
}
let S = 0;
setInterval(()=>{
    if(S <= 2){
        s3 = 0.8;
        sc3 = 0.001;
        s1 = 0.9;
        sc1 = 0.001;
        s = 0.9;
        sc = 0.001;
        rand = rands[Math.floor(Math.random() * rands.length)]
        if(rand == 0){
            // Random coordinates for our fishes (Number 1 school) : 
            let x = randomIntFromInterval(40, 150);
            let y = randomIntFromInterval(20, 350);
            let dx = dxs[Math.floor(Math.random() * dxs.length)];
            for(let i = 0; i < 10; i++){
                // Up LEFT : 
                if(i == 1){
                    x = x - 40;
                } 
                // Up Right : 
                if(i == 2){
                    x = x + 80;
                }
                // Center : 
                if(i == 3){
                    x = x - 40;
                    y = y + 25;
                }
                // Center Left :
                if(i == 4){
                    x = x - 40;
                }
                // Center Right : 
                if(i == 5){
                    x = x + 80;
                }
                // Down : 
                if(i == 6){
                    x = x - 40;
                    y = y + 25;
                }
                // Down Left : 
                if(i == 7){
                    x = x - 40;
                }
                if(i == 8){
                    x = x + 80;
                }
                fishes1.push(new Fish(x,y,15,27,dx,1));
            };
        }
        else if(rand == 1){
            // Random coordinates for our fishes (Number 2 school) : 
            let x2 = randomIntFromInterval(40, 150);
            let y2 = randomIntFromInterval(50, 350);
            let dx = dxs[Math.floor(Math.random() * dxs.length)];
            for(let i = 0; i < 10; i++){
                // Up LEFT : 
                if(i == 1){
                    x2 = x2 - 40;
                } 
                // Up Right : 
                if(i == 2){
                    x2 = x2 + 80;
                }
                // Center : 
                if(i == 3){
                    x2 = x2 - 40;
                    y2 = y2 + 25;
                }
                // Center Left :
                if(i == 4){
                    x2 = x2 - 40;
                }
                // Center Right : 
                if(i == 5){
                    x2 = x2 + 80;
                }
                // Down : 
                if(i == 6){
                    x2 = x2 - 40;
                    y2 = y2 + 25;
                }
                // Down Left : 
                if(i == 7){
                    x2 = x2 - 40;
                }
                if(i == 8){
                    x2 = x2 + 80;
                }
                fishes2.push(new Fish2(x2,y2,15,27,dx,1));
            };        
        }
        else{
            // Random coordinates for our fishes (Number 3 school) : 
            let x3 = randomIntFromInterval(40, 150);
            let y3 = randomIntFromInterval(50, 350);
            let dx = dxs[Math.floor(Math.random() * dxs.length)];;
            for(let i = 0; i < 10; i++){
                // Up LEFT : 
                if(i == 1){
                    x3 = x3 - 40;
                } 
                // Up Right : 
                if(i == 2){
                    x3 = x3 + 80;
                }
                // Center : 
                if(i == 3){
                    x3 = x3 - 40;
                    y3 = y3 + 25;
                }
                // Center Left :
                if(i == 4){
                    x3 = x3 - 40;
                }
                // Center Right : 
                if(i == 5){
                    x3 = x3 + 80;
                }
                // Down : 
                if(i == 6){
                    x3 = x3 - 40;
                    y3 = y3 + 25;
                }
                // Down Left : 
                if(i == 7){
                    x3 = x3 - 40;
                }
                if(i == 8){
                    x3 = x3 + 80;
                }
                fishes3.push(new Fish3(x3,y3,15,27,dx,1));
    
            };
        }
    }

    S++;
},8000)
                                            // Individual Fishes : 
// Now, let's make individual fishes : 
let rs = [0,1];
let rand2;
for(let i = 0; i < 10; i++){
    rand2 = rands[Math.floor(Math.random() * rands.length)]
    let r = rs[Math.floor(Math.random() * rs.length)] 
    let x;
    let y = randomIntFromInterval(50, 320)
    let dx;
    if(r == 0){
        x = 45;
        dx = dxs[Math.floor(Math.random() * dxs.length)];
    }
    else{
        x = CANVAS_WIDTH;
        dx = dxs[Math.floor(Math.random() * dxs.length)];;
    }
    if(rand2 == 0){
        fishes.push(new Fish(x,y,15,27,dx,1))
    }
    else if(rand2 == 1){
        fishes.push(new Fish2(x,y,15,27,dx,1))
    }
    else{
        fishes.push(new Fish3(x,y,15,27,dx,1))
    }
}
setInterval(()=>{
    for(let i = 0; i < 6; i++){
        rand2 = rands[Math.floor(Math.random() * rands.length)]
        let r = rs[Math.floor(Math.random() * rs.length)] 
        let x;
        let y = randomIntFromInterval(50, 320)
        let dx;
        if(r == 0){
            x = 45;
            dx = dxs[Math.floor(Math.random() * dxs.length)];
        }
        else{
            x = CANVAS_WIDTH;
            dx = dxs[Math.floor(Math.random() * dxs.length)];;
        }
        if(rand2 == 0){
            fishes.push(new Fish(x,y,15,27,dx,1))
        }
        else if(rand2 == 1){
            fishes.push(new Fish2(x,y,15,27,dx,1))
        }
        else{
            fishes.push(new Fish3(x,y,15,27,dx,1))
        }
    }
},7000)
// Let's make a class Seaweed : 
let r = 227;
let v = 252;
let angle = 0;
function drawWeed(weed) {
    noFill();
    beginShape();
    ang = weed.ang;
    let x = weed.basex;
    for(let i = 0 ; i < weed.height; i++){
      const y = weed.basey - i;
      x += sin(ang)/2;
      vertex(x, y);
      ang += .2;
    }  
    weed.ang += .1;
    endShape();
    weed.basex += weed.dx;
                           
}
function addWeed(){
    weeds.push({
      basex: randomIntFromInterval(30, 1400),
      dx:0,
      basey: randomIntFromInterval(ground.y,height),
      height: random(height/5, height/3),
      ang:random(10)
    });
}
function prepWeeds(){
    stroke(50,150,50);
    strokeWeight(4);
}

// All of our functionality of the game is going to be here : 

//                 -- Keyboard Control function -- 
function KeyboardControl(){
    addEventListener("keydown",(e)=>{
        if(e.key == "ArrowRight"){
            if(goRight){
                background1.speed = -5;
                ground.speed = - 5;
                spawn = true;
                for(let i = 0; i < weeds.length; i++){
                    weeds[i].dx = -5;
                }
                for(let i = 0; i < rocks.length; i++){
                    rocks[i].dx = -5;
                    rocks[i].radius = 13;
                }
                for(let i = 0; i < fishes1.length; i++){
                    fishes1[i].x -= 76
                }
                for(let i = 0; i < fishes2.length; i++){
                    fishes2[i].x -= 6;
                }
                for(let i = 0; i < fishes3.length; i++){
                    fishes3[i].x -= 6;
                }
                for(let i = 0; i < fishes.length; i++){
                    fishes[i].x -= 6;
                }
                for(let bubble of bubbles){
                    bubble.dx = -5;
                }
            }
        } 
        else if(e.key == "ArrowLeft"){
            if(goBack){
                background1.speed = 5;
                ground.speed = 5;
                for(let i = 0; i < weeds.length; i++){
                    weeds[i].dx = 5;
                }
                for(let i = 0; i < rocks.length; i++){
                    rocks[i].dx = 5;
                }
                for(let i = 0; i < fishes1.length; i++){
                    fishes1[i].x += 6;
                }
                for(let i = 0; i < fishes2.length; i++){
                    fishes2[i].x += 6;
                }
                for(let i = 0; i < fishes3.length; i++){
                    fishes3[i].x += 6;
                }
                for(let i = 0; i < fishes.length; i++){
                    fishes[i].x += 6;
                }
                for(let bubble of bubbles){
                    bubble.dx = 5;
                }
            }
        }
    })
    addEventListener("keyup",(e)=>{
        if(e.key == "ArrowRight"){
            background1.speed = 0;
            ground.speed = 0;
            for(let i = 0; i < weeds.length; i++){
                weeds[i].dx = 0;
            }
            spawn = false;
            goRight = true;
            for(let i = 0; i < rocks.length; i++){
                rocks[i].dx = 0;
            }
            for(let i = 0; i < fishes1.length; i++){
                // fishes1[i].dx = 0.5;
            }
            for(let i = 0; i < fishes2.length; i++){
                // fishes2[i].dx = 0.8;
            }
            for(let i = 0; i < fishes3.length; i++){
                // fishes3[i].dx = 0.9;
            }
            for(let bubble of bubbles){
                bubble.dx = 0;
            }
        } 
        else if(e.key == "ArrowLeft"){
            background1.speed = 0;
            ground.speed = 0;
            for(let i = 0; i < weeds.length; i++){
                weeds[i].dx = 0;
            }
            goBack = true;
            for(let i = 0; i < rocks.length; i++){
                rocks[i].dx = 0;
            }
            for(let i = 0; i < fishes1.length; i++){
                // fishes1[i].dx = 0.5;
            }
            for(let i = 0; i < fishes2.length; i++){
                // fishes2[i].dx = 0.8;
            }
            for(let i = 0; i < fishes3.length; i++){
                // fishes3[i].dx = 0.9;
            }
            for(let bubble of bubbles){
                bubble.dx = 0;
            }
        }
    })
}
KeyboardControl();
// Function to give random number from min to max : 
function randomIntFromInterval(min,max)
{
    return Math.floor( Math.random()*  ( max - min + 1 ) + min );
}
// Pushing rocks to the rocks array :
for(let i = 0; i < 10; i++){
    let x = randomIntFromInterval(20, 1700);
    let radius = 13;
    let steps = randomIntFromInterval(7,13);
    rocks.push(new Rock(x,ground.y - radius,radius,steps,0));
}
let roc = 0
setInterval(()=>{
    roc++;
    if(roc < 3){
        for(let i = 0; i < 12; i++){
            let x = randomIntFromInterval(20, 1700);
            let radius = 13;
            let steps = randomIntFromInterval(7,13);
            rocks.push(new Rock(x,ground.y - radius,radius,steps,0));
        }
    }
},20000)
// Here, we are going to spawn bubbles at randomized rock locations every 5 seconds :
setInterval(()=>{
    let x = rocks[Math.floor(Math.random() * rocks.length)].x;
    for(let i = 0; i < 3; i++){
        let y = 325;
        let dx = randomIntFromInterval(1, 3);
        let dy = randomIntFromInterval(-2.5,-3)
        x = x + randomIntFromInterval(10,15);
        y = y + randomIntFromInterval(30, 60);
        bubbles.push(new Bubble(x,y,randomIntFromInterval(5,9),0,dy));
    };
},timeToSpawnBubbles * 1000);

setInterval(()=>{
    let x;
    if(spawn && background1.x > -1090){
        let img = randomIntFromInterval(1,2);
        if(img == 1){
            x = 360;
        }
        else{
            x = 390;
        }
        rocks.push(new Rock(img,x,ground.y,35,30,0));
    }
},600);


// Bubble : 

function bubble(bubX, bubY, bubSize){
    push();
    // strokeWeight(2);
    noStroke();
	fill(255, 255, 255, 50);
	ellipse(bubX, bubY,bubSize);
	fill(255, 255, 255, 180);
	ellipse(bubX+0.2*bubSize, bubY-0.2*bubSize, 0.2*bubSize);
	pop();
}