import { LOCAL_STORAGE_TOKEN_NAME } from "../contexts/constants";

const setApiUrl = (url) => {
    return localStorage[LOCAL_STORAGE_TOKEN_NAME]
        ? `https://cors-anywhere.herokuapp.com/${url}`
        : url;
};
export default setApiUrl;
