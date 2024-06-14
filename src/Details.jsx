import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import ErrorBoundary from "./ErrorBoundary";
import Carousel from "./Carousel";
import fetchPet from "./fetchPet";
import Modal from "./Modal";

const Details = () => {
  const [showModal, setShowModal] = useState(false); // Don't show by default
  const navigate = useNavigate(); // Using this to navigate the user back to the home page after clicking 'Yes'

  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext); // Use _ for when it doesn't matter what the value is
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);
  // ["details", id] will be passed as the queryKey to fetchPet

  if (results.isError) {
    return <h2>Results have errored</h2>;
  }

  if (results.isLoading) {
    return (
      // This will cause the emoji to spin
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <hr></hr>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city} - {pet.state}
          <hr></hr>
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          {showModal ? ( // If true, do this:
            <Modal>
              <div>
                <h1>Would you like to adopt {pet.name}?</h1>
                <div className="buttons">
                  <button
                    onClick={() => {
                      setAdoptedPet(pet); // Sets the adopted pet to the pet in question
                      navigate("/"); // Back to home page
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal> // If false, render null/nothing
          ) : null}
        </h2>
      </div>
    </div>
  );
};

function DetailsErrorBoundary(props) {
  return (
    // One of the only cases that the spread operator is okay to use. Passes all properties through.
    // <ErrorBoundary errorComponent={<h2>Error message</h2>}> Use this if error boundary needs to be reusable
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
