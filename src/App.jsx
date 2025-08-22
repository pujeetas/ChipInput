import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState("");
  const [inputArray, setInputArray] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("inputArray"));
    return saved || [];
  });
  const [visiblity, setVisibility] = useState(inputArray.length > 0);

  function handleBtn() {
    setInputArray((prev) => [...prev, userInput]);
    setUserInput("");
  }

  useEffect(() => {
    localStorage.setItem("inputArray", JSON.stringify(inputArray));
    setVisibility(inputArray.length > 0);
  }, [inputArray]);

  function handleDel(index) {
    const newArray = inputArray.filter((_, i) => i !== index);
    setInputArray(newArray);
  }

  return (
    <div className="container">
      <h1 className="heading">Chip Input</h1>
      <div className="btn-input">
        <input
          className="chip-input"
          placeholder="Type chip..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        ></input>
        <button className="btn" onClick={() => handleBtn()}>
          Enter
        </button>
      </div>
      <div className="chip-wrapper">
        {visiblity &&
          inputArray.map((item, index) => (
            <div key={index} className="chip-container">
              <div className="chip-label">{item}</div>
              <div className="del-btn" onClick={() => handleDel(index)}>
                <DeleteOutlined />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
