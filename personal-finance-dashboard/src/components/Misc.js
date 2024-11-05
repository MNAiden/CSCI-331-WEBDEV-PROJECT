import React from "react";
import { dynamicUserData } from "../data/mockData";

const Misc = () => {
  const { recommendations } = dynamicUserData;

  return (
    <div>
      <h3>MISC</h3>
      <ul>
        {recommendations.map((recommendation, index) => (
          <li key={index}>{recommendation}</li>
        ))}
      </ul>
    </div>
  );
};

export default Misc;
