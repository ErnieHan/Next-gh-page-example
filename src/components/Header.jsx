import React, { useState, useRef, useEffect } from "react";

let timer;

function Header(props) {
  // state
  const [ring1, setRing1] = useState({
    gold: "18kw",
    size: "8",
    width: "24",
    text: "",
  });

  const [state, setState] = useState({
    ring1: {
      gold: "p950",
      name: "ernie",
    },
    ring2: {
      gold: "18kw",
      name: "mary",
    },
  });

  //ref
  const inputEl = useRef(null);

  // lists
  const ringSizeList = [
    { name: "08", value: "8" },
    { name: "09", value: "9" },
    { name: "10", value: "10" },
  ];

  useEffect(() => {
    // componentDidMount
    console.log("componentDidMount");
    return () => {
      // componentWillUmMount
      console.log("componentWillUmMount");
    };
  }, []);

  function changeSize(size) {
    setRing1({ ...ring1, size: size.value });
  }
  function changeText(event) {
    setRing1({ ...ring1, text: event.target.value });
  }

  async function insertText() {
    let value = "";
    let frontText, backText;
    const { text } = ring1;
    const element = inputEl.current;
    const startPos = element.selectionStart;
    const endPos = element.selectionEnd;
    if (startPos === endPos) {
      frontText = text.substring(0, startPos);
      backText = text.substring(startPos, text.length);
    } else {
      frontText = text.substring(0, startPos);
      backText = text.substring(endPos, text.length);
    }
    value = frontText + "♥" + backText;
    setRing1({ ...ring1, text: value });

    await element.focus();
    element.selectionEnd = startPos + 1;
  }

  function handleClick() {
    setState({
      ...state,
      ring1: {
        ...state.ring1,
        name: "happy",
      },
    });
  }

  return (
    <div>
      {console.log(state)}
      <button onClick={handleClick}>click</button>
      <input
        type="text"
        ref={inputEl}
        value={ring1.text}
        onChange={changeText}
      />
      <button onClick={insertText}>♥</button>
      {ringSizeList.map((size, index) => (
        <button key={index} onClick={changeSize.bind(this, size)}>
          {size.name}
        </button>
      ))}
      戒指一:
      {ring1.gold} / {ring1.size} / {ring1.width}
    </div>
  );
}

export default Header;
