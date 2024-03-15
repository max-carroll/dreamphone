import React, { useCallback, useEffect, useState } from "react";

import "./App.css";
import { card_list } from "./cards";
import { DreamPhoneSdk } from "./dream-phone-sdk";
import { sleep } from "./utils";
import { Card } from "./types";

function Button({ children }: { children: React.ReactNode }) {
  return <div className="button">{children}</div>;
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="row">{children}</div>;
}

const sdk = new DreamPhoneSdk(card_list);

const waitTime = 1000;

enum PhoneState {
  READY_FOR_DIAL,
  CALLING,
  GUESS,
}

function App() {
  const [num, setNum] = useState("");
  const [phoneState, setPhoneState] = useState(PhoneState.READY_FOR_DIAL);

  const [debugInfo] = useState(sdk.getDebugInfo());

  const handleTextInput = useCallback(
    async (e: KeyboardEvent) => handleKey(e.key),
    [num, sdk]
  );

  const handleKey = async (key: string) => {
    if (phoneState === PhoneState.CALLING) return;

    const validKeys = "1234567890*#";

    if (!validKeys.includes(key)) {
      console.log("wrong key pressed");
      return;
    }

    if (key === "*") {
      sdk.redialLastNumber();
      setNum("REDIAL");
      await sleep(waitTime);
      setNum("");
      return;
    }

    // if key 0 (speaker button)

    if (key === "#") {
      setPhoneState(PhoneState.GUESS);
      setNum("GUESS");
      await sleep(waitTime);
      setNum("");
    }
    // if its game restart, although that may be handled by another function?

    let newNum = num;
    if ("123456789".includes(key)) {
      newNum += key;
    }

    if (newNum.length === 7) {
      if (phoneState === PhoneState.READY_FOR_DIAL) {
        sdk.dialNumber(newNum);
        setNum("CALLING");
        await sleep(waitTime);
      }
      if (phoneState === PhoneState.GUESS) {
        sdk.guess(newNum);
        setNum("CALLING");
        setPhoneState(PhoneState.READY_FOR_DIAL);
        await sleep(waitTime);
      }
      setNum("");
    } else {
      setNum(newNum);
    }
  };

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

      <div className="debugInfo">
        {/* Crush <pre>{JSON.stringify(debugInfo, null, 2)}</pre> */}

        <Crush card={debugInfo.crushCard} />
        {debugInfo.cardList.map((c) => (
          <Summary card={c} />
        ))}
      </div>
    </div>
  );
}

function Crush({ card }: { card: Card }) {
  return (
    <>
      Crush - {card.name} {card.phonenum} {card.sport ?? ""}{" "}
      {card.clothing ?? ""} {card.hangout ?? ""} {card.food ?? ""}
    </>
  );
}

function Summary({ card }: { card: Card }) {
  return (
    <>
      <tr>
        <td>{card.name}</td>
        <td>{card.phonenum}</td>
        <td>{card.clue_to_reveal.value}</td>
      </tr>
    </>
  );
}

export default App;
