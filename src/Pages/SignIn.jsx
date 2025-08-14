import * as React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import ForgotPassword from '../Components/ForgotPassword';
import { keyframes } from '@mui/system';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import AppTheme from '/src/theme/AppTheme';
import { signInWithGoogle, signInWithGitHub, authenticateUser } from '../utils/auth';
import { GoogleIcon, GitHubIcon, TheNoteIcon } from '/src/Components/CustomIcons';
import { useMediaQuery, useTheme } from '@mui/material';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  background: theme.palette.mode === 'dark' ? 'linear-gradient(145deg,rgb(0, 0, 0),rgb(3, 3, 3))' : 'linear-gradient(145deg, #f4ece2, #cdc7be)',
  borderRadius: '28px',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '45px 45px 90px rgba(15, 15, 15, 0.74), -45px -45px 90px rgba(26, 29, 28)'
      : '45px 45px 90px #c2bcb3, -45px -45px 90px #fffef3',
  transition: 'all 0.3s ease-in-out',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1), // less padding for smaller screens
    margin: theme.spacing(1),
    border:'none',       // remove rounded corners
    boxShadow: 'none',       // remove shadow
    background: 'none',      // remove background styling

  },
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    borderRadius: 'inherit',
    backgroundImage:
    theme.palette.mode === 'dark'
      ? 'radial-gradient(circle, rgba(239, 250, 229, 0.18) 1px, transparent 20%)'
      : 'radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 20%)',
    backgroundSize: '12px 12px',
    backgroundPosition: '0 0',
    backgroundRepeat: 'repeat',
  },
}));

export default function SignIn(props) {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { mode } = useContext(ThemeContext);
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateInputs()) {
      return;
    }
    
    setIsLoading(true);
    setLoginError('');
    
    const data = new FormData(event.currentTarget);
    const credentials = {
      username: data.get('username'), // Changed from "email" to "username"
      password: data.get('password'),
    };
    
    try {
      const result = await authenticateUser(credentials);
      
      if (result.token) {
        // Store the token in localStorage
        localStorage.setItem('authToken', result.token);
        // Redirect to menu page
        navigate('/menu');
      } else {
        setLoginError(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred during sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const validateInputs = () => {
    const usernameField = document.getElementById('username');
    const password = document.getElementById('password');
  
    let isValid = true;
  
    if (!usernameField.value) {
      setEmailError(true);
      setEmailErrorMessage('Please enter your username.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }
  
    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
  
    return isValid;
  };

  return (
    <AppTheme mode={mode} {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        {isMobile ? (
          <>
            {/* Same form content, just not wrapped in <Card> */}
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center' }}
            >
              <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-start"
                gap={0}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                <TheNoteIcon />
              </Box>
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <TextField
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  autoComplete="username"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={emailError ? 'error' : 'primary'}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? 'error' : 'primary'}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" 
                    sx={{
                        '&.Mui-checked': {
                        backgroundColor: 'transparent',
                        },
                        '&.Mui-checked:hover': {
                            backgroundColor: 'transparent',
                        },
                        '& .MuiSvgIcon-root': {
                            color: 'black',
                        },
                    }} 
                />}
                label="Remember me"
              />
              <ForgotPassword open={open} handleClose={handleClose} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
              <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Forgot your password?
              </Link>
            </Box>
            <Divider>or</Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={signInWithGoogle}
                startIcon={<GoogleIcon />}
                sx={{
                    backgroundSize: '400% 400%',
                    backgroundRepeat: 'repeat',
                    transition:
                      'background 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out',
                    border: '1px solid black',
                    '&:hover': {
                      backgroundImage:
                        'radial-gradient(circle, #4285F4, #34A853, #FBBC05, #EA4335, #4285F4)',
                      animation: `${gradientAnimation} 20s linear infinite`,
                      color: '#F1F1F1',   
                      borderColor: 'black',
                    },
                }}
              >
                Sign in with Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={signInWithGitHub}
                startIcon={<GitHubIcon />}
                sx={{
                    backgroundSize: '400% 400%',
                    backgroundRepeat: 'repeat',
                    transition:
                      'background 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out',
                    border: '1px solid black',
                    '&:hover': {
                      backgroundImage:
                        'radial-gradient(circle, #24292e, #444d56, #586069, #24292e)',
                      animation: `${gradientAnimation} 20s linear infinite`,
                      color: 'white',
                      borderColor: 'black',
                    },
                }}
              >
                Sign in with GitHub
              </Button>

              {loginError && (
                <Typography color="error" sx={{ textAlign: 'center', mt: 1 }}>
                  {loginError}
                </Typography>
              )}

              <Typography sx={{ textAlign: 'center' }}>
                Don&apos;t have an account?{' '}
                <Link
                  component="button"
                  type="button"
                  onClick={() => navigate('/signup')}
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
          </>
        ) : (
          <Card variant="outlined">
            {/* Same desktop view wrapped in <Card> */}
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center' }}
            >
              <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-start"
                gap={0}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                <TheNoteIcon />
              </Box>
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel> 
                <TextField
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="username"
                  type="text" 
                  name="username" 
                  placeholder="Enter your username" 
                  autoComplete="username" 
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={emailError ? 'error' : 'primary'}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? 'error' : 'primary'}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" 
                    sx={{
                        '&.Mui-checked': {
                        backgroundColor: 'transparent',
                        },
                        '&.Mui-checked:hover': {
                            backgroundColor: 'transparent',
                        },
                        '& .MuiSvgIcon-root': {
                            color: 'black',
                        },
                    }} 
                />}
                label="Remember me"
              />
              <ForgotPassword open={open} handleClose={handleClose} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
              <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Forgot your password?
              </Link>
            </Box>
            <Divider>or</Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={signInWithGoogle}
                startIcon={<GoogleIcon />}
                sx={{
                    backgroundSize: '400% 400%',
                    backgroundRepeat: 'repeat',
                    transition:
                      'background 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out',
                    border: '1px solid black',
                    '&:hover': {
                      backgroundImage:
                        'radial-gradient(circle, #4285F4, #34A853, #FBBC05, #EA4335, #4285F4)',
                      animation: `${gradientAnimation} 20s linear infinite`,
                      color: '#F1F1F1',   
                      borderColor: 'black',
                    },
                }}
              >
                Sign in with Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={signInWithGitHub}
                startIcon={<GitHubIcon />}
                sx={{
                    backgroundSize: '400% 400%',
                    backgroundRepeat: 'repeat',
                    transition:
                      'background 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out',
                    border: '1px solid black',
                    '&:hover': {
                      backgroundImage:
                        'radial-gradient(circle, #24292e, #444d56, #586069, #24292e)',
                      animation: `${gradientAnimation} 20s linear infinite`,
                      color: 'white',
                      borderColor: 'black',
                    },
                }}
              >
                Sign in with GitHub
              </Button>
              {loginError && (
                <Typography color="error" sx={{ textAlign: 'center', mt: 1 }}>
                  {loginError}
                </Typography>
              )}
              <Typography sx={{ textAlign: 'center' }}>
                Don&apos;t have an account?{' '}
                <Link
                  component="button"
                  type="button"
                  onClick={() => navigate('/signup')}
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Card>
        )}
      </SignInContainer>
    </AppTheme>
  );
}