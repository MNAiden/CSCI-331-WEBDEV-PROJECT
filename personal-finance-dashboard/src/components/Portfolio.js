import React, { useEffect, useState } from 'react';
import StockCard from './StockCard';
import PortfolioPieChart from './PortfolioPieChart';
import '../styles/portfolio.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { dynamicUserData, setTotalEquity } from '../data/mockData';

ChartJS.register(ArcElement, Tooltip, Legend);

const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
const API_LIMIT_WARNING = "API limit reached";

const Portfolio = () => {
  const { topStocks } = dynamicUserData.stocksInvestments;
  const [equities, setEquities] = useState([]); // Local state for equities
  const [totalEquity, setTotalEquityState] = useState(dynamicUserData.stocksInvestments.totalEquity); // Local state for total equity
  const [lastFetchTime, setLastFetchTime] = useState('');

  useEffect(() => {
    const fetchAllStockData = async () => {
      let total = 0;
      const now = new Date();
      const formattedTime = now.toLocaleString();
      setLastFetchTime(formattedTime);

      const equityData = await Promise.all(
        topStocks.map(async (stock) => {
          const cacheKey = `stockData_${stock.symbol}`;
          const cachedData = JSON.parse(localStorage.getItem(cacheKey));

          if (cachedData && cachedData.successful) {
            const currentPrice = cachedData.data.currentPrice;
            const equity = stock.shares * currentPrice;
            total += equity;
            return {
              ...stock,
              equity,
              currentPrice,
              todaysReturn: stock.shares * (currentPrice - cachedData.data.previousClose),
              stockData: cachedData.data,
            };
          }

          try {
            const response = await axios.get(
              `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock.symbol}&apikey=${API_KEY}`
            );

            if (response.data['Note']) {
              console.warn(API_LIMIT_WARNING);
              setLastFetchTime(cachedData?.timestamp || 'No recent data available');
              return cachedData || { ...stock, equity: 0, stockData: null };
            }

            const timeSeries = response.data['Time Series (Daily)'];
            if (timeSeries) {
              const dates = Object.keys(timeSeries);
              const latestTimestamp = dates[0];
              const latestData = timeSeries[latestTimestamp];
              const previousData = timeSeries[dates[1]];

              const fetchedData = {
                currentPrice: parseFloat(latestData['4. close']),
                previousClose: parseFloat(previousData['4. close']),
                open: parseFloat(latestData['1. open']),
                high: parseFloat(latestData['2. high']),
                low: parseFloat(latestData['3. low']),
                volume: parseInt(latestData['5. volume'], 10),
              };

              const equity = stock.shares * fetchedData.currentPrice;
              total += equity;

              localStorage.setItem(
                cacheKey,
                JSON.stringify({ data: fetchedData, timestamp: now, successful: true })
              );

              return {
                ...stock,
                equity,
                currentPrice: fetchedData.currentPrice,
                todaysReturn: stock.shares * (fetchedData.currentPrice - fetchedData.previousClose),
                stockData: fetchedData,
              };
            } else {
              return { ...stock, equity: 0, stockData: null };
            }
          } catch (err) {
            console.error('Error fetching stock data:', err);
            return { ...stock, equity: 0, stockData: null };
          }
        })
      );

      setEquities(equityData); // Update local equities state
      setTotalEquityState(total); // Update local totalEquity state
      setTotalEquity(total); // Update global mock data
    };

    fetchAllStockData();
  }, [topStocks]);

  const chartData = {
    labels: equities.map((stock) =>
      totalEquity > 0
        ? `${stock.name} (${((stock.equity / totalEquity) * 100).toFixed(2)}%)`
        : stock.name
    ),
    datasets: [
      {
        data: equities.map((stock) => stock.equity),
        backgroundColor: [
          'rgba(34, 139, 34, 0.8)', // Green
          'rgba(72, 61, 139, 0.8)', // Purple
          'rgba(139, 0, 0, 0.8)', // Red
          'rgba(255, 140, 0, 0.8)', // Orange
          'rgba(0, 0, 139, 0.8)', // Blue
        ],
      },
    ],
  };

  return (
    <div className="portfolio">
      <div className="portfolio-title">
        <h3>My Portfolio Overview</h3>
        <p>Last fetched: {lastFetchTime}</p>
      </div>
      <div className="portfolio-content">
        <div className="portfolio-pie-chart">
          <PortfolioPieChart chartData={chartData} />
        </div>
        <div className="stock-cards">
          {equities.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
