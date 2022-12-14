import React, { useState, useEffect } from "react";
import { cleanName } from "../Assets/cleanup";
import versions from "../Assets/versions";
import { useNavigate } from "react-router-dom";

export default function Area(props) {
  const navigate = useNavigate();
  const [areaData, setAreaData] = useState();

  useEffect(() => {
    const getArea = async () => {
      const response = await fetch(props.url);
      let data = await response.json();
      setAreaData(data);
    };

    getArea();
    // eslint-disable-next-line
  }, []);

  function GetVersions(props) {
    return props.data.version_details.map((data2, index) => {
      return (
        <div
          key={index}
          className={["version", versions[data2.version.name].col].join(" ")}
        >
          {versions[data2.version.name].letter}
        </div>
      );
    });
  }

  function GetPokemon() {
    return areaData.pokemon_encounters.map((data, index) => {
      return (
        <div className="areaContainer2" key={index}>
          <h3
            className="versionContainerPokemon"
            onClick={() => {
              async function pokemonToSpecies() {
                const response = await fetch(data.pokemon.url);
                const data2 = await response.json();
                let pokeid = data2.species.url.split("/").slice(-2, -1);
                navigate(`/pokemon/${pokeid}`);
              }
              pokemonToSpecies();
            }}
          >
            {cleanName(data.pokemon.name)}
          </h3>
          <div className="versionContainer">
            <GetVersions data={data} />
          </div>
        </div>
      );
    });
  }

  return <>{areaData ? <GetPokemon /> : ""}</>;
}
