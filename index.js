
//Stole this color adjuster from stack overflow cause I'm lazy
//https://stackoverflow.com/a/57401891/6342516
function adjust(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

let text = document.getElementById("title");
let textColor = document.getElementById("textColor");
let textFont = document.getElementById("textFont");
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

function dl(){
    let link = document.createElement('a');
    link.download = 'IEEE-YT-Background.png';
    link.href = canvas.toDataURL()
    link.click();
}

function draw(){
    
    //Setup background colors
    primary = color1.value;
    secondary = color2.value;
    primaryLight = adjust(primary, +50)
    secondaryLight = adjust(secondary, +50)
    primaryOpaque = adjust(primary, +100) + "da"

    //Draw background image (Main background)
    context.drawImage(background,0,0);
    context.fillStyle = primaryOpaque;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    //Draw the top right triangle
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

    //Draw the title text on the image 
    context.fillStyle = textColor.value;
    context.font = textFont.value;
    const textVal = text.value;
    const textMeasure = context.measureText(textVal)
    const textWidth = textMeasure.width;
    const textHeight = textMeasure.fontBoundingBoxAscent;
    console.log(textVal, context.font, textMeasure, canvas.width, canvas.height, textWidth, textHeight);
    context.lineWidth = 8;
    const x = (canvas.width / 2) - (textWidth / 2);
    const y = (canvas.height / 2);
    context.strokeText(textVal, x, y);
    context.fillText(textVal, x, y);
}