import Cookies from 'js-cookie';
import { refreshAccessToken } from './auth';
export const handleRateLimit = (response) => {
    if (response.status === 429) {
        return { success: false, message: 'Too many requests. Please try again later.' };
    }
    return null;
};

/**
 * API client that automatically handles token refresh
 * @param {string} url - API endpoint
 * @param {Object} options - Fetch options
 * @param {string} provider - 'regular', 'google', or 'github'
 * @returns {Promise<Object>} - API response
 */

export const apiClient = async (url, options = {}, provider = 'regular') => {
    const token = Cookies.get(authConfig.tokens.accessTokenKey);

    const headers = options.headers || {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    let response = await fetch(url, { ...options, headers });

    const rateLimitResult = handleRateLimit(response);
    if (rateLimitResult) return rateLimitResult;

    if (response.status === 401) {
        const refreshResult = await refreshAccessToken(provider);

        if (refreshResult.success) {
            const newToken = refreshResult.token;
            headers['Authorization'] = `Bearer ${newToken}`;
            response = await fetch(url, { ...options, headers });
        } else {
            Cookies.remove(authConfig.tokens.accessTokenKey);
            Cookies.remove(authConfig.tokens.refreshTokenKey);
            Cookies.remove(authConfig.tokens.userKey);
        }
    }

    return response;
};