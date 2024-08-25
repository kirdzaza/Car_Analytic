import React, { useState, useEffect } from "react";
import "./css/CarTable2.css";

const CarTable2 = ({ cars = [] }) => {
  const [highlightedCars, setHighlightedCars] = useState([]);

  // Load highlighted cars from localStorage on component mount
  useEffect(() => {
    const storedHighlights =
      JSON.parse(localStorage.getItem("highlightedCars")) || [];
    setHighlightedCars(storedHighlights);
  }, []);

  // Function to toggle highlight status
  const toggleHighlight = (cid) => {
    let updatedHighlights = [];
    if (highlightedCars.includes(cid)) {
      updatedHighlights = highlightedCars.filter((id) => id !== cid);
    } else {
      updatedHighlights = [...highlightedCars, cid];
    }
    setHighlightedCars(updatedHighlights);
    localStorage.setItem("highlightedCars", JSON.stringify(updatedHighlights));
  };

  // Sort cars to have highlighted ones on top
  const sortedCars = [...cars].sort((a, b) => {
    const isHighlightedA = highlightedCars.includes(a.Cid);
    const isHighlightedB = highlightedCars.includes(b.Cid);
    if (isHighlightedA && !isHighlightedB) return -1;
    if (!isHighlightedA && isHighlightedB) return 1;
    return 0;
  });

  return (
    <table className="car-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price (Baht)</th>
          <th>Year</th>
          <th>Add</th>
        </tr>
      </thead>
      <tbody>
        {sortedCars.map((car) => (
          <tr
            key={car.Cid}
            className={highlightedCars.includes(car.Cid) ? "highlighted" : ""}
          >
            <td>
              <img src={car.Img600} alt={car.NameMMT} className="car-image" />
            </td>
            <td>{car.NameMMT}</td>
            <td>{car.Prc}</td>
            <td>{car.Yr}</td>
            <td>
              <button
                className={`add-button ${
                  highlightedCars.includes(car.Cid) ? "remove" : "add"
                }`}
                onClick={() => toggleHighlight(car.Cid)}
              >
                {highlightedCars.includes(car.Cid) ? "Remove" : "Add"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CarTable2;
