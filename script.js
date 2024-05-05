// Function to draw the x and y axes
function drawAxes(ctx, canvas) {
  // Draw x and y axis lines and labels
  for (let x = -6; x <= 6; x++) {
    for (let y = -6; y <= 6; y++) {
      ctx.beginPath();

      ctx.moveTo(canvas.width / 2 + x * 30, canvas.height / 2);
      ctx.lineTo(canvas.width / 2 + x * 30, canvas.height / 2 - y * 25);
      ctx.moveTo(canvas.width / 2, canvas.height / 2 - y * 25);
      ctx.lineTo(canvas.width / 2 - x * 30, canvas.height / 2 - y * 25);
      ctx.strokeStyle = "#eee6dd";
      x === 0 || y === 0
        ? (ctx.strokeStyle = "#000")
        : (ctx.strokeStyle = "#eee6dd");
      ctx.stroke();
    }
  }

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.strokeStyle = "#000";
  ctx.stroke();

  // Draw x-axis line numbers
  for (let x = -6; x <= 6; x++) {
    ctx.fillText(x, canvas.width / 2 + x * 30, canvas.height / 2 + 10);
  }

  // Draw y-axis line numbers
  for (let y = -6; y <= 6; y++) {
    y === 0
      ? ""
      : ctx.fillText(y, canvas.width / 2 - 20, canvas.height / 2 - y * 25); // filltext(text, x, y)
  }
}

// Function to draw the diagram
function drawDiagram() {
  const canvas = document.getElementById("diagramCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  drawAxes(ctx, canvas);

  const functionInputs = document.querySelectorAll(".functionInput");
  const functions = Array.from(functionInputs).map((input) => input.value);

  functions.forEach((func, index) => {
    const color = getRandomColor();
    const expression = func
      .replace(/x/g, "(x)")
      .replace(/X/g, "(x)")
      .replace(/e/g, "Math.exp")
      .replace(/pi/g, "Math.PI")

      .replace(/\^/g, "**") // Replace ^ with **
      .replace(/sqrt/g, "Math.sqrt")
      .replace(/sin/g, "Math.sin")
      .replace(/cos/g, "Math.cos")
      .replace(/tan/g, "Math.tan")
      .replace(/log/g, "Math.log")
      .replace(/ln/g, "Math.log");

    ctx.beginPath();

    for (let x = -6; x <= 6; x += 0.01) {
      const y = eval(expression);  // Evaluate the expression for each x value ( string to number )
      const plotX = canvas.width / 2 + x * 30;
      const plotY = canvas.height / 2 - y * 25;
      if (x === -6) {
        ctx.moveTo(plotX, plotY);
      } else {
        ctx.lineTo(plotX, plotY);
      }
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

// Display function text
// ctx.fillStyle = color;
// ctx.fillText(func, 16, 20 * (index + 1));

// Display equation near the line
const xValue = 3; 
const yValue = eval(func.replace(/x/g, `(${xValue})`));
const equationText = `${getRandomFunctionName()}(x) = ${func}`;
  // (yValue < 0 || yValue > 100) ? yValue= 0 : yValue = yValue;
  ctx.fillText(equationText, canvas.width / 2 + xValue * 30 + 10, canvas.height / 2 - yValue * 25 - 10);
  });
}

// Function to generate random color
function getRandomFunctionName() {
  const letters = "FGHL";
  let random = "";

    random += letters[Math.floor(Math.random() * 4)];
  
  return random;
}

// Add function input field dynamically
document
  .getElementById("addFunctionBtn")
  .addEventListener("click", function () {
    const functionInputs = document.querySelectorAll(".functionInput");

    // Check if the number of inputs is less than 3 before adding a new one
    if (functionInputs.length < 3) {
      const functionInputsContainer = document.getElementById("functionInputs");
      const input = document.createElement("input");
      input.type = "text";
      input.className = "functionInput";
      input.placeholder = "Enter a function (e.g., x^2 - e(x))";
      functionInputsContainer.appendChild(input);
      addFunctionToHistory();
    } else {
      const firstInput = functionInputs[0];
      const parent = firstInput.parentNode; // Get the parent element of the first input element ( parentNode means it will return the parent element of the first input element)
      parent.removeChild(firstInput); // Remove the first input element
      parent.appendChild(firstInput); // Append the first input element

      // Update placeholder and clear value for the first input
      firstInput.value = "";
      firstInput.placeholder = "Enter a function (e.g., x^2 - e(x))";
      addFunctionToHistory();
    }
  });

// Delete all functions
document.getElementById("delete").addEventListener("click", function () {
  location.reload();
});

// Draw diagram when the page loads
window.addEventListener("load", drawDiagram);

// Redraw diagram when any input changes
document
  .getElementById("functionInputs")
  .addEventListener("input", drawDiagram);

// Function to generate random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
// Export diagram as PNG
document.getElementById("exportPngBtn").addEventListener("click", function () {
  const canvas = document.getElementById("diagramCanvas");
  const dataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "diagram.png";
  link.click();
});

// Export diagram as SVG
document.getElementById("exportSvgBtn").addEventListener("click", function () {
  const svgData = document.getElementById("diagramCanvas").toSVG();
  const blob = new Blob([svgData], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "diagram.svg";
  link.click();
});

// Toggle between homepage and settings view
document.getElementById("homepageBtn").addEventListener("click", function () {
  document.getElementById("homepage").classList.remove("hidden");
  document.getElementById("settings").classList.add("hidden");
  // Add 'active' class to clicked link and remove from other links
  this.classList.add("active");
  document.getElementById("settingsBtn").classList.remove("active");
});

document.getElementById("settingsBtn").addEventListener("click", function () {
  document.getElementById("homepage").classList.add("hidden");
  document.getElementById("settings").classList.remove("hidden");
  // Add 'active' class to clicked link and remove from other links
  this.classList.add("active");
  document.getElementById("homepageBtn").classList.remove("active");
});

// Store functions separately from the DOM elements
const functionHistoryData = [];

// Function to add every added function to history
function addFunctionToHistory() {
  const functionInputs = document.querySelectorAll(".functionInput");
  const functionHistory = document.getElementById("functionHistory");

  functionInputs.forEach((input) => {
    const func = input.value.trim(); // trim to remove leading and trailing whitespace
    if (func !== "" && !functionHistoryData.includes(func)) {
      functionHistoryData.push(func); // Store the function in the data array
      const li = document.createElement("li");
      li.textContent = func;
      functionHistory.appendChild(li);
      const hr = document.createElement("hr");
      functionHistory.appendChild(hr);
    }
  });
}

// Extend the HTMLCanvasElement prototype with a toSVG() method
if (!HTMLCanvasElement.prototype.toSVG) {
  HTMLCanvasElement.prototype.toSVG = function () {
    // Create a new XMLSerializer
    const serializer = new XMLSerializer();
    // Serialize the canvas element to XML
    const svg = serializer.serializeToString(this);
    // Return the serialized SVG string
    return svg;
  };
}


// Function to set the background color of the whole app
function setAppBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}

// Add an event listener to the color picker input
document.getElementById("backgroundColorPicker").addEventListener("input", function () {
  const selectedColor = this.value;
  setAppBackgroundColor(selectedColor);
});
