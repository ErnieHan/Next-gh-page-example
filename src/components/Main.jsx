import React, { useEffect, useState, useReducer, useLayoutEffect } from "react";

const initialState = { count: 0, name: "ernie" };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1, name: action.name };
    default:
      throw new Error();
  }
}

function Main() {
  const [active, setActive] = useState(false);
  const [state, setState] = useReducer(reducer, initialState);
  const [ring, setRing] = useState({ gold: "", size: "" });

  useLayoutEffect(() => {
    console.log(window);
  });

  useEffect(() => {
    // didMount
    console.log("apple");
    getMiniCart();
  }, []);

  useEffect(() => {
    // didUpdate
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const getMiniCart = () => {
    try {
    } catch (error) {}
  };

  function handleScroll() {
    if (active) {
      console.log("ernie");
    } else {
      console.log("way-ya");
    }
  }

  return (
    <div>
      {console.log("xxxx")}
      <p>Count:{state.count}</p>
      <button
        onClick={() => {
          setState({ type: "decrement", name: "mary" });
        }}
      >
        click me
      </button>
      window.addEventListener Hooks event
      <button
        onClick={() => {
          setActive(!active);
        }}
      >
        {active ? "true" : "flase"}
      </button>
    </div>
  );
}

export default Main;
