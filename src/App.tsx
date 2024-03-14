import React, { useCallback, useEffect, useState } from "react";

import "./App.css";
import { card_list } from "./cards";
import { DreamPhoneSdk } from "./dream-phone-sdk";
import { sleep } from "./utils";
// import { DreamPhoneSdk } from "./dream-phone-sdk";

function Button({ children }: { children: React.ReactNode }) {
  return <div className="button">{children}</div>;
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="row">{children}</div>;
}

function App() {
  const [num, setNum] = useState("");
  const [sdk] = useState(new DreamPhoneSdk(card_list));

  const handleTextInput = useCallback(
    async (e: KeyboardEvent) => {
      const validKeys = "1234567890*#";

      if (!validKeys.includes(e.key)) {
        console.log("wrong key pressed");
        return;
      }

      // if key * (redial)

      // if key 0 (speaker button)

      // if hash (guess button)

      // if its game restart, although that may be handled by another function?

      // it must be a number now

      // states (e.g. after entering number, we should be in a call state, then we should go back to entry state)

      const newNum = num + e.key;
      if (newNum.length === 7) {
        sdk.dialNumber(newNum);

        await sleep(3000);
        setNum("");
        // setNum("");
      } else {
        setNum(newNum);
      }
    },
    [num, sdk]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleTextInput);

    return () => document.removeEventListener("keydown", handleTextInput);
  }, [handleTextInput]);

  // sdk.test_dialEveryone(); // Extract to button

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
