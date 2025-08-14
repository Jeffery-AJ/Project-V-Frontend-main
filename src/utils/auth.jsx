import authConfig from '../config/authConfig';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

const encrypt = (data) => CryptoJS.AES.encrypt(data, process.env.REACT_APP_ENCRYPTION_KEY).toString();
const decrypt = (data) => CryptoJS.AES.decrypt(data, process.env.REACT_APP_ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - Response with success status and message
 */
export const registerUser = async (userData) => {
    try {
        const response = await fetch(authConfig.apiUrls.register, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data };
        } else {
            // Handle validation errors from Django
            const errorMessage = Object.values(data)
                .flat()
                .join(', ');
            return { success: false, message: errorMessage || 'Registration failed' };
        }
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, message: 'Network error occurred during registration' };
    }
};

/**
 * Authenticate user with email and password
 * @param {Object} credentials - User login credentials
 * @returns {Promise<Object>} - Response with token and user data
 */
export const authenticateUser = async (credentials) => {
    try {
        const response = await fetch(authConfig.apiUrls.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (response.ok) {
            return { ...data, token: data.access };
        } else {
            const errorMessage = data.non_field_errors 
                ? data.non_field_errors.join(', ') 
                : 'Login failed. Please check your credentials.';
            return { message: errorMessage };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { message: 'Network error occurred during login' };
    }
};

/**
 * Sign in with Google
 */
export const signInWithGoogle = async () => {
    const csrfToken = Cookies.get('csrftoken');
    try {
      // Get the OAuth URL from the backend, which will include a state parameter
      const response = await fetch(authConfig.apiUrls.googleAuthUrl, {
        method: 'GET',
        credentials: 'include',// Important: include cookies for session
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
         
      });
      
      const data = await response.json();
      
      if (response.ok && data.authorization_url) {
        // Store the provider in sessionStorage before redirecting
        sessionStorage.setItem('authProvider', 'google');
        // The state is already included in the authorization_url from the backend
        // Redirect to Google authentication page
        window.location.href = data.authorization_url;
      } else {
        throw new Error(data.error || 'Failed to get Google authentication URL');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      return { success: false, message: 'Error starting Google authentication' };
    }
};
  
/**
 * Sign in with GitHub
 */
export const signInWithGitHub = async () => {
try {
    // Get the OAuth URL from the backend, which will include a state parameter
    const response = await fetch(authConfig.apiUrls.githubAuthUrl, {
    method: 'GET',
    credentials: 'include', // Important: include cookies for session
    headers: {
        'Content-Type': 'application/json',
    },
    
    });
    
    const data = await response.json();
    
    if (response.ok && data.authorization_url) {
    // Store the provider in sessionStorage before redirecting
    sessionStorage.setItem('authProvider', 'github');
    
    // The state is already included in the authorization_url from the backend
    // Redirect to GitHub authentication page
    window.location.href = data.authorization_url;
    } else {
    throw new Error(data.error || 'Failed to get GitHub authentication URL');
    }
} catch (error) {
    console.error('GitHub sign-in error:', error);
    return { success: false, message: 'Error starting GitHub authentication' };
}
};

const sanitizeInput = (input) => {
    const div = document.createElement('div');
    div.innerText = input;
    return div.innerHTML;
};

export const handleRateLimit = (response) => {
    if (response.status === 429) {
        return { success: false, message: 'Too many requests. Please try again later.' };
    }
    return null;
};

/**
 * Handle OAuth callback
 * @param {string} provider - 'google' or 'github'
 * @param {string} code - Authorization code from OAuth provider
 * @param {string} state - State parameter from OAuth provider (for CSRF protection)
 * @returns {Promise<Object>} - Response with token and user data
 */
export const handleOAuthCallback = async (provider, code, state) => {
    try {
        const sanitizedCode = sanitizeInput(code);
        const sanitizedState = sanitizeInput(state);

        const url = provider === 'google'
            ? authConfig.apiUrls.googleCallback
            : authConfig.apiUrls.githubCallback;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ code: sanitizedCode, state: sanitizedState }),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, user: data.user, token: data.access_token, refresh: data.refresh_token };
        } else {
            return { success: false, message: data.error || `${provider} authentication failed` };
        }
    } catch (error) {
        console.error(`${provider} callback error:`, error.message);
        return { success: false, message: `Network error during ${provider} authentication` };
    }
};
  
export const refreshAccessToken = async (provider = 'regular') => {
    const refreshToken = Cookies.get(authConfig.tokens.refreshTokenKey);

    if (!refreshToken) {
        return { success: false, message: 'No refresh token available' };
    }

    let refreshUrl;
    if (provider === 'google') {
        refreshUrl = authConfig.apiUrls.googleRefreshToken;
    } else if (provider === 'github') {
        refreshUrl = authConfig.apiUrls.githubRefreshToken;
    } else {
        refreshUrl = authConfig.apiUrls.refreshToken;
    }

    try {
        const response = await fetch(refreshUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
        });

        const data = await response.json();

        if (response.ok) {
        Cookies.set(authConfig.tokens.accessTokenKey, data.access_token, { secure: true, sameSite: 'Strict' });
        if (data.refresh_token) {
            Cookies.set(authConfig.tokens.refreshTokenKey, data.refresh_token, { secure: true, sameSite: 'Strict' });
        }
        return { success: true, token: data.access_token };
        } else {
        Cookies.remove(authConfig.tokens.accessTokenKey);
        Cookies.remove(authConfig.tokens.refreshTokenKey);
        Cookies.remove(authConfig.tokens.userKey);
        window.location.href = '/signin';
        return { success: false, message: data.error || 'Token refresh failed' };
        }
    } catch (error) {
        console.error('Token refresh error:', error);
        return { success: false, message: 'Network error during token refresh' };
    }
};

/**
 * Start automatic token refresh
 * @param {string} provider - 'regular', 'google', or 'github'
 */
export const startTokenRefresh = (provider = 'regular') => {
    const refreshInterval = 5 * 60 * 1000; // Check every 5 minutes

    setInterval(async () => {
        const tokenExpiry = Cookies.get('tokenExpiry');
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

        if (tokenExpiry && currentTime >= tokenExpiry - 60) {
            // Refresh the token if it's about to expire (1 minute buffer)
            const refreshResult = await refreshAccessToken(provider);

            if (!refreshResult.success) {
                console.warn('Failed to refresh token automatically. User may need to log in again.');
            }
        }
    }, refreshInterval);
};

/**
 * Logout the current user
 * @returns {Promise<boolean>} - Success status
 */
export const logoutUser = async () => {
    try {
        const response = await fetch(authConfig.apiUrls.logout, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies for session
        });

        Cookies.remove(authConfig.tokens.accessTokenKey);
        Cookies.remove(authConfig.tokens.refreshTokenKey);
        Cookies.remove(authConfig.tokens.userKey);

        return response.ok;
    } catch (error) {
        console.error('Logout error:', error);
        return false;
    }
};

/**
 * Get current user details
 * @returns {Promise<Object>} - User data or error
 */
export const getCurrentUser = async () => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        return { success: false, message: 'Not authenticated' };
    }
    
    try {
        const response = await fetch(authConfig.apiUrls.userDetails, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        
        const data = await response.json();
        
        if (response.ok) {
            return { success: true, user: data };
        } else {
            return { success: false, message: data.detail || 'Failed to get user details' };
        }
    } catch (error) {
        console.error('Get user error:', error);
        return { success: false, message: 'Network error fetching user details' };
    }
};
