function eval() {
  // Do not use eval!!!
  return;
}

const priority = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2
};

const operators = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y
};

function expressionCalculator(expr) {
  // write your solution here

  const oddBrackets = expr.split("").reduce((count, el) => {
    if (el === "(") count++;
    else if (el === ")") count--;
    return count;
  }, 0);
  if (oddBrackets != 0) {
    throw new Error("ExpressionError: Brackets must be paired!");
  } else if (expr.includes("/0") || expr.includes("/ 0")) {
    throw new Error("TypeError: Division by zero.");
  }

  const rpn = str => {
    const stack = [];
    let outString = "";
    str.split("").map(el => {
      if (el === "(") {
        stack.push(el);
      } else if (el === ")") {
        while (stack[stack.length - 1] != "(") {
          outString += stack.pop() + " ";
        }
        stack.pop();
      } else {
        if (el in operators) {
          outString += " ";
          while (priority[el] <= priority[stack[stack.length - 1]]) {
            outString += stack.pop() + " ";
          }
          stack.push(el);
        } else {
          outString += el;
        }
      }
    });
    while (stack.length > 0) {
      outString += " " + stack.pop();
    }
    // console.log (expr + ' ----> ' + outString.replace(/\s+/g, ' '));
    return outString.replace(/\s+/g, " ");
  };

  const calcRPN = str => {
    const stack = [];
    str.split(" ").map(el => {
      if (el in operators) {
        const [y, x] = [stack.pop(), stack.pop()];
        stack.push(operators[el](x, y));
      } else {
        stack.push(parseFloat(el));
      }
    });
    // console.log ('result: ' + stack.pop());
    return stack.pop();
  };

  return calcRPN(rpn(expr));
}

module.exports = {
  expressionCalculator
};
