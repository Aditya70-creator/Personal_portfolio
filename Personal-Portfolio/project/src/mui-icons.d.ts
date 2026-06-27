declare module '@mui/icons-material/*' {
  import type { OverridableComponent } from '@mui/material/OverridableComponent';
  import type { SvgIconTypeMap } from '@mui/material/SvgIcon';

  const component: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  export default component;
}