import { ACCESS_TOKEN,EXPIRES_IN, logout, TOKEN_TYPE } from "./common";

const BASE_URL_API = import.meta.env.VITE_API_BASE_URL;

const getAccessToken = () =>{
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const tokenType = localStorage.getItem(TOKEN_TYPE);
    const expireIn = localStorage.getItem(EXPIRES_IN);

    if(Date.now() < expireIn){
        return {accessToken,tokenType};
    }else{
        // logout 
        logout();
    }
}

const createAPIConfig = ({accessToken,tokenType},method ='GET') => {
    return {
        headers : {
            Authorization : `${tokenType} ${accessToken}`
        },method
    }
}

export async function fetchRequest(endpoint) {
    const url = `${BASE_URL_API}/` + endpoint;
    console.log(url)

    const result = await fetch(url,createAPIConfig(getAccessToken()));

    return result.json();
};