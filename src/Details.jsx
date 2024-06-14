import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ErrorBoundary from "./ErrorBoundary";
import Carousel from "./Carousel";
import fetchPet from "./fetchPet";
import Modal from "./Modal";

const Details = () => {
  const [showModal, setShowModal] = useState(false); // Don't show by default
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
                  <button>Yes</button>
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
