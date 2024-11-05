import React from "react";
import { dynamicUserData } from "../data/mockData";

const Budget = () => {
  const {
    expenses,
    spending,
    savingsGoal,
    investingAmount,
    emergencyFund,
    retirementContribution,
  } = dynamicUserData.monthlyBudget;

  return (
    <div>
      <h3>Monthly Budget</h3>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.category}: ${expense.amount}
          </li>
        ))}
      </ul>
      <h4>Goals</h4>
      <p>Discretionary Spending: ${spending}</p>
      <p>Savings Goal: ${savingsGoal}</p>
      <p>Investing Amount: ${investingAmount}</p>
      <p>Emergency Fund: ${emergencyFund}</p>
      <p>Retirement Contribution: ${retirementContribution}</p>
    </div>
  );
};

export default Budget;
