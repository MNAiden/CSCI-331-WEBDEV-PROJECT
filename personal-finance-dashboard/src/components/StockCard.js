import React from 'react';

const StockCard = ({ stock }) => {
  const { stockData, equity = 0, todaysReturn = 0, currentPrice = 0 } = stock;

  if (!stockData) {
    return (
      <div className="stock-card">
        <h4>{stock.name} ({stock.symbol})</h4>
        <p>Data not available</p>
      </div>
    );
  }

  const percentChange = stockData.previousClose
    ? ((currentPrice - stockData.previousClose) / stockData.previousClose) * 100
    : 0;
  const totalReturn = equity - (stock.initialInvestment || 0);
  const totalPercentChange = stock.initialInvestment
    ? (totalReturn / stock.initialInvestment) * 100
    : 0;

  return (
    <div className="stock-card">
      <h4>{stock.name} ({stock.symbol})</h4>
      <div className="stock-details">
        <p>Last Price: ${currentPrice.toFixed(2)}</p>
        <p>Percent Change: {percentChange.toFixed(2)}%</p>
        <p>Your Equity: ${equity.toFixed(2)}</p>
        <p>Today's Return: ${todaysReturn.toFixed(2)}</p>
        <p>Total Return: ${totalReturn.toFixed(2)}</p>
        <p>Total Percent Change: {totalPercentChange.toFixed(2)}%</p>
        <p>Open: ${stockData.open?.toFixed(2)}</p>
        <p>High: ${stockData.high?.toFixed(2)}</p>
        <p>Low: ${stockData.low?.toFixed(2)}</p>
        <p>Volume: {stockData.volume}</p>
      </div>
    </div>
  );
};

export default StockCard;
