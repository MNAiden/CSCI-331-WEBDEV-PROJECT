import React from 'react';
import { dynamicUserData } from '../data/mockData';

const Budget = () => {
  const { income, expenses, spending, savingsGoal, investingAmount, emergencyFund, retirementContribution } = dynamicUserData.monthlyBudget;

  return (
    <div className="cell">
      <h3>Monthly Budget</h3>
      <p>Income: ${income}</p>
      <h4>Expenses</h4>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.category}: ${expense.amount}
          </li>
        ))}
      </ul>
      <h4>Goals</h4>
      <p>Spending: ${spending}</p>
      <p>Savings Goal: ${savingsGoal}</p>
      <p>Investing: ${investingAmount}</p>
      <p>Emergency Fund: ${emergencyFund}</p>
      <p>Retirement Contribution: ${retirementContribution}</p>
    </div>
  );
};

export default Budget;
