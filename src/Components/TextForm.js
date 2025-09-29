import { useState } from "react";

export default function TextForm(props) {
  // This is the standard way of defining a prop.

  // Declares a variable 'text' that can be changed with the function 'setText'. The default value of 'text' is 'Enter Text Here'
  const [text, setText] = useState("");
  function handleOnChange(event) {
    // event represents the change event that happens when you type in an input field.
    setText(event.target.value);
    // target = the element that triggered the event.
    // value = the current value of the input box.
  }

  // Changing to Upper Case
  const changeUp = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.doAlert("Changed to Upper Case", "success");
  };

  // Changing to Lower Case
  const changeLow = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.doAlert("Changed to Lower Case", "success");
  };

  // Remove extra spaces
  // .replace(): This is a JavaScript string method. It searches for a pattern (string or regex) and replaces it with something else.
  // "/ ... /" → defines a regular expression.
  // " " → matches any space character.
  // "+" → means "one or more" of the previous thing. So " +" means one or more spaces in a row.
  // "g" → "global" flag, meaning replace all matches, not just the first one.
  // " " → replacement string → a single space.
  // .trim() removes leading and trialing extra spaces.
  const clearSpace = () => {
    let newText = text.replace(/ +/g, " ").trim();
    setText(newText);
    props.doAlert("Cleared Extra Spaces", "success");
  };

  // Copy text
  // navigaror: A built-in browser object.Gives info and access to features of the browser (like clipboard, geolocation, etc.).
  // clipboard: A property of navigator. Represents the system clipboard (the place where cut/copy/paste data is stored). Only works in secure contexts (HTTPS or localhost).
  // writeText(): A method of clipboard. Used to write (copy) text into the clipboard. Takes a string as input.
  const copyText = () => {
    navigator.clipboard.writeText(text);
    props.doAlert("Copied Text", "success");
  };

  // Analyze text
  const [display, setDisplay] = useState("none");
  function analyzeText() {
    setDisplay(display === "none" ? "block" : "none");
    props.doAlert("Text Analyzed", "success");
  }

  // Clear text
  const clearText = () => {
    setText("");
    props.doAlert("Text Cleared", "warning");
  };

  return (
    <div className="mb-3">
      <h1>{props.heading}</h1>
      <textarea
        style={{
          background: props.mode === "light" ? "white" : "#212549",
          color: props.mode === "light" ? "black" : "white",
        }}
        className="form-control my-4"
        id="mybox"
        value={text}
        onChange={handleOnChange}
        rows="8"
      ></textarea>
      <button
        className="btn btn-primary mx-1 my-1"
        onClick={changeUp}
        disabled={text.replace(/\s/g, "").length > 0 ? false : true}
      >
        Change To Upper
      </button>
      <button
        className="btn btn-primary mx-1 my-1"
        onClick={changeLow}
        disabled={text.replace(/\s/g, "").length > 0 ? false : true}
      >
        Change To Lower
      </button>
      <button
        className="btn btn-primary mx-1 my-1"
        onClick={clearSpace}
        disabled={text.replace(/\s/g, "").length > 0 ? false : true}
      >
        Remove Extra Spaces
      </button>
      <button
        className="btn btn-primary mx-1 my-1"
        onClick={copyText}
        disabled={text.replace(/\s/g, "").length > 0 ? false : true}
      >
        Copy
      </button>
      <button
        className="btn btn-success mx-1 my-1"
        onClick={analyzeText}
        disabled={text.replace(/\s/g, "").length > 0 ? false : true}
      >
        Analyze Text
      </button>
      <button
        className="btn btn-warning mx-1 my-1"
        onClick={clearText}
        disabled={text.replace(/\s/g, "").length > 0 ? false : true}
      >
        Clear
      </button>
      <div className="analyzeBox my-3" style={{ display: display }}>
        <p>
          Word Count: {text.trim().split(/\s+/).filter(Boolean).length} words
        </p>
        {/* .trim() erases the leading and trailing whitespaces.
            .split(" ") is a JavaScript method that cuts the string into array of substring using " " (spaces).
            Instead of " " we can also use any character, lets say b, and it will cut the string when it encounters the character b.
            .split(/\s+/) splits the array when it encounters single of multiple newspaces/newline/tab characters. 
            Hence something like "Hello    Ryu" would rather be stored as "{Hello, Ryu}" instead of "{Hello, , , , , Ryu}"
            .filter(Boolean) filter outs the empty items like "".
            .length returns the length of the array.
        */}
        <p>Character Count: {text.replace(/\s+/g, "").length} characters</p>
        <p>
          Time to read:{" "}
          {(text.trim().split(/\s+/).filter(Boolean).length * 0.008).toFixed(5)}{" "}
          minutes
        </p>
        <h3>Preview</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}
