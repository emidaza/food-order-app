import { useEffect, useState } from "react";

export default function useFetch(initialValue, fetchFn) {
    const [fetchedData, setFetchedData] = useState(initialValue);
    const [isFetching, setIsFetching] = useState(false);
    const [fetchError, setFetchError] = useState(undefined);

    useEffect(() => {
        setIsFetching(true);
        async function executeFetch() {
            try {
                const data = await fetchFn();
                const dataJson = await data.json();
                setFetchedData(dataJson);
                setIsFetching(false);
            } catch (error) {
                setIsFetching(false);
                setFetchError(error);
            }
        }

        executeFetch();
    }, []);

    return [
        fetchedData,
        isFetching,
        fetchError
    ];
}