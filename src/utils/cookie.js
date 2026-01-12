/**
 * Set a cookie
 * @param {string} name 
 * @param {string} value 
 * @param {number} days 
 */
export const setCookie = (name, value, days = 7) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    // Secure flag should ideally be true in production, but for dev localhost it might be an issue. 
    // SameSite=Lax is generally good.
    document.cookie = name + "=" + (encodeURIComponent(value) || "") + expires + "; path=/; SameSite=Lax";
};

/**
 * Get a cookie by name
 * @param {string} name 
 * @returns {string|null}
 */
export const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
};

/**
 * Remove a cookie
 * @param {string} name 
 */
export const removeCookie = (name) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

// Helpers for specific app data
export const setAuthData = (accessToken, user) => {
    setCookie('accessToken', accessToken);
    if (user) {
        setCookie('user', JSON.stringify(user));
    }
};

export const getAuthData = () => {
    const token = getCookie('accessToken');
    const userStr = getCookie('user');
    let user = null;
    try {
        if (userStr) user = JSON.parse(userStr);
    } catch (e) {
        console.error("Failed to parse user cookie", e);
    }
    return { token, user };
};

export const clearAuthData = () => {
    removeCookie('accessToken');
    removeCookie('refreshToken');
    removeCookie('user');
};
