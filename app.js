const makeActive = function (element) {
  multiColorButton.classList.remove('active');
  eraserButton.classList.remove('active');
  colorPicker.classList.remove('active');
  element.classList.add('active');
};

const getRandomColor = function () {
  const randR = Math.floor(Math.random() * 256);
  const randG = Math.floor(Math.random() * 256);
  const randB = Math.floor(Math.random() * 256);
  return `rgb(${randR}, ${randG}, ${randB})`;
};

const rebuildGrid = function (numOfRows, numOfCols) {
  //clear the content of the grid div on each rebuild
  gridDiv.replaceChildren();

  //get sketch-pad grid width and height
  let sketchPadDiv = document.querySelector('.sketch-pad');
  const gridTotalWidth = sketchPadDiv.clientWidth; //500pixels
  const gridTotalHeight = sketchPadDiv.clientHeight;

  //calculate cell width & height
  const cellWidth = gridTotalWidth / numOfRows;
  const cellHeight = gridTotalHeight / numOfCols;

  //create an html fragment where the cells will be computed & added
  const htmlFragment = document.createDocumentFragment();

  //create numOfRows x numOfCols cells with calculated cellWidth & cellHeight
  //and populate it into the gridDiv element

  for (let i = 0; i < numOfRows * numOfCols; i++) {
    const cellDiv = htmlFragment.appendChild(document.createElement('div'));
    cellDiv.className = 'cell';
    cellDiv.style.width = cellWidth + 'px';
    cellDiv.style.height = cellHeight + 'px';
  }

  gridDiv.appendChild(htmlFragment);

  //listen for mouseover(hover) & change color of cell by adding appropriate class
  gridDiv.addEventListener('mouseover', (e) => {
    let cellDiv = e.target;
    if (hoverColor == 'cell hover-color-multi') {
      cellDiv.style.backgroundColor = getRandomColor();
    } else if (hoverColor == 'cell') {
      //erase 
      cellDiv.className = hoverColor;
      cellDiv.style.backgroundColor = '';
    }else {
      //color picker
      cellDiv.style.backgroundColor = hoverColor;
    }
  });
};

//get grid div (new cells will populate in here)
let gridDiv = document.querySelector('.flex-grid');

//get user slider
let slider = document.querySelector('.slider');
let sliderOutput = document.querySelector('.slider-output');

//get the slider's starting output value
sliderOutput.textContent = `Grid Size: ${slider.value}x${slider.value}`;

// set numOfRows & numOfCols to starting slider output
let numOfRows = slider.value;
let numOfCols = numOfRows;

//get color picker
const colorPicker = document.getElementById('color-picker');

//get buttons
const multiColorButton = document.querySelector('.multi-color-button');
const eraserButton = document.querySelector('.eraser-button');
const clearButton = document.querySelector('.clear-button');

// default/starting color
let hoverColor = colorPicker.value;

colorPicker.addEventListener('input', (e) => {
  hoverColor = e.target.value;
  makeActive(e.target);
});

colorPicker.addEventListener('click', (e) => {
  hoverColor = e.target.value;
  makeActive(e.target);
});
multiColorButton.addEventListener('click', (e) => {
  hoverColor = 'cell hover-color-multi';
  makeActive(e.target);
});
eraserButton.addEventListener('click', (e) => {
  hoverColor = 'cell';
  makeActive(e.target);
});
clearButton.addEventListener('click', () => {
  rebuildGrid(numOfRows, numOfCols);
});

//build the grid based on the slider output value
rebuildGrid(numOfRows, numOfCols);

//listen for slider input & update output display
slider.addEventListener('input', (e) => {
  sliderOutput.textContent = `Grid Size: ${e.target.value}x${e.target.value}`;
});

//listen for slider change & rebuild grid with the value
slider.addEventListener('change', (e) => {
  numOfRows = e.target.value;
  numOfCols = numOfRows;
  rebuildGrid(numOfRows, numOfCols);
});
