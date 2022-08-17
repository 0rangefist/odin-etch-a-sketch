// const getHoverColor = function (element) {
//   //if eraser button is selected
//   eraserButton.addEventListener(type, listener)
//   if(){
//     element.classList.remove('hover-color-black');
//     element.classList.remove('hover-color-multi');
//     return '';
//   }

//   //if multi-colour button is selected
//   else if(){
//     element.classList.remove('hover-color-black');
//     return 'hover-color-multi';
//   }

//   //else if black button is selected
//   else if(){
//     element.classList.remove('hover-color-multi');
//     return 'hover-color-black';
//   }

// };

const getRandomColor = function(){
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    return `rgb(${randomR}, ${randomG}, ${randomB})`;
}
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
    let targetCellDiv = e.target;
    //targetCellDiv.classList.remove('default-color');
    if (hoverColor == 'cell hover-color-multi'){
        targetCellDiv.style.backgroundColor = getRandomColor();

    }

    if (hoverColor == 'cell') {
        targetCellDiv.style.backgroundColor = '';
    }
    
    targetCellDiv.className = hoverColor;
    console.log('hover class:', hoverColor);
  });


};

//get grid div (new cells will populate in here)
let gridDiv = document.querySelector('.flex-grid');

//get user slider
let slider = document.querySelector('.slider');
let sliderOutput = document.querySelector('.slider-output');

//get the slider's starting output value
sliderOutput.textContent = slider.value;

// set numOfRows & numOfCols to starting slider output
let numOfRows = slider.value;
let numOfCols = numOfRows;

//get buttons
const blackButton = document.querySelector('.black-button');
const multiColorButton = document.querySelector('.multi-color-button');
const eraserButton = document.querySelector('.eraser-button');
const clearButton = document.querySelector('.clear-button');
let hoverColor = 'cell hover-color-black';

  blackButton.addEventListener('click', function () {
    hoverColor = 'cell hover-color-black';
    blackButton.classList.add('active');
    multiColorButton.classList.remove('active');
    eraserButton.classList.remove('active');
  });
  multiColorButton.addEventListener('click', function () {
    hoverColor = 'cell hover-color-multi';
    blackButton.classList.remove('active');
    multiColorButton.classList.add('active');
    eraserButton.classList.remove('active');
  });
  eraserButton.addEventListener('click', function () {
    hoverColor = 'cell';
    blackButton.classList.remove('active');
    multiColorButton.classList.remove('active');
    eraserButton.classList.add('active');
  });
  clearButton.addEventListener('click', function () {
    gridDiv.replaceChildren();
    rebuildGrid(numOfRows, numOfCols);
  });

//build the grid based on the slider output value
rebuildGrid(numOfRows, numOfCols);

//listen for slider input & update output display
slider.addEventListener('input', function () {
  sliderOutput.textContent = this.value;
});

//listen for slider change & rebuild grid with the value
slider.addEventListener('change', function () {
  numOfRows = this.value;
  numOfCols = numOfRows;
  rebuildGrid(numOfRows, numOfCols);
});
