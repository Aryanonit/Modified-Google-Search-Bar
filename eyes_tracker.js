// Constants - using Google colors for clean, minimalist design
const BACKGROUND_COLOR = 255; // White background
const EYE_COLOR = 255; // White eyes
const PUPIL_COLOR = 0; // Black pupils
const EYE_SIZE = 60; // Slightly larger eyes
const PUPIL_SIZE = 28; // Pupil size
const PUPIL_MAX_OFFSET = 12; // How far pupils can move
const PRIMARY_COLOR = [66, 133, 244]; // Google Blue
const SECONDARY_COLORS = [
  [219, 68, 55],  // Google Red
  [244, 180, 0],  // Google Yellow 
  [15, 157, 88]   // Google Green
];

// Variables
let eyeDistance = 120;
let eyesY; // Will be set in setup
let searchInput;
let searchButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);
  angleMode(DEGREES);
  
  // Position eyes in center of page
  eyesY = windowHeight / 2 - 50; // Slightly above center
  
  // Create minimal search elements
  createSearchElements();
  
  describe('Two eyes that follow cursor with minimalist search bar.');
}

function draw() {
  // Clear background with clean white
  background(BACKGROUND_COLOR);
  
  // Google-like top border
  drawTopBorder();
  
  // Draw eyes
  drawEye(width/2 - eyeDistance/2, eyesY);
  drawEye(width/2 + eyeDistance/2, eyesY);
}

function drawEye(x, y) {
  push();
  translate(x, y);
  
  // Eye white - with subtle shadow
  noStroke();
  fill(240);
  ellipse(0, 0, EYE_SIZE + 4, EYE_SIZE + 4);
  fill(EYE_COLOR);
  ellipse(0, 0, EYE_SIZE, EYE_SIZE);
  
  // Calculate pupil position based on mouse
  let pupilOffset = calculatePupilOffset(x, y);
  
  // Draw pupil
  fill(PUPIL_COLOR);
  ellipse(pupilOffset.x, pupilOffset.y, PUPIL_SIZE);
  
  // Add highlight for realism
  fill(255, 255, 255, 200);
  ellipse(pupilOffset.x - PUPIL_SIZE/5, pupilOffset.y - PUPIL_SIZE/5, PUPIL_SIZE/3);
  
  pop();
}

function calculatePupilOffset(eyeX, eyeY) {
  // Calculate distance and direction to mouse
  let dx = mouseX - eyeX;
  let dy = mouseY - eyeY;
  let distance = sqrt(dx * dx + dy * dy);
  
  // Normalize and limit movement (smaller movement for more subtle effect)
  let factor = min(1, distance / 100); 
  let maxOffset = PUPIL_MAX_OFFSET;
  
  // Calculate the pupil position with adjustment for distance
  let offsetX = (dx / (distance || 1)) * maxOffset * factor;
  let offsetY = (dy / (distance || 1)) * maxOffset * factor;
  
  return {x: offsetX, y: offsetY};
}

function drawTopBorder() {
  // Thin colorful top border like Google
  let segmentWidth = width / SECONDARY_COLORS.length;
  
  for (let i = 0; i < SECONDARY_COLORS.length; i++) {
    fill(SECONDARY_COLORS[i]);
    noStroke();
    rect(i * segmentWidth, 0, segmentWidth, 4);
  }
}

function createSearchElements() {
  // Create a main centered container for search bar
  let searchContainer = createDiv();
  searchContainer.position(0, 0);
  searchContainer.style('width', '100%');
  searchContainer.style('height', '100%');
  searchContainer.style('display', 'flex');
  searchContainer.style('align-items', 'center');
  searchContainer.style('justify-content', 'center');
  searchContainer.style('pointer-events', 'none'); // Let clicks pass through to canvas
  searchContainer.id('search-container');
  
  // Create the search bar wrapper
  let searchWrapper = createDiv();
  searchWrapper.parent(searchContainer);
  searchWrapper.style('display', 'flex');
  searchWrapper.style('align-items', 'center');
  searchWrapper.style('background-color', 'white');
  searchWrapper.style('border-radius', '24px');
  searchWrapper.style('border', '1px solid #dfe1e5');
  searchWrapper.style('box-shadow', '0 1px 6px rgba(32,33,36,0.28)');
  searchWrapper.style('width', '500px');
  searchWrapper.style('padding', '5px 15px');
  searchWrapper.style('margin-top', '100px'); // Position below the eyes
  searchWrapper.style('pointer-events', 'auto'); // Make the search bar clickable
  
  // Create the Google 'G' logo at start of search bar
  let googleG = createDiv();
  googleG.parent(searchWrapper);
  googleG.html(`
    <div style="width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px; background: white;">
      <span style="font-family: 'Product Sans', Arial, sans-serif; font-size: 20px; font-weight: bold; color: rgb(66, 133, 244);">G</span>
    </div>
  `);
  
  // Search input with Google-like styling
  searchInput = createInput('');
  searchInput.attribute('placeholder', 'Search or type URL');
  searchInput.parent(searchWrapper);
  searchInput.style('flex', '1');
  searchInput.style('padding', '10px 0');
  searchInput.style('border', 'none');
  searchInput.style('font-size', '16px');
  searchInput.style('color', '#202124');
  searchInput.style('outline', 'none');
  searchInput.style('font-family', "'Product Sans', Arial, sans-serif");
  
  // Search button
  searchButton = createButton('');
  searchButton.parent(searchWrapper);
  searchButton.style('background', 'transparent');
  searchButton.style('color', `rgb(${PRIMARY_COLOR[0]}, ${PRIMARY_COLOR[1]}, ${PRIMARY_COLOR[2]})`);
  searchButton.style('border', 'none');
  searchButton.style('width', '24px');
  searchButton.style('height', '24px');
  searchButton.style('cursor', 'pointer');
  searchButton.style('display', 'flex');
  searchButton.style('align-items', 'center');
  searchButton.style('justify-content', 'center');
  searchButton.style('margin-left', '10px');
  
  // Add magnifying glass icon with CSS
  searchButton.html('<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Update eyes Y position
  eyesY = windowHeight / 2 - 50;
}