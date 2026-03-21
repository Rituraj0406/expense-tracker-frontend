export const CATEGORY_ICONS: Record<string, string> = {
    Food: "🍔", 
    Groceries: "🛒", 
    Transport: "🚗", 
    Utilities: "⚡", 
    Rent: "🏠",
    Entertainment: "🎬", 
    Health: "💊", 
    Education: "📚", 
    Shopping: "🛍️",
    "Credit Card Bill": "💳", 
    Salary: "💰", 
    Investment: "📈", 
    Other: "📦",
};

export const STATUS_CONFIG = {
    safe: { 
        color: "#10b981", 
        bg: "rgba(16,185,129,0.12)", 
        label: "Safe" 
    },
    warning: { 
        color: "#f59e0b", 
        bg: "rgba(245,158,11,0.12)", 
        label: "Warning" 
    },
    exceeded: { 
        color: "#ef4444", 
        bg: "rgba(239,68,68,0.12)", 
        label: "Exceeded" 
    },
};

export const CATEGORY_LIST = [
    {label: "Food", value: "food"},
    {label: "Transport", value: "transport"},
    {label: "Entertainment", value: "entertainment"},
    {label: "Salary", value: "salary"},
    {label: "Freelance", value: "freelance"},
    {label: "Utilities", value: "utilities"},
    {label: "Health", value: "health"},
    {label: "Other", value: "other"},
];

export const PRESET_CATEGORIES = [
  "Food",
  "Groceries",
  "Transport",
  "Utilities",
  "Rent",
  "Entertainment",
  "Health",
  "Education",
  "Shopping",
  "Credit Card Bill",
  "Other",
];


export const currencyOptions = [
  { label: "Indian Rupee (₹)", value: "INR" },
  { label: "US Dollar ($)", value: "USD" },
  { label: "Euro (€)", value: "EUR" }
];

export const languageOptions = [
  { label: "English", value: "en" },
  { label: "Hindi", value: "hi" },
  { label: "Spanish", value: "es" }
];

export type AccentColor = {
  label: string;
  value: string;
};

export const accentColors: AccentColor[] = [
  { label: "Default", value: "default" },
  { label: "Teal", value: "#00C9A7" },
  { label: "Purple", value: "#845EF7" },
  { label: "Indigo", value: "#4F46E5" },
];