import React, { useState } from "react";
import axios from "axios";

export default function PokemonPicker({ onAddPokemon }) {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [error, setError] = useState(null);

  const getPokemon = async () => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      setPokemonData([res.data]);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  function ErrorMessage({ message }) {
    return (
      <p className="error">
        <span>❌</span> {message}
      </p>
    );
  }

  function Loader() {
    return <p className="loader">Loading...</p>;
  }

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the input is empty
    if (!pokemon.trim()) {
      setError("Please enter a Pokemon name.");
      return;
    }

    // Clear the error state
    setError(null);

    getPokemon();
  };

  const handleAddToMyPokemon = () => {
    // Pass the selected Pokemon data to the parent component
    onAddPokemon(pokemonData[0]);

    // Reset the form by clearing the input field and resetting pokemonData
    setPokemon("");
    setPokemonData([]);
  };

  return (
    <div className="App">
      <div className="box">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              className="search"
              type="text"
              onChange={handleChange}
              placeholder="Search Pokémon... (eg. snorlax)"
              value={pokemon}
            />
          </label>
        </form>
        <div className="centered-content">
          {pokemonData.map((data) => (
            <div key={data.id} className="details-overview">
              <div className="pokemon-info">
                <div>
                  <img
                    style={{ width: "241px", height: "241px" }}
                    src={data.sprites["front_default"]}
                    alt={data.name}
                  />
                </div>
              </div>

              <div className="details-section flex">
                <div>
                  <h2>Type:</h2>
                  <h3>
                    {" "}
                    <span>
                      {data.types.map((type, index) => (
                        <li key={index}>{type.type.name}</li>
                      ))}
                    </span>
                  </h3>
                </div>

                <div>
                  <h2>Stats:</h2>
                  <h3>
                    <span>
                      {data.stats.map((stat, index) => (
                        <li key={index}>
                          {stat.stat.name}: {stat.base_stat}
                        </li>
                      ))}
                    </span>
                  </h3>
                </div>
              </div>
              <button className="btn-add" onClick={handleAddToMyPokemon}>
                <div className="logo">
                  Catch Pokémon
                  <img
                    src="pokeball.png"
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </div>
              </button>
            </div>
          ))}
          {error && <ErrorMessage message={error} />}
        </div>
      </div>
    </div>
  );
}
