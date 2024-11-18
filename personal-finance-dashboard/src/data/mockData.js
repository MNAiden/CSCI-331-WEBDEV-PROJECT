export const userData = {
  overview: {
    creditScore: 720,
    loans: 20000,
    assetDistribution: {
      cash: 0,
      investments: 0, // This must match totalEquity
      loans: 20000,
    },
  },
  stocksInvestments: {
    totalInvestment: 50000,
    totalEquity: 0, // Drives investments in assetDistribution
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
        purchasePrice: 138.40,
        shares: 8000 / 138.40,
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
  userData.stocksInvestments.totalEquity = value;
  userData.overview.assetDistribution.investments = value; // Synchronize investments
};

// Function to dynamically update values in assetDistribution
export function calculateDynamicValues(data) {
  const result = JSON.parse(JSON.stringify(data)); // Deep copy of userData

  // Calculate total expenses and net income
  const totalExpenses = result.monthlyBudget.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const netIncome = result.monthlyBudget.income - totalExpenses;

  // Update dynamic fields
  result.overview.assetDistribution.cash = netIncome;
  result.overview.assetDistribution.investments = getTotalEquity(); // Always match totalEquity

  // Calculate financial goals
  result.monthlyBudget.spending = (netIncome * result.monthlyBudget.spendingPercent) / 100;
  result.monthlyBudget.savingsGoal = (netIncome * result.monthlyBudget.savingsGoalPercent) / 100;
  result.monthlyBudget.investingAmount = (netIncome * result.monthlyBudget.investingPercent) / 100;
  result.monthlyBudget.emergencyFund = (netIncome * result.monthlyBudget.emergencyFundPercent) / 100;
  result.monthlyBudget.retirementContribution =
    (netIncome * result.monthlyBudget.retirementContributionPercent) / 100;

  return result;
}

// Export the dynamically calculated user data
export const dynamicUserData = calculateDynamicValues(userData);
