// Selectors

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const lineWidth = document.querySelector('input[type=range]');
const canvasBackgroundColor = document.getElementById('canvasBackground');
const colorPicker = document.getElementById('colorPicker');
const checkboxSquared = document.querySelector('.squaredLine')
const checkboxRandom = document.querySelector('.randomColors')

// Default Values

lineWidth.value = 10;
colorPicker.value= '#fff'
checkboxSquared.checked = false;
ctx.strokeStyle=`#000`; // color / gradient or pattern 
ctx.lineJoin='round'; // "bevel" || "round" || "miter";
ctx.lineCap='round'; // "butt" || "round" || "square";
ctx.lineWidth=10; // Width of the line

let isDrawing = false; // for EventListeners on Mouse Movement/click
let lastX = 0; // identifying X / Y
let lastY = 0;
let hue = 0; // for randomColors function
let direction = true; //for WeirdLines function


// Function: Draw

function draw(e){
    if(!isDrawing) return;
    ctx.beginPath(); // Starts
    ctx.moveTo(lastX,lastY); // Go to 
    ctx.lineTo(e.offsetX,e.offsetY); // create the path
    [lastX, lastY] = [e.offsetX, e.offsetY];
    ctx.stroke();
}

// Functions: Modifiers

function changeCanvasBackground(){
    canvasBackgroundColor.addEventListener('change', function(){
        canvas.style.backgroundColor = this.value;
    })
}

changeCanvasBackground();


// Thickness 

function changeLineThickness(){
    ctx.lineWidth = this.value;
}

// Color Picker

function changeColor(){
    ctx.strokeStyle= `${this.value}`;
}

// Squared Line

function squaredLine(){
    if(checkboxSquared.checked){
        ctx.lineCap='square'
    } else {
        ctx.lineCap='round'
    }
}



//Event Listeners --- Modifiers

colorPicker.addEventListener('change', changeColor);
lineWidth.addEventListener('click', changeLineThickness);
checkboxSquared.addEventListener('change',squaredLine);

//Event Listeners --- Canvas

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown',(e) =>{
    isDrawing = true;
    [lastX,lastY]  = [e.offsetX,e.offsetY];
});
canvas.addEventListener('mouseup', ()=>isDrawing= false);
canvas.addEventListener('mouseout', ()=>isDrawing= false);