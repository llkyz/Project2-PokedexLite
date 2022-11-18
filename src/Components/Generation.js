import React, { useState, useEffect } from "react";
import config from "../config";
import generationImg from "./generationImg";
import generationSprites from "./generationSprites";

export default function Generation(props) {
  const [generationData, setGenerationData] = useState("");

  useEffect(() => {
    const getGeneration = async () => {
      const response = await fetch(
        config.BASE_API_DOMAIN + config.ENDPOINT_GENERATION
      );
      const data = await response.json();
      setGenerationData(data);
    };
    getGeneration();
  }, []);

  function selectGeneration(index, dataName) {
    props.setGeneration({
      url: generationData.results[index].url,
      sprite: generationSprites[dataName],
    });
  }

  function ListGenerations() {
    return generationData.results.map((data, index) => (
      <div
        onClick={() => selectGeneration(index, data.name)}
        className="generation"
        id={
          "gen" + data.url.substring(data.url.length - 2, data.url.length - 1)
        }
        key={index}
      >
        <p>{data.name.replace("-", " ").toUpperCase()}</p>
        <div className="imageContainer">
          <img src={generationImg[data.name]} alt={data.name} />
        </div>
      </div>
    ));
  }

  return (
    <div className="generationDiv">
      <h1>
        <u>Welcome to Pokédex Lite!</u>
      </h1>
      <h2>Select a generation to begin</h2>
      <div>
        {generationData ? <ListGenerations /> : "Loading, please wait..."}
      </div>
    </div>
  );
}