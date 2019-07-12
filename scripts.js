/*
  Created by Georgios Litos, Thessaloniki, Greece
  email: giorgoslytos@gmail.com
  github: https://github.com/giorgoslytos
*/
var hue;
var saturation;
var lightness;
document.body.style.backgroundColor = "hsl(160, 45%, 50%)";
lightness = -50;
var canvas = document.getElementById("scrollpad");
var ctx = canvas.getContext('2d');
canvas.addEventListener("mousemove", hueHSL);

canvas.addEventListener("wheel", lightHSL);
canvas.addEventListener("mousemove", writeHSL);
canvas.addEventListener("mousemove", writeRGB);

//freeze on click
canvas.addEventListener("click", freeze);
var eventListenerFlag = 0;

//call createCanvasJS to initialize the canvas
createCanvas(50);

//mousemove event functions
function hueHSL(event) {
  hue = Math.floor(event.layerX / 2);
  saturation = Math.floor(event.layerY / 2);
  document.body.style.backgroundColor =
    "hsl(" + hue + ", " + saturation + "%, " + -lightness + "%)";
  eventListenerFlag = 1;
  console.log(event);
}

// control lightness levels
function lightHSL(event) {
  if (-lightness >= 0 && lightness >= -100) {
    if (event.deltaY > 0)
      lightness++;
    if (event.deltaY < 0)
      lightness--;
    if (-lightness < 0) {
      lightness = 0;
    }
    if (-lightness > 100) {
      lightness = -100;
    }
  }
  backColor =
    "hsl(" + hue + ", " + saturation + "%, " + -lightness + "%)";
  createCanvas(-lightness);
  hue = Math.floor(event.layerX / 2);
  saturation = Math.floor(event.layerY / 2);
  document.body.style.backgroundColor =
    "hsl(" + hue + ", " + saturation + "%, " + -lightness + "%)";
  writeHSL();
  writeRGB();
}

//Writing down the results
function writeHSL() {
  document.getElementById("HSLcode").innerHTML = "hsl(" + hue + ", " + saturation + "%, " + -lightness + "%)";
  document.getElementById("hue").innerHTML = hue;
  document.getElementById("saturation").innerHTML = saturation;
  document.getElementById("lightness").innerHTML = -lightness;
}
function writeRGB() {
  let backColor = document.body.style.backgroundColor;
  document.getElementById("RGBcode").innerHTML = backColor;
  let match = backColor.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
  document.getElementById("red").innerHTML = match[1];
  document.getElementById("green").innerHTML = match[2];
  document.getElementById("blue").innerHTML = match[3];
  rgbToHex(backColor);
}
function rgbToHex(rgb) {
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  document.getElementById("RGBhexcode").innerHTML = (rgb && rgb.length === 4) ? "#" +
    ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}

//freeze on click
function freeze() {
  if (eventListenerFlag === 1) {
    canvas.removeEventListener("mousemove", writeHSL);
    canvas.removeEventListener("mousemove", writeRGB);
    canvas.removeEventListener("mousemove", hueHSL);
    canvas.removeEventListener("wheel", lightHSL);
    eventListenerFlag = 0;
  } else {
    canvas.addEventListener("mousemove", writeHSL);
    canvas.addEventListener("mousemove", writeRGB);
    canvas.addEventListener("mousemove", hueHSL);
    canvas.addEventListener("wheel", lightHSL);
  }
}

