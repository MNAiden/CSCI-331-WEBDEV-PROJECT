import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const API_KEY = process.env.REACT_APP_API_KEY; // Use an .env file for this

const StockCard = ({ stock }) => {
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock.symbol}&interval=5min&outputsize=compact&apikey=${API_KEY}`
        );

        const timeSeries = response.data['Time Series (5min)'];
        if (timeSeries) {
          const latestTimestamp = Object.keys(timeSeries)[0];
          const latestData = timeSeries[latestTimestamp];
          setStockData({
            currentPrice: latestData['4. close'],
            open: latestData['1. open'],
            high: latestData['2. high'],
            low: latestData['3. low'],
            volume: latestData['5. volume'],
          });
        } else {
          setError('No data available');
        }
      } catch (err) {
        console.error('Error fetching stock data:', err);
        setError('Failed to fetch data');
      }
    };
    fetchStockData();
  }, [stock.symbol]);

  const chartData = {
    labels: ['Initial Investment', 'Current Value'],
    datasets: [
      {
        data: [
          stock.initialInvestment,
          stockData ? stockData.currentPrice * (stock.initialInvestment / stock.currentValue) : stock.initialInvestment,
        ],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
      },
    ],
  };

  return (
    <div className="stock-card">
      <h4>{stock.name} ({stock.symbol})</h4>
      {error ? (
        <p>{error}</p>
      ) : stockData ? (
        <>
          <div className="stock-details">
            <p>Current Price: ${stockData.currentPrice}</p>
            <p>Open: ${stockData.open}</p>
            <p>High: ${stockData.high}</p>
            <p>Low: ${stockData.low}</p>
            <p>Volume: {stockData.volume}</p>
          </div>
          <Pie data={chartData} />
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default StockCard;
