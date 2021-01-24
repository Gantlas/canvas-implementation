const ERROR_NAME = "Custom Error";

const isCorrectCanvas = (w, h) => {
  if (w < 1 || h < 1) {
    throw new Error("Canvas width and height should be 1 or more!");
  }
};

const isCanvasCreated = (flag) => {
  if (!flag) {
    throw new Error(
      "In order to draw you need to create a canvas!",
      ERROR_NAME
    );
  }
};

const isCorrectLine = (x1, y1, x2, y2, arr) => {
  if (
    !(
      (x1 === x2 || y1 === y2) &&
      x2 < arr[0].length - 1 &&
      y2 < arr.length - 1 &&
      y1 <= y2 &&
      x1 <= x2 &&
      x1 > 0 &&
      x2 > 0 &&
      y1 > 0 &&
      y2 > 0
    )
  ) {
    throw new Error("Wrong line coordinates!");
  }
};

const isCorrectRectangle = (x1, y1, x2, y2, arr) => {
  if (
    !(
      x2 < arr[0].length - 1 &&
      y2 < arr.length - 1 &&
      y1 <= y2 &&
      x1 <= x2 &&
      x1 > 0 &&
      x2 > 0 &&
      y1 > 0 &&
      y2 > 0
    )
  ) {
    throw new Error("Wrong rectangle coordinates!");
  }
};

const isCorrectBucketFill = (x, y, arr) => {
  if (!(x < arr[0].length - 1 && y < arr.length - 1 && x > 0 && y > 0)) {
    throw new Error("You cannot fill the area outside the canvas!");
  }
};

module.exports = {
  isCorrectCanvas,
  isCanvasCreated,
  isCorrectLine,
  isCorrectRectangle,
  isCorrectBucketFill,
};
