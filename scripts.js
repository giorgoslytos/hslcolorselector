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

//alert on resize
window.addEventListener("resize", onResize1);
window.addEventListener("resize", onResize2);
if (window.innerHeight < 590) {
  window.alert("this web app may malfunction for window height less than 590 pixels");
}
if (window.innerWidth < 1034) {
  window.alert("this web app may malfunction for window width less than 1034 pixels");
}
function onResize1(event) {
  if (window.innerHeight < 590) {
    window.alert("this web app may malfunction for window height less than 590 pixels");
    window.removeEventListener("resize", onResize1);
  }
}
function onResize2(event) {
  if (window.innerWidth < 1034) {
    window.alert("this web app may malfunction for window width less than 590 pixels");
    window.removeEventListener("resize", onResize2);
  }
}

//call createCanvasJS to initialize the canvas
createCanvas(50);

//mousemove event functions
function hueHSL(event) {
  var rect = canvas.getBoundingClientRect();//get the dimensions of the element
  hue = Math.floor((event.pageX - rect.left) / 2);
  saturation = Math.floor((event.pageY - rect.top) / 2);
  document.body.style.backgroundColor =
    "hsl(" + hue + ", " + saturation + "%, " + -lightness + "%)";
  eventListenerFlag = 1;
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
  var rect = canvas.getBoundingClientRect();//paint the canvas
  hue = Math.floor((event.pageX - rect.left) / 2);
  saturation = Math.floor((event.pageY - rect.top) / 2);
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
    eventListenerFlag = 0;
  } else {
    canvas.addEventListener("mousemove", writeHSL);
    canvas.addEventListener("mousemove", writeRGB);
    canvas.addEventListener("mousemove", hueHSL);
  }
}

