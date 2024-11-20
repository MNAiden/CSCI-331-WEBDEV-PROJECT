import React, { useState, useEffect, useCallback } from 'react';
import '../styles/overview.css';
import { dynamicUserData } from '../data/mockData';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Overview = () => {
  const [overviewData, setOverviewData] = useState(dynamicUserData.overview);

  useCallback(() => {
    setOverviewData(dynamicUserData.overview);
  }, [dynamicUserData]);

  const { creditScore, loans, assetDistribution } = overviewData;

  const data = {
    labels: ['Cash', 'Investments', 'Loans'],
    datasets: [
      {
        label: 'Financial Overview',
        data: [
          assetDistribution.cash,
          assetDistribution.investments,
          assetDistribution.loans,
        ],
        backgroundColor: [
          'rgba(34, 139, 34, 0.8)', // Green
          'rgba(72, 61, 139, 0.8)', // Purple
          'rgba(139, 0, 0, 0.8)', // Red
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Financial Overview' },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Value ($)' } },
      x: { title: { display: true, text: 'Categories' } },
    },
  };

  const cardData = [
    { title: 'Credit Score', value: creditScore },
    { title: 'Total Loans', value: loans },
    { title: 'Cash', value: assetDistribution.cash },
    { title: 'Investments', value: assetDistribution.investments },
    { title: 'Loans', value: assetDistribution.loans },
  ];

  return (
    <div className="ovrview">
      <div className="overview-title">
        <h2>Overview</h2>
      </div>
      <div className="overview-cards">
        {cardData.map((card, index) => (
          <div key={index} className="overview-card">
            <h3>{card.title}: {card.value}</h3>
          </div>
        ))}
      </div>
      <div className="overview-chart">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Overview;
