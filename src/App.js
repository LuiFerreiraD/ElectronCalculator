import React from "react";
import "./App.css";

function Button(props) {
  const { onClick, className, children, id } = props;

  return (
    <button onClick={onClick} className={className} id={id}>
      {children}
    </button>
  );
}

function NumberButton(props) {
  const { onClick, children, id } = props;

  return (
    <Button onClick={onClick} className="number-bttn" id={id}>
      {children}
    </Button>
  );
}

function OperationButton(props) {
  const { onClick, children, id } = props;

  return (
    <Button onClick={onClick} className="operation-bttn" id={id}>
      {children}
    </Button>
  );
}

function CommaButton(props) {
  const { onClick, children, id } = props;

  return (
    <Button onClick={onClick} className="comma-bttn" id={id}>
      {children}
    </Button>
  );
}

function ClearButton(props) {
  const { onClick, children, id } = props;

  return (
    <Button onClick={onClick} className="clear-bttn" id={id}>
      {children}
    </Button>
  );
}

function ResultButton(props) {
  const { onClick, children, id } = props;

  return (
    <Button onClick={onClick} className="result-bttn" id={id}>
      {children}
    </Button>
  );
}

function DeleteButton(props) {
  const { onClick, children, id } = props;

  return (
    <Button onClick={onClick} className="delete-bttn" id={id}>
      {children}
    </Button>
  );
}

function FormatLogic(number) {
  let [IntegerPart, FractionPart] = number.split(".");
  let IntegerLenght =
    typeof IntegerPart == "undefined"
      ? 0
      : IntegerPart.replaceAll(",", "").length;
  let FractionLenght =
    typeof FractionPart == "undefined" ? 0 : FractionPart.length;
  let TotalLenght = IntegerLenght + FractionLenght;
  if (TotalLenght === 15) {
    return number.slice(0, -1);
  }
  let CurrentNum = parseFloat(number.replaceAll(",", ""));
  CurrentNum = Intl.NumberFormat("en", { maximumFractionDigits: 20 }).format(
    CurrentNum
  );
  return CurrentNum;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOperator: "0",
      lastOperator: "",
    };
    this.AddNumber = this.AddNumber.bind(this);
    this.ClearDisplays = this.ClearDisplays.bind(this);
    this.DeleteLast = this.DeleteLast.bind(this);
    this.AddPoint = this.AddPoint.bind(this);
    this.FormatDisplay = this.FormatDisplay.bind(this);
    this.StartOperation = this.StartOperation.bind(this);
    this.PerformOperation = this.PerformOperation.bind(this);
  }

  AddNumber(number) {
    this.setState((state, props) => ({
      currentOperator: FormatLogic(state.currentOperator + number),
    }));
  }

  ClearDisplays() {
    this.setState((state, props) => ({
      currentOperator: "0",
      lastOperator: "",
    }));
  }

  DeleteLast() {
    this.setState((state, props) => ({
      currentOperator: FormatLogic(
        state.currentOperator.slice(0, -1) === ""
          ? "0"
          : state.currentOperator.slice(0, -1)
      ),
    }));
  }

  AddPoint() {
    this.setState((state, props) => ({
      currentOperator: state.currentOperator.includes(".")
        ? state.currentOperator
        : state.currentOperator + ".",
    }));
  }

  FormatDisplay() {
    this.setState((state, props) => ({
      currentOperator: FormatLogic(state.currentOperator),
    }));
  }

  StartOperation(operation) {
    if (this.state.lastOperator !== "") {
      let tobechanged = this.state.lastOperator.slice(0, -1) + operation;
      this.setState((state, props) => ({
        lastOperator: tobechanged,
      }));
    } else {
      this.setState((state, props) => ({
        currentOperator: "0",
        lastOperator: state.currentOperator + " " + operation,
      }));
    }
  }

  PerformOperation() {
    if (this.state.lastOperator === "") {
      return;
    }
    let [number1, operation] = this.state.lastOperator.split(" ");
    let number2 = this.state.currentOperator;

    if (operation === "×") {
      operation = "*";
    } else if (operation === "÷") {
      operation = "/";
    }
    let EquationString =
      number1.replaceAll(",", "") +
      " " +
      operation +
      " " +
      number2.replaceAll(",", "");
    let result = eval(EquationString).toString();
    if (result.length > 14) {
      this.setState((state, props) => ({
        currentOperator: FormatLogic(result.slice(0, 14)), //"value too big",
        lastOperator: "",
      }));
    } else {
      this.setState((state, props) => ({
        currentOperator: FormatLogic(result),
        lastOperator: "",
      }));
    }

    /*
    number1 = parseFloat(number1.replaceAll(",", ""));
    number2 = parseFloat(number2.replaceAll(",", ""));
    */
  }

  render() {
    const { currentOperator, lastOperator } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h3>Calculadora</h3>
        </header>
        <div className="App-content">
          <span className="displays">
            <div className="last_operator_display">{lastOperator}</div>
            <div className="display">{currentOperator}</div>
          </span>
          <div className="calc_buttons">
            <ClearButton id="clear" onClick={() => this.ClearDisplays()}>
              AC
            </ClearButton>
            <DeleteButton id="delete" onClick={() => this.DeleteLast()}>
              <span className="stretched">⌫</span>
            </DeleteButton>
            <OperationButton
              id="times"
              onClick={() => this.StartOperation("×")}
            >
              &times;
            </OperationButton>
            <OperationButton
              id="divide"
              onClick={() => this.StartOperation("÷")}
            >
              ÷
            </OperationButton>
            <NumberButton className="sete" onClick={() => this.AddNumber("7")}>
              7
            </NumberButton>
            <NumberButton id="oito" onClick={() => this.AddNumber("8")}>
              8
            </NumberButton>
            <NumberButton id="nove" onClick={() => this.AddNumber("9")}>
              9
            </NumberButton>
            <OperationButton
              id="minus"
              onClick={() => this.StartOperation("-")}
            >
              -
            </OperationButton>
            <NumberButton id="quatro" onClick={() => this.AddNumber("4")}>
              4
            </NumberButton>
            <NumberButton id="cinco" onClick={() => this.AddNumber("5")}>
              5
            </NumberButton>
            <NumberButton id="seis" onClick={() => this.AddNumber("6")}>
              6
            </NumberButton>
            <OperationButton id="plus" onClick={() => this.StartOperation("+")}>
              +
            </OperationButton>
            <NumberButton id="um" onClick={() => this.AddNumber("1")}>
              1
            </NumberButton>
            <NumberButton id="dois" onClick={() => this.AddNumber("2")}>
              2
            </NumberButton>
            <NumberButton id="tres" onClick={() => this.AddNumber("3")}>
              3
            </NumberButton>
            <ResultButton id="equal" onClick={() => this.PerformOperation()}>
              =
            </ResultButton>
            <NumberButton id="zero" onClick={() => this.AddNumber("0")}>
              0
            </NumberButton>
            <CommaButton id="point" onClick={() => this.AddPoint()}>
              .
            </CommaButton>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
