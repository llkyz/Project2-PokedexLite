import React, { useState, useEffect } from "react";
import BackButton from "./BackButton";
import { cleanName } from "../Assets/cleanup";
import PokeballImg from "../Assets/Images/Pokeball.png";
import config from "../config";
import { EvolutionChain } from "../Assets/Species/EvolutionChain";
import pokemonColors from "../Assets/pokemonColors";
import FlavorText from "../Assets/Species/FlavorText";
import Genus from "../Assets/Species/Genus";
import GenderRate from "../Assets/Species/GenderRate";
import EggGroups from "../Assets/Species/EggGroups";
import Generation from "../Assets/Species/Generation";
import Habitat from "../Assets/Species/Habitat";
import Shape from "../Assets/Species/Shape";
import Forms from "../Assets/Species/Forms";
import Stats from "../Assets/Species/Stats";
import Types from "../Assets/Species/Types";
import Abilities from "../Assets/Species/Abilities";
import Encounters from "../Assets/Species/Encounters";
import Moves from "../Assets/Species/Moves";
import HatchCounter from "../Assets/Species/HatchCounter";

export default function Species(props) {
  const [speciesData, setSpeciesData] = useState();
  const [pokemonData, setPokemonData] = useState();
  const [formSelected, setFormSelected] = useState(0);
  //props.selectForm is the url to specific pokemon
  const [formFromPokedex, setformFromPokedex] = useState(props.selectForm);

  useEffect(() => {
    const getSpeciesData = async () => {
      const response = await fetch(props.data);
      const data = await response.json();
      setSpeciesData(data);

      const response2 = await fetch(data.varieties[formSelected].pokemon.url);
      const data2 = await response2.json();
      setPokemonData(data2);
    };
    getSpeciesData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getPokemonData = async () => {
      const response = await fetch(
        speciesData.varieties[formSelected].pokemon.url
      );
      const data = await response.json();
      setPokemonData(data);
    };

    if (speciesData) {
      getPokemonData();
    }
    // eslint-disable-next-line
  }, [formSelected, speciesData]);

  useEffect(() => {
    function preselectedForm() {
      speciesData.varieties.forEach((data, index) => {
        console.log(data.pokemon.url);
        console.log(formFromPokedex);
        if (data.pokemon.url === formFromPokedex) {
          setFormSelected(index);
        }
      });
      setformFromPokedex();
    }

    if (speciesData && formFromPokedex) {
      preselectedForm();
    }
    // eslint-disable-next-line
  }, [speciesData]);

  //Add URLS: color, egg groups, generation, habitat, shape, varieties

  function RenderSpecies() {
    return (
      <>
        <BackButton back={"fromSpecies"} />
        <div className="speciesContainer">
          {pokemonData.abilities.map((data) => (
            <Abilities data={data} />
          ))}
          <div>Height: {pokemonData.height / 10}m</div>
          <div>Weight: {pokemonData.weight / 10}kg</div>
          <Stats data={pokemonData.stats} />
          <Types data={pokemonData.types} />
          <Forms
            data={speciesData.varieties}
            formSelected={formSelected}
            setFormSelected={setFormSelected}
            defaultName={speciesData.name}
            selectForm={props.selectForm}
          />
          <h1>{cleanName(speciesData.name)}</h1>
          <img
            src={config.ARTWORK + pokemonData.id + ".png"}
            alt={speciesData.name}
            onError={(event) => (event.target.src = PokeballImg)}
          />
          <p>Base Happiness: {speciesData.base_happiness}</p>
          <p>Capture Rate: {speciesData.capture_rate}</p>
          <p>Color:</p>
          <div
            className="pokemonColor"
            style={pokemonColors[speciesData.color.name]}
          >
            {speciesData.color.name.toUpperCase()}
          </div>
          <div>
            <h1>Evolution Chain</h1>
            {
              <EvolutionChain
                data={speciesData.evolution_chain}
                pokeid={speciesData.id}
                setSpeciesData={setSpeciesData}
                setFormSelected={setFormSelected}
              />
            }
          </div>
          <FlavorText data={speciesData.flavor_text_entries} />
          <Encounters data={pokemonData.location_area_encounters} />
          <Moves data={pokemonData.moves} />
          <HatchCounter data={speciesData.hatch_counter} />
          <Genus data={speciesData.genera} />
          <p>Pokedex ID: {speciesData.id}</p>
          <p>
            Growth:{" "}
            {speciesData.growth_rate.name
              .split("-")
              .map(
                (speed) =>
                  speed[0].toUpperCase() + speed.substring(1, speed.length)
              )
              .join(" - ")}
          </p>
          <GenderRate data={speciesData.gender_rate} />
          <EggGroups data={speciesData.egg_groups} />
          <p>
            Has Gender Differences:{" "}
            {speciesData.has_gender_differences ? "Yes" : "No"}
          </p>
          <p>Is Baby: {speciesData.is_baby ? "Yes" : "No"}</p>
          <p>Is Legendary: {speciesData.is_legendary ? "Yes" : "No"}</p>
          <p>Is Mythical: {speciesData.is_mythical ? "Yes" : "No"}</p>
          <Generation data={speciesData.generation} />
          <Habitat data={speciesData.habitat} />
          <Shape data={speciesData.shape} />
          <p>Multiple Forms: {speciesData.forms_switchable ? "Yes" : "No"}</p>
        </div>
      </>
    );
  }

  return (
    <div>
      {pokemonData ? <RenderSpecies /> : "Loading Species, please wait..."}
    </div>
  );
}
