import React from 'react';
import '../styles/budget.css';
import { dynamicUserData } from '../data/mockData';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);


const Budget = () => {
    const { expenses } = dynamicUserData.monthlyBudget;

    // Extract expense categories and amounts
    const expenseLabels = expenses.map(expense => expense.category);
    const expenseAmounts = expenses.map(expense => expense.amount);

    const data = {
        labels: expenseLabels,
        datasets: [
            {
                label: 'Expense Breakdown',
                data: expenseAmounts,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(201, 203, 207, 0.6)',
                    'rgba(199, 199, 199, 0.6)',
                    'rgba(140, 86, 75, 0.6)',
                    'rgba(231, 107, 243, 0.6)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Expense Breakdown',
            },
        },
    };

    return (
        <div className="budget-container">
            <div className="cell">
                <h1>Monthly Budget</h1>
                <h4>Expenses</h4>
                <ul>
                    {expenses.map((expense, index) => (
                        <p key={index}>
                            {expense.category}: ${expense.amount}
                        </p>
                    ))}
                </ul>
            </div>
            <div className="cell">
                <Pie data={data} options={options} />
            </div>
        </div>
    );
};

export default Budget;