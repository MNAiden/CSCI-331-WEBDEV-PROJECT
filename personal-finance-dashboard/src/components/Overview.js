import React from 'react';
import '../styles/overview.css';
import { dynamicUserData } from '../data/mockData';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Overview = () => {
    const { creditScore, loans, assetDistribution } = dynamicUserData.overview;

    // Data for the bar chart
    const data = {
        labels: ['Credit Score', 'Total Loans', 'Cash', 'Investments', 'Loans'],
        datasets: [
            {
                label: 'Financial Overview',
                data: [creditScore, loans, assetDistribution.cash, assetDistribution.investments, assetDistribution.loans],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Financial Overview',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Value ($)',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Categories',
                },
            },
        },
    };

    return (
        <div className="overview-container">
            <h2>Overview</h2>
            <div>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default Overview;
