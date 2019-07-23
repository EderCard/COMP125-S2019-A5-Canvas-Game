/*
 *   Created by: Ederson Cardoso - Created on: July 21, 2019
*/

"use strict";
// Create the canvas
var canvas = document.getElementById("canvas");
    canvas.width = 980;
    canvas.height = 600;
    canvas.style.cursor = "pointer";

var ctx = canvas.getContext("2d");
var canLeft = canvas.offsetLeft;
var canTop = canvas.offsetTop;

// Background image
var bgReady = false;
var bgImage = new Image();
    bgImage.onload = function () {
        bgReady = true;
    };
    bgImage.src = "images/background.jpg";


// bug objects
var bugReady = false;
var bugImage = new Image();
var bug = {};
var score = 0;

bugImage.onload = function () {
    bugReady = true;
};
bugImage.src = "images/bug.png";

// Speed / time variables 
var speed = 3000;
var newSpeed = speed;
var speedFactor = 1.2;

// Reset the game when the user clicks on the bug
var reset = function () {
    // Places the bug randomly on the canvas
    bug.x = 60 + (Math.random() * (canvas.width - 120));
    bug.y = 60 + (Math.random() * (canvas.height - 120));
};

// Reset the game score when the user clicks reset score button
function resetScore() {
    newSpeed = speed;
    score = 0;
    reset();
    then = Date.now();
}

// Reset speed of bug object 
function resetSpeed() {
   newSpeed = speed;
   then = Date.now();
}

// Event listeners 
function pickBug(e) {
    var x = e.pageX - canLeft;
    var y = e.pageY - canTop;

    if (y > bug.y && y < bug.y + 600 && x > bug.x && x < 980) 
    {
        score++;
        reset();
        newSpeed = newSpeed / speedFactor;
        then = Date.now();
    }
}

// Draw everything
var render = function () {
    if (bgReady) 
    {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (bugReady) 
    {
        ctx.drawImage(bugImage, bug.x, bug.y);
    }

    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + score, 20, 20);
};


// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    if (delta > newSpeed) 
    {
        reset();
    }
    render();

    if (delta > newSpeed)
    {
        then = Date.now();
    }

    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

function createEventListeners() {
    addEventListener("mousedown", pickBug, false);
    document.getElementById("resetScore").addEventListener("click", resetScore, false);
    document.getElementById("resetSpeed").addEventListener("click", resetSpeed, false);
}

// Start game
var then = Date.now();
reset();
main();

window.addEventListener("load", createEventListeners, false);