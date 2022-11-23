import { useMediaQuery } from '@mui/material';

export const useUserSystemTheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  return prefersDarkMode ? 'dark' : 'light';
};
