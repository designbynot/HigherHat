let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let hat = new Image();
hat.src = 'images/higherhat.png'; // Path to the hat image
let img, imgX = 0, imgY = 0, imgScale = 1;

function loadImage(event) {
    let reader = new FileReader();
    reader.onload = function() {
        img = new Image();
        img.onload = function() {
            // Set maximum dimensions for the canvas
            let maxWidth = window.innerWidth * 0.8;
            let maxHeight = window.innerHeight * 0.8;
            let ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;
            draw();
        }
        img.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

function adjustHat() {
    imgX = document.getElementById('xAxis').value;
    imgY = document.getElementById('yAxis').value;
    imgScale = document.getElementById('scale').value;
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (img) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    if (hat) ctx.drawImage(hat, imgX, imgY, hat.width * imgScale, hat.height * imgScale);
}

function downloadImage() {
    let link = document.createElement('a');
    link.download = 'image_with_hat.png';
    link.href = canvas.toDataURL();
    link.click();
}