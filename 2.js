img = "";
dstatus = "";
objects = [];

function preload() {
    img = loadImage('img10.jpeg');
}

function setup() {
    canvas = createCanvas(450, 380);
    canvas.center();
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("stats").innerHTML = "Status: Detecting Objects";
}

function draw() {
    image(img, 0, 0, 450, 380);

    if (dstatus != "") {
        objectdetector.detect(img, gotResults);
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("stats").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_obj").innerHTML = "Number of objects detected " + objects.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);
        }
    }
}

function modelLoaded() {
    console.log('Model Loaded!');
    dstatus = true;
    objectdetector.detect(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
    }
    objects = results;
}