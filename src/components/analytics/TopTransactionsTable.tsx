import { Box, Typography } from "@mui/material";
import CustomTable from "../common/CustomTable";

interface TopTransaction {
  id: string;
  icon: string;
  description: string;
  type: "income" | "expense";
  category: string;
  date: string;
  amount: number;
}

interface TopTransactionsTableProps {
  rows: TopTransaction[];
}

const columns = [
  { id: "description", label: "Transaction" },
  { id: "category", label: "Category" },
  { id: "date", label: "Date" },
  { id: "amount", label: "Amount" },
];

export default function TopTransactionsTable({
  rows,
}: TopTransactionsTableProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 0.8,
          mb: 1.5,
        }}
      >
        Top Transactions
      </Typography>
      <CustomTable
        columns={columns}
        rows={rows}
        page={1}
        totalPages={1}
        onPageChange={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </Box>
  );
}

