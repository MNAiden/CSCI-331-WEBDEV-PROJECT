export const userData = {
  overview: {
    creditScore: 720,
    loans: 20000,
    assetDistribution: {
      cash: 0,
      investments: 0,
      loans: 20000,
    },
  },
  stocksInvestments: {
    totalInvestment: 50000,
    totalEquity: 0,
    topStocks: [
      {
        name: "Apple",
        symbol: "AAPL",
        initialInvestment: 15000,
        purchasePrice: 223.45,
        shares: 15000 / 223.45,
      },
      {
        name: "Microsoft",
        symbol: "MSFT",
        initialInvestment: 12000,
        purchasePrice: 368.14,
        shares: 12000 / 368.14,
      },
      {
        name: "Amazon",
        symbol: "AMZN",
        initialInvestment: 10000,
        purchasePrice: 128.65,
        shares: 10000 / 128.65,
      },
      {
        name: "Alphabet",
        symbol: "GOOGL",
        initialInvestment: 8000,
        purchasePrice: 138.4,
        shares: 8000 / 138.4,
      },
      {
        name: "Meta Platforms",
        symbol: "META",
        initialInvestment: 5000,
        purchasePrice: 310.12,
        shares: 5000 / 310.12,
      },
    ],
  },
  monthlyBudget: {
    income: 10000,
    expenses: [
      { category: "Rent", amount: 1500 },
      { category: "Utilities", amount: 200 },
      { category: "Food", amount: 600 },
      { category: "Transportation", amount: 200 },
      { category: "Insurance", amount: 150 },
      { category: "Car Payment", amount: 300 },
      { category: "Student Loan", amount: 250 },
      { category: "Credit Card Payment", amount: 150 },
      { category: "Healthcare", amount: 100 },
      { category: "Subscriptions", amount: 50 },
      { category: "Entertainment", amount: 150 },
    ],
    spendingPercent: 15,
    savingsGoalPercent: 10,
    investingPercent: 15,
    emergencyFundPercent: 5,
    retirementContributionPercent: 5,
  },
  recommendations: [
    "Consider diversifying investments",
    "Set up an emergency fund",
    "Review monthly subscriptions",
  ],
};

// Helper functions for managing totalEquity
export const getTotalEquity = () => userData.stocksInvestments.totalEquity;

export const setTotalEquity = (value) => {
  console.log("Updating totalEquity to:", value);

  // Update global mockData directly
  userData.stocksInvestments.totalEquity = value;
  userData.overview.assetDistribution.investments = value;

  // Update dynamic values within the same object
  const updatedUserData = calculateDynamicValues(userData);
  Object.assign(userData, updatedUserData);
};

// Function to dynamically update values in assetDistribution
export function calculateDynamicValues(data) {
  // Calculate total expenses and net income
  const totalExpenses = data.monthlyBudget.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const netIncome = data.monthlyBudget.income - totalExpenses;

  // Update dynamic fields directly on `data`
  data.overview.assetDistribution.cash = netIncome;
  data.overview.assetDistribution.investments =
    data.stocksInvestments.totalEquity;

  // Update financial goals directly
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
