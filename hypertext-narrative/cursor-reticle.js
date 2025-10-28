let t = 0; // time variable for breathing animation
let clickAnim = 0; // click animation progress (0 to 1)
let isClosing = false;

const aiTerms = [
  'AI',
  'Robot',
  'Neural Network',

  'Artificial Intelligence',
  'Artificial Lifeform',
  'Artificial Being',

  'Synthetic Intelligence',
  'Synthetic Lifeform',
  'Synthetic Being',

  'Machine Intelligence',
  'Machine Lifeform',
  'Machine Being',

  'Silicon-Based Intelligence',
  'Silicon-Based Lifeform',
  'Silicon-Based Being',

  'Computational Intelligence',
  'Computational Lifeform',
  'Computational Being',

  'Algorithmic Intelligence',
  'Algorithmic Lifeform',
  'Algorithmic Being',
];

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);
  cnv.style('z-index', '9999');
  cnv.style('pointer-events', 'none');
  noCursor();

  const currentTerm = getAITerm();
  replaceAITerms(currentTerm);
  updateLinks(currentTerm);
}

function getAITerm() {
  const urlParams = new URLSearchParams(window.location.search);
  let term = urlParams.get('term');
  
  if (!term) {
      const randomIndex = Math.floor(Math.random() * aiTerms.length);
      term = aiTerms[randomIndex];
  }
  
  return term;
}

function replaceAITerms(term) {
  const elements = document.querySelectorAll('.ai-term');
  elements.forEach(el => {
      el.textContent = term;
  });
}

function updateLinks(term) {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
      link.href = `${link.getAttribute('href')}?term=${encodeURIComponent(term)}`;
  });
}

function mousePressed() {
  isClosing = true;
  clickAnim = 0;
}

function draw() {
  let cursorColor = color("#505859");
  clear();
  fill(cursorColor);
  noStroke();

  let x = mouseX;
  let y = mouseY;
  
  let pulseFactor = 1.5;

  // breathing animation
  t += 0.03;
  let pulse = sin(t) * pulseFactor;

  // click animation
  if (isClosing) {
    clickAnim += 0.2; // speed of closing
    if (clickAnim >= 1) {
      clickAnim = 1;
      setTimeout(() => {
        isClosing = false;
      }, 100);
    }
  } else if (clickAnim > 0) {
    clickAnim -= 0.2; // speed of opening
    if (clickAnim < 0) clickAnim = 0;
  }

  // base sizes + breathing offset
  const baseSize = 15 + pulse;
  const baseGap = 6 + pulse * 0.3;
  
  // when clicking: gap shrinks to 0, size shrinks by the gap amount
  const gap = baseGap * (1 - clickAnim);
  const cursorSize = baseSize - baseGap + gap; // FIXED: moves inward by exactly the gap distance
  
  const angleFactor = 1;

  // center dot
  ellipse(x, y, 8, 8);

  stroke(cursorColor);
  strokeWeight(2);
  noFill();

  // top-left
  line(x - cursorSize, y - gap, x - cursorSize, y - ((cursorSize - gap)*angleFactor));
  line(x - cursorSize, y - ((cursorSize - gap)*angleFactor), x - ((cursorSize - gap)*angleFactor), y - cursorSize);
  line(x - ((cursorSize - gap)*angleFactor), y - cursorSize, x - gap, y - cursorSize);

  // top-right
  line(x + cursorSize, y - gap, x + cursorSize, y - cursorSize);
  line(x + cursorSize, y - cursorSize, x + gap, y - cursorSize);

  // bottom-left
  line(x - cursorSize, y + gap, x - cursorSize, y + cursorSize);
  line(x - cursorSize, y + cursorSize, x - gap, y + cursorSize);

  // bottom-right
  line(x + cursorSize, y + gap, x + cursorSize, y + ((cursorSize - gap)*angleFactor));
  line(x + cursorSize, y + ((cursorSize - gap)*angleFactor), x + ((cursorSize - gap)*angleFactor), y + cursorSize);
  line(x + ((cursorSize - gap)*angleFactor), y + cursorSize, x + gap, y + cursorSize);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}