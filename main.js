const container = document.querySelector("#grid-container");
const gridSizeText = document.querySelector("#gridSize");

const toggleGridBtn = document.querySelector("#toggleBtn");

let currentGridSize = 16;
let currentPaint = "black";

let grid_items = container.children;

const colorPicker = document.querySelector("#colorPicker");
// Change Color
colorPicker.onchange = (e) => (currentPaint = e.target.value);
// Change Grid Size
const sizeSlider = document.querySelector("#sizeSlider");
sizeSlider.onchange = (e) => {
  changeGridSize(e.target.value);
  clearGrid(container);
  createGrid(currentGridSize, container);
};
// Update Grid Size Text
sizeSlider.onmousemove = (e) => {
  gridSizeText.textContent = `${e.target.value.toString()} x ${e.target.value.toString()}`;
};

// Paint Grid
const paintGrid = (grid_item, paint) => {
  grid_item.target.style.backgroundColor = paint;
};

const create_grid_items = (number_of_grid_items, grid_container) => {
  for (let i = 0; i < number_of_grid_items * number_of_grid_items; i++) {
    const grid_item = document.createElement("div");
    grid_item.className = "grid-item-border";
    grid_item.addEventListener("mouseover", (e) => {
      paintGrid(e, currentPaint);
    });
    grid_container.appendChild(grid_item);
  }
};

const createGrid = (gridSize, gridContainer) => {
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize},1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridSize},1fr`;
  gridSizeText.textContent = `${gridSize.toString()} x ${gridSize.toString()}`;
  create_grid_items(gridSize, gridContainer);
};

const clearGrid = (gridContainer) => {
  gridContainer.innerHTML = "";
};

const changeGridSize = (newGridSize) => {
  currentGridSize = newGridSize;
};

const hideGrid = () => {
  for (let i of grid_items) {
    i.classList.toggle("grid-item-border");
  }
};

toggleGridBtn.addEventListener("click", () => {
  hideGrid();
});

createGrid(currentGridSize, container);
