// script.js

const inputField = document.querySelector(".input");
const buttons = document.querySelectorAll(".button");

let currentInput = "";
let resultDisplayed = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.innerText;

    switch (value) {
      case "AC":
        currentInput = "";
        inputField.value = "";
        break;

      case "+/-":
        if (currentInput) {
          if (currentInput.startsWith("-")) {
            currentInput = currentInput.slice(1);
          } else {
            currentInput = "-" + currentInput;
          }
          inputField.value = currentInput;
        }
        break;

      case "%":
        if (currentInput) {
          currentInput = (parseFloat(currentInput) / 100).toString();
          inputField.value = currentInput;
        }
        break;

      case "=":
        try {
          const expression = currentInput.replace(/X/g, "*");
          const result = eval(expression);
          inputField.value = result;
          currentInput = result.toString();
          resultDisplayed = true;
        } catch {
          inputField.value = "Error";
          currentInput = "";
        }
        break;

      case "+":
      case "-":
      case "X":
      case "/":
        if (resultDisplayed) resultDisplayed = false;
        if (currentInput === "") return; // Prevent starting with an operator
        currentInput += value;
        inputField.value = currentInput;
        break;

      default: // digits and .
        if (resultDisplayed) {
          currentInput = value;
          resultDisplayed = false;
        } else {
          currentInput += value;
        }
        inputField.value = currentInput;
        break;
    }
  });
});
