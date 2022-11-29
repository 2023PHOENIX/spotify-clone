 import { ACCESS_TOKEN, EXPIRES_IN, TOKEN_TYPE } from "../common";

// const CLIENT_ID = "7c39e87340174e8c80b29cafcb5b357b";
const APP_URL = import.meta.env.VITE_APP_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const scope = "user-top-read user-follow-read playlist-read-private user-library-read";
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

// console.log('this is a local host ', CLIENT_ID);
const ACCESS_TOKEN_KEY = "accessToken";


function authorizeUser() {
    const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scope}&show_dialog=true`;

    window.open(url, "login", "height=600,width=800");
}

document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("login-to-spotify")
        .addEventListener("click", authorizeUser);


});

window.setItemsInLocalStorage = ({ accessToken, tokenType, expireIn }) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(TOKEN_TYPE, tokenType);
    localStorage.setItem(EXPIRES_IN, (Date.now() + (expireIn * 1000)) );
    // console.log("done");
    // console.log(localStorage.accessToken)
}
window.addEventListener("load", () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
        window.location.href = `${APP_URL}/dashboard/dashboard.html`;
    }
    if (window.opener !== null && !window.opener.closed) {
        window.focus();
        if (window.location.href.includes("error")) {
            window.close();
        }
        const { hash } = window.location;
        const searchParams = new URLSearchParams(hash);
        const accessToken = searchParams.get("#access_token");


        const tokenType = searchParams.get("token_type");
        const expireIn = searchParams.get("expires_in");
        if (accessToken) {
            window.close();
            window.opener.setItemsInLocalStorage({accessToken, tokenType, expireIn});
            // window.location.href = `${APP_URL}/dashboard/dashboard.html`;
        } else {
            window.close();
        }

    }
})