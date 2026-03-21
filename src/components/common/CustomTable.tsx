import { alpha, Box, Chip, IconButton, Pagination, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useMediaQuery } from "@mui/material";


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
    // 🔥 Mobile + Tablet breakpoint
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    // ================== 📱 MOBILE + TABLET VIEW ==================
    if (isSmallScreen) {
        return (
            <Stack spacing={2}>
                {rows.map((row) => (
                    <Box
                        key={row.id}
                        sx={{
                            p: 2,
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.divider}`,
                            background: theme.palette.background.paper,
                        }}
                    >
                        {/* Header (icon + description) */}
                        <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
                            <Box
                                sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 2,
                                    background: theme.palette.action.hover,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                }}
                            >
                                {row.icon}
                            </Box>

                            <Box sx={{ minWidth: 0 }}>
                                <Typography fontWeight={600} noWrap>
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

                        {/* 2-column data layout */}
                        <Stack spacing={1}>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="caption" color="text.secondary">
                                    Category
                                </Typography>
                                <Typography fontWeight={500}>{row.category}</Typography>
                            </Stack>

                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="caption" color="text.secondary">
                                    Date
                                </Typography>
                                <Typography fontWeight={500}>{row.date}</Typography>
                            </Stack>

                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="caption" color="text.secondary">
                                    Amount
                                </Typography>
                                <Typography
                                    fontWeight={700}
                                    color={
                                        row.type === "income"
                                            ? theme.palette.success.main
                                            : theme.palette.error.main
                                    }
                                >
                                    {row.type === "income" ? "+" : "-"}₹
                                    {Math.abs(row.amount).toLocaleString()}
                                </Typography>
                            </Stack>
                        </Stack>

                        {/* Actions */}
                        <Stack direction="row" spacing={1} mt={2}>
                            <IconButton
                                onClick={() => onEdit(row.id)}
                                sx={{
                                    flex: 1,
                                    background: theme.palette.action.hover,
                                    minWidth: 100,
                                    borderRadius: 12,
                                    fontSize: 15,
                                    fontWeight: 500
                                }}
                            >
                                <EditOutlinedIcon /> Edit
                            </IconButton>

                            <IconButton
                                onClick={() => onDelete(row.id)}
                                sx={{
                                    flex: 1,
                                    background: theme.palette.action.hover,
                                    color: theme.palette.error.main,
                                    minWidth: 100,
                                    borderRadius: 12,
                                    fontSize: 15,
                                    fontWeight: 500
                                }}
                            >
                                <DeleteOutlineOutlinedIcon /> Delete
                            </IconButton>
                        </Stack>
                    </Box>
                ))}

                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => onPageChange(value)}
                    color="primary"
                />
            </Stack>
        );
    }

    return (
        <Box
            sx={{
                background: theme.palette.background.paper,
                borderRadius: 4,
                p: {xs: 2, sm: 3},
                color: theme.palette.text.primary,
                border: `1px solid ${theme.palette.divider}`,
                overflowX: "auto"
            }}
        >
            <Table sx={{minWidth: 650}}>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                sx={{ color: theme.palette.text.secondary, fontWeight: 600, px: { xs: 1, sm: 2 } }}
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
                            <TableCell sx={{px: { xs: 1, sm: 2 }, maxWidth: 250}}>
                                <Stack direction="row" spacing={{ xs: 1, sm: 1.5, md: 2 }} alignItems="center">
                                    <Box
                                        sx={{
                                            width: { xs: 32, sm: 40, md: 48 },
                                            height: { xs: 32, sm: 40, md: 48 },
                                            borderRadius: 2,
                                            background: theme.palette.action.hover,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: { xs: 16, sm: 18, md: 22 },
                                            flexShrink: 0,
                                        }}
                                    >
                                        {row.icon}
                                    </Box>
                                    <Box sx={{minWidth: 0}}>
                                        <Typography 
                                            fontWeight={600}
                                            noWrap
                                            sx={{
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                            }}
                                        >
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
                            <TableCell
                                sx={{
                                    width: 80,
                                    minWidth: 80,
                                    // position: "sticky",
                                    right: 0,
                                    background: theme.palette.background.paper,
                                    zIndex: 2,
                                }}
                            >
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
