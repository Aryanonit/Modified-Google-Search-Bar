// Constants - using Google colors for clean, minimalist design
const BACKGROUND_COLOR = 255; // White background
const EYE_COLOR = 255; // White eyes
const PUPIL_COLOR = 0; // Black pupils
const EYE_SIZE = 50; // Eye size for the "o"s in Google
const PUPIL_SIZE = 24; // Pupil size
const PUPIL_MAX_OFFSET = 12; // How far pupils can move
const PRIMARY_COLOR = [66, 133, 244]; // Google Blue
const SECONDARY_COLORS = [
  [219, 68, 55],  // Google Red
  [244, 180, 0],  // Google Yellow 
  [15, 157, 88]   // Google Green
];

// Google Logo Colors
const GOOGLE_COLORS = {
  G: [66, 133, 244],  // Blue
  o1: [219, 68, 55],  // Red
  o2: [244, 180, 0],  // Yellow
  g: [66, 133, 244],  // Blue
  l: [15, 157, 88],   // Green
  e: [219, 68, 55]    // Red
};

// Variables
let eyeDistance = 50; // Distance between eyes (the two "o"s) - reduced for better spacing
let googleY; // Will be set in setup
let searchInput;
let searchButton;
let googleLogoSize = 72; // Size of the Google logo letters
let googleLogoSpacing = -5; // Slightly negative spacing for tighter letter placement
let googleWidth; // Total width of the Google logo

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);
  angleMode(DEGREES);
  
  // Calculate the total width of the Google logo - adjusted for better spacing
  // "G" + "o" + "o" + "g" + "l" + "e"
  googleWidth = googleLogoSize * 3.0 + eyeDistance + googleLogoSpacing * 5;
  
  // Position Google logo above center
  googleY = windowHeight / 3.3; 
  
  // Create minimal search elements
  createSearchElements();
  
  describe('Interactive Google logo with eyes that follow cursor and a search bar.');
}

function draw() {
  // Clear background with clean white
  background(BACKGROUND_COLOR);
  
  // Google-like top border
  drawTopBorder();
  
  // Draw Google logo with animated eyes
  drawGoogleLogo();
}

function drawGoogleLogo() {
  // Calculate starting X position to center the logo
  let startX = (width - googleWidth) / 2;
  
  // Drawing the "G"
  drawGoogleLetter("G", startX, googleY, GOOGLE_COLORS.G);
  
  // First "o" as an eye
  let firstOX = startX + googleLogoSize*0.9 + googleLogoSpacing;
  drawEye(firstOX, googleY, GOOGLE_COLORS.o1);
  
  // Second "o" as an eye
  let secondOX = firstOX + EYE_SIZE + eyeDistance/4;
  drawEye(secondOX, googleY, GOOGLE_COLORS.o2);
  
  // Drawing "g" - moved slightly to avoid overlap with second eye
  drawGoogleLetter("g", secondOX + EYE_SIZE/1.6 + googleLogoSize*.4 + googleLogoSpacing, googleY, GOOGLE_COLORS.g);
  
  // Drawing "l" - tighter spacing
  drawGoogleLetter("l", secondOX + EYE_SIZE/1.6 + googleLogoSize*0.8 + googleLogoSpacing*1, googleY, GOOGLE_COLORS.l);
  
  // Drawing "e" - tighter spacing
  drawGoogleLetter("e", secondOX + EYE_SIZE/1.6 + googleLogoSize*1.3 + googleLogoSpacing*1, googleY, GOOGLE_COLORS.e);
}

function drawEye(x, y, color) {
  push();
  translate(x, y);
  
  // Eye circle - using the Google color for the 'o'
  stroke(color[0], color[1], color[2]);
  strokeWeight(4);
  fill(EYE_COLOR);
  ellipse(0, 0, EYE_SIZE, EYE_SIZE);
  
  // Calculate pupil position based on mouse
  let pupilOffset = calculatePupilOffset(x, y);
  
  // Draw pupil
  fill(PUPIL_COLOR);
  noStroke();
  ellipse(pupilOffset.x, pupilOffset.y, PUPIL_SIZE);
  
  // Add highlight for realism
  fill(255, 255, 255, 200);
  ellipse(pupilOffset.x - PUPIL_SIZE/5, pupilOffset.y - PUPIL_SIZE/5, PUPIL_SIZE/3);
  
  pop();
}

