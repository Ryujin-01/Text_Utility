import "./App.css";
import Navbar from "./Components/Navbar";
import Alert from "./Components/Alert";
import TextForm from "./Components/TextForm";
import About from "./Components/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    // We are defining the tollge function here because it will affect the background of the body too.
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#212550";
      doAlert("Changed to Dark Mode", "primary");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      doAlert("Changed to Light Mode", "primary");
    }
  };

  const [alert, setAlert] = useState(null); // Here "alert" is an object.
  const doAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2500); // Nullifies the alert after 2000 ms
  };

  return (
    <BrowserRouter>
      <Navbar mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      <div
        style={{
          paddingTop: "100px",
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          // wordWrap is the react form of the css class word-wrap. It wraps long words.
          // whiteSpace is the react form of the css class white-space. It preserves newlines AND wraps text
        }}
        className={`container text-${mode === "dark" ? "white" : "dark"}`}
      >
        <Routes>
          <Route
            path="/"
            element={
              <TextForm
                heading="Enter Your Text"
                mode={mode}
                doAlert={doAlert}
              />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
