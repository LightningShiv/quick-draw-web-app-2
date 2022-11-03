
random_number = Math.floor((Math.random() * quick_draw_data_set_.length) + 1);
console.log(quick_draw_data_set[random_number]);
sketch = quick_draw_data_set[random_number];
document.getElementById('sketch_name').innerHTML = 'Sketch To be Drawn: ' + sketch;



timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;

function updateCanvas() {
    background("white");
    random_number = Math.floor((Math.random() * quick_draw_data_set.length) + 1);
    console.log(quick_draw_data_set[random_number]);
    sketch = quick_draw_data_set[random_number];
    document.getElementById('sketch_name').innerHTML = 'Sketch To be Drawn:' + sketch;

}

function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);

}

function draw() {
    //set stroke weight to 13
    strokeWeight(13);
    //set stroke color to black
    stroke(0);
    // If mouse is pressed, draw line between previous and current mouse position
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
    }

    document.getElementById('your_sketch').innerHTML = 'your_sketch: ' + results[0].label;

    document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%'; 

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}
