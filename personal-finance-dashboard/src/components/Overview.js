// Overview.js
import React from "react";
import { dynamicUserData } from "../data/mockData";

const Overview = () => {
  const { creditScore, loans, assetDistribution } = dynamicUserData.overview;

  return (
    <div>
      <div className="heading-box">
        <h2>Overview</h2>
      </div>
      <div className="paragraph-box">
        <p>Credit Score: {creditScore}</p>
      </div>
      <div className="paragraph-box">
        <p>Total Loans: ${loans}</p>
      </div>
      <div className="paragraph-box">
        <p>Cash: ${assetDistribution.cash}</p>
      </div>
      <div className="paragraph-box">
        <p>Investments: ${assetDistribution.investments}</p>
      </div>
      <div className="paragraph-box">
        <p>Loans: ${assetDistribution.loans}</p>
      </div>
    </div>
  );
};

export default Overview;
