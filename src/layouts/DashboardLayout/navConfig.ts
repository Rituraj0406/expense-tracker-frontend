import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

const navConfig = [
  { id: "home",         label: "Home",         path: "/dashboard",              Icon: HomeRoundedIcon },
  { id: "transactions", label: "Transactions",  path: "/dashboard/transactions",  Icon: ReceiptLongRoundedIcon },
  { id: "analytics",   label: "Analytics",     path: "/dashboard/analytics",    Icon: BarChartRoundedIcon },
  { id: "budget",      label: "Budget",        path: "/dashboard/budget",       Icon: AccountBalanceWalletRoundedIcon },
  { id: "settings",    label: "Settings",      path: "/dashboard/settings",     Icon: SettingsRoundedIcon },
];

export default navConfig;