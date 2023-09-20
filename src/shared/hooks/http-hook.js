import { useCallback, useState, useRef, useEffect } from 'react';

export const useHttpClient = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState();

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {

        setIsLoading(true);

        //Store an Abort Controller to cancel request if needed
        const httpAbortController = new AbortController();
        activeHttpRequests.current.push(httpAbortController);

        try {

            const response = await fetch(url, {
                method: method,
                body: body,
                headers: headers,
                signal: httpAbortController.signal
            });

            const data = await response.json();

            //Remove this request from the activeHttpRequests controller
            activeHttpRequests.current = activeHttpRequests.current.filter(
                    requestCtrl => requestCtrl !== httpAbortController
            );

            if (!response.ok) {
                throw new Error(data.message);
            }

            setIsLoading(false);
            return data;
        } catch (e) {
            console.error(e);

            //Ignore Abort errors
            if (e.name !== 'AbortError') {
                setHasError(e.message || 'Whoops.. an unknown error has occurred.');
                throw e;
            }
        } finally {
            setIsLoading(false);
    }
    }, []);

    const clearError = () => {
        setHasError(null);
    };

    //Clean up function to cancel any ongoing request that is no longer needed
    useEffect(() => {
        return () => {
            if (activeHttpRequests.current) {
                activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
            }
        };
    }, []);

    return {isLoading, hasError, sendRequest, clearError};
};