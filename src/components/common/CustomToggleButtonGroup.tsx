import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import { toggleButtonClasses } from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";

interface ToggleOption {
  value: string;
  icon?: React.ReactNode;
  label?: string;
  disabled?: boolean;
}

interface Props {
  value: string | null;
  onChange: (value: string | null) => void;
  options: ToggleOption[];
  exclusive?: boolean;
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  gap: "2rem",

  [`& .${toggleButtonGroupClasses.firstButton}, & .${toggleButtonGroupClasses.middleButton}`]:
    {
      borderTopRightRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
    },

  [`& .${toggleButtonGroupClasses.lastButton}, & .${toggleButtonGroupClasses.middleButton}`]:
    {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderLeft: `1px solid ${theme.palette.divider}`,
    },

  [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled}, & .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]:
    {
      borderLeft: `1px solid ${theme.palette.action.disabledBackground}`,
    },
}));

const CustomToggleButtonGroup: React.FC<Props> = ({
  value,
  onChange,
  options,
  exclusive = true,
}) => {
  // const handleChange = (
  //   _event: React.MouseEvent<HTMLElement>,
  //   newValue: string | null
  // ) => {
  //   onChange(newValue);
  // };

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue === null) return; // prevent toggle off
    onChange(newValue);
  };

  return (
    <StyledToggleButtonGroup
      value={value}
      exclusive={exclusive}
      onChange={handleChange}
    >
      {options.map((option) => (
        <ToggleButton
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.icon || option.label}
        </ToggleButton>
      ))}
    </StyledToggleButtonGroup>
  );
};

export default CustomToggleButtonGroup;