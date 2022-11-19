import React, { useContext } from "react";
import magnifyingGlass from "../Assets/search.svg";
import { Navigation } from "../App";
import { doSort } from "../Assets/sortPokemon";

export default function SearchBarPokemon() {
  const nav = useContext(Navigation);

  function sortSelected(event) {
    let newList = doSort(event.target.value, nav);
    nav.set({ speciesList: newList, sortQueryPokemon: event.target.value });
  }

  return (
    <div className="searchBar">
      <div style={{ width: "50%", display: "flex" }}>
        <img src={magnifyingGlass} id="magnifyingGlass" alt="search" />
        <label id="search">
          <input
            type="text"
            placeholder="Search"
            id="searchInput"
            spellCheck="false"
            autoComplete="off"
            value={nav.data.searchQueryPokemon}
            onChange={(event) =>
              nav.set({
                searchQueryPokemon: event.currentTarget.value,
              })
            }
          />
        </label>
      </div>
      <div className="sorting">
        <label htmlFor="sorting">Sort by:</label>
        <select
          name="sorting"
          id="sort"
          onChange={(event) => sortSelected(event)}
          defaultValue={nav.data.sortQueryPokemon}
        >
          <option value="pokedex-asc">Pokédex # Ascending</option>
          <option value="pokedex-dsc">Pokédex # Descending</option>
          <option value="alphabet-asc">Alphabetical Ascending</option>
          <option value="alphabet-dsc">Alphabetical Descending</option>
        </select>
      </div>
    </div>
  );
}