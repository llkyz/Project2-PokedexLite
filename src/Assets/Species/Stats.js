import { useState, useEffect } from "react";

const abbreviation = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SP. ATK",
  "special-defense": "SP. DEF",
  speed: "SPD",
};

export default function Stats(props) {
  const [stats, setStats] = useState();
  const [fillStats, setFillStats] = useState();

  useEffect(() => {
    function processStats() {
      let statList = props.data.map((data) => {
        return { stat: data.stat.name, value: data.base_stat };
      });
      setStats(statList);
    }
    processStats();

    setFillStats(false);
    setTimeout(() => {
      setFillStats(true);
    }, 1000);
  }, [props.data]);

  function DisplayStats() {
    return stats.map((data, index) => {
      return (
        <div key={index}>
          <p>
            {abbreviation[data.stat]}: {data.value}
          </p>
          <div className="statBarContainer">
            <div
              className="statBar"
              style={
                fillStats
                  ? { width: "100%", maxWidth: `${(data.value / 255) * 100}%` }
                  : { maxWidth: `${(data.value / 255) * 100}%` }
              }
            />
          </div>
          <div className="statBarIndicator" />
        </div>
      );
    });
  }

  return (
    <div className="stats">
      {stats ? (
        <>
          <h1>STATS</h1>
          <DisplayStats />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
