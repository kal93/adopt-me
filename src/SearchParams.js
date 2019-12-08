import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropDown from "./useDropDown";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const SearchParams = () => {
  // useState is hook, All hooks begin with "use". Hooks are for stateful logic.Hooks cannot be put in if or for
  // setLocation is just function name. First item is the current value and second item is updater function
  const [location, setLocation] = useState("Seattle, WA");
  //   const [animal, setAnimal] = useState("Cat");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropDown] = useDropDown("Animal", "cat", ANIMALS);
  const [breed, BreedDropDown, setBreed] = useDropDown("Breed", "", breeds);
  // const [breed, setBreed] = useState("");

  const [pets, setPets] = useState([]);

  /**
   * setTheme is not needed because we're using the ThemeContext from global application state
   * See Details.js for how to use global state in class components
   */
  const [theme, setTheme] = useContext(ThemeContext);

  async function reqeuestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });

    setPets(animals || []);
  }

  useEffect(() => {
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds }) => {
      console.log(breeds);
      const breedString = breeds.map(({ name }) => name);
      setBreeds(breedString);
    }, console.error);
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <h1>{location}</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          reqeuestPets();
        }}
      >
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          placeholder="Location"
          onChange={e => setLocation(e.target.value)}
        />
        <AnimalDropDown />
        <BreedDropDown />

        {/* The dropDown creates its own custom hooks. 
        For theme drowDown below we're using someone else's hooks. */}
        <label htmlFor="theme">Theme</label>
        <select
          value={theme}
          onChange={e => setTheme(e.target.value)}
          onBlur={e => setTheme(e.target.value)}
        >
          <option value="peru">Peru</option>
          <option value="darkblue">Dark Blue</option>
          <option value="mediumorchid">Medium Orchid</option>
          <option value="chartruse">Chart Ruse</option>
        </select>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
