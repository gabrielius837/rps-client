import { useLayoutEffect, useState } from 'react';

const useMediaQuery = (query: string): boolean => {
    const [state, setState] = useState<boolean>(window.matchMedia(query).matches);

    useLayoutEffect(() => {
        const media = window.matchMedia(query);

        const callback = () => {
            if (media.matches !== state)
                setState(media.matches);
        }

        window.addEventListener('resize', callback);
        return () => window.removeEventListener('resize', callback);
    }, [state, query]);

    return state;
};

export default useMediaQuery;
