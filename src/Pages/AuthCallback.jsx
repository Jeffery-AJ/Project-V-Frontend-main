import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleOAuthCallback } from '../utils/auth';
import { Box, Typography, CircularProgress } from '@mui/material';
import authConfig from '../config/authConfig';
import Cookies from 'js-cookie';

export default function AuthCallback() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const callbackProcessed = useRef(false);

  useEffect(() => {
    async function processOAuthCallback() {
      if (callbackProcessed.current) return;
      callbackProcessed.current = true;

      try {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        const state = params.get('state');
        const error = params.get('error');
        const provider = sessionStorage.getItem('authProvider');
        

        if (!code || !state) {
          setError('Invalid authentication request: missing code or state.');
          return;
        }

        const result = await handleOAuthCallback(provider, code, state);

        if (result.success) {
          console.log('OAuth authentication successful');
          Cookies.set(authConfig.tokens.accessTokenKey, result.token, { secure: true, sameSite: 'Strict' });
          if (result.refresh) {
            Cookies.set(authConfig.tokens.refreshTokenKey, result.refresh, { secure: true, sameSite: 'Strict' });
          }
          Cookies.set(authConfig.tokens.userKey, JSON.stringify(result.user), { secure: true, sameSite: 'Strict' });
          sessionStorage.removeItem('authProvider');
          navigate('/menu', { replace: true });
        } else {
          console.error('OAuth authentication failed:', result.message);
          setError(result.message || 'Authentication failed');
        }
      } catch (err) {
        console.error('Authentication callback error:', err);
        setError('An error occurred during authentication.');
      }
    }

    processOAuthCallback();
  }, [location, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
      }}
    >
      {error ? (
        <>
          <Typography variant="h5" color="error">
            Authentication Error
          </Typography>
          <Typography color="error">{error}</Typography>
          <Typography
            variant="body2"
            sx={{ cursor: 'pointer', textDecoration: 'underline', mt: 2 }}
            onClick={() => navigate('/signin')}
          >
            Return to sign in
          </Typography>
        </>
      ) : (
        <>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Completing authentication...
          </Typography>
        </>
      )}
    </Box>
  );
}