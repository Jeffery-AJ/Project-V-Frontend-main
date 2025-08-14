import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/Landing';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import { ThemeProvider } from './Context/ThemeContext';
import { SidebarDemo } from './Components/Sidebar';
import Dashboard from './Pages/StudyTools';
import Dashboard1 from './Pages/AIasistant';
import Dashboard2 from './Pages/Collabration';
import Dashboard3 from './Pages/UserSettings';
import { startTokenRefresh } from './utils/auth';
import AuthCallback from './Pages/AuthCallback';

export default function App() {
  React.useEffect(() => {
    // Start automatic token refresh for regular login or OAuth
    startTokenRefresh('regular'); // Change to 'google' or 'github' if needed
  }, []);
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/menu" element={<SidebarDemo studyTools={Dashboard} aiAssit={Dashboard1} collabration={Dashboard2} settings={Dashboard3}/>} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

