
function draw () {
    var img = new Image();
    img.src = 'assets/duckhunt.png'; //load the image
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d'); //get the context
    img.onload = function(){ //loaded, ready to draw
	ctx.fillStyle = '#87CEEB'; //sky
	ctx.fillRect(0,0,800,600);
	ctx.fillStyle = '#C96A1B'; //road
	ctx.fillRect(0,500,800,100);
	ctx.drawImage(img,0,270,90,130,20,150,270,390); //tree
	ctx.drawImage(img,100,700,800,200,0,400,800,200); //bushes
	ctx.drawImage(img,0,0,60,50,0,470,120,100); //dog
	ctx.drawImage(img,0,115,38,30,500,100,76,60); //birds
	ctx.drawImage(img,256,115,38,30,200,200,76,60);
	ctx.drawImage(img,38,115,38,30,350,300,76,60);
	ctx.drawImage(img,208,115,38,30,50,100,76,60);
	ctx.drawImage(img,298,115,38,30,700,250,76,60);
    }
}