import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from './createEmotionCache';
import theme from './theme';

const clientSideEmotionCache = createEmotionCache();

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
  emotionCache?: ReturnType<typeof createEmotionCache>;
}

export default function ThemeProviderWrapper({
  children,
  emotionCache,
}: ThemeProviderWrapperProps) {
  return (
    <CacheProvider value={emotionCache ?? clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

ThemeProviderWrapper.defaultProps = {
  emotionCache: clientSideEmotionCache,
};
