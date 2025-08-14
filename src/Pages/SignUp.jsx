import * as React from 'react';
import { signInWithGoogle, signInWithGitHub, registerUser } from '../utils/auth';
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
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { keyframes } from '@mui/system';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '/src/theme/AppTheme';
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
  background: theme.palette.mode === 'dark' ? 'linear-gradient(145deg,rgb(0, 0, 0),rgba(0, 0, 0, 0.75))' : 'linear-gradient(145deg, #f4ece2, #cdc7be)',
  borderRadius: '28px',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '45px 45px 90px rgba(15, 15, 15), -45px -45px 90px rgba(26, 29, 28)'
      : '45px 45px 90px #c2bcb3, -45px -45px 90px #fffef3',
  transition: 'all 0.3s ease-in-out',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1), // less padding for smaller screens
    border:'none',       // remove rounded corners
    boxShadow: 'none',       // remove shadow
    background: 'none',      // remove background styling
    margin: 0,               // remove extra margins
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
    background:'none'
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
      ? 'radial-gradient(circle, rgba(250, 241, 229, 0.18) 1px, transparent 20%)'
      : 'radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 20%)',
    backgroundSize: '12px 12px',
    backgroundPosition: '0 0',
    backgroundRepeat: 'repeat',
  },
}));

export default function SignUp(props) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [registrationError, setRegistrationError] = useState('');
    const { mode } = useContext(ThemeContext);
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [nameError, setNameError] = React.useState(false);
    const [nameErrorMessage, setNameErrorMessage] = React.useState('');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const validateInputs = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const name = document.getElementById('name');

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
        setEmailError(true);
        setEmailErrorMessage('Please enter a valid email address.');
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

        if (!name.value || name.value.length < 1) {
        setNameError(true);
        setNameErrorMessage('Name is required.');
        isValid = false;
        } else {
        setNameError(false);
        setNameErrorMessage('');
        }

        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!validateInputs()) {
          return;
        }
        
        setIsLoading(true);
        setRegistrationError('');
        
        const data = new FormData(event.currentTarget);
        const userData = {
          username: data.get('name'),
          email: data.get('email'),
          password1: data.get('password'), // dj_rest_auth requires password1 and password2
          password2: data.get('password'), // using the same value for both
        };
        
        try {
          const result = await registerUser(userData);
          
          if (result.success) {
            // Navigate to sign in page after successful registration
            navigate('/signin');
          } else {
            setRegistrationError(result.message || 'Registration failed. Please try again.');
          }
        } catch (error) {
          console.error('Registration error:', error);
          setRegistrationError('An error occurred during sign up. Please try again.');
        } finally {
          setIsLoading(false);
        }
    };

    return (
        <AppTheme mode={mode} {...props}>
        <CssBaseline enableColorScheme />
            <SignUpContainer direction="column" justifyContent="space-between">
                {isMobile ? (
                    <>
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
                            Sign up
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                        >
                            <FormControl>
                                <FormLabel htmlFor="name">Username</FormLabel>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    placeholder="User123"
                                    error={nameError}
                                    helperText={nameErrorMessage}
                                    color={nameError ? 'error' : 'primary'}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    placeholder="your@email.com"
                                    name="email"
                                    autoComplete="email"
                                    variant="outlined"
                                    error={emailError}
                                    helperText={emailErrorMessage}
                                    color={passwordError ? 'error' : 'primary'}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    placeholder="••••••"
                                    type="password"
                                    id="password"z
                                    autoComplete="new-password"
                                    variant="outlined"
                                    error={passwordError}
                                    helperText={passwordErrorMessage}
                                    color={passwordError ? 'error' : 'primary'}
                                />
                            </FormControl>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" 
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
                                label="I want to receive updates via email."
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={validateInputs}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing up...' : 'Sign up'}
                            </Button>
                        </Box>
                        <Divider>
                            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
                        </Divider>
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
                                Sign up with Google
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
                                Sign up with GitHub
                            </Button>
                            {registrationError && (
                                <Typography color="error" sx={{ textAlign: 'center', mt: 1 }}>
                                    {registrationError}
                                </Typography>
                            )}
                            <Typography sx={{ textAlign: 'center' }}>
                                Already have an account?{' '}
                                <Link
                                    component='button'
                                    type='button'
                                    onClick={() => navigate('/signin')}
                                    variant="body2"
                                    sx={{ alignSelf: 'center' }}
                                >
                                    Sign in
                                </Link>
                            </Typography>
                        </Box>
                    </>
                ) : (
                    <Card variant="outlined">
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
                            Sign up
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                        >
                            <FormControl>
                                <FormLabel htmlFor="name">Username</FormLabel>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    placeholder="User123"
                                    error={nameError}
                                    helperText={nameErrorMessage}
                                    color={nameError ? 'error' : 'primary'}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    placeholder="your@email.com"
                                    name="email"
                                    autoComplete="email"
                                    variant="outlined"
                                    error={emailError}
                                    helperText={emailErrorMessage}
                                    color={passwordError ? 'error' : 'primary'}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    placeholder="••••••"
                                    type="password"
                                    id="password"z
                                    autoComplete="new-password"
                                    variant="outlined"
                                    error={passwordError}
                                    helperText={passwordErrorMessage}
                                    color={passwordError ? 'error' : 'primary'}
                                />
                            </FormControl>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" 
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
                                label="I want to receive updates via email."
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={validateInputs}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing up...' : 'Sign up'}
                            </Button>
                        </Box>
                        <Divider>
                            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
                        </Divider>
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
                                Sign up with Google
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
                                Sign up with GitHub
                            </Button>
                            {registrationError && (
                                <Typography color="error" sx={{ textAlign: 'center', mt: 1 }}>
                                    {registrationError}
                                </Typography>
                            )}
                            <Typography sx={{ textAlign: 'center' }}>
                                Already have an account?{' '}
                                <Link
                                    component='button'
                                    type='button'
                                    onClick={() => navigate('/signin')}
                                    variant="body2"
                                    sx={{ alignSelf: 'center' }}
                                >
                                    Sign in
                                </Link>
                            </Typography>
                        </Box>
                    </Card>
                )}
            </SignUpContainer>
        </AppTheme>
  );
}