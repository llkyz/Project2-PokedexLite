import "./App.css";
import React, { useState } from "react";
import Generation from "./Components/Generation";
import PokeList from "./Components/PokeList";

function App() {
  const [generation, setGeneration] = useState("");

  return (
    <div className="App">
      <div>
        <div className="header">
          <h1>POKéDEX LITE</h1>
          {generation ? (
            <h4
              onClick={() => {
                setGeneration("");
              }}
            >
              Gen {generation.url.split("/").slice(-2, -1)} Selected
            </h4>
          ) : (
            ""
          )}
        </div>
        {generation ? (
          <PokeList url={generation.url} sprite={generation.sprite} />
        ) : (
          <Generation setGeneration={setGeneration} />
        )}
      </div>
    </div>
  );
}

export default App;