// import from my packages first
import { useState } from "react";
import { v1 as generateUniqueID } from "uuid";

//import my Components second
import DogDetails from "./DogDetails";

//import data
import { dogsData } from "./data";

//import CSS here

function App() {
  const [dogs, setDogs] = useState(dogsData);
  const [showNewDogForm, setNewDogForm] = useState(false);
  const [newDog, setNewDog] = useState({
    id: "",
    name: "",
    present: false,
    grade: 100,
    age: "",
    likesSwimming: "",
    favFlavor: "",
    contact: "",
  });

  // this state is for my checkbox
  const [checked, setChecked] = useState(false);

  // this state is for my select element
  const [selectOption, setSelectOption] = useState("");

  function addDog() {
    // we create a new object that we will eventually add to the dogs state as a new dog
    const rover = {
      id: generateUniqueID(),
      name: newDog.name,
      present: false,
      grade: 100,
      notes: "The goodest new dog",
      age: newDog.age,
      likesSwimming: checked,
      favFlavor: selectOption,
      contact: newDog.contact,
    };
    setDogs([rover, ...dogs]);
  }

  function resetDogForm() {
    setNewDog({
      id: "",
      name: "",
      present: false,
      grade: 100,
      age: "",
      likesSwimming: "",
      favFlavor: "",
      contact: "",
    });
    setChecked(false);
    setSelectOption("");
  }

  function handleTextChange(e) {
    setNewDog({ ...newDog, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addDog();
    resetDogForm();
  }

  function removeDog(dogID) {
    const filteredDogArray = dogs.filter((dog) => dog.id !== dogID);
    setDogs(filteredDogArray);
  }

  function toggleNewDogForm() {
    setNewDogForm(!showNewDogForm);
  }

  function updateDogAttendance(dogId) {
    const dogArray = [...dogs];
    const index = dogArray.findIndex((dog) => dogId === dog.id);
    dogArray[index].present = !dogArray[index].present;
    setDogs(dogArray);
  }
  return (
    <div className="App">
      <header>
        <h1> Bark and Bowl Doggy Day Care</h1>
      </header>
      <main>
        <div>
          <button onClick={toggleNewDogForm}>
            {showNewDogForm ? "hide form" : "Add a new dog"}
          </button>
          {showNewDogForm ? (
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                onChange={handleTextChange}
                value={newDog.name}
              />

              <label htmlFor="age">Age:</label>
              <input
                type="number"
                min="0"
                id="age"
                onChange={handleTextChange}
                value={newDog.age}
              />

              <label htmlFor="contact">Contact:</label>
              <input
                type="email"
                id="contact"
                onChange={handleTextChange}
                value={newDog.contact}
              />
              <label htmlFor="favFlavor">Favorite flavor:</label>
              <select
                value={selectOption}
                onChange={(e) => setSelectOption(e.target.value)}
                id="favFlavor"
              >
                <option value=""></option>
                <option value="beef">Beef</option>
                <option value="chicken">Chicken</option>
                <option value="carrot">Carrot</option>
                <option value="bacon">Bacon</option>
              </select>
              <label>Likes swimming:</label>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              <br />
              <input type="submit" />
            </form>
          ) : null}
        </div>
        <div>
          <ul>
            {dogs.map((dog) => {
              return (
                <li key={dog.id}>
                  <span
                    onClick={() => updateDogAttendance(dog.id)}
                    style={
                      dog.present
                        ? { textDecoration: "none" }
                        : { textDecoration: "line-through" }
                    }
                  >
                    {dog.name}{" "}
                  </span>

                  <button onClick={() => removeDog(dog.id)}>remove</button>
                  <DogDetails dog={dog} />
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
