const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
let isMouseDown = false;
let drawingMethod = "pencil"; 
let shapeHeight = 100; 

canvas.width = 1000;
canvas.height = 600;
canvasContext.lineCap = "round";

const colorPicker = document.getElementById("colorPicker");
const lineWidthInput = document.getElementById("lineWidthInput");
const resetButton = document.getElementById("resetButton");

const circleButton = document.getElementById("circleButton");
const triangleButton = document.getElementById("triangleButton");
const squareButton = document.getElementById("squareButton");
const pencilButton = document.getElementById("pencilButton");

const shapeSizeInput = document.getElementById("shapeSizeInput");

shapeSizeInput.addEventListener("input", () => {
  shapeHeight = shapeSizeInput.value;
  if (!isMouseDown && drawingMethod !== "pencil") {
    const { mouseXPosition, mouseYPosition } = getMousePosition(event);
    drawShape(drawingMethod, mouseXPosition, mouseYPosition);
  }
});

const init = () => {
  canvasContext.strokeStyle = colorPicker.value;
  canvasContext.lineWidth = lineWidthInput.value;
  shapeHeight = shapeSizeInput.value;
};

const reset = () => {
  canvasContext.resetTransform();
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  init();
};

const selectButton = (button) => {
  [circleButton, triangleButton, squareButton, pencilButton].forEach((btn) => {
    btn.classList.remove("selected-button");
  });

  button.classList.add("selected-button");
};

const drawShape = (shape, x, y) => {
  switch (shape) {
    case "circle":
      drawCircle(x, y);
      break;
    case "triangle":
      drawTriangle(x, y);
      break;
    case "rectangle":
      drawRectangle(x, y);
      break;
  }
};

const drawTriangle = (x, y) => {
  canvasContext.beginPath();
  const height = (Math.sqrt(3) / 2) * shapeHeight; 
  canvasContext.moveTo(x, y - height / 2);
  canvasContext.lineTo(x + shapeHeight / 2, y + height / 2);
  canvasContext.lineTo(x - shapeHeight / 2, y + height / 2);
  canvasContext.closePath();
  canvasContext.stroke();
};

const drawCircle = (x, y) => {
  canvasContext.beginPath();
  canvasContext.arc(x, y, shapeHeight / 2, 0, 2 * Math.PI);
  canvasContext.stroke();
};

const drawRectangle = (x, y) => {
  canvasContext.beginPath();
  canvasContext.rect(x - shapeHeight / 2, y, shapeHeight, shapeHeight);
  canvasContext.stroke();
};

circleButton.addEventListener("click", () => {
  drawingMethod = "circle";
  selectButton(circleButton);
});

triangleButton.addEventListener("click", () => {
  drawingMethod = "triangle";
  selectButton(triangleButton);
});

squareButton.addEventListener("click", () => {
  drawingMethod = "rectangle";
  selectButton(squareButton);
});

pencilButton.addEventListener("click", () => {
  drawingMethod = "pencil";
  selectButton(pencilButton);
});

colorPicker.addEventListener("input", () => {
  canvasContext.strokeStyle = colorPicker.value;
});

lineWidthInput.addEventListener("input", () => {
  canvasContext.lineWidth = lineWidthInput.value;
});

resetButton.addEventListener("click", () => {
  reset();
});

canvas.addEventListener("mousedown", (event) => {
  isMouseDown = true;
  const { mouseXPosition, mouseYPosition } = getMousePosition(event);
  canvasContext.beginPath();
  canvasContext.moveTo(mouseXPosition, mouseYPosition);
});

canvas.addEventListener("mouseup", (event) => {
  isMouseDown = false;
  const { mouseXPosition, mouseYPosition } = getMousePosition(event);

  if (drawingMethod === "pencil") {
    drawLine(mouseXPosition, mouseYPosition);
  } else {
    drawShape(drawingMethod, mouseXPosition, mouseYPosition);
  }
});

canvas.addEventListener("mousemove", (event) => {
  const { mouseXPosition, mouseYPosition } = getMousePosition(event);

  if (isMouseDown) {
    if (drawingMethod === "pencil") {
      drawLine(mouseXPosition, mouseYPosition);
    } else {
      drawShape(drawingMethod, mouseXPosition, mouseYPosition);
    }
  }
});

const drawLine = (x, y) => {
  canvasContext.lineTo(x, y);
  canvasContext.stroke();
};

const getMousePosition = (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseXPosition = event.clientX - rect.left;
  const mouseYPosition = event.clientY - rect.top;
  return { mouseXPosition, mouseYPosition };
};

init();
