import { Box, Typography, Skeleton, Divider } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RecentTransactions({ data, loading }: any) {
    return (
        <Box sx={(theme) => ({
            borderRadius: 3,
            p: 3,
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.background.paper,
        })}>
            <Typography
                sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    color: "text.secondary",
                    mb: 2
                }}
            >
                Recent Transaction
            </Typography>

            {loading
                ? [...Array(5)].map((_, i) => (
                    <Skeleton key={i} height={40} />
                ))
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                : data.map((item: any, index: number) => (
                    <Box key={item._id}>
                        <Box
                            key={item._id}
                            display="flex"
                            justifyContent="space-between"
                            mb={1}
                        >
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 400,
                                    letterSpacing: 0.8,
                                    color: "text.primary"
                                }}
                            >
                                {item.description}
                            </Typography>
                            <Typography
                                color={item.type === "income" ? "success.main" : "error.main"}
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 600
                                }}
                            >
                                ₹{item.amount}
                            </Typography>
                        </Box>
                        {/* Divider (except last item) */}
                        {index !== data.length - 1 && <Divider sx={(theme) => ({
                            borderColor: theme.palette.divider,
                            opacity: 0.4,
                            my: 0.5,
                        })} />}
                    </Box>
                ))}
        </Box>
    );
}