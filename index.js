
//Stole this color adjuster from stack overflow cause I'm lazy
//https://stackoverflow.com/a/57401891/6342516
function adjust(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

let canvas = document.getElementById("canv");
let color1 = document.getElementById("c1");
let color2 = document.getElementById("c2");
let context = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 720;

let triangleCover = 470; //pixels covered by the top right triangle

let background = new Image();
background.src = "./background.jpg"
background.onload = ()=>{draw();};

function draw(){
    primary = color1.value;
    secondary = color2.value;
    primaryLight = adjust(primary, +50)
    secondaryLight = adjust(secondary, +50)
    primaryOpaque = adjust(primary, +100) + "da"
    context.drawImage(background,0,0);
    context.fillStyle = primaryOpaque;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = secondaryLight;
    context.beginPath();
    context.moveTo(canvas.width - triangleCover, 0);
    context.lineTo(canvas.width, 0);
    context.lineTo(canvas.width, triangleCover);
    context.closePath();
    context.fill();
    context.fillStyle = secondary;
    context.beginPath();
    context.moveTo(canvas.width - triangleCover + 35, 0);
    context.lineTo(canvas.width, 0);
    context.lineTo(canvas.width, triangleCover - 35);
    context.closePath();
    context.fill();
    context.fillStyle = primaryLight;
    context.beginPath();
    context.moveTo(canvas.width - triangleCover, 0);
    context.lineTo(canvas.width, 0);
    context.lineTo(canvas.width, triangleCover);
    context.lineTo(canvas.width - 160, 160);
    context.closePath();
    context.fill();
    context.fillStyle = primary;
    context.beginPath();
    context.moveTo(canvas.width - triangleCover, 0);
    context.lineTo(canvas.width, 0);
    context.lineTo(canvas.width, triangleCover);
    context.lineTo(canvas.width - 110, 110);
    context.closePath();
    context.fill();
}