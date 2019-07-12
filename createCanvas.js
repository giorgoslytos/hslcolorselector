/*
  Created by Georgios Litos, Thessaloniki, Greece
  email: giorgoslytos@gmail.com
  github: https://github.com/giorgoslytos
*/
function createCanvas(light) {
  var canvas = document.querySelector('canvas');
  canvas.width = 722;
  canvas.height = 202;
  var c = canvas.getContext('2d');
  function Pixel(i, j) {
    this.hue = i;
    this.saturation = j;
    this.i = i * 2;
    this.j = j * 2;
    c.fillStyle = 'hsl(' + this.hue + ',' + this.saturation + '%,' + light + '%)';
    c.fillRect(this.i, this.j, 2, 2);
  }

  // creating pixelArray of Pixels 
  var pixelArray = [];
  var k = 0;
  for (let i = 0; i < 361; i++) {
    for (let j = 0; j < 101; j++) {
      k += 1;
      pixelArray[k] = new Pixel(i, j);
    }
  }
}