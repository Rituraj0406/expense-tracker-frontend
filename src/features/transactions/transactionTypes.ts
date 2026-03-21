export interface Transaction {
    _id: string;
    type: 'income' | 'expense';
    amount: number;
    description?: string;
    category: string;
    date: string;
}

export interface TransactionPayload {
    type: 'income' | 'expense';
    amount: number;
    category: string;
    description: string;
    date?: string;
}