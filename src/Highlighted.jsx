import React from "react";
import Nav from "./Nav.jsx";
import HighlightedCar from "./CarTable2.jsx";
import data from "./Car_Data/taladrod-cars.json";

function Highlighted() {
  return (
    <>
      <Nav />
      <HighlightedCar cars={data.Cars} />
    </>
  );
}

export default Highlighted;
