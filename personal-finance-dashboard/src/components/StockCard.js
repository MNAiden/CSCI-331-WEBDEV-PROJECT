import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;

const StockCard = ({ stock }) => {
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock.symbol}&apikey=${API_KEY}`
        );

        console.log("API Response:", response.data);

        const timeSeries = response.data['Time Series (Daily)'];
        if (timeSeries) {
          const latestTimestamp = Object.keys(timeSeries)[0];
          const latestData = timeSeries[latestTimestamp];
          setStockData({
            currentPrice: parseFloat(latestData['4. close']),
            open: parseFloat(latestData['1. open']),
            high: parseFloat(latestData['2. high']),
            low: parseFloat(latestData['3. low']),
            volume: parseInt(latestData['5. volume'], 10),
          });
        } else if (response.data['Note']) {
          setError('Rate limit exceeded. Please try again later.');
        } else {
          setError('No data available for this symbol.');
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
