import { useEffect, useRef } from 'react';

export const useObserver = (ref, canLoad, isLoading, loadPage) => {
    const observer = useRef();

    useEffect(() => {
        if (isLoading) return;

        if (observer.current)
            observer.current.disconnect();

        var callback = (entries) => {
            if (entries[0].isIntersecting && canLoad) {
                loadPage();
            }
        };

        observer.current = new IntersectionObserver(callback);
        observer.current.observe(ref.current);
    }, [isLoading]);
};