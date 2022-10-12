import { useState } from "react";

export default function DogDetails({ dog }) {
  // this state is used to toggle showing and hiding the details
  const [showDetails, setShowDetails] = useState(false);

  // this handles whether we see the details of the dog or not. You could actually place this code in the JSX instead
  function toggleDogDetails() {
    setShowDetails(!showDetails);
  }
  return (
    <>
      <button onClick={toggleDogDetails}>
        {!showDetails ? "Show details" : "Hide details"}
      </button>
      {showDetails ? (
        <div className="dog-details">
          <p>
            {" "}
            <span>id:</span>
            {dog.id}
          </p>
          <p>
            <span>Present:</span>
            {dog.present ? "true" : "false"}
          </p>
          <p>
            <span>Grade:</span> {dog.grade}
          </p>
          <p>
            <span>Likes swimming:</span> {dog.likesSwimming ? "true" : "false"}
          </p>
          <p>
            <span>Favorite flavor:</span> {dog.favFlavor}
          </p>
          <p>
            <span>Notes:</span> {dog.notes}
          </p>
        </div>
      ) : null}
    </>
  );
}
