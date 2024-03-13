import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function Button({ children }: { children: React.ReactNode }) {
  return <div className="button">{children}</div>;
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="row">{children}</div>;
}

function App() {
  const [num, setNum] = useState("");

  const handleTextInput = (e: KeyboardEvent) => {
    const validKeys = "1234567890*#";

    if (!validKeys.includes(e.key)) {
      console.log("wrong key pressed");
      return;
    }
    if (num.length === 8) {
      // call
    }

    setNum(num + e.key);
  };

  document.addEventListener("keydown", handleTextInput);

  return (
    <div className="App-header">
      <div className="keypad">
        <div className="number">{num}</div>

        <Row>
          <Button>1</Button> <Button>2</Button> <Button>3</Button>
        </Row>
        <Row>
          <Button>4</Button> <Button>5</Button> <Button>6</Button>
        </Row>
        <Row>
          <Button>7</Button> <Button>8</Button> <Button>9</Button>
        </Row>
        <Row>
          <Button>*</Button> <Button>0</Button> <Button>#</Button>
        </Row>
      </div>
    </div>
  );
}

export default App;