function drawGoogleLetter(letter, x, y, color) {
  push();
  textSize(googleLogoSize);
  textAlign(CENTER, CENTER);
  textFont('Product Sans');
  textStyle(BOLD);
  fill(color[0], color[1], color[2]);
  text(letter, x, y);
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
  searchContainer.style('flex-direction', 'column');
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
  searchWrapper.style('margin-top', '25px'); // Position closer to the Google logo
  searchWrapper.style('pointer-events', 'auto'); // Make the search bar clickable
  
  // Search icon at beginning of bar
  let searchIcon = createDiv();
  searchIcon.parent(searchWrapper);
  searchIcon.html('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
  searchIcon.style('margin-right', '10px');
  
  // Search input with Google-like styling
  searchInput = createInput('');
  searchInput.attribute('placeholder', 'Search Google or type a URL');
  searchInput.parent(searchWrapper);
  searchInput.style('flex', '1');
  searchInput.style('padding', '10px 0');
  searchInput.style('border', 'none');
  searchInput.style('font-size', '16px');
  searchInput.style('color', '#202124');
  searchInput.style('outline', 'none');
  searchInput.style('font-family', "'Arial', sans-serif");
  
  // Voice search icon
  let voiceSearch = createDiv();
  voiceSearch.parent(searchWrapper);
  voiceSearch.html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3z" fill="#4285f4"></path><path d="M17 12c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-2.08c3.39-.49 6-3.39 6-6.92h-2z" fill="#4285f4"></path></svg>');
  voiceSearch.style('margin-left', '10px');
  voiceSearch.style('cursor', 'pointer');
  
  
  
  // Create search buttons container
  let searchButtonsContainer = createDiv();
  searchButtonsContainer.parent(searchContainer);
  searchButtonsContainer.style('display', 'flex');
  searchButtonsContainer.style('margin-top', '30px');
  searchButtonsContainer.style('pointer-events', 'auto');
  
  // Google Search button
  let googleSearchBtn = createButton('Google Search');
  googleSearchBtn.parent(searchButtonsContainer);
  googleSearchBtn.style('background-color', '#f8f9fa');
  googleSearchBtn.style('border', 'none');
  googleSearchBtn.style('border-radius', '4px');
  googleSearchBtn.style('color', '#3c4043');
  googleSearchBtn.style('font-family', "'Arial', sans-serif");
  googleSearchBtn.style('font-size', '14px');
  googleSearchBtn.style('margin', '0 6px');
  googleSearchBtn.style('padding', '10px 16px');
  googleSearchBtn.style('cursor', 'pointer');
  
  // I'm Feeling Lucky button
  let luckyBtn = createButton("I'm Feeling Lucky");
  luckyBtn.parent(searchButtonsContainer);
  luckyBtn.style('background-color', '#f8f9fa');
  luckyBtn.style('border', 'none');
  luckyBtn.style('border-radius', '4px');
  luckyBtn.style('color', '#3c4043');
  luckyBtn.style('font-family', "'Arial', sans-serif");
  luckyBtn.style('font-size', '14px');
  luckyBtn.style('margin', '0 6px');
  luckyBtn.style('padding', '10px 16px');
  luckyBtn.style('cursor', 'pointer');
  
  // Footer
  createFooter();
}

function createFooter() {
  let footer = createDiv();
  footer.position(0, windowHeight - 100);
  footer.style('width', '100%');
  footer.style('height', '100px');
  footer.style('background-color', '#f2f2f2');
  footer.style('display', 'flex');
  footer.style('flex-direction', 'column');
  footer.style('pointer-events', 'auto');
  
  // Top row with country
  let countryRow = createDiv(' Bharat');
  countryRow.parent(footer);
  countryRow.style('padding', '15px 30px');
  countryRow.style('border-bottom', '1px solid #dadce0');
  countryRow.style('color', '#70757a');
  countryRow.style('font-size', '14px');
  
  // Bottom row with links
  let linksRow = createDiv();
  linksRow.parent(footer);
  linksRow.style('display', 'flex');
  linksRow.style('justify-content', 'space-between');
  linksRow.style('padding', '15px 30px');
  
  // Left links
  let leftLinks = createDiv();
  leftLinks.parent(linksRow);
  leftLinks.style('display', 'flex');
  
  createFooterLink('About', leftLinks);
  createFooterLink('Advertising', leftLinks);
  createFooterLink('Business', leftLinks);
  createFooterLink('How Search works', leftLinks);
  
  // Right links
  let rightLinks = createDiv();
  rightLinks.parent(linksRow);
  rightLinks.style('display', 'flex');
  
  createFooterLink('Privacy', rightLinks);
  createFooterLink('Terms', rightLinks);
  createFooterLink('Settings', rightLinks);
}

function createFooterLink(text, parent) {
  let link = createA('#', text);
  link.parent(parent);
  link.style('color', '#70757a');
  link.style('font-size', '14px');
  link.style('text-decoration', 'none');
  link.style('padding', '0 15px');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Update Google logo Y position
  googleY = windowHeight / 3;
  
  // Update footer position
  select('footer').position(0, windowHeight - 100);
}