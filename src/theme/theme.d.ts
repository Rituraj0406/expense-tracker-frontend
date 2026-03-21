import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    formLabel: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    formLabel?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    formLabel: true;
  }
}

