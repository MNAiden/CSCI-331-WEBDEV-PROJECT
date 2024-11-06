import React from 'react';
import StockCard from './StockCard';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { dynamicUserData } from '../data/mockData';

ChartJS.register(ArcElement, Tooltip, Legend);

const Portfolio = () => {
  const { topStocks } = dynamicUserData.stocksInvestments;

  // Calculate the total investment in all stocks
  const totalInvestment = topStocks.reduce((total, stock) => total + stock.initialInvestment, 0);

  // Prepare data for the portfolio overview pie chart with darker colors
  const chartData = {
    labels: topStocks.map(stock => `${stock.name} (${((stock.initialInvestment / totalInvestment) * 100).toFixed(2)}%)`),
    datasets: [
      {
        data: topStocks.map(stock => ((stock.initialInvestment / totalInvestment) * 100).toFixed(2)),
        backgroundColor: [
          'rgba(34, 139, 34, 0.8)', // Darker green
          'rgba(72, 61, 139, 0.8)',  // Darker purple
          'rgba(139, 0, 0, 0.8)',    // Darker red
          'rgba(255, 140, 0, 0.8)',  // Darker orange
          'rgba(0, 0, 139, 0.8)',    // Darker blue
        ],
      },
    ],
  };

  return (
    <div className="portfolio">
      <h3>My Portfolio Overview</h3>
      <Pie data={chartData} />
      <div className="stock-cards">
        {topStocks.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} totalInvestment={totalInvestment} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
