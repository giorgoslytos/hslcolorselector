function createCanvas(light) {
  var canvas = document.querySelector('canvas');
  canvas.width = 722;
  canvas.height = 202;
  var c = canvas.getContext('2d');
  class Pixel {
    constructor(i, j) {
      this.hue = i;
      this.saturation = j;
      this.i = i * 2;
      this.j = j * 2;
      this.draw = function () {
        console.log(this.hue);
        console.log(this.saturation);
        c.fillStyle = 'hsl(' + this.hue + ',' + this.saturation + '%,' + light + '%)';
        console.log(c.fillStyle)
        c.fillRect(this.i, this.j, 2, 2);
      }
    }
  }

  // creating pixel 
  var pixelArray = [];
  var k = 0;
  for (let i = 0; i < 361; i++) {
    for (let j = 0; j < 101; j++) {
      k += 1;
      pixelArray[k] = new Pixel(i, j);
      pixelArray[k].draw();
    }
  }
}