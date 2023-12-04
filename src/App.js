import React, { useState } from "react";
import PokemonPicker from "./PokemonPicker";
import CountdownClock from "./CountdownClock";

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Logo() {
  return (
    <div className="logo">
      <img
        src="pokeball.png"
        style={{ width: "35px", height: "35px", marginRight: "10px" }}
      />
      <h1>Pokédex</h1>
    </div>
  );
}

function NavBar() {
  return (
    <nav className="nav-bar">
      <Logo />
    </nav>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function YourPokemon({ myPokemonList, onDeletePokemon }) {
  return (
    <div className="summary">
      <div className="logo">
        <h2>My Pokémon</h2>
      </div>

      <div>
        <p>
          <span>#️⃣</span>
          <span>Of Unique Pokémon: {Object.keys(myPokemonList).length}</span>
        </p>
      </div>

      <ul className="list">
        {Object.values(myPokemonList).map(({ id, name, count, data }) => (
          <AddedPokemon
            key={id}
            data={data}
            count={count}
            onDeletePokemon={() => onDeletePokemon(id)}
          />
        ))}
      </ul>
    </div>
  );
}

function PokemonList({ pokemonData, onDeletePokemon }) {
  return (
    <div>
      <ul className="list list-movies">
        {pokemonData.map((data) => (
          <AddedPokemon key={data.id} onDeletePokemon={onDeletePokemon} />
        ))}
      </ul>
    </div>
  );
}

function AddedPokemon({ data, count, onDeletePokemon }) {
  // Capitalize the first letter of the Pokemon name
  const capitalizedPokemonName =
    data.name.charAt(0).toUpperCase() + data.name.slice(1);

  return (
    <li key={data.id}>
      <img
        src={data.sprites["front_default"]}
        alt={data.name}
        style={{ width: "60px", height: "60px" }}
      />
      <h3>{capitalizedPokemonName}</h3>
      <div>
        <p>
          <span>#️⃣ {count}</span>
        </p>

        <p>
          <span>
            Type:
            {data.types.map((type, index) => (
              <span key={index}> {type.type.name}</span>
            ))}
          </span>
        </p>

        <button className="btn-delete" onClick={onDeletePokemon}>
          X
        </button>
      </div>
    </li>
  );
}

export default function App() {
  const [myPokemonList, setMyPokemonList] = useState({});
  const [timeoutOccurred, setTimeoutOccurred] = useState(false);

  const handleAddPokemon = (newPokemon) => {
    setMyPokemonList((prevList) => {
      const { id, name } = newPokemon;
      if (prevList[id]) {
        // Pokemon already in the list, update the count
        prevList[id].count += 1;
      } else {
        // Pokemon not in the list, add it
        prevList[id] = { id, name, count: 1, data: newPokemon };
      }
      return { ...prevList };
    });
  };

  const handleTimeout = () => {
    // Handle the logic when the countdown reaches zero
    console.log("Countdown reached zero!");
    setTimeoutOccurred(true);
  };

  const handleDeletePokemon = (id) => {
    setMyPokemonList((prevList) => {
      console.log("Prev List:", prevList);

      const updatedList = { ...prevList };

      if (updatedList[id] && updatedList[id].count > 1) {
        // If count is greater than 1, decrement the count
        console.log("Decrementing count");
        updatedList[id] = {
          ...updatedList[id],
          count: updatedList[id].count - 1,
        };
      } else {
        // If count is 1 or less, remove the Pokemon from the list
        console.log("Removing Pokemon");
        delete updatedList[id];
      }

      console.log("Updated List:", updatedList);

      return updatedList;
    });
  };

  return (
    <>
      <NavBar />
      <Main>
        <Box>
          <div>
            <PokemonPicker onAddPokemon={handleAddPokemon} />
          </div>
        </Box>
        <Box>
          <YourPokemon
            myPokemonList={myPokemonList}
            onDeletePokemon={handleDeletePokemon}
          />
        </Box>
      </Main>
    </>
  );
}
