// mockData.js

// Initial user data structure
export const userData = {
    overview: {
      creditScore: 720,
      loans: 20000, // Total loan amount (car loan + student loan + credit card debt)
      assetDistribution: {
        cash: 0, // To be calculated dynamically as income - total expenses
        investments: 50000, // Sum of fixed investment values for each stock
        loans: 20000,
      },
    },
    stocksInvestments: {
      totalInvestment: 50000, // Total amount initially invested across all stocks
      topStocks: [
        {
          name: "Apple",
          symbol: "AAPL",
          initialInvestment: 15000,
          currentValue: 15000,
        },
        {
          name: "Microsoft",
          symbol: "MSFT",
          initialInvestment: 12000,
          currentValue: 12000,
        },
        {
          name: "Amazon",
          symbol: "AMZN",
          initialInvestment: 10000,
          currentValue: 10000,
        },
        {
          name: "Alphabet",
          symbol: "GOOGL",
          initialInvestment: 8000,
          currentValue: 8000,
        },
        {
          name: "Meta Platforms",
          symbol: "META",
          initialInvestment: 5000,
          currentValue: 5000,
        },
      ],
    },
    monthlyBudget: {
      income: 10000, // Monthly income
      expenses: [
        { category: "Rent", amount: 1500 },
        { category: "Utilities", amount: 200 },
        { category: "Food", amount: 600 },
        { category: "Transportation", amount: 200 },
        { category: "Insurance", amount: 150 },
        { category: "Car Payment", amount: 300 }, // Monthly car loan payment
        { category: "Student Loan", amount: 250 }, // Monthly student loan payment
        { category: "Credit Card Payment", amount: 150 }, // Monthly credit card payment
        { category: "Healthcare", amount: 100 }, // Monthly healthcare expense
        { category: "Subscriptions", amount: 50 }, // Streaming or other subscriptions
        { category: "Entertainment", amount: 150 }, // Entertainment expenses
      ],
      spendingPercent: 15, // Percentage of net income for discretionary spending
      savingsGoalPercent: 10, // Percentage of net income set aside for savings
      investingPercent: 15, // Percentage of net income allocated to investing
      emergencyFundPercent: 5, // Percentage of net income allocated to emergency fund
      retirementContributionPercent: 5, // Percentage of net income contributed to retirement fund
    },
    recommendations: ["Consider diversifying investments", "Set up an emergency fund", "Review monthly subscriptions"],
  };
  
  // Helper function to calculate dynamic values based on percentages
  export function calculateDynamicValues(data) {
    // Calculate total expenses and net income
    const totalExpenses = data.monthlyBudget.expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    const netIncome = data.monthlyBudget.income - totalExpenses;
  
    // Calculate cash balance based on remaining income
    data.overview.assetDistribution.cash = netIncome;
  
    // Calculate dynamic values for various financial goals
    data.monthlyBudget.spending =
      (netIncome * data.monthlyBudget.spendingPercent) / 100;
    data.monthlyBudget.savingsGoal =
      (netIncome * data.monthlyBudget.savingsGoalPercent) / 100;
    data.monthlyBudget.investingAmount =
      (netIncome * data.monthlyBudget.investingPercent) / 100;
    data.monthlyBudget.emergencyFund =
      (netIncome * data.monthlyBudget.emergencyFundPercent) / 100;
    data.monthlyBudget.retirementContribution =
      (netIncome * data.monthlyBudget.retirementContributionPercent) / 100;
  
    return data;
  }
  
  // Export the dynamically calculated user data
  export const dynamicUserData = calculateDynamicValues(userData);
  