export const ACCESS_TOKEN = "accessToken";
export const TOKEN_TYPE = "tokenType";
export const EXPIRES_IN = "expiresIn";

const APP_URL = import.meta.env.VITE_APP_URL;

export const ENDPOINT = {
    userInfo : "me",
    featuredPlaylist : "browse/featured-playlists?limit=10"
}

export const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(TOKEN_TYPE);
    localStorage.removeItem(EXPIRES_IN);
    window.location.href= `${APP_URL}`;
}