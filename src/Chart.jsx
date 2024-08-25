import React from "react";
import data from "./Car_Data/taladrod-cars.json";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./css/Chart.css"; // Import the CSS file

// Function to extract the brand and model names from NameMMT
const getBrandAndModel = (nameMMT) => {
  const parts = nameMMT.split(" ");
  const brandName = parts[0];
  const modelName = parts[1];
  return { brandName, modelName };
};

// Define a color palette
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6347",
  "#6A5ACD",
  "#FFD700",
  "#FF4500",
  "#32CD32",
];

function Chart() {
  const cars = data.Cars;

  // Count the number of cars for each brand
  const brandCounts = cars.reduce((acc, car) => {
    const { brandName } = getBrandAndModel(car.NameMMT);
    acc[brandName] = (acc[brandName] || 0) + 1;
    return acc;
  }, {});

  // Count the number of models for each brand
  const brandModelCounts = {};
  cars.forEach((car) => {
    const { brandName, modelName } = getBrandAndModel(car.NameMMT);
    if (!brandModelCounts[brandName]) {
      brandModelCounts[brandName] = {};
    }
    brandModelCounts[brandName][modelName] =
      (brandModelCounts[brandName][modelName] || 0) + 1;
  });

  const pieData = Object.keys(brandCounts).map((key) => ({
    name: key,
    value: brandCounts[key],
  }));

  const legendData = pieData.map((entry, index) => ({
    name: entry.name,
    value: entry.value,
    color: COLORS[index % COLORS.length],
  }));

  const barData = Object.keys(brandModelCounts).map((brand) => {
    const models = brandModelCounts[brand];
    const modelCounts = Object.keys(models).map((model) => ({
      model,
      count: models[model],
    }));
    return { brand, ...models, modelCounts };
  });

  const uniqueModels = [
    ...new Set(cars.map((car) => getBrandAndModel(car.NameMMT).modelName)),
  ];

  return (
    <div>
      <h2 className="chart-header">Car Data Visualization</h2>
      <div className="chart-container">
        <div className="pie-chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                labelLine={false}
                label={false}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="legend-container">
            {legendData.map((entry, index) => (
              <div key={`legend-${index}`} className="legend-item">
                <div
                  className="legend-color-box"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <div className="legend-text">
                  {entry.name}: {entry.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="stacked-bar-chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={barData}
              margin={{
                top: 20,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="brand" />
              <YAxis />
              <Tooltip
                contentStyle={{ maxWidth: "200px", whiteSpace: "pre-wrap" }}
                wrapperStyle={{ zIndex: 10000 }}
              />
              {uniqueModels.map((model, index) => (
                <Bar
                  key={model}
                  dataKey={model}
                  stackId="a"
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Chart;
