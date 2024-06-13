import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Carousel from "./Carousel";
import fetchPet from "./fetchPet";

const Details = () => {
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
          <button>Adopt {pet.name}</button>
          <p>{pet.description}</p>
        </h2>
      </div>
    </div>
  );
};

export default Details;
