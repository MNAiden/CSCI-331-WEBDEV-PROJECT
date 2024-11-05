import React from 'react';
import StockCard from './StockCard';
import { dynamicUserData } from '../data/mockData';

const Portfolio = () => {
  const { topStocks } = dynamicUserData.stocksInvestments;

  return (
    <div className="portfolio">
      <h3>My Portfolio</h3>
      <div className="stock-cards">
        {topStocks.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
