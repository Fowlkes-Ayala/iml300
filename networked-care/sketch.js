// -----------------------------------------------------------
// YOUR ORIGINAL VARIABLES
// -----------------------------------------------------------

// CALCULATING GPT USE FOOTPRINT
let extraGPTCarbon = 1;
let wksForAssignment = 1;
let wksPerSemester = 13;
let numClasses = 7;

// COMPARISON BASELINES
let sustCarbonYr = 1814369;
let avgCarbonYr = 14514956;

// To be calculated...
let GPTCarbonYr;

// CIRCLES SETTINGS
const circleSize = 49;
const circleGap = 50;
let circleColor = '#ffffff';
let sliceColor = '#ff0000';

// CALCULATING GPT PROPORTION
let numCircles = 0;
let circlesPerGPTCarbon = 0;


// -----------------------------------------------------------
// SETUP
// -----------------------------------------------------------
function setup() {
  const holder = document.getElementById("canvas-holder");

  // Get the container’s size
  const w = holder.clientWidth;
  const h = holder.clientHeight;

  // Create canvas at that size
  canvas = createCanvas(w, h);

  // Attach it to the container
  canvas.parent("canvas-holder");

  const params = new URLSearchParams(window.location.search);
  extraGPTCarbon = Number(params.get("carbon"));
  print(extraGPTCarbon);

  fill(255);
  noStroke();
  background(0);

  GetYearlongGPTCarbon();

  DrawCircleGrid();
  CalculateGPTProportion();
  DrawGPTSlice();
}


// -----------------------------------------------------------
// DRAW LOOP
// -----------------------------------------------------------
function draw() {
  background(0);

  // ---------------------------------------------------------
  // 🔥 DRAW YOUR GRID
  // ---------------------------------------------------------
  DrawCircleGrid();
  DrawGPTSlice();
}


// -----------------------------------------------------------
// GRID + CALCULATIONS
// -----------------------------------------------------------
function DrawCircleGrid(){
  fill(circleColor);
  numCircles = 0;

  const numColumns = floor(width / circleGap);
  const numRows = floor(height / circleGap);

  for (let col = 1; col < numColumns; col++){
    for (let row = 1; row < numRows; row++){
      circle(circleGap * col, circleGap * row, circleSize);
      numCircles++;
    }
  }
}

function DrawGPTSlice(){
  fill(sliceColor);
  const xPos = circleGap;
  const yPos = circleGap;
  
  const sliceSize = map(circlesPerGPTCarbon, 0, 1, 0, 2 * PI);
  print(sliceSize);
  
  arc(xPos, yPos, circleSize, circleSize, HALF_PI, HALF_PI + sliceSize)
}

function CalculateGPTProportion(){
  const carbonPerCircle = GPTCarbonYr / numCircles;
  circlesPerGPTCarbon = extraGPTCarbon / carbonPerCircle;
  print("GPT Carbon use takes up " + circlesPerGPTCarbon + " circles.");
}

function GetYearlongGPTCarbon(){
  const rawGPTCarbonTotal = (extraGPTCarbon * wksPerSemester * numClasses * 2) / wksForAssignment ;
  GPTCarbonYr = rawGPTCarbonTotal + avgCarbonYr;
}