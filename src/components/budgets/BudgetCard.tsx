import type { BudgetItem } from '../../features/categories/categoriesTypes';
import CustomLinearProgress from '../common/CustomLinearProgress';
import { CATEGORY_ICONS, STATUS_CONFIG } from '../../utils/constants';
import { fmt } from '../../utils/helper';
import { Box, Typography, IconButton, Chip, useTheme, Paper } from "@mui/material";

interface BudgetCardProps {
  item: BudgetItem;
  onEdit: (item: BudgetItem) => void;
  onDelete: (id: string) => void;
}

const BudgetCard = ({ item, onEdit, onDelete }: BudgetCardProps) => {
  // const getIcon = (name: string) => CATEGORY_ICONS[name] || "📦";
  const icon = CATEGORY_ICONS[item.name] || "📦";
  const cfg =
    STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG] ||
    STATUS_CONFIG.safe;
  const theme = useTheme();
  // const barW = `${item.percentage}%`;
  return (
    <Paper
      sx={(theme) => ({
        borderRadius: 3,
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: theme.shadows[4],
        },
      })}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { sm: "flex-start" },
          justifyContent: { sm: "space-between" },
          gap: 2,
        }}
      >
        {/* Left Side */}
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              fontSize: 20,
              borderRadius: 2,
              bgcolor: theme.palette.action.hover,
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle1" noWrap fontWeight={600}>
              {item.name}
            </Typography>
            {item.description && (
              <Typography
                variant="caption"
                color="text.secondary"
                noWrap
              >
                {item.description}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Right Side */}
        <Box className="justify-between" sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
          <Chip
            label={cfg.label}
            size="small"
            sx={{
              fontWeight: 600,
              color: cfg.color,
              bgcolor: cfg.bg,
            }}
          />
          <div className='flex justify-end items-center gap-4'>
            <IconButton
              size="small"
              onClick={() => onEdit(item)}
              sx={{
                borderRadius: 1.5,
                bgcolor: "action.hover",
              }}
            >
              <span role="img" aria-label="edit">
                ✏️
              </span>
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onDelete(item._id)}
              sx={{
                borderRadius: 1.5,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "error.light"
                    : "rgba(239, 68, 68, 0.08)",
                color:
                  theme.palette.mode === "dark"
                    ? "error.main"
                    : "error.main",
                border:
                  theme.palette.mode === "light"
                    ? "1px solid rgba(239, 68, 68, 0.35)"
                    : "none",
                "&:hover": {
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "error.main"
                      : "rgba(239, 68, 68, 0.16)",
                  color: "error.main",
                },
              }}
            >
              <span role="img" aria-label="delete">
                🗑
              </span>
            </IconButton>
          </div>
        </Box>
      </Box>

      {/* Progress Section */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            color: "text.secondary",
          }}
        >
          <span>
            Spent:{" "}
            <Box component="b" sx={{ color: "text.primary", fontWeight: 600 }}>
              {fmt(item.spent)}
            </Box>
          </span>
          <span>
            Limit:{" "}
            <Box component="b" sx={{ color: "text.primary", fontWeight: 600 }}>
              {fmt(item.limit)}
            </Box>
          </span>
        </Box>
        <CustomLinearProgress
          variant="determinate"
          value={item.percentage}
          barColor={cfg.color}
          height={8}
        />
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: cfg.color,
          }}
        >
          {item.remaining >= 0
            ? `${fmt(item.remaining)} remaining`
            : `${fmt(Math.abs(item.remaining))} over budget`}
        </Typography>
      </Box>
    </Paper>
  )
}

export default BudgetCard;