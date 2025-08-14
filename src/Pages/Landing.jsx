import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '/src/theme/AppTheme';
import NavBar from '/src/Components/NavBar';
import MainLayout from '/src/Components/MainLayout';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function LandingPage() {
  const { mode, toggleMode } = useContext(ThemeContext);

  return (
    <AppTheme mode={mode}>
      <CssBaseline enableColorScheme />
      <NavBar toggleMode={toggleMode} mode={mode} />
      <MainLayout />
    </AppTheme>
  );
}