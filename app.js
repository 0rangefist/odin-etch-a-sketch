const getHoverColor = function () {
  return 'hover-color-black';
};

const rebuildGrid = function (numOfRows, numOfCols) {
  //get grid div (new cells will populate in here)
  let gridDiv = document.querySelector('.flex-grid');
  //clear the content of the grid div on each rebuild
  gridDiv.replaceChildren();

  //get sketch-pad grid width and height
  let sketchPadDiv = document.querySelector('.sketch-pad');
  const gridTotalWidth = sketchPadDiv.clientWidth; //500pixels
  const gridTotalHeight = sketchPadDiv.clientHeight;

  //calculate cell width & height
  const cellWidth = gridTotalWidth / numOfRows;
  const cellHeight = gridTotalHeight / numOfCols;

  //create numOfRows x numOfCols cells with calculated cellWidth & cellHeight
  //and populate it into the gridDiv element
  for (let i = 0; i < numOfRows; i++) {
    for (let j = 0; j < numOfCols; j++) {
      let cellDiv = document.createElement('div');
      cellDiv.className = 'cell';
      cellDiv.style.width = cellWidth + 'px';
      console.log('cell length:', cellDiv.style.width);
      cellDiv.style.height = cellHeight + 'px';
      cellDiv.classList.add('default-color');
      gridDiv.appendChild(cellDiv);
    }
  }

  //listen for mouseover(hover) & change color of cell by adding appropriate class
  gridDiv.addEventListener('mouseover', (e) => {
    console.log('mouseover:', e.target);

    let targetCellDiv = e.target;
    console.log(targetCellDiv.classList.contains('cell'));
    targetCellDiv.classList.remove('default-color');
    targetCellDiv.classList.add(getHoverColor());
  });
};

//get user slider
let slider = document.querySelector('.slider');
let sliderOutput = document.querySelector('.slider-output');

//get the slider's starting output value
sliderOutput.textContent = slider.value;

// set numOfRows & numOfCols to starting slider output
let numOfRows = slider.value;
let numOfCols = numOfRows;

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
  console.log('num of rows:', numOfRows);
  console.log('num of cols:', numOfCols);
  rebuildGrid(numOfRows, numOfCols);
});
