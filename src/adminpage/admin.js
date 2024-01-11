import React from 'react';
import { useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from '../theme';
import Sidebar from './scenes/global/Sidebar';
import Topbar from './scenes/global/Topbar';
import { Outlet } from 'react-router-dom'; // Import Outlet from react-router-dom

export default function Admin() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ display: 'flex' }} >
          <Sidebar isSidebar={isSidebar} />
          <div style={{ flexGrow: 1, overflow: 'hidden' }}>
            <Topbar setIsSidebar={setIsSidebar} />
            {/* Nested content will be rendered here */}
            
            <Outlet />
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
