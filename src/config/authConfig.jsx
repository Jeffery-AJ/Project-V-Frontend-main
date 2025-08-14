const API_BASE_URL = 'http://localhost:8000/api/';  // Assuming your Django backend is running on port 8000

const authConfig = {
    apiUrls: {
        register: `${API_BASE_URL}auth/register/`,
        login: `${API_BASE_URL}auth/login/`,
        logout: `${API_BASE_URL}auth/logout/`,
        userDetails: `${API_BASE_URL}auth/user/`,
        refreshToken: `${API_BASE_URL}auth/token/refresh/`, // Regular login refresh token
        googleRefreshToken: `${API_BASE_URL}auth/google/refresh-token/`, // Google OAuth refresh token
        githubRefreshToken: `${API_BASE_URL}auth/github/refresh-token/`, // GitHub OAuth refresh token

        // OAuth endpoints
        googleAuthUrl: `${API_BASE_URL}auth/google/auth-url/`,
        githubAuthUrl: `${API_BASE_URL}auth/github/auth-url/`,
        googleCallback: `${API_BASE_URL}auth/google/callback/`,
        githubCallback: `${API_BASE_URL}auth/github/callback/`,
    },
    tokens: {
        accessTokenKey: 'authToken',
        refreshTokenKey: 'refreshToken',
        userKey: 'user',
    },
    socialAuth: {
        google: {
            clientId: "15843930915-v7spbc4696k1lm0rbtctdbd58e90oqfn.apps.googleusercontent.com",
            redirectUri: 'http://localhost:5173/auth/callback'
        },
        github: {
            clientId: "Ov23liZJu5snW3s0ElHe",
            redirectUri: 'http://localhost:5173/auth/callback'
        }
    }
};

export default authConfig;