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
  const isEmpty = !rows || rows.length === 0;
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
      {isEmpty ? (
        <Box
          sx={{
            height: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            borderRadius: 2,
            border: "1px dashed",
            borderColor: "divider",
            bgcolor: "#ffffff"
          }}
        >
          <Typography fontSize={28}>🧾</Typography>
          <Typography fontWeight={600}>No Transactions</Typography>
          <Typography variant="caption" color="text.secondary">
            Top transactions will appear here
          </Typography>
        </Box>
      ) : (

        <CustomTable
          columns={columns}
          rows={rows}
          page={1}
          totalPages={1}
          onPageChange={() => { }}
          onEdit={() => { }}
          onDelete={() => { }}
        />
      )}
    </Box>
  );
}

