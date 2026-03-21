import { alpha, Box, Chip, IconButton, Pagination, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


interface TableColumn {
    id: string;
    label: string;
}

interface rowData {
    id: string;
    icon: string;
    description: string;
    type: "income" | "expense";
    category: string;
    date: string;
    amount: number;
}

interface Props {
    columns: TableColumn[];
    rows: rowData[];
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}


const CustomTable = ({ columns, rows, page, totalPages, onPageChange, onEdit, onDelete }: Props) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                background: theme.palette.background.paper,
                borderRadius: 4,
                p: 3,
                color: theme.palette.text.primary,
                border: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                        <TableCell
                            sx={{
                                color: theme.palette.text.secondary,
                                fontWeight: 600,
                                width: 120,
                            }}
                        >
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{
                                '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                },
                            }}
                        >
                            <TableCell>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 2,
                                            background: theme.palette.action.hover,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 22,
                                        }}
                                    >
                                        {row.icon}
                                    </Box>
                                    <Box>
                                        <Typography fontWeight={600}>
                                            {row.description}
                                        </Typography>

                                        <Chip
                                            label={row.type}
                                            size="small"
                                            sx={{
                                                mt: 0.5,
                                                bgcolor:
                                                    row.type === "income"
                                                        ? alpha(theme.palette.success.main, 0.15)
                                                        : alpha(theme.palette.error.main, 0.15),
                                                color:
                                                    row.type === "income"
                                                        ? theme.palette.success.main
                                                        : theme.palette.error.main,
                                            }}
                                        />
                                    </Box>
                                </Stack>
                            </TableCell>
                            <TableCell sx={{ color: theme.palette.text.secondary }}>
                                {row.category}
                            </TableCell>
                            <TableCell sx={{ color: theme.palette.text.secondary }}>
                                {row.date}
                            </TableCell>
                            <TableCell>
                                <Typography
                                    fontWeight={600}
                                    color={row.type === "income" ? theme.palette.success.main : theme.palette.error.main}
                                >
                                    {row.type === "income" ? "+" : "-"}₹
                                    {Math.abs(row.amount).toLocaleString()}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Stack direction="row" spacing={1}>
                                    <IconButton
                                        onClick={() => onEdit(row.id)}
                                        sx={{
                                            background: theme.palette.action.hover,
                                            color: theme.palette.text.secondary,
                                        }}
                                    >
                                        <EditOutlinedIcon fontSize="small" />
                                    </IconButton>

                                    <IconButton
                                        onClick={() => onDelete(row.id)}
                                        sx={{
                                            background: theme.palette.action.hover,
                                            color: theme.palette.error.main,
                                        }}
                                    >
                                        <DeleteOutlineOutlinedIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* Pagination */}
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mt={3}
            >
                <Typography color={theme.palette.text.secondary}>
                    Showing {rows.length} transactions
                </Typography>

                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => onPageChange(value)}
                    color="primary"
                />
            </Stack>
        </Box>
    )
}

export default CustomTable
