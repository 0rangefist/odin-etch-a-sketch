const getHoverColor = function () {
  return 'hover-color-black';
};

let gridDiv = document.querySelector('.flex-grid');

const numOfRows = 16;
const numOfCols = numOfRows;

//get sketch-pad grid width and height
let sketchPadDiv = document.querySelector('.sketch-pad');
console.log('gridWidth:', sketchPadDiv.clientWidth);
const gridTotalWidth = sketchPadDiv.clientWidth; //500pixels
const gridTotalHeight = sketchPadDiv.clientHeight;

const cellWidth = gridTotalWidth / numOfRows;
const cellHeight = gridTotalHeight / numOfCols;

for (let i = 0; i < numOfRows; i++) {
  for (let j = 0; j < numOfCols; j++) {
    let cellDiv = document.createElement('div');
    cellDiv.className = 'cell';
    cellDiv.style.width = cellWidth + 'px';
    console.log('cell length:', cellDiv.style.width);
    cellDiv.style.height = cellHeight + 'px';
    cellDiv.classList.add('default-color');
    gridDiv.appendChild(cellDiv);

    //   cellDiv.addEventListener('mouseover', (e) => {
    //     console.log('mouseover:', e);
    //   });
  }
}

gridDiv.addEventListener('mouseover', (e) => {
  console.log('mouseover:', e.target);

  let targetCellDiv = e.target;
  console.log(targetCellDiv.classList.contains('cell'));
  targetCellDiv.classList.remove('default-color');
  targetCellDiv.classList.add(getHoverColor());
});

//slider
let slider = document.querySelector('.slider');
let sliderOutput = document.querySelector('.slider-output');
sliderOutput.textContent = slider.value;
slider.oninput = function () {
  sliderOutput.textContent = this.value;
};
