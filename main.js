const container = document.querySelector("#grid-container");
const gridSizeText = document.querySelector("#gridSize");

const toggleGridBtn = document.querySelector("#toggleBtn");
const clearBtn = document.querySelector("#clearBtn");
clearBtn.addEventListener("click", () => {
  for (let i of grid_items) {
    i.style.backgroundColor = "#ededed";
  }
})
const rgbaBtn = document.querySelector("#rgbaBtn");
rgbaBtn.addEventListener("click", () => {
  colorMode = 1;
  rgbaBtn.classList.remove("deactive");
  hslBtn.classList.remove("hslBtn");
  hslBtn.classList.add("deactive");
  rgbaBtn.classList.add("rgbaBtn");
});
const hslBtn = document.querySelector("#hslBtn");
hslBtn.addEventListener("click", () => {
  colorMode = 2;
  hslBtn.classList.remove("deactive");
  rgbaBtn.classList.remove("rgbaBtn");
  rgbaBtn.classList.add("deactive");
  hslBtn.classList.add("hslBtn");
});

let colorMode = 0;
let currentGridSize = 16;
let currentPaint = "black";

let grid_items = container.children;

const createRandomColorRGBA = () => {
  color = Math.floor(Math.random() * 256);
  return color;
};

const createRandomColorHSL = () => {
  h = Math.floor(Math.random() * 360);
  s = Math.floor(Math.random() * 100) + "%";
  l = Math.floor(Math.random() * 100) + "%";
  colors = [h, s, l];
  return colors;
};

const colorPicker = document.querySelector("#colorPicker");
// Change Color
colorPicker.onchange = (e) => {
  colorMode = 0;
  currentPaint = e.target.value;
  rgbaBtn.classList.add("deactive");
  rgbaBtn.classList.remove("rgbaBtn");
  hslBtn.classList.remove("hslBtn");
  hslBtn.classList.add("deactive");
};
// Change Grid Size
const sizeSlider = document.querySelector("#sizeSlider");
sizeSlider.onchange = (e) => {
  toggleGridBtn.classList.toggle("deactive");
  changeGridSize(e.target.value);
  clearGrid(container);
  createGrid(currentGridSize, container);
};
// Update Grid Size Text
sizeSlider.onmousemove = (e) => {
  gridSizeText.textContent = `${e.target.value.toString()} x ${e.target.value.toString()}`;
};

// Paint Grid
const paintGrid = (grid_item, paint, colorMode) => {
  if (colorMode === 1) {
    grid_item.target.style.backgroundColor = `rgba(${createRandomColorRGBA()},${createRandomColorRGBA()},${createRandomColorRGBA()},1)`;
  } else if (colorMode === 2) {
    hslColor = createRandomColorHSL();
    grid_item.target.style.backgroundColor = `hsl(${hslColor[0]},${hslColor[1]},${hslColor[2]})`;
  } else {
    grid_item.target.style.backgroundColor = paint;
  }
};

const create_grid_items = (number_of_grid_items, grid_container) => {
  for (let i = 0; i < number_of_grid_items * number_of_grid_items; i++) {
    const grid_item = document.createElement("div");
    grid_item.className = "grid-item-border";
    grid_item.addEventListener("mouseover", (e) => {
      paintGrid(e, currentPaint, colorMode);
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
  toggleGridBtn.classList.toggle("deactive");
});

createGrid(currentGridSize, container);
