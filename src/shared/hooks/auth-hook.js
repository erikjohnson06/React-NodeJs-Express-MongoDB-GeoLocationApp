import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {

    const [token, setToken] = useState(null);
    const [tokenExpirationDate, setTokenExpirationDate] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = useCallback((id, token, expirationDate) => {

        const tokenExpiration = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); //1 Hour

        setToken(token);
        setUserId(id);
        setTokenExpirationDate(tokenExpiration);

        localStorage.setItem('userData',
        JSON.stringify({
            userId: id,
            token: token,
            expiration : tokenExpiration.toISOString()
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setTokenExpirationDate(null);
        localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate){

            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            console.log("remainingTime: ", remainingTime);

            logoutTimer = setTimeout(logout, remainingTime);
        }
        else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    //Auto-login if already authenticated
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));

        const expirationDate = (storedData && storedData.expiration ? new Date(storedData.expiration) : new Date());
        const currDate = new Date();

        if (storedData && storedData.token && expirationDate > currDate){
            login(storedData.userId, storedData.token, expirationDate);
        }
    }, [login]);

    return { token, login, logout, userId };
};