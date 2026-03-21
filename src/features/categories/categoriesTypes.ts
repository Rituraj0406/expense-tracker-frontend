export interface Category {
    _id: string;
    user: string;
    name: string;
    type: "expense" | "income";
    description: string;
    amount: number;
    spent: number;
    month: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface CategoryPayload {
    name: string;
    type: 'income' | 'expense';
    description?: string;
    amount: number;
    month?: string;
}

export interface BudgetItem {
  _id: string;
  name: string;
  type: "income" | "expense";
  description?: string;
  limit: number;
  spent: number;
  remaining: number;
  percentage: number;
  status: "safe" | "warning" | "exceeded";
  month: string;
  createdAt: string;
}

export interface BudgetSummary {
  summary: BudgetItem[];
  totals: {
    totalLimit: number;
    totalSpent: number;
    totalSaved: number;
    month: string;
  };
  alerts: {
    overBudgetCount: number;
    overBudgetItems: string[];
    warningCount: number;
  };
}