import React, { useState, useRef, useEffect } from "react";

function Header(props) {
  // 宣告一個新的 state 變數，我們稱作為「ring1」。
  const [ring1, setRing1] = useState({
    gold: "18kw",
    size: "8",
    width: "24",
    text: "",
  });
  const [products, setProducts] = useState([]);
  const inputEl = useRef(null);
  const ringSizeList = [
    { name: "08", value: "8" },
    { name: "09", value: "9" },
    { name: "10", value: "10" },
  ];
  // componentDidMount
  useEffect(() => {
    console.log("componentDidMount");
    getMiniCart();
    return () => {
      console.log("componentWillUmMount");
    };
  }, []);
  async function getMiniCart() {
    try {
      const response = await fetch(`http://localhost:3031/minicart`, {
        method: "GET",
      });
      if (response.ok) {
        const result = await response.json();
        const { cartItems } = result;
        setProducts(cartItems);
      } else {
        throw new Error("GET_MINICART_FAILED");
      }
    } catch (error) {
      console.error("getMiniCart", error);
    }
  }
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
  return (
    <div>
      {products.map((data, index) => (
        <div key={index}>
          <p>{data.itemId}</p>
          <div>
            <img src={data.information.imageUrl} alt="productImg" />
          </div>
        </div>
      ))}
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
