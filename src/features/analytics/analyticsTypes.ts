export interface Overview {
    totalIncome: number;
    totalExpenses: number;
    totalTransactions: number;
    netSavings: number;
}

export interface IncomeExpense {
    month: string;
    income: number;
    expense: number;
}

export interface CategoryBreakdown {
    name: string;
    value: number;
}

export interface MonthlyTrend {
    month: string;
    amount: number;
}

export interface Transaction {
    _id: string;
    type: "income" | "expense";
    amount: number;
    category: string;
    description: string;
    date: string;
}

export interface AnalyticsResponse {
    overview: Overview;
    incomeExpense: IncomeExpense[];
    categoryBreakdown: CategoryBreakdown[];
    monthlyTrend: MonthlyTrend[];
    topTransactions: Transaction[];
}