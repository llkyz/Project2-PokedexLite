import React from "react";
import { Link } from "react-router-dom";
import homeImg from "../Assets/Home/homeImg";
import Favourites from "./Favourites";

export default function Home() {
  return (
    <>
      <Favourites />
      <h1>
        <u>Welcome to Pokédex Lite!</u>
      </h1>
      <h2 style={{ marginBottom: "30px" }}>Select a search method to begin</h2>
      <div className="homeSelection">
        <Link to="/generation">
          <div className="selectionContainer">
            <h1>GENERATION</h1>
            <div id="imageContainer">
              <img src={homeImg.generation} alt="generation" />
            </div>
          </div>
        </Link>
        <Link to="/regionlist">
          <div className="selectionContainer">
            <h1>REGION</h1>
            <div id="imageContainer">
              <img src={homeImg.region} alt="region" />
            </div>
          </div>
        </Link>
        <Link
          to="/pokedex/full"
          state={{ source: "None", title: "Searching entire Pokédex" }}
        >
          <div className="selectionContainer">
            <h1>POKÉDEX</h1>
            <div id="imageContainer">
              <img src={homeImg.pokedex} alt="pokedex" />
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
