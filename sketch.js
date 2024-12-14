let sound;
let fft;
let amplitude;

function preload() {
    sound = loadSound('themeoflaura.mp3');
}

function setup() {
    createCanvas(800, 600);
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255); //white
    fft = new p5.FFT();
    amplitude = new p5.Amplitude();

    // play button
    let playButton = createButton('Play');
    playButton.mousePressed(playSound);
    playButton.position(width / 2 - 120, height - 60);
    styleButton(playButton);

    // pause button
    let pauseButton = createButton('Pause');
    pauseButton.mousePressed(pauseSound);
    pauseButton.position(width / 2 + 20, height - 60); 
    styleButton(pauseButton);
}

function styleButton(button) 
{
    button.style('font-family', 'Arial, sans-serif');
    button.style('font-size', '20px');
    button.style('padding', '10px 20px');
    button.style('background', 'rgba(0, 0, 0, 0.5)'); 
    button.style('border', '2px solid #FFF'); 
    button.style('border-radius', '25px'); 
    button.style('color', '#FFF'); 
    button.style('cursor', 'pointer');
    button.style('transition', 'all 0.3s ease');
    button.mouseOver(() => 
        {
            button.style('background', '#FFF');
            button.style('color', '#000');
        });
    button.mouseOut(() => 
        {
            button.style('background', 'rgba(0, 0, 0, 0.5)');
            button.style('color', '#FFF');
        });
}

function playSound() 
{
    if (!sound.isPlaying())
    {
        sound.play();
    }
}

function pauseSound() 
{
    if (sound.isPlaying()) 
    {
        sound.pause();
    }
}

function draw() 
{
    background(0, 10);

    // Bass visualizer
    let bass = fft.getEnergy("bass");
    let bassRadius = map(bass, 0, 255, 100, 300);
    let bassColor = map(bass, 0, 255, 100, 255);
    stroke(bassColor, 0, 255, 150); 
    noFill();
    ellipse(width / 2, height / 2, bassRadius * 2, bassRadius * 2);

    // Amplitude visualizer
    let level = amplitude.getLevel();
    let amplitudeRadius = map(level, 0, 1, 50, 150);
    let amplitudeColor = map(level, 0, 1, 50, 255);
    stroke(0, amplitudeColor, 255, 150);
    ellipse(width / 2, height / 2, amplitudeRadius * 2, amplitudeRadius * 2);

    // Frequency spectrum visualizer
    let spectrum = fft.analyze();
    for (let i = 0; i < spectrum.length; i++) 
    {
        let angle = map(i, 0, spectrum.length, 0, TWO_PI);
        let radius = map(spectrum[i], 0, 255, 150, 300);
        let x = width / 2 + radius * cos(angle); 
        let y = height / 2 + radius * sin(angle);

        let colorVal = map(i, 0, spectrum.length, 0, 255);
        let dynamicColor = colorVal + 128;
        stroke(dynamicColor, 255 - dynamicColor, 255);
        line(width / 2, height / 2, x, y);  
    }
    fill(255, 255, 255, 200);
    textSize(28);
    text("Now Playing: Theme of Laura", width / 2, height / 2 - 250);
}