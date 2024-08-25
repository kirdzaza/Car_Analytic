import React from "react";
import data from "./Car_Data/taladrod-cars.json";
import "./css/CarTable.css"; // Ensure the path is correct

const getBrandName = (nameMMT) => nameMMT.split(" ")[0];

const CarTable = () => {
  const cars = data.Cars;
  const filteredCars = cars.filter((car) => car.Status === "default"); // Adjust status if needed

  const brandModelCounts = {};

  filteredCars.forEach((car) => {
    const brandName = getBrandName(car.NameMMT);
    if (!brandModelCounts[brandName]) {
      brandModelCounts[brandName] = {};
    }
    if (!brandModelCounts[brandName][car.Model]) {
      brandModelCounts[brandName][car.Model] = { count: 0, price: 0 };
    }
    brandModelCounts[brandName][car.Model].count += 1;
    brandModelCounts[brandName][car.Model].price += parseFloat(
      car.Prc.replace(/,/g, ""),
    );
  });

  return (
    <div className="car-table-wrapper">
      <div className="car-table-container">
        <table className="car-table">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Model</th>
              <th>Number of Cars</th>
              <th>Value (Baht)</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(brandModelCounts).map((brand) => (
              <React.Fragment key={brand}>
                <tr className="brand-row">
                  <td>{brand}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                {Object.keys(brandModelCounts[brand]).map((model) => (
                  <tr key={model}>
                    <td></td>
                    <td>{model}</td>
                    <td>{brandModelCounts[brand][model].count}</td>
                    <td>
                      {brandModelCounts[brand][model].price.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarTable;
