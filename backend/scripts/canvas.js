const fs = require("fs");
const path = require("path");

const {
  isCorrectCanvas,
  isCanvasCreated,
  isCorrectLine,
  isCorrectRectangle,
  isCorrectBucketFill,
} = require("./exceptions");

const writeFile = (outputArr) => {
  fs.writeFileSync(
    path.join(__dirname, "../", "output.txt"),
    outputArr.reduce((acc, str) => acc + str.join("") + "\n", ``),
    (err) => {
      if (err) throw err;
    }
  );
};

const appendFile = (outputArr) => {
  fs.appendFileSync(
    path.join(__dirname, "../", "output.txt"),
    outputArr.reduce((acc, str) => acc + str.join("") + "\n", ``),
    (err) => {
      if (err) throw err;
    }
  );
};

const createCanvas = (width, height) => {
  isCorrectCanvas(width, height);
  const canvas = [];

  for (let y = 0; y < height + 2; y++) {
    canvas.push([]);

    for (let x = 0; x < width + 2; x++) {
      if (y === 0 || y === height + 1) {
        canvas[y][x] = "-";
      } else if (x === 0 || x === width + 1) {
        canvas[y][x] = "|";
      } else {
        canvas[y][x] = " ";
      }
    }
  }

  return canvas;
};

const drawLine = (x1, y1, x2, y2, outputArr) => {
  isCorrectLine(x1, y1, x2, y2, outputArr);
  if (x1 === x2) {
    for (let y = y1; y <= y2; y++) {
      outputArr[y][x1] = "x";
    }
  }
  if (y1 === y2) {
    for (let x = x1; x <= x2; x++) {
      outputArr[y1][x] = "x";
    }
  }

  return outputArr;
};

const drawRectangle = (x1, y1, x2, y2, outputArr) => {
  isCorrectRectangle(x1, y1, x2, y2, outputArr);
  outputArr = drawLine(x1, y1, x1, y2, outputArr);
  outputArr = drawLine(x1, y1, x2, y1, outputArr);
  outputArr = drawLine(x2, y1, x2, y2, outputArr);
  outputArr = drawLine(x1, y2, x2, y2, outputArr);
  return outputArr;
};

const isInArr = (x, y, outputArr) => {
  return outputArr[y] !== undefined && outputArr[y][x] !== undefined;
};

const bucketFill = (x, y, symbol, outputArr) => {
  if (outputArr[y][x] === " ") {
    outputArr[y][x] = symbol;

    for (let [dy, dx] of [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]) {
      let nextY = y + dy;
      let nextX = x + dx;

      while (
        isInArr(nextX + dx, nextY + dy, outputArr) &&
        outputArr[nextY + dy][nextX + dx] === " " &&
        outputArr[nextY][nextX] === " "
      ) {
        outputArr[nextY][nextX] = symbol;
        nextY += dy;
        nextX += dx;
      }

      bucketFill(nextX, nextY, symbol, outputArr);
    }
  }
  return outputArr;
};

const draw = (inputStr) => {
  const commands = inputStr.split("\n");
  let isCanvasExsists = false;
  let outputArr = [];

  commands.forEach((command) => {
    const params = command.trim().split(" ");
    const commandName = params[0];

    switch (commandName) {
      case "C": {
        if (isCanvasExsists) {
          throw new Error("Only one canvas can be drawn!");
        }
        const [, width, height] = params;

        outputArr = createCanvas(+width, +height);
        writeFile(outputArr);
        isCanvasExsists = true;
        break;
      }
      case "L": {
        const [, x1, y1, x2, y2] = params;
        isCanvasCreated(isCanvasExsists);

        outputArr = drawLine(+x1, +y1, +x2, +y2, outputArr);
        appendFile(outputArr);
        break;
      }
      case "R": {
        const [, x1, y1, x2, y2] = params;
        isCanvasCreated(isCanvasExsists);

        outputArr = drawRectangle(+x1, +y1, +x2, +y2, outputArr);
        appendFile(outputArr);
        break;
      }
      case "B": {
        const [, x, y, symbol] = params;
        isCanvasCreated(isCanvasExsists);
        isCorrectBucketFill(x, y, outputArr);

        outputArr = bucketFill(+x, +y, symbol, outputArr);
        appendFile(outputArr);
        break;
      }
    }
  });
};

module.exports = {
  draw,
  bucketFill,
  isInArr,
  drawRectangle,
  drawLine,
  createCanvas,
  appendFile,
  writeFile,
};
