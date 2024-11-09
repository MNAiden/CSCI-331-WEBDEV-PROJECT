import React from 'react';
import '../styles/overview.css';
import { dynamicUserData } from '../data/mockData';

const Overview = () => {
  const { creditScore, loans, assetDistribution } = dynamicUserData.overview;

  return (
    <div>
      <h2>Overview</h2>
      <p>Credit Score: {creditScore}</p>
      <p>Total Loans: ${loans}</p>
      <p>Cash: ${assetDistribution.cash}</p>
      <p>Investments: ${assetDistribution.investments}</p>
      <p>Loans: ${assetDistribution.loans}</p>
    </div>
  );
};

export default Overview;
