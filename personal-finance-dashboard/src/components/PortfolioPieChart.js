// PortfolioPieChart.js

import React from "react";
import { Pie } from "react-chartjs-2";

const PortfolioPieChart = ({ chartData }) => {
  return (
    <div className="portfolio-pie-chart">
      <Pie data={chartData} />
    </div>
  );
};

export default PortfolioPieChart;
