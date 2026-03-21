import { LinearProgress, linearProgressClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { LinearProgressProps } from "@mui/material/LinearProgress";

interface CustomLinearProgressProps extends LinearProgressProps {
  height?: number;
  barColor?: string;
  trackColor?: string;
}

const StyledLinearProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) =>
    prop !== "height" && prop !== "barColor" && prop !== "trackColor",
})<CustomLinearProgressProps>(({ theme, height, barColor, trackColor }) => ({
  height: height || 10,
  borderRadius: 5,

  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      trackColor || theme.palette.grey[200],

    ...(theme.palette.mode === "dark" && {
      backgroundColor: trackColor || theme.palette.grey[800],
    }),
  },

  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: barColor || theme.palette.primary.main,
  },
}));

export default function CustomLinearProgress(
  props: CustomLinearProgressProps
) {
  return <StyledLinearProgress {...props} />;
}